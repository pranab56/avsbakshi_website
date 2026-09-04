'use client';

import { logout } from '@/features/auth/authSlice';
import { RootState } from '@/types';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export function isTokenExpired(token?: string | null): boolean {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload?.exp) return false;
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

const DEFAULT_MESSAGE = 'Login required. Please log in to continue.';

export function useAuthGuard() {
  const token = useSelector((state: RootState) => state.auth?.token);
  const dispatch = useDispatch();
  const router = useRouter();
  const tokenExpired = isTokenExpired(token);

  const requireAuth = (message: string = DEFAULT_MESSAGE) => {
    if (!token || tokenExpired) {
      if (token && tokenExpired) dispatch(logout());
      toast.error(message);
      router.push('/login');
      return false;
    }
    return true;
  };

  return { token, tokenExpired, requireAuth };
}
