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

export const sendWelcomeRegistrationEmail = async ({ name, email }) => {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn('⚠️ SMTP credentials missing (SMTP_USER/SMTP_PASS). Welcome email skipped.');
    return false;
  }

  const welcomeMailOptions = {
    from: process.env.SMTP_FROM || `"RoadAware Team" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Welcome to RoadAware, ${name}! 🎉 Registration Successful`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 20px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
        
        {/* Header Branding */}
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

        {/* Feature Cards Grid */}
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; border-radius: 16px; margin: 24px 0;">
          <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 15px; font-weight: 700;">What you can do with your account:</h3>
          
          <div style="margin-bottom: 14px; display: flex; align-items: flex-start;">
            <span style="font-size: 18px; margin-right: 10px;">🚨</span>
            <div>
              <strong style="color: #0f172a; font-size: 14px;">Report Road Hazards</strong>
              <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px; line-height: 1.4;">Snap photos, tag GPS coordinates, and alert municipal authorities to potholes, broken streetlights, or debris.</p>
            </div>
          </div>

          <div style="margin-bottom: 14px; display: flex; align-items: flex-start;">
            <span style="font-size: 18px; margin-right: 10px;">📍</span>
            <div>
              <strong style="color: #0f172a; font-size: 14px;">Interactive Live Map</strong>
              <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px; line-height: 1.4;">Explore real-time hazard hotspots, view resolution status, and stay safe on your daily commutes.</p>
            </div>
          </div>

          <div style="display: flex; align-items: flex-start;">
            <span style="font-size: 18px; margin-right: 10px;">🏆</span>
            <div>
              <strong style="color: #0f172a; font-size: 14px;">Community Leaderboard</strong>
              <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px; line-height: 1.4;">Earn points, upvote critical hazard reports, and unlock community observer badges.</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
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
    `,
  };

  try {
    const result = await Promise.race([
      transporter.sendMail(welcomeMailOptions),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Welcome email sending timed out')), 8000))
    ]);
    console.log(`📧 Registration Welcome Email successfully sent to ${email}`);
    return true;
  } catch (err) {
    console.error(`📧 Error/Timeout sending welcome email to ${email}:`, err.message);
    return false;
  }
};
