import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from './env';
import { INITIAL_PROJECTS, INITIAL_SERVICES, type SeedProjectItem, type SeedServiceItem } from './seedData';
import { ProjectModel } from '@/models/Project';
import { ServiceModel } from '@/models/Service';
import { InquiryModel, type InquiryStatus, type PreferredContactFounder } from '@/models/Inquiry';
import { AdminUserModel } from '@/models/AdminUser';
import type { QuotationLineItem, QuotationStatus } from '@/models/Quotation';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose | null> | null;
  seeded: boolean;
}

export interface MemoryInquiryRecord {
  _id: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  selectedServices: string[];
  estimatedBudget: string;
  projectBrief: string;
  preferredContact: PreferredContactFounder;
  ipHash: string;
  status: InquiryStatus;
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemoryAdminRecord {
  _id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'Founder' | 'Admin';
  failedLoginAttempts: number;
  lockUntil: Date | null;
  lastLogin: Date | null;
}

export interface MemoryQuotationRecord {
  _id: string;
  quoteNumber: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  notes: string;
  primaryService: string;
  selectedItems: QuotationLineItem[];
  hostingTier: string;
  oneTimeTotal: number;
  monthlyTotal: number;
  estimatedWeeks: number;
  usdRateNoteAccepted: boolean;
  status: QuotationStatus;
  ipHash: string;
  createdAt: string;
  updatedAt: string;
}

interface GlobalStore {
  __zoraMongooseCache?: MongooseCache;
  __zoraMemoryStore?: {
    projects: SeedProjectItem[];
    services: SeedServiceItem[];
    inquiries: MemoryInquiryRecord[];
    quotations: MemoryQuotationRecord[];
    adminUser: MemoryAdminRecord | null;
  };
}

const g = globalThis as unknown as GlobalStore;

if (!g.__zoraMongooseCache) {
  g.__zoraMongooseCache = { conn: null, promise: null, seeded: false };
}

if (!g.__zoraMemoryStore) {
  g.__zoraMemoryStore = {
    projects: [...INITIAL_PROJECTS],
    services: [...INITIAL_SERVICES],
    inquiries: [
      {
        _id: 'inq-demo-1',
        clientName: 'Kavindu Perera',
        companyName: 'Ceylon FinTech Holdings',
        email: 'kavindu@ceylonfintech.lk',
        phone: '+94 77 123 4567',
        whatsappNumber: '+94 77 123 4567',
        selectedServices: ['Custom Software Solutions', 'UI/UX Design'],
        estimatedBudget: 'Custom Quote (WhatsApp Consultation)',
        projectBrief:
          'We need a real-time executive portfolio dashboard and client onboarding portal with automated KYC document verification and role-based permissions.',
        preferredContact: 'Panduka',
        ipHash: 'a91f4c82b01e',
        status: 'In-Discussion',
        adminNotes: 'Initial discovery call completed. Architecture proposal scheduled for Friday.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      },
      {
        _id: 'inq-demo-2',
        clientName: 'Amaya Wijesinghe',
        companyName: 'Serendib Botanicals',
        email: 'amaya@serendibbotanicals.com',
        phone: '+94 71 987 6543',
        whatsappNumber: '+94 71 987 6543',
        selectedServices: ['E-commerce Platforms', 'Digital Marketing & Branding'],
        estimatedBudget: 'Custom Quote (Direct Phone Call)',
        projectBrief:
          'Looking to launch our luxury export skincare storefront with multi-currency checkout (USD/LKR/EUR) and high-converting social ad funnels.',
        preferredContact: 'Panduka',
        ipHash: 'f82c1d90e34a',
        status: 'New',
        adminNotes: '',
        createdAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
      },
    ],
    quotations: [],
    adminUser: null,
  };
} else {
  if (!g.__zoraMemoryStore.quotations) {
    g.__zoraMemoryStore.quotations = [];
  }
  // Keep in-memory seeded projects in sync during development HMR
  g.__zoraMemoryStore.projects = g.__zoraMemoryStore.projects.map((p) => {
    const fresh = INITIAL_PROJECTS.find((ip) => ip._id === p._id || ip.slug === p.slug);
    return fresh ? { ...fresh } : p;
  });
}

/**
 * Cached Mongoose Singleton Connection for Next.js Serverless Environment
 */
export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const cache = g.__zoraMongooseCache!;

  if (cache.conn && mongoose.connection.readyState === 1) {
    return cache.conn;
  }

  const uri = env.MONGODB_URI?.trim();
  if (!uri || uri.includes('<username>') || uri.includes('<password>')) {
    return null;
  }

  if (!cache.promise) {
    cache.promise = mongoose
      .connect(uri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 4500,
        socketTimeoutMS: 30000,
        bufferCommands: false,
      })
      .then(async (mongooseInstance) => {
        if (!cache.seeded) {
          await seedDatabaseIfNeeded();
          cache.seeded = true;
        }
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn('[Zora DB] MongoDB Atlas connection unavailable, using resilient seeded store:', err.message);
        cache.promise = null;
        return null;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

async function seedDatabaseIfNeeded() {
  try {
    const projectCount = await ProjectModel.countDocuments();
    if (projectCount === 0) {
      await ProjectModel.insertMany(
        INITIAL_PROJECTS.map(({ _id, ...rest }) => rest)
      );
    }

    const serviceCount = await ServiceModel.countDocuments();
    if (serviceCount === 0) {
      await ServiceModel.insertMany(
        INITIAL_SERVICES.map(({ _id, ...rest }) => rest)
      );
    }

    const adminCount = await AdminUserModel.countDocuments();
    if (adminCount === 0) {
      const passwordHash = await bcrypt.hash(env.ADMIN_INITIAL_PASSWORD, 12);
      await AdminUserModel.create({
        email: env.ADMIN_INITIAL_EMAIL.toLowerCase(),
        passwordHash,
        name: 'Panduka (Founder)',
        role: 'Founder',
        failedLoginAttempts: 0,
        lockUntil: null,
      });
    }
  } catch (err) {
    console.warn('[Zora DB] Seed check warning:', err);
  }
}

export async function getMemoryAdminUser(): Promise<MemoryAdminRecord> {
  const store = g.__zoraMemoryStore!;
  if (!store.adminUser) {
    // Use 8 rounds in pure-JS bcryptjs so initialization is < 40ms instead of blocking for 3+ seconds
    const passwordHash = bcrypt.hashSync(env.ADMIN_INITIAL_PASSWORD, 8);
    store.adminUser = {
      _id: 'admin-founder-1',
      email: env.ADMIN_INITIAL_EMAIL.toLowerCase(),
      passwordHash,
      name: 'Panduka (Founder)',
      role: 'Founder',
      failedLoginAttempts: 0,
      lockUntil: null,
      lastLogin: null,
    };
  }
  return store.adminUser;
}

export function getMemoryStore() {
  return g.__zoraMemoryStore!;
}

