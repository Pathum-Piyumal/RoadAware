import nodemailer from 'nodemailer';

/**
 * Core send email function.
 * Tries Brevo REST API first (most reliable for cloud hosts like Render).
 * Falls back to Nodemailer SMTP (if BREVO_API_KEY is missing or fails).
 */
export const sendMail = async ({ to, subject, html, replyTo, senderName, attachments }) => {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.SMTP_USER || 'tharushasangeeth034@gmail.com';
  const fromName = senderName || 'RoadAware';

  // 1. Try Brevo REST API if API Key is available (Bypasses all cloud SMTP port restrictions)
  if (brevoApiKey) {
    try {
      const payload = {
        sender: { name: fromName, email: fromEmail },
        to: Array.isArray(to) ? to.map((e) => ({ email: e })) : [{ email: to }],
        subject,
        htmlContent: html,
      };

      if (replyTo) {
        payload.replyTo = { email: replyTo };
      }

      if (attachments && Array.isArray(attachments) && attachments.length > 0) {
        payload.attachment = attachments.map((att) => ({
          name: att.filename,
          content: Buffer.isBuffer(att.content) ? att.content.toString('base64') : att.content,
        }));
      }

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': brevoApiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`📧 Email successfully sent via Brevo API to ${to} (Message ID: ${data.messageId})`);
        return true;
      } else {
        console.warn('⚠️ Brevo API request failed:', data.message || data);
      }
    } catch (err) {
      console.error('⚠️ Brevo API exception:', err.message);
    }
  }

  // 2. Fallback to Nodemailer SMTP
  const user = process.env.SMTP_USER;
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  const host = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
  const port = parseInt(process.env.SMTP_PORT) || 587;

  if (!user || !pass) {
    console.warn('⚠️ Neither BREVO_API_KEY nor SMTP credentials (SMTP_USER/SMTP_PASS) are available.');
    return false;
  }

  try {
    const isGmail = host.includes('gmail') || user.endsWith('@gmail.com');
    const transporter = nodemailer.createTransport(
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

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"${fromName}" <${user}>`,
      to,
      replyTo,
      subject,
      html,
      attachments: attachments ? attachments.map((att) => ({
        filename: att.filename,
        content: att.content,
      })) : undefined,
    });

    console.log(`📧 Email successfully sent via Nodemailer SMTP to ${to}`);
    return true;
  } catch (err) {
    console.error('❌ Nodemailer SMTP Error:', err.message);
    throw err;
  }
};

/**
 * Send Password Reset Code Email
 */
export const sendResetEmail = async (toEmail, code) => {
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background-color: #f97316; color: #ffffff; font-weight: 900; font-size: 24px; padding: 10px 22px; border-radius: 12px; letter-spacing: -0.5px;">
          RoadAware
        </div>
      </div>
      <h2 style="color: #0f172a; margin-top: 0; font-size: 22px; text-align: center; font-weight: 800;">Password Reset Code</h2>
      <p style="color: #475569; font-size: 14px; line-height: 1.6; text-align: center;">
        Use the verification code below to reset your password. This code is valid for <strong>15 minutes</strong>.
      </p>
      <div style="background-color: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; padding: 20px; text-align: center; margin: 24px 0;">
        <span style="font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #2563eb; font-family: monospace;">${code}</span>
      </div>
      <p style="color: #64748b; font-size: 13px; text-align: center; margin-bottom: 24px;">
        If you did not request a password reset, please ignore this email.
      </p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
      <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">
        RoadAware Support Team
      </p>
    </div>
  `;

  return await sendMail({
    to: toEmail,
    subject: 'RoadAware — Password Reset Code',
    html,
    senderName: 'RoadAware Security',
  });
};

/**
 * Send Contact Form Notification Email
 */
export const sendContactNotificationEmail = async ({ name, email, subject, message }) => {
  const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'tharushasangeeth034@gmail.com';

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
    await Promise.allSettled([
      sendMail({ to: contactEmail, subject: `[RoadAware Contact Form] ${subject}`, html: adminHtml, replyTo: email, senderName: 'RoadAware Contact' }),
      sendMail({ to: email, subject: `We received your message: ${subject}`, html: userHtml, senderName: 'RoadAware Support' }),
    ]);
    console.log(`📧 Contact form emails sent for ${email}`);
    return true;
  } catch (err) {
    console.error('📧 Contact form email sending failed:', err.message);
    return false;
  }
};

