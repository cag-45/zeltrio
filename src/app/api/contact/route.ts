import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/validation";

export async function POST(request: Request) {
  let rawBody: unknown;

  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload format." },
      { status: 400 }
    );
  }

  if (!rawBody || typeof rawBody !== "object") {
    return NextResponse.json(
      { message: "Request body must be a valid JSON object." },
      { status: 400 }
    );
  }

  const validation = validateContactPayload(
    rawBody as Record<string, unknown>
  );

  if (!validation.valid) {
    return NextResponse.json(
      {
        message: "Please review the highlighted fields before submitting.",
        errors: validation.errors,
      },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

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
          ...validation.sanitized,
        }),
      });

      if (!webhookResponse.ok) {
        console.error(
          "Contact webhook responded with non-2xx status:",
          webhookResponse.status
        );
      }
    } catch (error) {
      console.error("Contact webhook delivery failed:", error);
    }
  }

  return NextResponse.json(
    {
      message:
        "Thank you. Your inquiry has been received by Zeltrio Digital Service and will be reviewed within one business day.",
    },
    { status: 201 }
  );
}

