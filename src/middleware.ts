import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME, verifyAdminJwt } from '@/lib/security';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes (except /admin/login) and /api/admin/stats
  const isProtectedAdminPage = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  const isProtectedAdminApi =
    pathname.startsWith('/api/admin') &&
    !pathname.startsWith('/api/admin/login') &&
    !pathname.startsWith('/api/admin/logout');

  if (isProtectedAdminPage || isProtectedAdminApi) {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const verified = token ? await verifyAdminJwt(token) : null;

    if (!verified) {
      if (isProtectedAdminApi) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: Valid HttpOnly JWT session required.' },
          { status: 401 }
        );
      }
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated admin away from /admin/login directly to /admin
  if (pathname === '/admin/login') {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const verified = token ? await verifyAdminJwt(token) : null;
    if (verified) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

