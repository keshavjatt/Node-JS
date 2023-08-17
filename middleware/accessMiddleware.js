const data = require("../models/User")
const verifyAccessToken = async (req, res, next) => {
    const access_token = req.headers.access_token;
    console.log(access_token,"ftgbfv")
  
    if (!access_token) {
      return res.status(400).json({ error: 'Access token missing' });
    }
  
    try {
      const user = await data.findByPk(access_token);
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid access token' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      return res.status(400).json({ error: 'Error verifying access token' });
    }
  };
  
  module.exports = verifyAccessToken;
  