/**
 * Send Job Application Email to Company and Confirmation to Applicant
 */
export const sendJobApplicationEmail = async ({
  name,
  email,
  phone,
  portfolio,
  coverLetter,
  jobTitle,
  department,
  cvFile,
  cvUrl,
}) => {
  const companyEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'tharushasangeeth034@gmail.com';

  const companyHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background-color: #f97316; color: #ffffff; font-weight: 900; font-size: 22px; padding: 10px 22px; border-radius: 12px; letter-spacing: -0.5px;">
          RoadAware Careers
        </div>
      </div>
      <h2 style="color: #0f172a; margin-top: 0; font-size: 22px; text-align: center; font-weight: 800;">🚀 New Job Application Received</h2>
      <p style="color: #475569; font-size: 14px; text-align: center; margin-bottom: 24px;">
        A new candidate has submitted an application for <strong>${jobTitle || 'General Position'}</strong> (${department || 'General'}).
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; background-color: #f8fafc; border-radius: 12px; overflow: hidden;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; color: #64748b; font-weight: bold; width: 140px;">Applicant Name:</td>
          <td style="padding: 12px 16px; color: #0f172a; font-weight: 700;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; color: #64748b; font-weight: bold;">Applicant Email:</td>
          <td style="padding: 12px 16px; color: #0f172a; font-weight: 700;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
        </tr>
        ${phone ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; color: #64748b; font-weight: bold;">Phone Number:</td>
          <td style="padding: 12px 16px; color: #0f172a; font-weight: 600;">${phone}</td>
        </tr>` : ''}
        ${portfolio ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; color: #64748b; font-weight: bold;">Portfolio / Link:</td>
          <td style="padding: 12px 16px; color: #0f172a; font-weight: 600;"><a href="${portfolio}" target="_blank" style="color: #2563eb; text-decoration: underline;">${portfolio}</a></td>
        </tr>` : ''}
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; color: #64748b; font-weight: bold;">Applied Role:</td>
          <td style="padding: 12px 16px; color: #ea580c; font-weight: 700;">${jobTitle || 'General Application'}</td>
        </tr>
      </table>

      <div style="background-color: #f1f5f9; border-left: 4px solid #f97316; padding: 18px; border-radius: 8px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Cover Letter / Intro:</h4>
        <p style="margin: 0; color: #1e293b; white-space: pre-wrap; line-height: 1.6; font-size: 14px;">${coverLetter}</p>
      </div>

      ${cvUrl ? `
      <div style="text-align: center; margin: 24px 0;">
        <a href="${cvUrl}" target="_blank" style="background-color: #0f172a; color: #ffffff; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none; display: inline-block;">
          📄 View / Download Attached CV (Cloudinary PDF)
        </a>
      </div>` : ''}

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
      <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">
        The candidate's CV is attached to this email. You can reply directly to contact ${name}.
      </p>
    </div>
  `;

  const applicantHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background-color: #f97316; color: #ffffff; font-weight: 900; font-size: 24px; padding: 10px 22px; border-radius: 12px; letter-spacing: -0.5px;">
          RoadAware Careers
        </div>
      </div>

      <h2 style="color: #0f172a; margin-top: 0; font-size: 22px; font-weight: 800; text-align: center;">Application Received! 🎉</h2>
      
      <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-top: 20px;">
        Hello <strong>${name}</strong>,
      </p>
      
      <p style="color: #475569; font-size: 14px; line-height: 1.6;">
        Thank you for applying for the position of <strong>${jobTitle || 'General Position'}</strong> at <strong>RoadAware</strong>! We have successfully received your application and resume/CV.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 12px; margin: 24px 0;">
        <h4 style="margin: 0 0 10px 0; color: #1e293b; font-size: 14px;">Next Steps:</h4>
        <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.5;">
          Our talent acquisition team will carefully review your credentials. If your background matches our current requirements, we will reach out to schedule an initial interview.
        </p>
      </div>

      <p style="color: #64748b; font-size: 13px; margin-top: 24px;">
        Best regards,<br />
        <strong style="color: #0f172a;">RoadAware Talent Acquisition Team</strong>
      </p>
    </div>
  `;

  const attachments = [];
  if (cvFile && cvFile.buffer) {
    attachments.push({
      filename: cvFile.originalname || `${name.replace(/\s+/g, '_')}_CV.pdf`,
      content: cvFile.buffer,
    });
  }

  try {
    await Promise.allSettled([
      sendMail({
        to: companyEmail,
        subject: `[Job Application] ${jobTitle || 'General'} - ${name}`,
        html: companyHtml,
        replyTo: email,
        senderName: 'RoadAware Careers',
        attachments,
      }),
      sendMail({
        to: email,
        subject: `Application Received: ${jobTitle || 'Career Opportunity'} at RoadAware`,
        html: applicantHtml,
        senderName: 'RoadAware Careers',
      }),
    ]);
    console.log(`📧 Job Application emails sent for ${email}`);
    return true;
  } catch (err) {
    console.error('📧 Error sending job application email:', err.message);
    return false;
  }
};

