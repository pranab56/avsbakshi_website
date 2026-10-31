import { NextRequest, NextResponse } from 'next/server';

const decodeJwt = (token: string) => {
  try {
    let raw = token.startsWith('Bearer ') ? token.slice(7) : token;
    raw = decodeURIComponent(raw).replace(/^"+|"+$/g, '').trim();
    if (raw.startsWith('Bearer ')) raw = raw.slice(7).trim();
    const parts = raw.split('.');
    if (parts.length < 2) return null;
    let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonStr =
      typeof atob === 'function'
        ? atob(base64)
        : typeof Buffer !== 'undefined'
        ? Buffer.from(base64, 'base64').toString('utf-8')
        : null;
    if (!jsonStr) return null;
    return JSON.parse(jsonStr) as { role?: string; exp?: number; [key: string]: unknown };
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
  const norm = role === 'user' ? 'customer' : role;
  return ROLE_DASHBOARDS[norm] || '/customer/overview';
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Identify prefetch requests (never perform destructive actions like logout on prefetch!)
  const isPrefetch =
    request.headers.get('purpose') === 'prefetch' ||
    request.headers.get('x-purpose') === 'prefetch' ||
    request.headers.get('next-router-prefetch') === '1' ||
    request.headers.get('sec-purpose') === 'prefetch';

  const tokenCookie =
    request.cookies.get('salon-token')?.value ||
    request.cookies.get('realState-token')?.value;
  let roleCookie =
    request.cookies.get('salon-role')?.value ||
    request.cookies.get('realState-role')?.value;

  // Verify token validity
  let isValidSession = false;
  if (tokenCookie && typeof tokenCookie === 'string' && tokenCookie.trim().length > 0) {
    const payload = decodeJwt(tokenCookie);
    // 60-second grace window to absorb slight clock skews
    if (payload?.exp && payload.exp * 1000 + 60000 <= Date.now()) {
      isValidSession = false;
    } else {
      isValidSession = true;
      if (!roleCookie && payload?.role) {
        roleCookie = String(payload.role).toLowerCase().trim();
      }
    }
  }

  let rawRole = roleCookie ? roleCookie.toLowerCase().trim() : '';
  if (rawRole === 'user') {
    rawRole = 'customer';
  }

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isCustomerRoute = pathname.startsWith('/customer');
  const isProfessionalRoute = pathname.startsWith('/professional');
  const isBusinessRoute = pathname.startsWith('/business');
  const isProtectedRoute = isCustomerRoute || isProfessionalRoute || isBusinessRoute;

  // 1. If user is accessing auth routes (login / register)
  if (isAuthRoute) {
    const isLogout = request.nextUrl.searchParams.get('logout') === 'true';

    // Only clear cookies if it's an explicit navigation to logout, NEVER on prefetch
    if (isLogout && !isPrefetch) {
      const response = NextResponse.next();
      const cookieNames = [
        'salon-token',
        'salon-role',
        'salon-refresh-token',
        'salon-user',
        'realState-token',
        'realState-role',
        'realState-refresh-token',
      ];
      cookieNames.forEach((name) => {
        response.cookies.delete(name);
        response.cookies.set(name, '', { maxAge: 0, path: '/' });
      });
      return response;
    }

    // If session is already valid and user is not explicitly logging out, redirect to target or dashboard
    if (isValidSession && !isLogout) {
      const redirectParam =
        request.nextUrl.searchParams.get('redirect') ||
        request.nextUrl.searchParams.get('callbackUrl');

      if (
        redirectParam &&
        redirectParam.startsWith('/') &&
        !redirectParam.startsWith('/login') &&
        !redirectParam.startsWith('/register')
      ) {
        return NextResponse.redirect(new URL(redirectParam, request.url));
      }

      const targetDashboard = getDashboardByRole(rawRole || 'customer');
      return NextResponse.redirect(new URL(targetDashboard, request.url));
    }
  }

  // 2. If user is NOT logged in and tries to access any protected route -> Redirect to /login
  if (isProtectedRoute && !isValidSession) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Role-based access control (RBAC) enforcement for authenticated users
  if (isValidSession && isProtectedRoute) {
    if (isCustomerRoute && (rawRole === 'professional' || rawRole === 'business')) {
      const userDashboard = getDashboardByRole(rawRole);
      return NextResponse.redirect(new URL(userDashboard, request.url));
    }

    if (isProfessionalRoute && rawRole === 'customer') {
      return NextResponse.redirect(new URL('/customer/overview', request.url));
    }

    if (isBusinessRoute && rawRole === 'customer') {
      return NextResponse.redirect(new URL('/customer/overview', request.url));
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
