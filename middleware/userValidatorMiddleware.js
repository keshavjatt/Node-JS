const { validateUser } = require('../validators/userValidator');

const userValidatorMiddleware = (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json({ message: 'Incorrect Email ID', code: 'Invalid Input' });
  }
  next();
};

module.exports = userValidatorMiddleware;
