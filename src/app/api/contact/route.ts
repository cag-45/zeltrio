import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
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
          "Thank You. Your Project Inquiry Has Been Saved and Delivered to Zeltrio Digital Service.",
      },
      { status: 201 }
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
    { status: 200 }
  );
}
