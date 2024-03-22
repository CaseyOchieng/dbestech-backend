/*
This code snippet creates a router using Express framework in Node.js.
It defines various POST endpoints for user authentication such as registration, login, forgot password, verifying OTP, and resetting password.
It also exports the router for use in other parts of the application.
*/
const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);

router.post('/verify-otp', authController.verifyPasswordOTP);

router.post('/reset-password', authController.login);


module.exports = router