const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validationMiddleware');
const verifyAccessToken = require('../middleware/accessMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').notEmpty(),
    body('password').notEmpty(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
    body('email').isEmail(),
    body('firstname').notEmpty(),
    body('lastname').notEmpty(),
    validate,
  ],
  userController.createUser
);

router.post(
  '/login',
  [
    body('username').notEmpty(),
    body('password').notEmpty(),
    validate,
  ],
  userController.loginUser
);

router.get(
  '/get',
  verifyAccessToken,
  userController.getUserData
);

router.put(
  '/delete',
  verifyAccessToken,
  userController.deleteUserData
);

router.get(
  '/list/:page',
  userController.getUserList
);

module.exports = router;
