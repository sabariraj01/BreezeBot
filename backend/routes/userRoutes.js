const express = require('express');
const {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  validateToken
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin, validateForgotPassword, validateResetPassword, validateUpdateProfile } = require('../middleware/validators');
const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');

const router = express.Router();

router.use(apiKeyMiddleware); // Apply API key middleware to all routes

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, authUser);
router.post('/logout', protect, logoutUser);
router.get('/validateToken', validateToken); // New route for token validation
router.route('/profile').get(protect, getUserProfile).put(protect, validateUpdateProfile, updateUserProfile);
router.post('/forgotpassword', validateForgotPassword, forgotPassword);
router.put('/resetpassword', validateResetPassword, resetPassword);

module.exports = router;
