import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  CORE_SERVICES_ENUM,
  ProjectValidationSchema,
  sanitizeNoSQL,
  sanitizeText,
  verifyAdminJwt,
} from '@/lib/security';
import { connectToDatabase, getMemoryStore } from '@/lib/mongodb';
import { ProjectModel } from '@/models/Project';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawCategory = searchParams.get('category');
    const category = rawCategory ? sanitizeText(rawCategory) : null;

    const db = await connectToDatabase();
    if (db) {
      const filter: Record<string, unknown> = {};
      if (
        category &&
        category !== 'All' &&
        (CORE_SERVICES_ENUM as readonly string[]).includes(category)
      ) {
        filter.category = category;
      }
      const projects = await ProjectModel.find(filter).sort({ displayOrder: 1, createdAt: -1 }).lean();
      return NextResponse.json(
        {
          success: true,
          source: 'mongodb',
          projects,
        },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          },
        }
      );
    }

    const store = getMemoryStore();
    const filtered =
      category && category !== 'All'
        ? store.projects.filter((p) => p.category === category)
        : store.projects;

    return NextResponse.json(
      {
        success: true,
        source: 'seeded-store',
        projects: [...filtered].sort((a, b) => a.displayOrder - b.displayOrder),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error) {
    console.error('[API /api/projects GET] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to load portfolio projects' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const admin = token ? await verifyAdminJwt(token) : null;
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized CMS access' }, { status: 401 });
    }

    const rawBody = await req.json();
    const sanitized = sanitizeNoSQL(rawBody);
    const parsed = ProjectValidationSchema.safeParse(sanitized);

    if (!parsed.success) {
      const firstErr = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      return NextResponse.json(
        { success: false, error: firstErr || 'Invalid project data', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const db = await connectToDatabase();
    let createdId = `proj-${Date.now()}`;

    if (db) {
      const doc = await ProjectModel.create(payload);
      createdId = String(doc._id);
    }

    const store = getMemoryStore();
    const newItem = {
      _id: createdId,
      ...payload,
      architectureNodes: ['Client Edge Layer', 'Zora API Core', 'Business Logic Engine', 'Cloud Database'],
    };
    store.projects.unshift(newItem);

    return NextResponse.json({ success: true, project: newItem }, { status: 201 });
  } catch (error) {
    console.error('[API /api/projects POST] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create project' }, { status: 500 });
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
      return NextResponse.json({ success: false, error: 'Project ID required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      await ProjectModel.findByIdAndDelete(id);
    }

    const store = getMemoryStore();
    store.projects = store.projects.filter((p) => p._id !== id && p.slug !== id);

    return NextResponse.json({ success: true, message: 'Project removed' });
  } catch (error) {
    console.error('[API /api/projects DELETE] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete project' }, { status: 500 });
  }
}
