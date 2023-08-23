const bcrypt = require('bcryptjs');
const User = require('../models/User');
const crypto = require('crypto');
const AccessToken = require('../models/AccessToken');
const Address = require("../models/Address");
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const { sendEmail } = require('../emailService');


const createUser = async (req, res) => {
  const { username, password,confirmPassword, email, firstname, lastname } = req.body;

  try {
   const hashedPassword = await bcrypt.hash(password, 10);
   
    if(password !== confirmPassword)
    return res.status(500).json({success:false, message:"Password didn't match"})
    
    await User.create({
      username,
      password: hashedPassword,
      email,
      firstname,
      lastname,
    });

    return res.status(201).json({ message: "User registered successfully",code:"200" });
  } catch (error) {
    console.error(error.toString())
    return res.status(400).json({ message: "User already exist", code:"400" });
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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN, { expiresIn: '1h' });

    return res.status(200).json({ data: { access_token: token }, message: "Login successful" , code:"200" });
  } catch (error) {
    return res.status(400).json({ error: "Error during login", code:"400" });
  }
};

const getUserData = async (req, res) => {
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
  const pageSize = 1;
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

const addAddress = async (req, res) => {
  const { address, city, state, pin_code, phone_no } = req.body;
  const userId = req.user.id;
  try {
    
    await Address.create({
      user_id: userId,
      address,
      city,
      state,
      pin_code,
      phone_no,
    });

    return res.status(201).json({ message: 'Address added successfully' });
  } catch (error) {
    return res.status(400).json({ error: 'Error adding address',err:error });
  }
};

const getUserWithAddresses = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: [Address],
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    return res.status(200).json({ data: user, message: 'User data retrieved successfully' });
  } catch (error) {
    return res.status(400).json({ error: 'Error retrieving user data' });
  }
};

const deleteAddresses = async (req, res) => {
  const addressIds = req.body.addressIds;
  const userId = req.user.id;

  try {
    await Address.destroy({
      where: {
        id: addressIds,
        user_id: userId,
      },
    });

    return res.status(200).json({ message: 'Addresses deleted successfully' });
  } catch (error) {
    return res.status(400).json({ error: 'Error deleting addresses' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    
    const token = jwt.sign({ userId: user.id,email:user.email }, process.env.JWT_TOKEN, { expiresIn: '1h' });
    sendEmail(email,token)
    // Send email with token using SendGrid
//     sgMail.setApiKey(process.env.SENDGRIP_API_KEY); // Replace with your SendGrid API key
// console.log(email,token,'===========')
//     const msg = {
//       to: email,
//       from: 'thecoder780@gmail.com',
//       subject: 'Password Reset',
//       text: 'Click the following link to reset your password: ' + token,
//     };

//     await sgMail.send(msg).then(() => {}, error => {
//       console.error(error,'---------');
  
//       if (error.response) {
//         console.error(error.response.body);
//       }
//     });
    return res.status(200).json({ message: 'Password reset token sent to your email' });
  } catch (error) {
    return res.status(400).json({ error: 'Error generating password reset token' });
  }
};

const verifyResetPassword = async (req, res) => {
  const passwordResetToken = req.params.ResetToken;
  console.log(passwordResetToken);
  const { password } = req.body;

  try {
    const decodedToken = jwt.verify(passwordResetToken, process.env.JWT_TOKEN);

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update({ password: hashedPassword }, { where: { id: decodedToken.userId } });

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid or expired password reset token' });
  }
};

const uploadProfileImage = async (req, res) => {
  const userId = req.user.id;
  const imagePath = req.file.path;

  try {
    await User.update({ profile_image: imagePath }, { where: { id: userId } });

    return res.status(200).json({ message: 'Profile image uploaded successfully' });
  } catch (error) {
    return res.status(400).json({ error: 'Error uploading profile image' });
  }
};

module.exports = { createUser, loginUser, getUserData,deleteUserData, 
                  getUserList, addAddress, getUserWithAddresses, deleteAddresses, 
                  forgotPassword, verifyResetPassword, uploadProfileImage };
