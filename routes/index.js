const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userProfileController = require('../controllers/userProfileController');

router.post('/users', userController.createUser);

router.post('/userprofiles', userProfileController.createUserProfile);

// router.get('/users', userController.getAllUsers);

// router.get('/users/:id', userController.getUserById);

// router.put('/users/:id', userController.updateUserById);

// router.delete('/users/:id', userController.deleteUserById);

module.exports = router;
