"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hydrate } from "@/features/auth/authSlice";
import { saveToken, saveUser, getToken, getUser, getRefreshToken } from "@/utils/storage";

export function AuthInitializer() {
  const dispatch = useDispatch();
  const token = useSelector(
    (state: { auth?: { token?: string | null } }) => state.auth?.token
  );
  const user = useSelector(
    (state: { auth?: { user?: any } }) => state.auth?.user
  );
  const isInitialized = useRef(false);

  useEffect(() => {
    // 1. Immediately hydrate from storage if Redux is missing token or user
    const savedToken = getToken();
    const savedUser = getUser();
    const savedRefreshToken = getRefreshToken();

    if ((savedToken || savedUser) && (!token || !user)) {
      dispatch(
        hydrate({
          token: savedToken || token || null,
          refreshToken: savedRefreshToken || null,
          user: savedUser || user || null,
        })
      );
    }

    if (isInitialized.current) return;
    isInitialized.current = true;

    // 2. Background session sync with server cookies
    async function syncSession() {
      try {
        const response = await fetch("/api/auth/session", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          credentials: "include",
        });

        if (response.ok) {
          const session = await response.json();
          if (session?.isAuthenticated && session?.token) {
            saveToken(session.token);
            if (session.user) {
              saveUser(session.user);
            }
            dispatch(
              hydrate({
                token: session.token,
                refreshToken: savedRefreshToken || null,
                user: session.user || savedUser || null,
              })
            );
          }
        }
      } catch {
        // Network or offline error: keep local session active
      }
    }

    syncSession();
  }, [dispatch, token, user]);

  // Keep storage in sync when token changes in Redux
  useEffect(() => {
    if (token) {
      saveToken(token);
    }
  }, [token]);

  return null;
}
