const User = require("../models/User")
const AccessToken = require('../models/AccessToken');
const jwt = require('jsonwebtoken');

const verifyAccessToken = async (req, res, next) => {
  const access_token = req.headers.access_token;

  if (!access_token) {
    return res.status(400).json({ message: "Access token missing", code: "400" });
  }

  try {
    const decodedToken = jwt.verify(access_token, process.env.JWT_TOKEN);
    const user = await User.findByPk(decodedToken.userId);

    if (!user) {
      return res.status(400).json({ message: "User not found", code: "400" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Invalid access token", code: "400" });
  }
};

module.exports = verifyAccessToken;
  