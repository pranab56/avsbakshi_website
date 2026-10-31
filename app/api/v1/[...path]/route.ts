import { NextRequest, NextResponse } from "next/server";
import { baseURL as backendBaseURL } from "@/utils/BaseURL";

async function proxyRequest(
  request: NextRequest,
  paramsPromise: Promise<{ path: string[] }>
) {
  const { path } = await paramsPromise;
  const subPath = Array.isArray(path) ? path.join("/") : path;
  const search = request.nextUrl.search;
  const targetUrl = `${backendBaseURL}/api/v1/${subPath}${search}`;

  // Headers to forward
  const headers = new Headers();
  request.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();
    // Exclude hop-by-hop headers and host
    if (
      lowerKey !== "host" &&
      lowerKey !== "connection" &&
      lowerKey !== "content-length" &&
      lowerKey !== "cookie"
    ) {
      headers.set(key, value);
    }
  });

  // Extract auth token from cookie if not already explicitly in Authorization header
  const explicitAuth =
    request.headers.get("authorization") || request.headers.get("Authorization");

  if (explicitAuth) {
    headers.set("Authorization", explicitAuth);
  } else {
    const token =
      request.cookies.get("salon-token")?.value ||
      request.cookies.get("realState-token")?.value;
    if (token) {
      const cleanToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
      headers.set("Authorization", cleanToken);
    }
  }

  // Handle request body for methods that allow payloads
  let body: BodyInit | undefined = undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      const buffer = await request.arrayBuffer();
      if (buffer.byteLength > 0) {
        body = buffer;
      }
    } catch {
      body = undefined;
    }
  }

  try {
    const backendResponse = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      redirect: "follow",
      cache: "no-store",
    });

    const responseHeaders = new Headers();
    backendResponse.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      // Omit compression and transfer headers that Next.js manages automatically
      if (
        lowerKey !== "content-encoding" &&
        lowerKey !== "transfer-encoding" &&
        lowerKey !== "content-length"
      ) {
        responseHeaders.set(key, value);
      }
    });

    return new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error(`[API Proxy Error] ${request.method} ${targetUrl}:`, err?.message || err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to backend service.",
        error: err?.message || "Service Unavailable",
      },
      { status: 502 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, params);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, params);
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, params);
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, params);
}
