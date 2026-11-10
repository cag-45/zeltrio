import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/validation";

export async function POST(request: Request) {
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
        "Thank You. Your Inquiry Has Been Received by Zeltrio Digital Service and Will Be Reviewed Within One Business Day.",
    },
    { status: 201 }
  );
}
