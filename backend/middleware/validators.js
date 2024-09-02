const { check, validationResult } = require('express-validator');

const validateRegister = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
];

const validateForgotPassword = [
  check('email', 'Please include a valid email').isEmail(),
];

const validateResetPassword = [
  check('resetToken', 'Reset token is required').not().isEmpty(),
  check('newPassword', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

const validateUpdateProfile = [
  check('username', 'Username is required').optional().not().isEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
  check('password', 'Password must be at least 6 characters').optional().isLength({ min: 6 }),
];

module.exports = { validateRegister, validateLogin, validateForgotPassword, validateResetPassword, validateUpdateProfile };
