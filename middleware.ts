import { NextRequest, NextResponse } from 'next/server';

const decodeJwt = (token: string) => {
  try {
    const payload = token.split('.')[1];
    const decoded = Buffer.from(payload, 'base64').toString('utf-8');
    return JSON.parse(decoded) as { role?: string; exp?: number };
  } catch {
    return null;
  }
};

const CUSTOMER_ROUTES = ['/partner-dashboard'];
const HOST_ROUTES = ['/hotels-partner-dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isCustomerRoute = CUSTOMER_ROUTES.some(r => pathname.startsWith(r));
  const isHostRoute = HOST_ROUTES.some(r => pathname.startsWith(r));

  if (!isCustomerRoute && !isHostRoute) return NextResponse.next();

  const token = request.cookies.get('realState-token')?.value;

  // Not logged in → redirect to login
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const payload = decodeJwt(token);

  // Invalid or expired token → redirect to login
  if (!payload || (payload.exp && payload.exp * 1000 < Date.now())) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const role = payload.role;

  // customer only — block host from /partner-dashboard
  if (isCustomerRoute && role !== 'customer') {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  // host only — block customer from /hotels-partner-dashboard
  if (isHostRoute && role !== 'host') {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/partner-dashboard/:path*',
    '/hotels-partner-dashboard/:path*',
  ],
};
