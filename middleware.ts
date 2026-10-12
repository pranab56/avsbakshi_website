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

// Map each role to its default home dashboard path
const ROLE_DASHBOARDS: Record<string, string> = {
  customer: '/customer/overview',
  professional: '/professional/dashboard',
  business: '/professional/dashboard',
};

const getDashboardByRole = (role?: string) => {
  if (!role) return '/customer/overview';
  return ROLE_DASHBOARDS[role] || '/customer/overview';
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const tokenCookie = request.cookies.get('salon-token')?.value;
  let roleCookie = request.cookies.get('salon-role')?.value;

  // Verify token validity
  let isValidSession = false;
  if (tokenCookie) {
    const payload = decodeJwt(tokenCookie);
    if (payload && (!payload.exp || payload.exp * 1000 > Date.now())) {
      isValidSession = true;
      if (!roleCookie && payload.role) {
        roleCookie = payload.role;
      }
    }
  }

  const userRole = roleCookie || 'customer';
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isCustomerRoute = pathname.startsWith('/customer');
  const isProfessionalRoute = pathname.startsWith('/professional');
  const isBusinessRoute = pathname.startsWith('/business');
  const isProtectedRoute = isCustomerRoute || isProfessionalRoute || isBusinessRoute;

  // 1. If user is accessing auth routes (login / register)
  if (isAuthRoute) {
    if (request.nextUrl.searchParams.get('logout') === 'true') {
      const response = NextResponse.next();
      response.cookies.delete('salon-token');
      response.cookies.delete('salon-role');
      response.cookies.delete('salon-refresh-token');
      response.cookies.set('salon-token', '', { maxAge: 0, path: '/' });
      response.cookies.set('salon-role', '', { maxAge: 0, path: '/' });
      response.cookies.set('salon-refresh-token', '', { maxAge: 0, path: '/' });
      return response;
    }

    if (isValidSession) {
      const targetDashboard = getDashboardByRole(userRole);
      return NextResponse.redirect(new URL(targetDashboard, request.url));
    }
  }

  // 2. If user is NOT logged in and tries to access any protected route -> Redirect to /login
  if (isProtectedRoute && !isValidSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Role-based access control (RBAC) enforcement for authenticated users
  if (isValidSession && isProtectedRoute) {
    // Customer route attempt
    if (isCustomerRoute && userRole !== 'customer') {
      const userDashboard = getDashboardByRole(userRole);
      return NextResponse.redirect(new URL(userDashboard, request.url));
    }

    // Professional route attempt
    if (isProfessionalRoute && userRole !== 'professional' && userRole !== 'business') {
      const userDashboard = getDashboardByRole(userRole);
      return NextResponse.redirect(new URL(userDashboard, request.url));
    }

    // Business route attempt
    if (isBusinessRoute && userRole !== 'business' && userRole !== 'professional') {
      const userDashboard = getDashboardByRole(userRole);
      return NextResponse.redirect(new URL(userDashboard, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/customer/:path*',
    '/professional/:path*',
    '/business/:path*',
    '/login',
    '/register',
  ],
};

