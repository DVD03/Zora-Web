import nodemailer from 'nodemailer';
import { env } from './env';

export interface InquiryEmailPayload {
  clientName: string;
  companyName?: string;
  email: string;
  phone: string;
  whatsappNumber?: string;
  selectedServices: string[];
  estimatedBudget: string;
  projectBrief: string;
  preferredContact: string;
  submittedAt: string;
}

/**
 * Dispatches an instant Cyber-Luxury HTML Email Alert to zorasolution.official@gmail.com
 */
export async function sendInquiryEmailAlert(payload: InquiryEmailPayload): Promise<{ sent: boolean; mode: string }> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>New Zora Solutions Lead Alert</title>
      </head>
      <body style="margin:0;padding:24px;background-color:#02050D;color:#FFFFFF;font-family:Inter,Segoe UI,Arial,sans-serif;">
        <div style="max-width:640px;margin:0 auto;background:#060D1F;border:1px solid rgba(0,240,255,0.35);border-radius:16px;padding:32px;">
          <div style="border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:18px;margin-bottom:24px;">
            <span style="display:inline-block;padding:4px 12px;border-radius:999px;background:rgba(0,240,255,0.15);color:#00F0FF;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">
              New High-Priority Client Inquiry
            </span>
            <h1 style="margin:12px 0 4px 0;font-size:24px;color:#FFFFFF;">Zora Solutions — Lead Engine</h1>
            <p style="margin:0;color:#94A3B8;font-size:13px;">Received at ${payload.submittedAt}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="padding:10px 0;color:#94A3B8;font-size:14px;width:38%;">Client Name:</td>
              <td style="padding:10px 0;color:#FFFFFF;font-size:14px;font-weight:600;">${payload.clientName}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#94A3B8;font-size:14px;">Company:</td>
              <td style="padding:10px 0;color:#FFFFFF;font-size:14px;">${payload.companyName || 'Individual / Startup'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#94A3B8;font-size:14px;">Email:</td>
              <td style="padding:10px 0;color:#00F0FF;font-size:14px;">${payload.email}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#94A3B8;font-size:14px;">Phone / WhatsApp:</td>
              <td style="padding:10px 0;color:#FFFFFF;font-size:14px;">${payload.phone} ${
                payload.whatsappNumber ? `| WA: ${payload.whatsappNumber}` : ''
              }</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#94A3B8;font-size:14px;">Preferred Contact:</td>
              <td style="padding:10px 0;color:#00F0FF;font-size:14px;font-weight:600;">${payload.preferredContact}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#94A3B8;font-size:14px;">Estimated Scope:</td>
              <td style="padding:10px 0;color:#FFFFFF;font-size:14px;font-weight:600;">${payload.estimatedBudget}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#94A3B8;font-size:14px;">Selected Services:</td>
              <td style="padding:10px 0;color:#00F0FF;font-size:14px;">${payload.selectedServices.join(', ')}</td>
            </tr>
          </table>

          <div style="background:#02050D;border:1px solid rgba(0,81,255,0.4);border-radius:12px;padding:18px;margin-bottom:24px;">
            <p style="margin:0 0 8px 0;color:#00F0FF;font-size:12px;text-transform:uppercase;letter-spacing:1px;font-weight:700;">
              Project Brief & Requirements
            </p>
            <p style="margin:0;color:#E2E8F0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${payload.projectBrief}</p>
          </div>

          <div style="text-align:center;color:#94A3B8;font-size:12px;border-top:1px solid rgba(255,255,255,0.08);padding-top:16px;">
            Zora Solutions Automated Telemetry • zorasolution.official@gmail.com
          </div>
        </div>
      </body>
    </html>
  `;

  if (!env.SMTP_PASS || env.SMTP_PASS === 'your-16-char-gmail-app-password') {
    console.info(
      `[Zora Mailer] SMTP_PASS not configured yet. Queued lead notification for ${env.NOTIFICATION_EMAIL} (${payload.clientName})`
    );
    return { sent: false, mode: 'simulated-dev' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Zora Solutions Lead Engine" <${env.SMTP_USER}>`,
      to: env.NOTIFICATION_EMAIL,
      replyTo: payload.email,
      subject: `🚀 New Project Inquiry: ${payload.clientName} (${payload.selectedServices[0] || 'Digital Solution'})`,
      html: htmlContent,
    });

    return { sent: true, mode: 'smtp-live' };
  } catch (error) {
    console.error('[Zora Mailer] Failed to dispatch SMTP email:', error);
    return { sent: false, mode: 'smtp-error' };
  }
}

export interface QuotationEmailPayload {
  quoteNumber: string;
  clientName: string;
  companyName?: string;
  email: string;
  phone: string;
  notes?: string;
  primaryService: string;
  hostingTier: string;
  selectedItems: { name: string; category: string; billingType: string; price: number }[];
  oneTimeTotal: number;
  monthlyTotal: number;
  estimatedWeeks: number;
  submittedAt: string;
}

/**
 * Dispatches an HTML Quotation Breakdown Alert to zorasolution.official@gmail.com
 */
