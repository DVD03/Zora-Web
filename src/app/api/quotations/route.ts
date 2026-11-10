import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  checkRateLimit,
  getClientIp,
  hashIpAddress,
  QuotationValidationSchema,
  sanitizeNoSQL,
  sanitizeText,
  verifyAdminJwt,
} from '@/lib/security';
import { connectToDatabase, getMemoryStore } from '@/lib/mongodb';
import { QuotationModel, type QuotationStatus } from '@/models/Quotation';
import { sendQuotationEmailAlert } from '@/lib/mailer';

function generateUniqueQuoteNumber(): string {
  const year = new Date().getFullYear();
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `#ZS-${year}-${suffix}`;
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const admin = token ? await verifyAdminJwt(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized CMS access' }, { status: 401 });
    }

    const db = await connectToDatabase();
    if (db) {
      const quotations = await QuotationModel.find({}).sort({ createdAt: -1 }).limit(100).lean();
      return NextResponse.json({ success: true, quotations });
    }

    const store = getMemoryStore();
    return NextResponse.json({ success: true, quotations: store.quotations });
  } catch (error) {
    console.error('[API /api/quotations GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to load quotations' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req.headers);
    const ipHash = await hashIpAddress(clientIp);

    // 1. Rate Limiting: Max 5 quote generations per 15 minutes per IP
    const rateStatus = checkRateLimit(ipHash, 'quotations', 5, 15 * 60 * 1000);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Maximum of 5 quotation generations per 15 minutes reached. Please wait ${Math.ceil(
            rateStatus.retryAfterSeconds / 60
          )} minutes or message Panduka (+94 777 321 165) on WhatsApp.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateStatus.retryAfterSeconds) },
        }
      );
    }

    // 2. Parse & Sanitize against NoSQL operator injection
    const rawBody = await req.json();
    const sanitizedBody = sanitizeNoSQL(rawBody);

    // 3. Zod Strict Validation & XSS Sanitization
    const parsed = QuotationValidationSchema.safeParse(sanitizedBody);
    if (!parsed.success) {
      const firstErr = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      return NextResponse.json(
        {
          success: false,
          error: firstErr || 'Invalid quotation form fields. Please check your details.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = parsed.data;
    const quoteNumber = generateUniqueQuoteNumber();
    const timestampIso = new Date().toISOString();

    // Server-side authoritative total recomputation for integrity
    const oneTimeTotal = validData.selectedItems
      .filter((item) => item.billingType === 'One-Time')
      .reduce((acc, item) => acc + item.price, 0);
    const monthlyTotal = validData.selectedItems
      .filter((item) => item.billingType === 'Monthly')
      .reduce((acc, item) => acc + item.price, 0);

    // 4. Persist to MongoDB BEFORE client triggers PDF download
    const db = await connectToDatabase();
    let createdId = `quote-${Date.now()}`;

    if (db) {
      const doc = await QuotationModel.create({
        quoteNumber,
        clientName: validData.clientName,
        companyName: validData.companyName,
        email: validData.email,
        phone: validData.phone,
        notes: validData.notes,
        primaryService: validData.primaryService,
        selectedItems: validData.selectedItems,
        hostingTier: validData.hostingTier,
        oneTimeTotal,
        monthlyTotal,
        estimatedWeeks: validData.estimatedWeeks,
        usdRateNoteAccepted: validData.usdRateNoteAccepted,
        status: validData.status,
        ipHash,
      });
      createdId = String(doc._id);
    }

    // Keep in-memory store synchronized
    const store = getMemoryStore();
    const quotationRecord = {
      _id: createdId,
      quoteNumber,
      clientName: validData.clientName,
      companyName: validData.companyName || '',
      email: validData.email,
      phone: validData.phone,
      notes: validData.notes || '',
      primaryService: validData.primaryService,
      selectedItems: validData.selectedItems,
      hostingTier: validData.hostingTier,
      oneTimeTotal,
      monthlyTotal,
      estimatedWeeks: validData.estimatedWeeks,
      usdRateNoteAccepted: validData.usdRateNoteAccepted,
      status: validData.status as QuotationStatus,
      ipHash,
      createdAt: timestampIso,
      updatedAt: timestampIso,
    };
    store.quotations.unshift(quotationRecord);

    // 5. Dispatch instant email copy to zorasolution.official@gmail.com
    const emailResult = await sendQuotationEmailAlert({
      quoteNumber,
      clientName: validData.clientName,
      companyName: validData.companyName,
      email: validData.email,
      phone: validData.phone,
      notes: validData.notes,
      primaryService: validData.primaryService,
      hostingTier: validData.hostingTier,
      selectedItems: validData.selectedItems,
      oneTimeTotal,
      monthlyTotal,
      estimatedWeeks: validData.estimatedWeeks,
      submittedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' }),
    });

    return NextResponse.json(
      {
        success: true,
        quotation: quotationRecord,
        emailStatus: emailResult.mode,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API /api/quotations POST] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate and save quotation.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const admin = token ? await verifyAdminJwt(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized CMS access' }, { status: 401 });
    }

    const rawBody = await req.json();
    const clean = sanitizeNoSQL(rawBody) as { id?: string; status?: QuotationStatus };
    const id = sanitizeText(String(clean.id || ''));
    const allowed: QuotationStatus[] = ['Generated', 'Sent_WhatsApp', 'Converted'];
    const status = allowed.includes(clean.status as QuotationStatus)
      ? (clean.status as QuotationStatus)
      : undefined;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Valid quotation ID & status required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      await QuotationModel.findByIdAndUpdate(id, { $set: { status } });
    }

    const store = getMemoryStore();
    const target = store.quotations.find((q) => q._id === id || q.quoteNumber === id);
    if (target) {
      target.status = status;
      target.updatedAt = new Date().toISOString();
    }

    return NextResponse.json({ success: true, message: 'Quotation status updated' });
  } catch (error) {
    console.error('[API /api/quotations PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update quotation' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const admin = token ? await verifyAdminJwt(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized CMS access' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = sanitizeText(searchParams.get('id') || '');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Quotation ID required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      await QuotationModel.findByIdAndDelete(id);
    }

    const store = getMemoryStore();
    store.quotations = store.quotations.filter((q) => q._id !== id);

    return NextResponse.json({ success: true, message: 'Quotation removed' });
  } catch (error) {
    console.error('[API /api/quotations DELETE] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete quotation' }, { status: 500 });
  }
}

