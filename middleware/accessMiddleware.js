const User = require("../models/User")
const AccessToken = require('../models/AccessToken');
const jwt = require('jsonwebtoken');

const verifyAccessToken = async (req, res, next) => {
  const access_token = req.headers.access_token;

  if (!access_token) {
    return res.status(400).json({ error: 'Access token missing' });
  }

  try {
    const decodedToken = jwt.verify(access_token, 'ABC');
    const user = await User.findByPk(decodedToken.userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error: 'Invalid access token' });
  }
};

module.exports = verifyAccessToken;
  