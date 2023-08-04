const express = require('express');
const { userRegistrationValidator, userLoginValidator } = require('../validators/userVAlidator');
const { registerUser, loginUser, getUserData } = require('../controllers/userController');
const { validateAccessToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', userRegistrationValidator, registerUser);
router.post('/login', userLoginValidator, loginUser);
router.get('/get', validateAccessToken, getUserData);

module.exports = router;
