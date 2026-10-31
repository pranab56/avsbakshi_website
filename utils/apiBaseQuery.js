import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from '../features/auth/authSlice';
import { baseURL } from './BaseURL';
import { getToken } from './storage';

// When running in the browser, send API requests through the local Next.js proxy (/api/v1)
// so that cookies and headers are seamlessly forwarded.
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "/api/v1";
  }
  return `${baseURL}/api/v1`;
};

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token && !headers.get("Authorization")) {
      const cleanToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      headers.set("Authorization", cleanToken);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const errData = result.error.data;
    let msg = '';
    try {
      if (errData) {
        if (typeof errData === 'string') msg = errData;
        else if (typeof errData === 'object') msg = JSON.stringify(errData);
      }
    } catch {
      msg = '';
    }

    const lower = String(msg).toLowerCase();
    const authKeywords = [
      'token',
      'jwt',
      'unauthoriz',
      'not authenticated',
      'invalid token',
      'session expired',
      'token expired',
    ];
    const looksLikeAuthError = authKeywords.some((k) => lower.includes(k));

    if (looksLikeAuthError) {
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
        const isProtectedRoute =
          pathname.startsWith('/customer') ||
          pathname.startsWith('/professional') ||
          pathname.startsWith('/business');

        // Only redirect to login if user is actively inside a protected route
        if (isProtectedRoute && !isAuthRoute) {
          api.dispatch(logout());
          try {
            const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}&callbackUrl=${encodeURIComponent(pathname)}`;
            window.location.replace(redirectUrl);
          } catch {
            // Ignore navigation failure
          }
        }
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "faq",
    "disclaimer",
    "profile",
    "chair",
    "chairRental",
    "services",
    "category",
    "appointments",
    "chats",
    "messages",
    "salon",
    "professional",
    "wishlist",
    "overview",
    "review",
    "notification",
  ],
});
