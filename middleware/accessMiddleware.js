const data = require("../models/User")
const AccessToken = require('../models/AccessToken');

const verifyAccessToken = async (req, res, next) => {
  const access_token = req.headers.access_token;

  if (!access_token) {
    return res.status(400).json({ error: 'Access token missing' });
  }

  try {
    const token = await AccessToken.findOne({ where: { access_token } });

    if (!token || token.expiry < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired access token' });
    }

    const user = await User.findByPk(token.user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Error verifying access token' });
  }
};

module.exports = verifyAccessToken;
  