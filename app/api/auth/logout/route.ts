import { NextRequest, NextResponse } from "next/server";

function clearAllAuthCookies(request: NextRequest, response: NextResponse) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isHttps = forwardedProto === "https" || request.nextUrl.protocol === "https:";

  // Expire all auth cookies across path="/"
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
      secure: isHttps,
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
  const loginUrl = new URL("/login?logout=true", request.url);
  const response = NextResponse.redirect(loginUrl);
  clearAllAuthCookies(request, response);
  return response;
}

// POST: API request endpoint
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });
    clearAllAuthCookies(request, response);
    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to logout session." },
      { status: 500 }
    );
  }
}
