import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  checkRateLimit,
  getClientIp,
  hashIpAddress,
  InquiryValidationSchema,
  sanitizeNoSQL,
  sanitizeText,
  verifyAdminJwt,
  verifyTurnstileToken,
} from '@/lib/security';
import { connectToDatabase, getMemoryStore } from '@/lib/mongodb';
import { InquiryModel, type InquiryStatus } from '@/models/Inquiry';
import { sendInquiryEmailAlert } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req.headers);
    const ipHash = await hashIpAddress(clientIp);

    // 1. Rate Limiting: Max 3 submissions per 15 minutes per IP
    const rateStatus = checkRateLimit(ipHash, 'inquiries', 3, 15 * 60 * 1000);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many project inquiries from your network. Please wait ${Math.ceil(
            rateStatus.retryAfterSeconds / 60
          )} minutes or reach Panduka (+94 777 321 165) or Dilum (+94 77 749 8608) directly on WhatsApp.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateStatus.retryAfterSeconds) },
        }
      );
    }

    // 2. Parse & NoSQL Sanitize Payload
    const rawBody = await req.json();
    const sanitizedBody = sanitizeNoSQL(rawBody);

    // 3. Honeypot Trap Check
    if (sanitizedBody && typeof sanitizedBody === 'object' && 'honeypot' in sanitizedBody) {
      const hp = String((sanitizedBody as Record<string, unknown>).honeypot || '');
      if (hp.length > 0) {
        // Silently reject bot submission with fake 200
        return NextResponse.json({
          success: true,
          message: 'Inquiry received.',
        });
      }
    }

    // 4. Zod Strict Validation & XSS Sanitization
    const parsed = InquiryValidationSchema.safeParse(sanitizedBody);
    if (!parsed.success) {
      const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      return NextResponse.json(
        {
          success: false,
          error: firstError || 'Invalid inquiry submission data. Please check all required fields.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = parsed.data;

    // 5. Cloudflare Turnstile Bot Verification Hook
    const turnstilePassed = await verifyTurnstileToken(validData.turnstileToken, clientIp);
    if (!turnstilePassed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Security verification failed. Please refresh and try again.',
        },
        { status: 403 }
      );
    }

    // 6. Save to MongoDB (or resilient Memory Store fallback)
    const db = await connectToDatabase();
    let createdId = `inq-${Date.now()}`;
    const timestampIso = new Date().toISOString();

    if (db) {
      const doc = await InquiryModel.create({
        clientName: validData.clientName,
        companyName: validData.companyName,
        email: validData.email,
        phone: validData.phone,
        whatsappNumber: validData.whatsappNumber || validData.phone,
        selectedServices: validData.selectedServices,
        estimatedBudget: validData.estimatedBudget,
        projectBrief: validData.projectBrief,
        preferredContact: validData.preferredContact,
        ipHash,
        status: 'New',
        adminNotes: '',
      });
      createdId = String(doc._id);
    }

    // Always keep memory store synced for instant local dashboard demo
    const memoryStore = getMemoryStore();
    memoryStore.inquiries.unshift({
      _id: createdId,
      clientName: validData.clientName,
      companyName: validData.companyName || '',
      email: validData.email,
      phone: validData.phone,
      whatsappNumber: validData.whatsappNumber || validData.phone,
      selectedServices: validData.selectedServices,
      estimatedBudget: validData.estimatedBudget,
      projectBrief: validData.projectBrief,
      preferredContact: validData.preferredContact,
      ipHash,
      status: 'New',
      adminNotes: '',
      createdAt: timestampIso,
      updatedAt: timestampIso,
    });

    // 7. Trigger Automated HTML Email Alert to zorasolution.official@gmail.com
    const emailResult = await sendInquiryEmailAlert({
      clientName: validData.clientName,
      companyName: validData.companyName,
      email: validData.email,
      phone: validData.phone,
      whatsappNumber: validData.whatsappNumber || validData.phone,
      selectedServices: validData.selectedServices,
      estimatedBudget: validData.estimatedBudget,
      projectBrief: validData.projectBrief,
      preferredContact: validData.preferredContact,
      submittedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' }),
    });

    return NextResponse.json(
      {
        success: true,
        inquiryId: createdId,
        emailStatus: emailResult.mode,
        message: 'Your project brief has been encrypted and transmitted to Zora Solutions.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API /api/inquiries POST] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected server error occurred while processing your inquiry.',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    // Verify Admin JWT Cookie
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const admin = token ? await verifyAdminJwt(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized CMS access' }, { status: 401 });
    }

    const rawBody = await req.json();
    const cleanBody = sanitizeNoSQL(rawBody) as {
      id?: string;
      status?: InquiryStatus;
      adminNotes?: string;
    };

    const id = sanitizeText(String(cleanBody.id || ''));
    const allowedStatuses: InquiryStatus[] = ['New', 'Contacted', 'In-Discussion', 'Won', 'Archived'];
    const status = allowedStatuses.includes(cleanBody.status as InquiryStatus)
      ? (cleanBody.status as InquiryStatus)
      : undefined;
    const adminNotes =
      cleanBody.adminNotes !== undefined ? sanitizeText(String(cleanBody.adminNotes)) : undefined;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Inquiry ID is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      const updateFields: Record<string, unknown> = {};
      if (status) updateFields.status = status;
      if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;
      await InquiryModel.findByIdAndUpdate(id, { $set: updateFields });
    }

    const store = getMemoryStore();
    const target = store.inquiries.find((item) => item._id === id);
    if (target) {
      if (status) target.status = status;
      if (adminNotes !== undefined) target.adminNotes = adminNotes;
      target.updatedAt = new Date().toISOString();
    }

    return NextResponse.json({ success: true, message: 'Lead updated successfully' });
  } catch (error) {
    console.error('[API /api/inquiries PATCH] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update inquiry' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Inquiry ID required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      await InquiryModel.findByIdAndDelete(id);
    }

    const store = getMemoryStore();
    store.inquiries = store.inquiries.filter((i) => i._id !== id);

    return NextResponse.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    console.error('[API /api/inquiries DELETE] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete inquiry' }, { status: 500 });
  }
}

