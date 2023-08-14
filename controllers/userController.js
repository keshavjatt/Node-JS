const User = require('../models/user');

const userController = {
  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password 
      });

      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'An error occurred while creating the user' });
    }
  },

  getAllUsers: async (req, res) => {
    
  },

  getUserById: async (req, res) => {
    
  },

  updateUserById: async (req, res) => {
    
  },

  deleteUserById: async (req, res) => {
    
  }
};

module.exports = userController;
