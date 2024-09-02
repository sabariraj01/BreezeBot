const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const passwordHistorySchema = new mongoose.Schema({
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  otp: { type: String },
  otpExpire: { type: Date },
  passwordHistory: [passwordHistorySchema]
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next()
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.matchOTP = async function (enteredOTP) {
  return await bcrypt.compare(enteredOTP, this.otp);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
