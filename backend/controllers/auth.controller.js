import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Session, Activity } from '../models/index.js';
import { uploadBufferToCloudinary } from '../config/cloudinary.js';

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'roadaware_super_secret_key_2026',
    { expiresIn: '1d' }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET || 'roadaware_refresh_key_2026',
    { expiresIn: '7d' }
  );
};



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

    // Create activity log
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

export const logout = async (req, res, next) => {
  try {
    if (req.user) {
      // Clear sessions
      await Session.destroy({ where: { userId: req.user.id } });

      // Log activity
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

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

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
