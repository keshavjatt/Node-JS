const User = require('../models/user');

async function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to register user" });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      res.status(400).json({ error: "Invalid username or password" });
    } else {
      res.status(200).json({ Access_Token : user._id });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { registerUser, loginUser };
