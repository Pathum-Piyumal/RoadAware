import nodemailer from 'nodemailer';

const getTransporter = () => {
  const user = process.env.SMTP_USER;
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT) || 587;

  if (!user || !pass) {
    return null;
  }

  const isGmail = host.includes('gmail') || user.endsWith('@gmail.com');

  return nodemailer.createTransport(
    isGmail
      ? {
          service: 'gmail',
          auth: { user, pass },
          connectionTimeout: 8000,
          greetingTimeout: 8000,
          socketTimeout: 8000,
        }
      : {
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
          tls: { rejectUnauthorized: false },
          connectionTimeout: 8000,
          greetingTimeout: 8000,
          socketTimeout: 8000,
        }
  );
};

export const sendContactNotificationEmail = async ({ name, email, subject, message }) => {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn('⚠️ SMTP credentials missing (SMTP_USER/SMTP_PASS). Email skipped.');
    return false;
  }

  const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'tharushasangeeth034@gmail.com';

  // 1. Notification Email to Contact Recipient / Admin
  const adminMailOptions = {
    from: process.env.SMTP_FROM || `"RoadAware Contact" <${process.env.SMTP_USER}>`,
    to: contactEmail,
    replyTo: email,
    subject: `[RoadAware Contact Form] ${subject}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <h2 style="color: #2563eb; margin-top: 0; font-size: 22px;">📩 New Contact Form Submission</h2>
        <p style="color: #475569; font-size: 14px; margin-bottom: 20px;">You received a new inquiry from the RoadAware contact page:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: bold; width: 120px;">Sender Name:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Sender Email:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 600;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Subject:</td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${subject}</td>
          </tr>
        </table>

        <div style="background-color: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 8px; margin-top: 16px;">
          <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message Details:</h4>
          <p style="margin: 0; color: #1e293b; white-space: pre-wrap; line-height: 1.6; font-size: 14px;">${message}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="font-size: 12px; color: #94a3b8; margin: 0;">You can reply directly to this email to get in touch with ${name} (${email}).</p>
      </div>
    `,
  };

  // 2. Receipt Email to Visitor
  const userMailOptions = {
    from: process.env.SMTP_FROM || `"RoadAware Team" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `We received your message: ${subject}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <h2 style="color: #2563eb; margin-top: 0; font-size: 22px;">Thank You for Reaching Out!</h2>
        <p style="color: #334155; font-size: 15px; line-height: 1.6;">Hello <strong>${name}</strong>,</p>
        <p style="color: #475569; font-size: 14px; line-height: 1.6;">We have received your message regarding <strong>"${subject}"</strong>. Our support team is reviewing your inquiry and will respond shortly.</p>
        
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 12px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Your Copy:</p>
          <p style="margin: 0; color: #334155; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${message}</p>
        </div>

        <p style="color: #64748b; font-size: 13px; margin-top: 24px;">Best regards,<br /><strong style="color: #0f172a;">RoadAware Support Team</strong></p>
      </div>
    `,
  };

  try {
    // Attempt sending both emails concurrently with fallback
    const results = await Promise.allSettled([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    results.forEach((res, idx) => {
      if (res.status === 'rejected') {
        console.error(`📧 Contact email #${idx + 1} failed:`, res.reason?.message || res.reason);
      }
    });

    console.log(`📧 Contact form process finished for ${email}`);
    return true;
  } catch (err) {
    console.error('📧 Error sending contact notification email:', err.message);
    return false;
  }
};
