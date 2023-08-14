const UserProfile = require('../models/userProfile');

const userProfileController = {
  createUserProfile: async (req, res) => {
    try {
        const { dob, mobileNo } = req.body;
  
        const newUserProfile = await UserProfile.create({
          dob,
          mobileNo
        });
  
        return res.status(201).json({ message: 'User profile created successfully', userProfile: newUserProfile });
      } catch (error) {
        console.error('Error creating user profile:', error);
        return res.status(500).json({ message: 'An error occurred while creating the user profile' });
      }
  },

  getAllUserProfiles: async (req, res) => {
    
  },

  getUserProfileById: async (req, res) => {
   
  },

  updateUserProfileById: async (req, res) => {
   
  },

  deleteUserProfileById: async (req, res) => {
    
  }
};

module.exports = userProfileController;
