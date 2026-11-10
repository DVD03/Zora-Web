import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase, getMemoryStore } from '@/lib/mongodb';
import { ServiceModel } from '@/models/Service';
import { ADMIN_COOKIE_NAME, sanitizeNoSQL, sanitizeText, verifyAdminJwt } from '@/lib/security';

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const services = await ServiceModel.find({}).sort({ displayOrder: 1 }).lean();
      return NextResponse.json(
        {
          success: true,
          source: 'mongodb',
          services,
        },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          },
        }
      );
    }

    const store = getMemoryStore();
    return NextResponse.json(
      {
        success: true,
        source: 'seeded-store',
        services: [...store.services].sort((a, b) => a.displayOrder - b.displayOrder),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('[API /api/services GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to load services' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const admin = token ? await verifyAdminJwt(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized CMS access' }, { status: 401 });
    }

    const rawBody = await req.json();
    const clean = sanitizeNoSQL(rawBody) as {
      id?: string;
      tagline?: string;
      description?: string;
      startingTimeline?: string;
      packagePrice?: string;
      deliverables?: string[];
    };

    const id = sanitizeText(String(clean.id || ''));
    if (!id) {
      return NextResponse.json({ success: false, error: 'Service ID required' }, { status: 400 });
    }

    const tagline = clean.tagline ? sanitizeText(clean.tagline) : undefined;
    const description = clean.description ? sanitizeText(clean.description) : undefined;
    const startingTimeline = clean.startingTimeline ? sanitizeText(clean.startingTimeline) : undefined;
    const packagePrice =
      clean.packagePrice !== undefined ? sanitizeText(clean.packagePrice) : undefined;
    const deliverables = Array.isArray(clean.deliverables)
      ? clean.deliverables.map((d) => sanitizeText(String(d))).filter(Boolean)
      : undefined;

    const db = await connectToDatabase();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      const updateObj: Record<string, unknown> = {};
      if (tagline !== undefined) updateObj.tagline = tagline;
      if (description !== undefined) updateObj.description = description;
      if (startingTimeline !== undefined) updateObj.startingTimeline = startingTimeline;
      if (packagePrice !== undefined) updateObj.packagePrice = packagePrice;
      if (deliverables !== undefined) updateObj.deliverables = deliverables;
      await ServiceModel.findByIdAndUpdate(id, { $set: updateObj });
    }

    const store = getMemoryStore();
    const target = store.services.find((s) => s._id === id || s.slug === id);
    if (target) {
      if (tagline !== undefined) target.tagline = tagline;
      if (description !== undefined) target.description = description;
      if (startingTimeline !== undefined) target.startingTimeline = startingTimeline;
      if (packagePrice !== undefined) target.packagePrice = packagePrice;
      if (deliverables !== undefined) target.deliverables = deliverables;
    }

    return NextResponse.json({ success: true, message: 'Service updated' });
  } catch (error) {
    console.error('[API /api/services PUT] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update service' }, { status: 500 });
  }
}
