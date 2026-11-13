/**
 * Google Apps Script for Zeltrio Digital Service Inquiries
 *
 * Setup (2 minutes, free, saves every inquiry in Google Sheets + emails your team):
 * 1. Create a new Google Sheet in your Google Drive (e.g. "Zeltrio Client Inquiries").
 * 2. Click Extensions -> Apps Script, replace Code.gs with this script, and save.
 * 3. Click Deploy -> New deployment -> Web app:
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Copy the Web App URL and add it as CONTACT_WEBHOOK_URL in Vercel & .env.local.
 */

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Inquiries") || spreadsheet.getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At",
        "Full Name",
        "Business Email",
        "Company or Brand",
        "Service Interest",
        "Preferred Timeline",
        "Project Details",
        "Forward on WhatsApp"
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold");
    }

    var rowIndex = sheet.getLastRow() + 1;
    var submittedAt = payload.submittedAt || new Date().toISOString();

    sheet.appendRow([
      submittedAt,
      payload.fullName || "",
      payload.businessEmail || "",
      payload.companyName || "",
      payload.serviceInterest || "",
      payload.projectTimeline || "",
      payload.projectDetails || "",
      ""
    ]);

    // Build a one-click WhatsApp forwarding formula inside Google Sheets
    var whatsappFormula =
      '=HYPERLINK("https://wa.me/?text=" & ENCODEURL(' +
      '"New Zeltrio Inquiry" & CHAR(10) & ' +
      '"Name: " & B' + rowIndex + ' & CHAR(10) & ' +
      '"Email: " & C' + rowIndex + ' & CHAR(10) & ' +
      '"Company: " & D' + rowIndex + ' & CHAR(10) & ' +
      '"Service: " & E' + rowIndex + ' & CHAR(10) & ' +
      '"Timeline: " & F' + rowIndex + ' & CHAR(10) & ' +
      '"Details: " & G' + rowIndex +
      '), "Forward on WhatsApp")';

    sheet.getRange(rowIndex, 8).setFormula(whatsappFormula);

    var primaryRecipient = payload.primaryEmail || "contact@zeltriodigital.online";
    var ccRecipients = (payload.ccEmails && payload.ccEmails.length)
      ? payload.ccEmails.join(",")
      : "";

    var emailSubject = "New Zeltrio Project Inquiry from " + (payload.fullName || "Prospect");
    var emailBody = [
      "A new project inquiry has been submitted on the Zeltrio Digital Service website.",
      "",
      "Full Name: " + (payload.fullName || ""),
      "Business Email: " + (payload.businessEmail || ""),
      "Company or Brand: " + (payload.companyName || "Not Specified"),
      "Primary Service: " + (payload.serviceInterest || ""),
      "Preferred Timeline: " + (payload.projectTimeline || ""),
      "",
      "Project Goals and Scope:",
      payload.projectDetails || "",
      "",
      "View all saved inquiries in your Google Sheet:",
      spreadsheet.getUrl()
    ].join("\n");

    MailApp.sendEmail({
      to: primaryRecipient,
      cc: ccRecipients,
      replyTo: payload.businessEmail || "contact@zeltriodigital.online",
      subject: emailSubject,
      body: emailBody
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

