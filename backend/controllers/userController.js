const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const authUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      user.token = token;
      await user.save();

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      });

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.token = null;
      await user.save();
    }

    res.cookie('token', '', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), 
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    });
    
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = req.body.username || user.username;

      if (req.body.password) {
        // Check if new password has been used before
        const newPasswordHash = await bcrypt.hash(req.body.password, 10);
        const isUsedBefore = await Promise.all(user.passwordHistory.map(async (history) => {
          return await bcrypt.compare(req.body.password, history.password);
        }));

        if (isUsedBefore.includes(true)) {
          return res.status(400).json({ message: 'New password cannot be the same as any of the previous passwords' });
        }

        user.passwordHistory.push({ password: newPasswordHash });
        if (user.passwordHistory.length > 5) {
          user.passwordHistory.shift(); // Keep only last 5 passwords
        }

        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      const token = generateToken(updatedUser._id);
      user.token = token;
      await user.save();

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      });

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        token,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);

    user.otp = hashedOTP;
    user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const message = `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`;

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset OTP',
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({
      email,
      otpExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
    }

    const isOTPValid = await user.matchOTP(otp);
    if (!isOTPValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Check if new password has been used before
    const isUsedBefore = await Promise.all(user.passwordHistory.map(async (history) => {
      return await bcrypt.compare(newPassword, history.password);
    }));

    if (isUsedBefore.includes(true)) {
      return res.status(400).json({ message: 'New password cannot be the same as any of the previous passwords' });
    }

    user.passwordHistory.push({ password: newPasswordHash });
    if (user.passwordHistory.length > 5) {
      user.passwordHistory.shift(); // Keep only last 5 passwords
    }

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const validateToken = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user || user.token !== token) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.status(200).json({ message: 'Token is valid', user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Token validation failed:', error.message);
    res.status(401).json({ message: 'Token validation failed' });
  }
};

module.exports = {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  validateToken
};