export async function sendQuotationEmailAlert(
  payload: QuotationEmailPayload
): Promise<{ sent: boolean; mode: string }> {
  const rowsHtml = payload.selectedItems
    .map(
      (item, idx) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.08);color:#94A3B8;font-size:13px;">${idx + 1}</td>
        <td style="padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.08);color:#FFFFFF;font-size:13px;">${item.name}</td>
        <td style="padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.08);color:#00F0FF;font-size:12px;">${item.billingType}</td>
        <td style="padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.08);color:#FFFFFF;font-size:13px;text-align:right;font-weight:600;">Rs. ${item.price.toLocaleString()}</td>
      </tr>`
    )
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>New Quotation Generated - ${payload.quoteNumber}</title>
      </head>
      <body style="margin:0;padding:24px;background-color:#02050D;color:#FFFFFF;font-family:Inter,Segoe UI,Arial,sans-serif;">
        <div style="max-width:680px;margin:0 auto;background:#060D1F;border:1px solid rgba(0,240,255,0.35);border-radius:16px;padding:32px;">
          <div style="border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:18px;margin-bottom:24px;">
            <span style="display:inline-block;padding:4px 12px;border-radius:999px;background:rgba(0,240,255,0.15);color:#00F0FF;font-size:12px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;">
              Quotation ${payload.quoteNumber}
            </span>
            <h1 style="margin:12px 0 4px 0;font-size:22px;color:#FFFFFF;">Zora Solutions — Official Estimate Generated</h1>
            <p style="margin:0;color:#94A3B8;font-size:13px;">Generated at ${payload.submittedAt} • Timeline confirmed by company</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="padding:6px 0;color:#94A3B8;font-size:13px;width:34%;">Client Name:</td>
              <td style="padding:6px 0;color:#FFFFFF;font-size:13px;font-weight:600;">${payload.clientName}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#94A3B8;font-size:13px;">Company / Brand:</td>
              <td style="padding:6px 0;color:#FFFFFF;font-size:13px;">${payload.companyName || 'Individual / Startup'}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#94A3B8;font-size:13px;">Phone / WhatsApp:</td>
              <td style="padding:6px 0;color:#00F0FF;font-size:13px;font-weight:600;">${payload.phone}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#94A3B8;font-size:13px;">Email:</td>
              <td style="padding:6px 0;color:#FFFFFF;font-size:13px;">${payload.email}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;color:#94A3B8;font-size:13px;">Hosting Tier:</td>
              <td style="padding:6px 0;color:#FFB800;font-size:13px;">${payload.hostingTier}</td>
            </tr>
          </table>

          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;background:#02050D;border-radius:10px;overflow:hidden;">
            <thead>
              <tr style="background:#0B1730;">
                <th style="padding:10px;text-align:left;color:#94A3B8;font-size:11px;">#</th>
                <th style="padding:10px;text-align:left;color:#94A3B8;font-size:11px;">SERVICE / MODULE</th>
                <th style="padding:10px;text-align:left;color:#94A3B8;font-size:11px;">BILLING</th>
                <th style="padding:10px;text-align:right;color:#94A3B8;font-size:11px;">PRICE (LKR)</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>

          <div style="background:#040914;border:1px solid rgba(0,240,255,0.3);border-radius:12px;padding:16px;margin-bottom:18px;">
            <p style="margin:0 0 6px 0;color:#FFFFFF;font-size:15px;"><strong>Total One-Time Investment:</strong> Rs. ${payload.oneTimeTotal.toLocaleString()}</p>
            ${
              payload.monthlyTotal > 0
                ? `<p style="margin:0;color:#FFB800;font-size:15px;"><strong>Total Monthly Retainer:</strong> Rs. ${payload.monthlyTotal.toLocaleString()} / month</p>`
                : ''
            }
          </div>

          ${
            payload.notes
              ? `<div style="background:#02050D;border:1px solid rgba(255,255,255,0.12);border-radius:10px;padding:14px;margin-bottom:18px;font-size:13px;color:#E2E8F0;"><strong>Special Notes:</strong><br/>${payload.notes}</div>`
              : ''
          }

          <div style="color:#94A3B8;font-size:11px;line-height:1.5;border-top:1px solid rgba(255,255,255,0.1);padding-top:12px;">
            Currency Notice: External domain (.com/.net), cloud hosting, APIs & ad spend remain subject to prevailing bank USD exchange rates.
          </div>
        </div>
      </body>
    </html>
  `;

  if (!env.SMTP_PASS || env.SMTP_PASS === 'your-16-char-gmail-app-password') {
    console.info(
      `[Zora Mailer] SMTP_PASS not configured. Logged quotation ${payload.quoteNumber} for zorasolution.official@gmail.com`
    );
    return { sent: false, mode: 'simulated-dev' };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Zora Solutions Quote Engine" <${env.SMTP_USER}>`,
      to: 'zorasolution.official@gmail.com',
      cc: env.NOTIFICATION_EMAIL !== 'zorasolution.official@gmail.com' ? env.NOTIFICATION_EMAIL : undefined,
      replyTo: payload.email,
      subject: `📄 New Quotation ${payload.quoteNumber}: ${payload.clientName} (Rs. ${payload.oneTimeTotal.toLocaleString()})`,
      html: htmlContent,
    });

    return { sent: true, mode: 'smtp-live' };
  } catch (error) {
    console.error('[Zora Mailer] Failed to dispatch quotation email:', error);
    return { sent: false, mode: 'smtp-error' };
  }
}

