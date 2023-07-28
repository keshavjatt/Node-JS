const express = require('express');
const router = express.Router();
const AccountController = require("../controllers/userControllers");

router.post('/register',AccountController.register);

module.exports = router;
 
