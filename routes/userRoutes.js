const express = require("express");
const { userRegistrationValidator, userLoginValidator } = require('../validators/userVAlidator');
const { registerUser, loginUser, getUserData, createAddress, getUserWithAddresses } = require('../controllers/userController');
const { validateJWT } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', userRegistrationValidator, registerUser);
router.post('/login', userLoginValidator, loginUser);
router.get('/get', validateJWT, getUserData);
router.post('/address', validateJWT, createAddress);
router.get('/get/:id', validateJWT, getUserWithAddresses);

module.exports = router;
