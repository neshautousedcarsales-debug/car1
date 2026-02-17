import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const requiredEnv = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "CONTACT_EMAIL"] as const;

function getEnv(name: string): string | undefined {
  return process.env[name];
}

export async function POST(request: Request) {
  const missing = requiredEnv.filter((key) => !getEnv(key));
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Server missing config: ${missing.join(", ")}. Add these to .env.local` },
      { status: 500 }
    );
  }

  let body: {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
    vehicleId?: string;
    vehicleTitle?: string;
    stockNumber?: string;
    vehiclePrice?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    subject,
    message,
    vehicleId,
    vehicleTitle,
    stockNumber,
    vehiclePrice,
  } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  const isVehicleInquiry = Boolean(vehicleId?.trim() || vehicleTitle?.trim());
  const toEmail = getEnv("CONTACT_EMAIL")!;
  const transporter = nodemailer.createTransport({
    host: getEnv("SMTP_HOST"),
    port: Number(getEnv("SMTP_PORT")) || 587,
    secure: getEnv("SMTP_SECURE") === "true",
    auth: {
      user: getEnv("SMTP_USER"),
      pass: getEnv("SMTP_PASS"),
    },
  });

  const vehicleBlock =
    isVehicleInquiry &&
    `
    <h3>Vehicle</h3>
    <p><strong>Vehicle:</strong> ${escapeHtml(vehicleTitle ?? "—")}</p>
    ${stockNumber ? `<p><strong>Stock #:</strong> ${escapeHtml(stockNumber)}</p>` : ""}
    ${vehiclePrice ? `<p><strong>Price:</strong> ${escapeHtml(vehiclePrice)}</p>` : ""}
    ${vehicleId ? `<p><strong>ID:</strong> ${escapeHtml(vehicleId)}</p>` : ""}
  `;

  const html = `
    <h2>${isVehicleInquiry ? "Vehicle inquiry" : "New contact form submission"}</h2>
    ${vehicleBlock || ""}
    <h3>Contact</h3>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    ${subject && !isVehicleInquiry ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <pre>${escapeHtml(message)}</pre>
  `;

  const emailSubject = isVehicleInquiry
    ? `Vehicle inquiry: ${vehicleTitle ?? "Unknown vehicle"} from ${name}`
    : subject?.trim()
      ? `Contact: ${subject}`
      : `Contact from ${name}`;

  try {
    await transporter.sendMail({
      from: `"Nesh Auto Sales Used Cars" <${getEnv("SMTP_USER")}>`,
      to: toEmail,
      replyTo: email,
      subject: emailSubject,
      text: [
        isVehicleInquiry && vehicleTitle && `Vehicle: ${vehicleTitle}`,
        isVehicleInquiry && stockNumber && `Stock #: ${stockNumber}`,
        isVehicleInquiry && vehiclePrice && `Price: ${vehiclePrice}`,
        isVehicleInquiry && vehicleId && `ID: ${vehicleId}`,
        `Name: ${name}`,
        `Email: ${email}`,
        phone && `Phone: ${phone}`,
        !isVehicleInquiry && subject && `Subject: ${subject}`,
        `Message: ${message}`,
      ]
        .filter(Boolean)
        .join("\n"),
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact send error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or call (470) 403-0168." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
