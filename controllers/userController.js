const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async (req, res) => {
  const { username, password,confirmPassword, email, firstname, lastname } = req.body;

  try {
   const hashedPassword = await bcrypt.hash(password, 10);
   
    if(password !== confirmPassword)
    return res.status(500).json({success:false, message:"Password didn't match"})
    // Create the user
    await User.create({
      username,
      password: hashedPassword,
      email,
      firstname,
      lastname,
    });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.toString())
    return res.status(400).json({ error: 'Error registering user' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    return res.status(200).json({ data: { access_token: user.id }, message: 'Login successful' });
  } catch (error) {
    return res.status(400).json({ error: 'Error during login' });
  }
};

const getUserData = async (req, res) => {
  console.log("abcd")
  const userId = req.user.id;
  console.log(userId)
  try {
    const user = await User.findByPk(userId);
    console.log(user)
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    return res.status(200).json({ data: user, message: 'User data retrieved successfully' });
  } catch (error) {
    return res.status(400).json({ error: 'Error retrieving user data' });
  }
};

const deleteUserData = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    await user.destroy();
    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    return res.status(400).json({ error: 'Error deleting user' });
  }
};

const getUserList = async (req, res) => {
  const page = parseInt(req.params.page);
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  try {
    const users = await User.findAll({
      limit: pageSize,
      offset: offset,
    });

    return res.status(200).json({ data: users, message: 'User list retrieved successfully' });
  } catch (error) {
    return res.status(400).json({ error: 'Error retrieving user list' });
  }
};

module.exports = { createUser, loginUser, getUserData,deleteUserData, getUserList };
