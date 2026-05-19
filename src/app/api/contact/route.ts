import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import twilio from "twilio";

// In-memory rate limiting map: ip -> timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3; // Max 3 messages per hour per IP

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "anonymous";
    const now = Date.now();

    // Rate limiting check
    const userRequests = rateLimitMap.get(ip) || [];
    const recentRequests = userRequests.filter(
      (time) => now - time < RATE_LIMIT_WINDOW
    );

    if (recentRequests.length >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: "Too many messages sent. Please try again in an hour." },
        { status: 429 }
      );
    }

    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    const body = await req.json();
    const {
      name,
      email,
      phone,
      subject,
      message,
      captchaAnswer,
      captchaChallenge,
    } = body;

    // Backend validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled out." },
        { status: 400 }
      );
    }

    // CAPTCHA validation
    if (captchaChallenge && captchaAnswer) {
      const parts = captchaChallenge.split("+");
      const num1 = parseInt(parts[0], 10);
      const num2 = parseInt(parts[1], 10);
      const expected = num1 + num2;
      if (parseInt(captchaAnswer, 10) !== expected) {
        return NextResponse.json(
          { error: "Invalid CAPTCHA solution. Please try again." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "CAPTCHA verification is required." },
        { status: 400 }
      );
    }

    let emailSent = false;
    let whatsappSent = false;

    // 1. Email Service (Nodemailer)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const dateStr = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0a13; color: #e4e1e9; margin: 0; padding: 20px; }
            .card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); backdrop-filter: blur(8px); }
            h2 { color: #8B5CF6; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 12px; margin-top: 0; }
            .field { margin-bottom: 20px; }
            .label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #918fa1; letter-spacing: 0.1em; margin-bottom: 6px; }
            .value { font-size: 16px; color: #e4e1e9; line-height: 1.5; }
            .message-box { background: rgba(255, 255, 255, 0.02); border-left: 3px solid #00D4FF; padding: 16px; border-radius: 4px; margin-top: 12px; font-style: italic; }
            .footer { font-size: 11px; text-align: center; color: #585666; margin-top: 32px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>New Portfolio Message</h2>
            <div class="field">
              <div class="label">Sender Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Sender Email</div>
              <div class="value">${email}</div>
            </div>
            ${
              phone
                ? `
            <div class="field">
              <div class="label">Sender Phone</div>
              <div class="value">${phone}</div>
            </div>
            `
                : ""
            }
            <div class="field">
              <div class="label">Subject</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value message-box">${message.replace(
                /\n/g,
                "<br/>"
              )}</div>
            </div>
            <div class="field" style="margin-top: 24px;">
              <div class="label">Submitted At</div>
              <div class="value" style="font-size: 13px;">${dateStr} (IST)</div>
            </div>
            <div class="footer">Sent securely from Durga Praveen Portfolio Website</div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.EMAIL_USER,
        subject: `Portfolio: ${subject}`,
        html: emailHtml,
      });

      emailSent = true;
    } else {
      console.warn("EMAIL_USER or EMAIL_PASS missing. Skipping email sending.");
    }

    // 2. WhatsApp Service (Twilio)
    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_WHATSAPP_NUMBER &&
      process.env.MY_WHATSAPP_NUMBER
    ) {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      await client.messages.create({
        body: `New Portfolio Message:
Name: ${name}
Email: ${email}
Message: ${message}`,
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: process.env.MY_WHATSAPP_NUMBER,
      });

      whatsappSent = true;
    } else {
      console.warn("Twilio credentials missing. Skipping WhatsApp notification.");
    }

    if (!emailSent && !whatsappSent) {
      return NextResponse.json(
        {
          error:
            "Delivery services are not configured. Check environment variables.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      emailSent,
      whatsappSent,
      message: "Message delivered successfully!",
    });
  } catch (error: any) {
    console.error("Error in contact endpoint:", error);
    return NextResponse.json(
      {
        error:
          "An internal server error occurred while sending your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
