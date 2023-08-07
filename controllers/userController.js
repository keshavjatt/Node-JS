const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AccessToken = require('../models/AccessToken');
const Address = require('../models/Address');
const jwt = require('jsonwebtoken');

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

    const token = jwt.sign({ user_id: user._id }, 'Coder_Token#123', { expiresIn: '1h' });

    res.json({ jwt: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getUserData = (req, res) => {
res.json(req.user);
};
