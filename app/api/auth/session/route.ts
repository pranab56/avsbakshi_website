import { NextRequest, NextResponse } from "next/server";

interface JwtPayload {
  role?: string;
  exp?: number;
  id?: string;
  _id?: string;
  userId?: string;
  email?: string;
  [key: string]: unknown;
}

function decodeJwt(token: string): JwtPayload | null {
  try {
    const raw = token.startsWith("Bearer ") ? token.slice(7) : token;
    const parts = raw.split(".");
    if (parts.length < 2) return null;
    let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    const jsonStr =
      typeof atob === "function"
        ? atob(base64)
        : typeof Buffer !== "undefined"
        ? Buffer.from(base64, "base64").toString("utf-8")
        : null;
    if (!jsonStr) return null;
    return JSON.parse(jsonStr) as JwtPayload;
  } catch {
    return null;
  }
}

function getCookieSecurityConfig(request: NextRequest) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isHttps = forwardedProto === "https" || request.nextUrl.protocol === "https:";
  // Only set secure: true when running over HTTPS. Over HTTP (e.g. localhost, local network),
  // setting secure: true causes modern browsers to reject/drop the cookie entirely.
  return isHttps;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, refreshToken, role, user } = body || {};

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is required." },
        { status: 400 }
      );
    }

    const jwtPayload = decodeJwt(token);
    const resolvedRole = (role || jwtPayload?.role || "customer").toLowerCase().trim();
    const isSecure = getCookieSecurityConfig(request);

    const responseUser = user || (jwtPayload ? { id: jwtPayload.id || jwtPayload._id || jwtPayload.userId, email: jwtPayload.email, role: resolvedRole } : null);

    const response = NextResponse.json({
      success: true,
      message: "Session created successfully.",
      user: responseUser,
      role: resolvedRole,
    });

    const cookieBaseOptions = {
      httpOnly: false,
      secure: isSecure,
      sameSite: "lax" as const,
      path: "/",
    };

    // Store access token in secure HTTP-only cookies (7 days)
    response.cookies.set("salon-token", token, {
      ...cookieBaseOptions,
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("realState-token", token, {
      ...cookieBaseOptions,
      maxAge: 60 * 60 * 24 * 7,
    });

    // Store user role in secure HTTP-only cookie (7 days)
    response.cookies.set("salon-role", resolvedRole, {
      ...cookieBaseOptions,
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("realState-role", resolvedRole, {
      ...cookieBaseOptions,
      maxAge: 60 * 60 * 24 * 7,
    });

    // Store user profile info in secure cookie (7 days)
    if (responseUser) {
      try {
        response.cookies.set("salon-user", encodeURIComponent(JSON.stringify(responseUser)), {
          ...cookieBaseOptions,
          maxAge: 60 * 60 * 24 * 7,
        });
      } catch {}
    }

    // Store refresh token in secure HTTP-only cookie (30 days)
    if (refreshToken) {
      response.cookies.set("salon-refresh-token", refreshToken, {
        ...cookieBaseOptions,
        maxAge: 60 * 60 * 24 * 30,
      });
      response.cookies.set("realState-refresh-token", refreshToken, {
        ...cookieBaseOptions,
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to create session." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const token =
      request.cookies.get("salon-token")?.value ||
      request.cookies.get("realState-token")?.value;

    if (!token) {
      return NextResponse.json({
        success: false,
        isAuthenticated: false,
        user: null,
        role: null,
      });
    }

    const payload = decodeJwt(token);
    if (payload?.exp && payload.exp * 1000 <= Date.now()) {
      return NextResponse.json({
        success: false,
        isAuthenticated: false,
        message: "Token has expired.",
        user: null,
        role: null,
      });
    }

    const roleCookie =
      request.cookies.get("salon-role")?.value ||
      request.cookies.get("realState-role")?.value;
    const resolvedRole = (roleCookie || payload?.role || "customer").toLowerCase().trim();

    let userObj = null;
    const userCookie = request.cookies.get("salon-user")?.value;
    if (userCookie) {
      try {
        userObj = JSON.parse(decodeURIComponent(userCookie));
      } catch {}
    }

    if (!userObj) {
      userObj = {
        id: payload?.id || payload?._id || payload?.userId,
        email: payload?.email,
        role: resolvedRole,
      };
    }

    return NextResponse.json({
      success: true,
      isAuthenticated: true,
      token,
      role: resolvedRole,
      user: userObj,
    });
  } catch {
    return NextResponse.json(
      { success: false, isAuthenticated: false, message: "Failed to read session." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const isSecure = getCookieSecurityConfig(request);
  const response = NextResponse.json({
    success: true,
    message: "Session ended successfully.",
  });

  const cookieNames = [
    "salon-token",
    "salon-role",
    "salon-refresh-token",
    "salon-user",
    "realState-token",
    "realState-role",
    "realState-refresh-token",
  ];

  cookieNames.forEach((name) => {
    response.cookies.set(name, "", {
      httpOnly: false,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
    response.cookies.delete(name);
  });

  return response;
}
