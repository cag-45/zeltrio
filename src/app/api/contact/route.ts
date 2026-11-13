import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { validateContactPayload } from "@/lib/validation";

// In-memory sliding rate limiter per client IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestCounts = new Map<string, { count: number; expiresAt: number }>();

function isOriginAllowed(originOrReferer: string | null): boolean {
  if (!originOrReferer) return true;
  try {
    const url = new URL(originOrReferer);
    const hostname = url.hostname.toLowerCase();
    return (
      hostname === "www.zeltriodigital.online" ||
      hostname === "zeltriodigital.online" ||
      hostname.endsWith(".vercel.app") ||
      hostname === "localhost" ||
      hostname === "127.0.0.1"
    );
  } catch {
    return false;
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Lazy memory cleanup if map exceeds 400 entries
  if (ipRequestCounts.size > 400) {
    for (const [key, entry] of ipRequestCounts.entries()) {
      if (entry.expiresAt < now) {
        ipRequestCounts.delete(key);
      }
    }
  }

  const record = ipRequestCounts.get(ip);
  if (!record || record.expiresAt < now) {
    ipRequestCounts.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(request: Request) {
  // 1. Validate Origin / Referer against allowed domains
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (!isOriginAllowed(origin) || !isOriginAllowed(referer)) {
    return NextResponse.json(
      { message: "Cross-origin request blocked for security." },
      { status: 403 }
    );
  }

  // 2. Reject payloads exceeding 20KB (guard against resource exhaustion)
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 20480) {
    return NextResponse.json(
      { message: "Payload exceeds acceptable size limit." },
      { status: 413 }
    );
  }

  // 3. Client IP rate limiting
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";

  if (checkRateLimit(clientIp)) {
    return NextResponse.json(
      { message: "Too many submission attempts. Please wait 1 minute before retrying." },
      { status: 429 }
    );
  }

  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid Request Payload Format." },
      { status: 400 }
    );
  }

  if (!rawBody || typeof rawBody !== "object") {
    return NextResponse.json(
      { message: "Request Body Must Be a Valid JSON Object." },
      { status: 400 }
    );
  }

  const validation = validateContactPayload(
    rawBody as Record<string, unknown>
  );

  if (!validation.valid) {
    return NextResponse.json(
      {
        message: "Please Review the Highlighted Fields Before Submitting.",
        errors: validation.errors,
      },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  let savedToWebhook = false;

  if (webhookUrl) {
    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "zeltrio-website",
          submittedAt: new Date().toISOString(),
          primaryEmail: siteConfig.contactEmail,
          ccEmails: siteConfig.ccEmails,
          recipientEmails: siteConfig.inquiryEmails,
          ...validation.sanitized,
        }),
      });

      if (webhookResponse.ok) {
        savedToWebhook = true;
      } else {
        console.error(
          "Contact webhook responded with non-2xx status:",
          webhookResponse.status
        );
      }
    } catch (error) {
      console.error("Contact webhook delivery failed:", error);
    }
  }

  const responseHeaders = {
    "Cache-Control": "no-store, max-age=0",
  };

  if (savedToWebhook) {
    return NextResponse.json(
      {
        savedToWebhook: true,
        deliveredByServer: true,
        deliveryConfig: {
          to: siteConfig.contactEmail,
          cc: siteConfig.ccEmail,
        },
        message:
          "Thank You. Your Project Inquiry Has Been Saved and Delivered to Zeltrio Digital Services.",
      },
      { status: 201, headers: responseHeaders }
    );
  }

  return NextResponse.json(
    {
      savedToWebhook: false,
      deliveredByServer: false,
      deliveryConfig: {
        to: siteConfig.contactEmail,
        cc: siteConfig.ccEmail,
      },
      message: "Inquiry Validated.",
    },
    { status: 200, headers: responseHeaders }
  );
}
