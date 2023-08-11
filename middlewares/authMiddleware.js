const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();
exports.validateJWT = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Access token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
       
        return res.status(401).json({ error: 'Invalid access token',error:err });
      }

      const user = await User.findById(decoded.user_id);

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
