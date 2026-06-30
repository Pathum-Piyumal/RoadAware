import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';
import { User, Session, Activity } from '../models/index.js';
import { uploadBufferToCloudinary } from '../config/cloudinary.js';

// ─────────────────────────────────────────────
//  Token Helpers
// ─────────────────────────────────────────────
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'roadaware_super_secret_key_2026',
    { expiresIn: '1d' }
  );
};

// ─────────────────────────────────────────────
//  Email Helper (Nodemailer)
// ─────────────────────────────────────────────
const sendResetEmail = async (toEmail, code) => {
  // If no SMTP credentials are configured, fall back to console logging
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📧  PASSWORD RESET CODE (dev log)`);
    console.log(`    To: ${toEmail}`);
    console.log(`    Code: ${code}`);
    console.log(`    Expires in: 15 minutes`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    return;
  }

  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'noreply@roadaware.com',
    to: toEmail,
    subject: 'RoadAware — Password Reset Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px;">
        <h2 style="color: #f97316; margin-bottom: 8px;">RoadAware</h2>
        <h3 style="color: #111; margin-top: 0;">Password Reset Request</h3>
        <p style="color: #555;">Use the verification code below to reset your password. This code is valid for <strong>15 minutes</strong>.</p>
        <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
          <span style="font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #111;">${code}</span>
        </div>
        <p style="color: #888; font-size: 13px;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
};

// ─────────────────────────────────────────────
//  MODULE 1A: Citizen Registration
//  POST /api/auth/register
// ─────────────────────────────────────────────
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    // Hash password and create user with citizen role
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'citizen',
      status: 'active',
    });

    // Generate JWT
    const token = generateToken(user.id);

    // Log activity
    await Activity.create({
      userId: user.id,
      action: 'Account Registered',
      details: `New citizen account registered with email ${email}.`,
    });

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
//  MODULE 1B: Citizen & Admin Login (JWT)
//  POST /api/auth/login
// ─────────────────────────────────────────────
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Check if account is suspended (RBAC enforcement)
    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.',
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Generate JWT
    const token = generateToken(user.id);

    // Log activity
    await Activity.create({
      userId: user.id,
      action: 'Login',
      details: `${user.name} (${user.role}) logged into RoadAware.`,
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
//  MODULE 1C: Admin Login
//  POST /api/auth/admin/login
// ─────────────────────────────────────────────
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access Denied. Admin accounts only.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user.id);

    await Activity.create({
      userId: user.id,
      action: 'Admin Panel Login',
      details: `Administrator ${user.name} logged into console.`,
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
//  MODULE 1D: Forgot Password — Send Reset Code
//  POST /api/auth/forgot-password
// ─────────────────────────────────────────────
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    // Always respond with success to prevent email enumeration attacks
    if (!user) {
      return res.json({
        success: true,
        message: 'If an account exists with this email, a reset code has been sent.',
      });
    }

    // Generate a 6-digit code and store with 15-minute expiry
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    user.resetCode = code;
    user.resetCodeExpires = expires;
    await user.save();

    // Send the code via email (or console log in dev)
    await sendResetEmail(email, code);

    await Activity.create({
      userId: user.id,
      action: 'Password Reset Requested',
      details: `Password reset code generated for ${email}.`,
    });

    res.json({
      success: true,
      message: 'If an account exists with this email, a reset code has been sent.',
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
//  MODULE 1E: Verify Reset Code
//  POST /api/auth/verify-code
// ─────────────────────────────────────────────
export const verifyResetCode = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !user.resetCode || !user.resetCodeExpires) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset code.',
      });
    }

    // Check code match
    if (user.resetCode !== code.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reset code. Please check and try again.',
      });
    }

    // Check code expiry
    if (new Date() > new Date(user.resetCodeExpires)) {
      return res.status(400).json({
        success: false,
        message: 'Reset code has expired. Please request a new one.',
      });
    }

    res.json({
      success: true,
      message: 'Code verified successfully. You may now reset your password.',
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
//  MODULE 1F: Reset Password
//  POST /api/auth/reset-password
// ─────────────────────────────────────────────
export const resetPassword = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !user.resetCode || !user.resetCodeExpires) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset code.',
      });
    }

    if (user.resetCode !== code.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reset code.',
      });
    }

    if (new Date() > new Date(user.resetCodeExpires)) {
      return res.status(400).json({
        success: false,
        message: 'Reset code has expired. Please request a new one.',
      });
    }

    // Hash new password and clear reset fields
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetCode = null;
    user.resetCodeExpires = null;
    await user.save();

    await Activity.create({
      userId: user.id,
      action: 'Password Reset',
      details: `Password was successfully reset for ${email}.`,
    });

    res.json({
      success: true,
      message: 'Password reset successfully. You can now log in.',
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
//  MODULE 1G: Logout
//  GET /api/auth/logout
// ─────────────────────────────────────────────
export const logout = async (req, res, next) => {
  try {
    if (req.user) {
      await Session.destroy({ where: { userId: req.user.id } });

      await Activity.create({
        userId: req.user.id,
        action: 'Logout',
        details: `${req.user.name} logged out.`,
      });
    }
    res.json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
//  MODULE 1H: Get Profile
//  GET /api/auth/profile
// ─────────────────────────────────────────────
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password', 'resetCode', 'resetCodeExpires'] },
    });
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
//  MODULE 1I: Update Profile
//  PUT /api/auth/profile
// ─────────────────────────────────────────────
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);

    if (email && email !== user.email) {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: 'Email address already in use.',
        });
      }
      user.email = email;
    }

    if (name) user.name = name;

    await user.save();

    await Activity.create({
      userId: user.id,
      action: 'Profile Update',
      details: `Updated personal information details.`,
    });

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
//  MODULE 1J: Change Password (Authenticated)
//  PUT /api/auth/change-password
// ─────────────────────────────────────────────
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid current password.',
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    await Activity.create({
      userId: user.id,
      action: 'Password Change',
      details: `Updated password credentials.`,
    });

    res.json({
      success: true,
      message: 'Password changed successfully.',
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
//  MODULE 1K: Upload Avatar
//  POST /api/auth/avatar
// ─────────────────────────────────────────────
export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.',
      });
    }

    const avatarUrl = await uploadBufferToCloudinary(req.file.buffer, 'avatars');

    const user = await User.findByPk(req.user.id);
    user.avatar = avatarUrl;
    await user.save();

    await Activity.create({
      userId: user.id,
      action: 'Avatar Upload',
      details: 'Uploaded a new profile avatar photo.',
    });

    res.json({
      success: true,
      message: 'Avatar uploaded successfully.',
      avatarUrl: user.avatar,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────
//  MODULE 1L: Google OAuth2 Login / Registration
//  POST /api/auth/google
// ─────────────────────────────────────────────
let googleClient;
const getGoogleClient = () => {
  if (!googleClient) {
    const clientId = process.env.VITE_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn('⚠️ GOOGLE_CLIENT_ID is not configured in environment variables.');
    }
    googleClient = new OAuth2Client(clientId);
  }
  return googleClient;
};

export const googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Google ID token is required.',
      });
    }

    const client = getGoogleClient();
    const clientId = process.env.VITE_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
    
    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: avatar } = payload;

    // 1. Find user by googleId
    let user = await User.findOne({ where: { googleId } });

    // 2. If not found by googleId, check by email to link account (e.g. they registered manually before)
    if (!user) {
      user = await User.findOne({ where: { email } });
      if (user) {
        user.googleId = googleId;
        if (!user.avatar && avatar) {
          user.avatar = avatar;
        }
        await user.save();
      }
    }

    // 3. If still not found, register new user
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        role: 'citizen',
        status: 'active',
        avatar,
        password: null,
      });

      // Log registration activity
      await Activity.create({
        userId: user.id,
        action: 'Account Registered',
        details: `New citizen account registered via Google with email ${email}.`,
      });
    }

    // 4. Check if suspended
    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been suspended. Please contact support.',
      });
    }

    // Generate JWT token
    const appToken = generateToken(user.id);

    // Log login activity
    await Activity.create({
      userId: user.id,
      action: 'Login',
      details: `${user.name} logged into RoadAware via Google.`,
    });

    res.json({
      success: true,
      token: appToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid Google ID token.',
    });
  }
};
