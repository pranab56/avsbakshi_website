import { NextRequest, NextResponse } from "next/server";

function clearAllAuthCookies(response: NextResponse) {
  const isProduction = process.env.NODE_ENV === "production";

  // Expire all cookies across path="/"
  const cookieNames = [
    "salon-token",
    "salon-role",
    "salon-refresh-token",
    "realState-token",
    "realState-role",
  ];

  cookieNames.forEach((name) => {
    response.cookies.set(name, "", {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
    response.cookies.delete(name);
  });
}

// GET: Direct browser navigation endpoint for instant logout
export async function GET(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  const response = NextResponse.redirect(loginUrl);
  clearAllAuthCookies(response);
  return response;
}

// POST: API request endpoint
export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });
    clearAllAuthCookies(response);
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to logout session." },
      { status: 500 }
    );
  }
}
