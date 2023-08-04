const AccessToken = require("../models/AccessToken");

exports.validateAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.header('access_token');

    if (!accessToken) {
      return res.status(400).json({ error: 'Access token not provided' });
    }

    const token = await AccessToken.findOne({ access_token: accessToken });

    if (!token) {
      return res.status(400).json({ error: 'Invalid access token' });
    }

    if (token.expiry < new Date()) {
      return res.status(400).json({ error: 'Expired access token' });
    }

    req.user = token.user_id;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