/**
 * Send Welcome Email on Registration
 */
export const sendWelcomeRegistrationEmail = async ({ name, email }) => {
  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
      <div style="text-align: center; margin-bottom: 28px;">
        <div style="display: inline-block; background-color: #f97316; color: #ffffff; font-weight: 900; font-size: 24px; padding: 12px 24px; border-radius: 14px; letter-spacing: -0.5px;">
          RoadAware
        </div>
      </div>

      <h1 style="color: #0f172a; margin-top: 0; font-size: 24px; font-weight: 800; text-align: center;">Welcome to the RoadAware Community! 🎉</h1>
      
      <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-top: 20px;">
        Hello <strong>${name}</strong>,
      </p>
      
      <p style="color: #475569; font-size: 15px; line-height: 1.6;">
        Your account registration was <strong>successful</strong>! We are thrilled to welcome you to <strong>RoadAware</strong> — Sri Lanka's community-driven road hazard monitoring and safety platform.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; border-radius: 16px; margin: 24px 0;">
        <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 15px; font-weight: 700;">What you can do with your account:</h3>
        
        <div style="margin-bottom: 14px;">
          <strong style="color: #0f172a; font-size: 14px;">🚨 Report Road Hazards</strong>
          <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px; line-height: 1.4;">Snap photos, tag GPS coordinates, and alert municipal authorities to potholes, broken streetlights, or debris.</p>
        </div>

        <div style="margin-bottom: 14px;">
          <strong style="color: #0f172a; font-size: 14px;">📍 Interactive Live Map</strong>
          <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px; line-height: 1.4;">Explore real-time hazard hotspots, view resolution status, and stay safe on your daily commutes.</p>
        </div>

        <div>
          <strong style="color: #0f172a; font-size: 14px;">🏆 Community Leaderboard</strong>
          <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px; line-height: 1.4;">Earn points, upvote critical hazard reports, and unlock community observer badges.</p>
        </div>
      </div>

      <div style="text-align: center; margin: 32px 0 24px 0;">
        <a href="${process.env.FRONTEND_URL || 'https://roadaware.vercel.app'}" style="background-color: #2563eb; color: #ffffff; font-weight: 700; font-size: 15px; padding: 14px 32px; border-radius: 12px; text-decoration: none; display: inline-block; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);">
          Explore Your Dashboard 🚀
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 20px 0;" />

      <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">
        If you have any questions or need help, feel free to contact us at <a href="mailto:tharushasangeeth034@gmail.com" style="color: #2563eb; text-decoration: none;">tharushasangeeth034@gmail.com</a>.
      </p>
      <p style="color: #64748b; font-size: 13px; text-align: center; margin-top: 16px;">
        Best regards,<br /><strong style="color: #0f172a;">The RoadAware Team</strong>
      </p>
    </div>
  `;

  try {
    await sendMail({ to: email, subject: `Welcome to RoadAware, ${name}! 🎉 Registration Successful`, html, senderName: 'RoadAware Team' });
    console.log(`📧 Welcome email sent to ${email}`);
    return true;
  } catch (err) {
    console.error(`📧 Error sending welcome email to ${email}:`, err.message);
    return false;
  }
};

/**
 * Send Help Center Support Desk Inquiry Email
 */
export const sendSupportDeskInquiryEmail = async ({ name, email, category, message, ticketId }) => {
  const companyEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'tharushasangeeth034@gmail.com';

  const companyHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background-color: #2563eb; color: #ffffff; font-weight: 900; font-size: 22px; padding: 10px 22px; border-radius: 12px; letter-spacing: -0.5px;">
          RoadAware Support Desk
        </div>
      </div>
      <h2 style="color: #0f172a; margin-top: 0; font-size: 22px; text-align: center; font-weight: 800;">📩 New Citizen Support Inquiry</h2>
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="background-color: #eff6ff; color: #2563eb; font-weight: 800; font-size: 13px; padding: 6px 16px; border-radius: 20px; border: 1px solid #bfdbfe;">
          Ticket ID: ${ticketId}
        </span>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; background-color: #f8fafc; border-radius: 12px; overflow: hidden;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; color: #64748b; font-weight: bold; width: 140px;">Citizen Name:</td>
          <td style="padding: 12px 16px; color: #0f172a; font-weight: 700;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; color: #64748b; font-weight: bold;">Citizen Email:</td>
          <td style="padding: 12px 16px; color: #0f172a; font-weight: 700;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 12px 16px; color: #64748b; font-weight: bold;">Category:</td>
          <td style="padding: 12px 16px; color: #2563eb; font-weight: 700;">${category || 'General Inquiry'}</td>
        </tr>
      </table>

      <div style="background-color: #f1f5f9; border-left: 4px solid #2563eb; padding: 18px; border-radius: 8px; margin-bottom: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Inquiry Details:</h4>
        <p style="margin: 0; color: #1e293b; white-space: pre-wrap; line-height: 1.6; font-size: 14px;">${message}</p>
      </div>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
      <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">
        You can reply directly to this email to answer ${name} (${email}).
      </p>
    </div>
  `;

  const userHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; background-color: #2563eb; color: #ffffff; font-weight: 900; font-size: 24px; padding: 10px 22px; border-radius: 12px; letter-spacing: -0.5px;">
          RoadAware Support
        </div>
      </div>

      <h2 style="color: #0f172a; margin-top: 0; font-size: 22px; font-weight: 800; text-align: center;">Support Ticket Received! 🎫</h2>
      <div style="text-align: center; margin-bottom: 20px;">
        <span style="background-color: #eff6ff; color: #2563eb; font-weight: 800; font-size: 13px; padding: 6px 16px; border-radius: 20px; border: 1px solid #bfdbfe;">
          Ticket ID: ${ticketId}
        </span>
      </div>

      <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-top: 20px;">
        Hello <strong>${name}</strong>,
      </p>
      
      <p style="color: #475569; font-size: 14px; line-height: 1.6;">
        We have received your support inquiry regarding <strong>"${category}"</strong> under Ticket ID <strong>${ticketId}</strong>. Our support team is reviewing your ticket and will respond to you shortly.
      </p>

      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 18px; border-radius: 12px; margin: 24px 0;">
        <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Your Message Copy:</h4>
        <p style="margin: 0; color: #475569; font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${message}</p>
      </div>

      <p style="color: #64748b; font-size: 13px; margin-top: 24px;">
        Best regards,<br />
        <strong style="color: #0f172a;">RoadAware Support Desk Team</strong>
      </p>
    </div>
  `;

  try {
    await Promise.allSettled([
      sendMail({
        to: companyEmail,
        subject: `[Support Desk #${ticketId}] ${category} - ${name}`,
        html: companyHtml,
        replyTo: email,
        senderName: 'RoadAware Support Desk',
      }),
      sendMail({
        to: email,
        subject: `Support Ticket Received [${ticketId}]: ${category}`,
        html: userHtml,
        senderName: 'RoadAware Support Desk',
      }),
    ]);
    console.log(`📧 Support Desk Inquiry emails sent for ticket ${ticketId} (${email})`);
    return true;
  } catch (err) {
    console.error('📧 Error sending support desk inquiry email:', err.message);
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

  return await sendMail({
    to: reporterEmail,
    subject: `[RoadAware] Status Updated: ${title} is now ${formattedNew}`,
    html,
    senderName: 'RoadAware Alert',
  });
};
