const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AccessToken = require('../models/AccessToken');
const Address = require('../models/Address');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require("dotenv").config();

exports.deleteAddresses = async (req, res) => {
  try {
    const { addressIds } = req.body;

    await Address.deleteMany({ _id: { $in: addressIds } });

    res.json({ message: 'Addresses deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.generatePasswordResetToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const token = jwt.sign({ user_id: user._id }, 'your-secret-key', { expiresIn: '15m' });

    res.json({ message: 'Password reset token generated and sent to your email' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyResetPasswordToken = async (req, res) => {
  try {
    const { password, confirm_password } = req.body;
    const token = req.params.passwordResetToken;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (password !== confirm_password) {
      return res.status(400).json({ error: 'Password and confirm password do not match' });
    }

    const user = await User.findById(decoded.user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    // Check if req.file exists (multer middleware should add this to the request)
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // You can process the uploaded image here
    // For example, save it to a folder or upload it to a cloud storage service

    res.json({ message: 'Profile image uploaded successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserWithAddresses = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate('addresses');

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.createAddress = async (req, res) => {
  try {
    const { address, city, state, pin_code, phone_no } = req.body;

    // Create a new address
    const newAddress = new Address({
      user_id: req.user._id,
      address,
      city,
      state,
      pin_code,
      phone_no,
    });

    await newAddress.save();

    res.json({ message: 'Address created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, firstname, lastname } = req.body;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      firstname,
      lastname,
    });

    await newUser.save();

    res.status(201).json({ Message: "User registered successfully", Code :"201" });
  } catch (error) {
    res.status(400).json({ Message:"User already registered", Code :"400"});
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({ jwt: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getUserData = (req, res) => {
res.json(req.user);
};
