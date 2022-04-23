const express = require('express');
const authController = require('./auth.controller');
const controller = require('./user.controller');
const router = express.Router();

router.post('/signup', authController.signup());
router.post('/login', authController.login());
router.post('/forgotPassword', authController.forgotPassword());
router.patch('/resetPassword/:token', authController.resetPassword());
router.get('/logout', authController.logout());

// Protect all routes after this middleware
router.use(authController.protect());

router.get('/me', controller.getMe(), controller.getById());


module.exports = router;
