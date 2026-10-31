// Storage utility for seamless authentication persistence across client and server
let inMemoryToken = null;
let inMemoryRefreshToken = null;

const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]).replace(/^"+|"+$/g, "").trim() : null;
};

const setCookie = (name, value, days = 7) => {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

const deleteCookie = (name) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; SameSite=Lax`;
};

export const setMemoryToken = (token) => {
  inMemoryToken = token;
};

export const getMemoryToken = () => inMemoryToken;

export const setMemoryRefreshToken = (token) => {
  inMemoryRefreshToken = token;
};

export const getMemoryRefreshToken = () => inMemoryRefreshToken;

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const raw = token.startsWith("Bearer ") ? token.slice(7) : token;
    const parts = raw.split(".");
    if (parts.length < 2) return true;
    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    const decoded = JSON.parse(atob(base64));
    if (decoded?.exp) {
      // 60-second grace window to absorb clock skew
      return decoded.exp * 1000 + 60000 < Date.now();
    }
    return false;
  } catch {
    return false;
  }
};

export const saveToken = (token) => {
  if (!token) return;
  inMemoryToken = token;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("salon-token", token);
      localStorage.setItem("realState-token", token);
    } catch {}
    setCookie("salon-token", token, 7);
    setCookie("realState-token", token, 7);
  }
};

export const saveRefreshToken = (token) => {
  if (!token) return;
  inMemoryRefreshToken = token;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("salon-refresh-token", token);
      localStorage.setItem("realState-refresh-token", token);
    } catch {}
    setCookie("salon-refresh-token", token, 30);
    setCookie("realState-refresh-token", token, 30);
  }
};

export const saveUser = (user) => {
  if (!user) return;
  if (typeof window !== "undefined") {
    try {
      const userStr = JSON.stringify(user);
      localStorage.setItem("salon-user", userStr);
      localStorage.setItem("realState-user", userStr);
    } catch {}

    const role = (user.role || (typeof user === "object" && user.user?.role) || "").toLowerCase().trim();
    if (role) {
      try {
        localStorage.setItem("salon-role", role);
        localStorage.setItem("realState-role", role);
      } catch {}
      setCookie("salon-role", role, 7);
      setCookie("realState-role", role, 7);
    }
  }
};

export const getToken = () => {
  if (inMemoryToken) {
    return inMemoryToken;
  }

  if (typeof window !== "undefined") {
    const stored =
      localStorage.getItem("salon-token") ||
      localStorage.getItem("realState-token") ||
      getCookie("salon-token") ||
      getCookie("realState-token");

    if (stored) {
      inMemoryToken = stored;
      return stored;
    }
  }

  return null;
};

export const getRefreshToken = () => {
  if (inMemoryRefreshToken) {
    return inMemoryRefreshToken;
  }

  if (typeof window !== "undefined") {
    const stored =
      localStorage.getItem("salon-refresh-token") ||
      localStorage.getItem("realState-refresh-token") ||
      getCookie("salon-refresh-token") ||
      getCookie("realState-refresh-token");

    if (stored) {
      inMemoryRefreshToken = stored;
      return stored;
    }
  }

  return null;
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("salon-user") || localStorage.getItem("realState-user");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
};

export const getRole = () => {
  if (typeof window !== "undefined") {
    const role =
      localStorage.getItem("salon-role") ||
      localStorage.getItem("realState-role") ||
      getCookie("salon-role") ||
      getCookie("realState-role") ||
      getUser()?.role;
    if (role) return String(role).toLowerCase().trim();
  }
  return null;
};

export const removeStorage = () => {
  inMemoryToken = null;
  inMemoryRefreshToken = null;

  if (typeof window !== "undefined") {
    localStorage.removeItem("salon-token");
    localStorage.removeItem("realState-token");
    localStorage.removeItem("salon-refresh-token");
    localStorage.removeItem("realState-refresh-token");
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("drebalAdmin");
    localStorage.removeItem("adminLoginId");
    localStorage.removeItem("salon-user");
    localStorage.removeItem("realState-user");
    localStorage.removeItem("salon-role");
    localStorage.removeItem("realState-role");
    localStorage.removeItem("isSalonOwner");
    localStorage.removeItem("userDisplayName");

    deleteCookie("salon-token");
    deleteCookie("salon-role");
    deleteCookie("salon-refresh-token");
    deleteCookie("realState-token");
    deleteCookie("realState-role");
    deleteCookie("realState-refresh-token");

    // Call server logout route to clear server cookies
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
  }
};
