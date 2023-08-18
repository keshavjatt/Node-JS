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

router.post(
  '/address',
  verifyAccessToken,
  [
    body('address').notEmpty(),
    body('city').notEmpty(),
    body('state').notEmpty(),
    body('pin_code').notEmpty(),
    body('phone_no').notEmpty(),
    validate,
  ],
  userController.addAddress
);

router.get(
  '/get/:id',
  verifyAccessToken,
  userController.getUserWithAddresses
);

module.exports = router;
