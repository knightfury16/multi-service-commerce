const express = require('express');
const router = new express.Router();
const userController = require('./../controllers/user');
const { auth } = require('../middleware/auth');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/logout', userController.logout);

// ** get user profile -> api/user/me
// !Auth1
router.get('/me', auth, userController.getUserProfile);

// ** update user profile -> api/user/update/me
// !Auth1
router.post('/update/me', auth, userController.updateUserProfile);

// ** update user password -> api/user/password/update
// !Auth1
router.post('/password/update', auth, userController.updatePassword);

module.exports = router;
