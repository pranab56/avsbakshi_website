import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token, refreshToken, role, user } = body || {};

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is required." },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Session created successfully.",
      user,
      role,
    });

    const isProduction = process.env.NODE_ENV === "production";
    const userRole = role || "customer";

    // Set httpOnly + secure cookies for access control
    response.cookies.set("salon-token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    response.cookies.set("salon-role", userRole, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    if (refreshToken) {
      response.cookies.set("salon-refresh-token", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create session." },
      { status: 500 }
    );
  }
}
