import { NextResponse, type NextRequest } from "next/server";

const CANONICAL_ORIGIN = "https://www.zeltriodigital.online";

export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") || "").toLowerCase().split(":")[0];
  const { pathname, search } = request.nextUrl;

  // 1. Check for localhost / development hosts
  const isLocalhost =
    host === "localhost" || host === "127.0.0.1" || host === "::1";

  // 2. Identify legacy .vercel.app deployment hosts, root apex domain, or host spoofing
  const isVercelHost = host.endsWith(".vercel.app");
  const isApexDomain = host === "zeltriodigital.online";
  const isCanonicalHost = host === "www.zeltriodigital.online";

  // 3. Enforce 301 Moved Permanently redirect to canonical https://www.zeltriodigital.online
  if (!isLocalhost && !isCanonicalHost) {
    const targetUrl = new URL(`${pathname}${search}`, CANONICAL_ORIGIN);
    const response = NextResponse.redirect(targetUrl, 301);

    // Direct Googlebot and browsers to transfer all indexing authority
    response.headers.set("Link", `<${CANONICAL_ORIGIN}${pathname}>; rel="canonical"`);
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
    return response;
  }

  // 4. Normal handling for canonical host and local dev
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static JS/CSS)
     * - _next/image (image optimization)
     * - favicon.ico, images, and public static files
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};

