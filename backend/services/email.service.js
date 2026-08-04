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
        }
      : {
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
          tls: { rejectUnauthorized: false },
        }
  );
};

/**
 * Universal email dispatcher prioritizing Brevo REST API with Nodemailer SMTP fallback.
 */
export const sendEmail = async ({ to, subject, html, replyTo, senderName, senderEmail }) => {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const defaultSenderEmail = process.env.SMTP_USER || 'tharushasangeeth034@gmail.com';
  const defaultSenderName = 'RoadAware';

  const fromEmail = senderEmail || defaultSenderEmail;
  const fromName = senderName || defaultSenderName;

  // 1. Try Brevo REST API first if API key exists
  if (brevoApiKey) {
    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': brevoApiKey.trim(),
        },
        body: JSON.stringify({
          sender: { name: fromName, email: fromEmail },
          to: Array.isArray(to) ? to : [{ email: to }],
          replyTo: replyTo ? { email: replyTo } : undefined,
          subject,
          htmlContent: html,
        }),
      });

      if (response.ok) {
        console.log(`📧 Brevo API: Email "${subject}" successfully sent to ${Array.isArray(to) ? to.map(t => t.email).join(', ') : to}`);
        return true;
      } else {
        const errorText = await response.text();
        console.warn(`⚠️ Brevo API request failed (${response.status}): ${errorText}. Falling back to Nodemailer SMTP...`);
      }
    } catch (err) {
      console.warn(`⚠️ Brevo API exception: ${err.message}. Falling back to Nodemailer SMTP...`);
    }
  }

  // 2. Fallback to Nodemailer SMTP
  const transporter = getTransporter();
  if (!transporter) {
    console.warn('⚠️ Both Brevo API key and SMTP transporter unavailable. Email skipped.');
    return false;
  }

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      replyTo,
      subject,
      html,
    });
    console.log(`📧 Nodemailer SMTP: Email "${subject}" sent to ${to}`);
    return true;
  } catch (err) {
    console.error(`📧 SMTP Error sending email "${subject}":`, err.message);
    return false;
  }
};

export const sendContactNotificationEmail = async ({ name, email, subject, message }) => {
  const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'tharushasangeeth034@gmail.com';

  // Admin Notification Email
  const adminHtml = `
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
  `;

  // User Receipt Email
  const userHtml = `
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
  `;

  try {
    await Promise.all([
      sendEmail({ to: contactEmail, subject: `[RoadAware Contact Form] ${subject}`, html: adminHtml, replyTo: email, senderName: 'RoadAware Contact' }),
      sendEmail({ to: email, subject: `We received your message: ${subject}`, html: userHtml, senderName: 'RoadAware Support' }),
    ]);
    return true;
  } catch (err) {
    console.error('📧 Error sending contact notification emails:', err);
    return false;
  }
};

export const sendStatusUpdateEmail = async ({
  reporterName,
  reporterEmail,
  hazardId,
  title,
  location,
  categoryName,
  oldStatus,
  newStatus,
  comment,
}) => {
  if (!reporterEmail) return false;

  const formattedOld = (oldStatus || '').toUpperCase().replace('_', ' ');
  const formattedNew = (newStatus || '').toUpperCase().replace('_', ' ');

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved': return '#10b981'; // emerald/green
      case 'in_progress':
      case 'in progress': return '#3b82f6'; // blue
      case 'rejected': return '#ef4444'; // red
      default: return '#f59e0b'; // amber
    }
  };

  const statusColor = getStatusColor(newStatus);

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #2563eb; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">RoadAware</h1>
        <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Citizen Road Safety & Hazard Management Platform</p>
      </div>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
          Hazard Status Update • HZ-${hazardId}
        </div>
        <h2 style="margin: 0 0 12px 0; color: #0f172a; font-size: 20px;">${title}</h2>
        
        <div style="margin-top: 12px;">
          <span style="font-size: 12px; padding: 4px 10px; border-radius: 6px; background-color: #e2e8f0; color: #475569; font-weight: 600; text-transform: uppercase;">
            ${formattedOld}
          </span>
          <span style="font-size: 16px; color: #94a3b8; margin: 0 6px;">➔</span>
          <span style="font-size: 12px; padding: 4px 12px; border-radius: 6px; background-color: ${statusColor}15; color: ${statusColor}; border: 1px solid ${statusColor}40; font-weight: 700; text-transform: uppercase;">
            ${formattedNew}
          </span>
        </div>
      </div>

      <p style="font-size: 15px; color: #334155; line-height: 1.6;">Hello <strong>${reporterName || 'Citizen'}</strong>,</p>
      <p style="font-size: 14px; color: #475569; line-height: 1.6;">
        The status of your reported hazard <strong>"${title}"</strong> (HZ-${hazardId}) located at <em>${location || 'N/A'}</em> has been updated by road maintenance authorities.
      </p>

      ${comment ? `
        <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <h4 style="margin: 0 0 6px 0; color: #1e40af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Admin Note / Progress Update:</h4>
          <p style="margin: 0; color: #1e293b; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${comment}</p>
        </div>
      ` : ''}

      <div style="border-top: 1px solid #e2e8f0; margin-top: 28px; padding-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
        <p style="margin: 0 0 6px 0;">Thank you for making our community roads safer!</p>
        <p style="margin: 0;">RoadAware Operations Team &copy; ${new Date().getFullYear()}</p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: reporterEmail,
    subject: `[RoadAware] Status Updated: ${title} is now ${formattedNew}`,
    html,
    senderName: 'RoadAware Alert',
  });
};
