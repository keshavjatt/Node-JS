const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AccessToken = require('../models/AccessToken');

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

    
    res.json({ access_token: user._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
  const accessToken = require('crypto').createHash('md5').update(Math.random().toString()).digest('hex');

  
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 1);

  
  const newToken = new AccessToken({
    user_id: user._id,
    access_token: accessToken,
    expiry: expiry,
  });
  await newToken.save();

  res.json({ access_token: accessToken });
};



exports.getUserData = (req, res) => {
  res.json(req.user);
};
