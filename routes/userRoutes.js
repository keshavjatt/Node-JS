const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');

//Pehle user ko register krna hain
router.post('/register', userController.registerUser);

//Uske baad user ko username or password match kra krr Token number dena hain
router.post('/login', userController.loginUser);

module.exports = router;
