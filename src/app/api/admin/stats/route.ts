import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminJwt } from '@/lib/security';
import { connectToDatabase, getMemoryStore } from '@/lib/mongodb';
import { InquiryModel } from '@/models/Inquiry';
import { ProjectModel } from '@/models/Project';
import { ServiceModel } from '@/models/Service';
import { QuotationModel } from '@/models/Quotation';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const admin = token ? await verifyAdminJwt(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized CMS access' }, { status: 401 });
    }

    const db = await connectToDatabase();
    if (db) {
      const [inquiries, projects, services, quotations] = await Promise.all([
        InquiryModel.find({}).sort({ createdAt: -1 }).limit(100).lean(),
        ProjectModel.find({}).sort({ displayOrder: 1, createdAt: -1 }).lean(),
        ServiceModel.find({}).sort({ displayOrder: 1 }).lean(),
        QuotationModel.find({}).sort({ createdAt: -1 }).limit(100).lean(),
      ]);

      return NextResponse.json({
        success: true,
        mode: 'MongoDB Atlas Connected',
        admin: {
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
        stats: {
          totalInquiries: inquiries.length,
          newInquiries: inquiries.filter((i) => i.status === 'New').length,
          wonDeals: inquiries.filter((i) => i.status === 'Won').length,
          totalProjects: projects.length,
          totalServices: services.length,
          totalQuotations: quotations.length,
        },
        inquiries,
        projects,
        services,
        quotations,
      });
    }

    const store = getMemoryStore();
    return NextResponse.json({
      success: true,
      mode: 'Resilient Seeded Store (Ready for MongoDB Atlas URI)',
      admin: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      stats: {
        totalInquiries: store.inquiries.length,
        newInquiries: store.inquiries.filter((i) => i.status === 'New').length,
        wonDeals: store.inquiries.filter((i) => i.status === 'Won').length,
        totalProjects: store.projects.length,
        totalServices: store.services.length,
        totalQuotations: store.quotations.length,
      },
      inquiries: store.inquiries,
      projects: store.projects,
      services: store.services,
      quotations: store.quotations,
    });
  } catch (error) {
    console.error('[API /api/admin/stats GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to load CMS stats' }, { status: 500 });
  }
}
