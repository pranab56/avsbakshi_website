const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    if (decoded.exp) {
      return decoded.exp * 1000 < Date.now();
    }
    return false;
  } catch {
    return true;
  }
};

export const saveToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("realState-token", token);
    document.cookie = `realState-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  }
};

export const saveRefreshToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("realState-refresh-token", token);
  }
};

export const saveUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("realState-user", JSON.stringify(user));
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("realState-token") || getCookie("realState-token");
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("realState-refresh-token");
  }
  return null;
};

export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("realState-user");
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const removeStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("realState-token");
    localStorage.removeItem("realState-refresh-token");
    localStorage.removeItem("realState-user");
    document.cookie = "realState-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
};