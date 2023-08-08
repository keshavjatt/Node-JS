const express = require("express");
const { userRegistrationValidator, userLoginValidator } = require('../validators/userValidator');
const { registerUser, loginUser, getUserData, createAddress, getUserWithAddresses, deleteAddresses, generatePasswordResetToken, verifyResetPasswordToken, uploadProfileImage } = require('../controllers/userController');
const { validateJWT } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); 

const router = express.Router();

router.post('/register', userRegistrationValidator, registerUser);
router.post('/login', userLoginValidator, loginUser);
router.get('/get', validateJWT, getUserData);
router.post('/address', validateJWT, createAddress);
router.get('/get/:id', validateJWT, getUserWithAddresses);

router.delete('/address', validateJWT, deleteAddresses);
router.post('/forgot-password', generatePasswordResetToken);
router.put('/verify-reset-password/:passwordResetToken', verifyResetPasswordToken);
router.put('/profile-image', validateJWT, upload.single('profileImage'), uploadProfileImage);

module.exports = router;
