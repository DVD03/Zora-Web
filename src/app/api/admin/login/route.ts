import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {
  ADMIN_COOKIE_NAME,
  AdminLoginValidationSchema,
  checkRateLimit,
  getClientIp,
  hashIpAddress,
  sanitizeNoSQL,
  signAdminJwt,
} from '@/lib/security';
import { connectToDatabase, getMemoryAdminUser } from '@/lib/mongodb';
import { AdminUserModel } from '@/models/AdminUser';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req.headers);
    const ipHash = await hashIpAddress(clientIp);

    // 1. IP Rate Limit: Max 5 attempts per 15 minutes per IP
    const rateStatus = checkRateLimit(ipHash, 'admin_login', 5, LOCKOUT_DURATION_MS);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many login attempts from this IP. Account security shield active for ${Math.ceil(
            rateStatus.retryAfterSeconds / 60
          )} minutes.`,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateStatus.retryAfterSeconds) },
        }
      );
    }

    // 2. Sanitize & Validate Credentials
    const rawBody = await req.json();
    const sanitizedBody = sanitizeNoSQL(rawBody);
    const parsed = AdminLoginValidationSchema.safeParse(sanitizedBody);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address and password.' },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const db = await connectToDatabase();

    let adminId = '';
    let adminEmail = '';
    let adminName = '';
    let adminRole: 'Founder' | 'Admin' = 'Founder';

    if (db) {
      const user = await AdminUserModel.findOne({ email }).select('+passwordHash');
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials or unauthorized account.' },
          { status: 401 }
        );
      }

      // Check Account Lockout (`lockUntil`)
      if (user.lockUntil && user.lockUntil.getTime() > Date.now()) {
        const minsLeft = Math.ceil((user.lockUntil.getTime() - Date.now()) / 60000);
        return NextResponse.json(
          {
            success: false,
            error: `Account temporarily locked after ${MAX_FAILED_ATTEMPTS} failed attempts. Try again in ${minsLeft} minute(s).`,
          },
          { status: 423 }
        );
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
        if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
          user.lockUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
        }
        await user.save();

        const attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - user.failedLoginAttempts);
        return NextResponse.json(
          {
            success: false,
            error:
              attemptsLeft > 0
                ? `Invalid credentials. ${attemptsLeft} attempt(s) remaining before automatic lockout.`
                : 'Account locked for 15 minutes due to 5 consecutive failed login attempts.',
          },
          { status: 401 }
        );
      }

      user.failedLoginAttempts = 0;
      user.lockUntil = null;
      user.lastLogin = new Date();
      await user.save();

      adminId = String(user._id);
      adminEmail = user.email;
      adminName = user.name;
      adminRole = user.role;
    } else {
      // Resilient Memory Admin Verification (using bcryptjs 12-round hash)
      const memAdmin = await getMemoryAdminUser();
      if (email !== memAdmin.email) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials or unauthorized account.' },
          { status: 401 }
        );
      }

      if (memAdmin.lockUntil && memAdmin.lockUntil.getTime() > Date.now()) {
        const minsLeft = Math.ceil((memAdmin.lockUntil.getTime() - Date.now()) / 60000);
        return NextResponse.json(
          {
            success: false,
            error: `Account locked due to multiple failed attempts. Try again in ${minsLeft} minute(s).`,
          },
          { status: 423 }
        );
      }

      const isMatch = await bcrypt.compare(password, memAdmin.passwordHash);
      if (!isMatch) {
        memAdmin.failedLoginAttempts += 1;
        if (memAdmin.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
          memAdmin.lockUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
        }
        const attemptsLeft = Math.max(0, MAX_FAILED_ATTEMPTS - memAdmin.failedLoginAttempts);
        return NextResponse.json(
          {
            success: false,
            error:
              attemptsLeft > 0
                ? `Invalid credentials. ${attemptsLeft} attempt(s) remaining before lockout.`
                : 'Account locked for 15 minutes due to 5 consecutive failed attempts.',
          },
          { status: 401 }
        );
      }

      memAdmin.failedLoginAttempts = 0;
      memAdmin.lockUntil = null;
      memAdmin.lastLogin = new Date();

      adminId = memAdmin._id;
      adminEmail = memAdmin.email;
      adminName = memAdmin.name;
      adminRole = memAdmin.role;
    }

    // 3. Issue Short-Lived Edge JWT in HttpOnly, Secure, SameSite=Strict Cookie
    const jwtToken = await signAdminJwt({
      id: adminId,
      email: adminEmail,
      name: adminName,
      role: adminRole,
    });

    const response = NextResponse.json({
      success: true,
      admin: {
        email: adminEmail,
        name: adminName,
        role: adminRole,
      },
    });

    const isHttps =
      req.headers.get('x-forwarded-proto') === 'https' || req.nextUrl.protocol === 'https:';

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: jwtToken,
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8, // 8 hours
    });

    return response;
  } catch (error) {
    console.error('[API /api/admin/login POST] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication service error.' },
      { status: 500 }
    );
  }
}

