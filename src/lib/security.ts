import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { z } from 'zod';
import { env } from './env';

export const ADMIN_COOKIE_NAME = 'zora_admin_session';

/**
 * 1. NoSQL Injection Prevention:
 * Recursively strips any object keys starting with `$` or containing `.`
 * before any Mongoose query or mutation executes.
 */
export function sanitizeNoSQL<T>(input: T): T {
  if (input === null || input === undefined) {
    return input;
  }
  if (Array.isArray(input)) {
    return input.map((item) => sanitizeNoSQL(item)) as unknown as T;
  }
  if (typeof input === 'object' && !(input instanceof Date)) {
    const cleanObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input as Record<string, unknown>)) {
      if (key.startsWith('$') || key.includes('.') || key === '__proto__' || key === 'constructor') {
        continue;
      }
      cleanObj[key] = sanitizeNoSQL(value);
    }
    return cleanObj as T;
  }
  return input;
}

/**
 * 2. XSS & HTML Tag Sanitization:
 * Strips all HTML/script tags, inline event handlers, and control characters.
 */
export function sanitizeText(value: string): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/**
 * 3. Privacy-Preserving IP Hash (Edge & Node compatible via Web Crypto API)
 */
export async function hashIpAddress(ip: string): Promise<string> {
  const normalized = (ip || '127.0.0.1').trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(`${normalized}:${env.JWT_SECRET.slice(0, 16)}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

/**
 * 4. Extract Client IP from Next.js Request Headers
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return headers.get('x-real-ip') || '127.0.0.1';
}

/**
 * 5. Memory IP Rate Limiter (Sliding Window)
 * - /api/inquiries: Max 3 submissions per 15 minutes per IP
 * - /api/admin/login: Max 5 attempts per 15 minutes per IP
 */
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const globalRateLimitStore = globalThis as unknown as {
  __zoraRateLimitMap?: Map<string, RateLimitEntry>;
};

if (!globalRateLimitStore.__zoraRateLimitMap) {
  globalRateLimitStore.__zoraRateLimitMap = new Map<string, RateLimitEntry>();
}

export function checkRateLimit(
  ipHash: string,
  bucket: 'inquiries' | 'quotations' | 'admin_login' | 'api_general',
  maxRequests: number,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const map = globalRateLimitStore.__zoraRateLimitMap!;
  const now = Date.now();
  const key = `${bucket}:${ipHash}`;

  // Periodic cleanup of expired entries
  if (map.size > 2000) {
    for (const [k, v] of map.entries()) {
      if (v.resetAt <= now) map.delete(k);
    }
  }

  const existing = map.get(key);
  if (!existing || existing.resetAt <= now) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: Math.max(0, maxRequests - 1),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  map.set(key, existing);
  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - existing.count),
    retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000),
  };
}

/**
 * 6. Cloudflare Turnstile Token Verification Hook
 */
export async function verifyTurnstileToken(token?: string, ip?: string): Promise<boolean> {
  if (!env.TURNSTILE_SECRET_KEY) {
    // When TURNSTILE_SECRET_KEY is not set in local/dev environment, pass through gracefully
    return true;
  }
  if (!token) return false;

  try {
    const formData = new URLSearchParams();
    formData.append('secret', env.TURNSTILE_SECRET_KEY);
    formData.append('response', token);
    if (ip) formData.append('remoteip', ip);

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    const data = (await response.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch (error) {
    console.error('[Zora Security] Turnstile verification error:', error);
    return false;
  }
}

/**
 * 7. Edge-Compatible JWT Manager via `jose`
 */
export interface AdminJwtPayload extends JWTPayload {
  sub: string;
  email: string;
  name: string;
  role: 'Founder' | 'Admin';
}

function getJwtSecretKey(): Uint8Array {
  return new TextEncoder().encode(env.JWT_SECRET);
}

export async function signAdminJwt(payload: {
  id: string;
  email: string;
  name: string;
  role: 'Founder' | 'Admin';
}): Promise<string> {
  return new SignJWT({
    email: payload.email,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(payload.id)
    .setIssuedAt()
    .setIssuer('zora-solutions-cms')
    .setExpirationTime('8h')
    .sign(getJwtSecretKey());
}

export async function verifyAdminJwt(token: string): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey(), {
      issuer: 'zora-solutions-cms',
    });
    return payload as AdminJwtPayload;
  } catch {
    return null;
  }
}

/**
 * 8. Shared Strict Zod Schemas (Client + Server Validation)
 */
export const CORE_SERVICES_ENUM = [
  'Web Development',
  'E-commerce Platforms',
  'Custom Software Solutions',
  'Digital Marketing & Branding',
  'UI/UX Design',
] as const;

export const InquiryValidationSchema = z.object({
  clientName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .transform(sanitizeText),
  companyName: z
    .string()
    .max(120, 'Company name cannot exceed 120 characters')
    .optional()
    .default('')
    .transform(sanitizeText),
  email: z
    .string()
    .email('Please provide a valid email address')
    .max(160)
    .transform((v) => v.toLowerCase().trim()),
  phone: z
    .string()
    .min(7, 'Please provide a valid phone number')
    .max(30, 'Phone number is too long')
    .transform(sanitizeText),
  whatsappNumber: z
    .string()
    .max(30)
    .optional()
    .default('')
    .transform(sanitizeText),
  selectedServices: z
    .array(z.string().transform(sanitizeText))
    .min(1, 'Please select at least one service'),
  estimatedBudget: z
    .string()
    .max(120)
    .optional()
    .default('Custom Price Quote After Requirement Review')
    .transform(sanitizeText),
  projectBrief: z
    .string()
    .min(15, 'Please provide at least 15 characters describing your idea')
    .max(3000, 'Project brief cannot exceed 3000 characters')
    .transform(sanitizeText),
  preferredContact: z.enum(['Panduka', 'Dilum', 'Any']).default('Any'),
  honeypot: z.string().max(0, 'Bot detected').optional().default(''),
  turnstileToken: z.string().optional(),
});

export const AdminLoginValidationSchema = z.object({
  email: z.string().email('Invalid email format').transform((v) => v.toLowerCase().trim()),
  password: z.string().min(6, 'Password is required').max(128),
});

export const ProjectValidationSchema = z.object({
  title: z.string().min(3).max(140).transform(sanitizeText),
  slug: z
    .string()
    .min(3)
    .max(140)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  category: z.enum(CORE_SERVICES_ENUM),
  clientName: z.string().min(2).max(120).transform(sanitizeText),
  completionDate: z.string().min(3).max(40).transform(sanitizeText),
  summary: z.string().min(10).max(500).transform(sanitizeText),
  challenge: z.string().min(10).max(2000).transform(sanitizeText),
  solution: z.string().min(10).max(2000).transform(sanitizeText),
  impactMetrics: z
    .array(
      z.object({
        label: z.string().min(1).max(80).transform(sanitizeText),
        value: z.string().min(1).max(40).transform(sanitizeText),
      })
    )
    .default([]),
  techStack: z.array(z.string().transform(sanitizeText)).min(1),
  thumbnailUrl: z.string().min(1).max(500),
  galleryImages: z.array(z.string()).default([]),
  liveUrl: z.string().max(500).optional().default(''),
  figmaUrl: z.string().max(500).optional().default(''),
  isFeatured: z.boolean().default(true),
  displayOrder: z.number().int().default(1),
});

export const QuotationItemValidationSchema = z.object({
  name: z.string().min(2).max(180).transform(sanitizeText),
  category: z.string().min(2).max(100).transform(sanitizeText),
  billingType: z.enum(['One-Time', 'Monthly']),
  price: z.number().nonnegative().max(50000000),
});

export const QuotationValidationSchema = z.object({
  clientName: z
    .string()
    .min(2, 'Client name must be at least 2 characters')
    .max(100, 'Client name cannot exceed 100 characters')
    .transform(sanitizeText),
  companyName: z
    .string()
    .max(120, 'Company name cannot exceed 120 characters')
    .optional()
    .default('')
    .transform(sanitizeText),
  email: z
    .string()
    .email('Please provide a valid email address')
    .max(160)
    .transform((v) => v.toLowerCase().trim()),
  phone: z
    .string()
    .min(7, 'Please provide a valid phone or WhatsApp number')
    .max(30, 'Phone number is too long')
    .transform(sanitizeText),
  notes: z
    .string()
    .max(2000, 'Notes cannot exceed 2000 characters')
    .optional()
    .default('')
    .transform(sanitizeText),
  primaryService: z.string().min(2).max(120).transform(sanitizeText),
  selectedItems: z
    .array(QuotationItemValidationSchema)
    .min(1, 'Please select at least one service or item for the quotation'),
  hostingTier: z.string().min(2).max(140).transform(sanitizeText),
  oneTimeTotal: z.number().nonnegative().max(100000000),
  monthlyTotal: z.number().nonnegative().max(100000000),
  estimatedWeeks: z.number().int().min(1).max(104).default(2),
  usdRateNoteAccepted: z.boolean().refine((v) => v === true, {
    message: 'Please acknowledge the USD exchange rate notice',
  }),
  status: z.enum(['Generated', 'Sent_WhatsApp', 'Converted']).optional().default('Generated'),
});

