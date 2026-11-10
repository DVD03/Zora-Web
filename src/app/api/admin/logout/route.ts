import { NextResponse } from 'next/server';
import { ADMIN_COOKIE_NAME } from '@/lib/security';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out of Zora Solutions CMS',
  });

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });

  return response;
}

