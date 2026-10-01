import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    const isProduction = process.env.NODE_ENV === "production";

    // Clear all httpOnly cookies
    response.cookies.set("salon-token", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    response.cookies.set("salon-role", "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    response.cookies.set("salon-refresh-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to logout session." },
      { status: 500 }
    );
  }
}
