/*
This code snippet creates a router using Express framework in Node.js.
It defines various POST endpoints for user authentication such as registration, login, forgot password, verifying OTP, and resetting password.
It also exports the router for use in other parts of the application.
*/
const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
// const validateUser = require('../validators/validate');

const { body } = require('express-validator');
/*
This code snippet defines validation rules for user input using the express-validator library in Node.js.
It checks that the 'name' field is not empty and has a minimum length of 3 characters, the 'email' field is a valid email,
and the 'password' field has a minimum length of 5 characters. If any of these validations fail, it provides a custom error message.
*/
const validateUser = [
    body('name').not().isEmpty().withMessage('Name require'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').not().isEmpty().withMessage('Please enter a password')
        .isLength({ min: 8 })
        .withMessage('Please enter a password with at least 8 characters')
        .isStrongPassword()
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('phone').isMobilePhone().withMessage('Please enter a valid phone number'),

]


router.post('/register', validateUser, authController.register);

router.post('/login', authController.login);

router.get('/verify', authController.VerifyToken);

router.post('/forgot-password', authController.forgotPassword);

router.post('/verify-otp', authController.verifyPasswordResetOTP);

router.post('/reset-password', authController.login);


module.exports = router

