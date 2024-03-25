/*
This code snippet exports a function named register that is an asynchronous function. It takes in two parameters, req and res, which represent the request and response objects in an Express.js application.Inside the function, there are two comments indicating that there should be validation of the data before creating a user and creating a user in the database. However, the actual implementation of these tasks is missing from the code snippet.Finally, the function sends the string 'auth' as the response using the res.send() method.
*/
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
/*
This code snippet defines a function called "register" that handles the registration of a user. It first validates the request data, then creates a new user in the database using the provided data and a hashed password. If validation fails, it returns an error response with the validation messages. If an error occurs during user creation, it returns a 500 error response with the error details.
*/
exports.register = async (req, res) => {
    //validate the data before creating a user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => ({
            field: error.path,
            message: error.msg,
        }));
        return res.status(400).json({ error: errorMessages });
    }
    // tap into the database and create a new user in the user collection in the database.
    try {
        let user = new User({
            ...req.body,
            passwordHash: await bcrypt.hash(req.body.password, 8),
        });
        user = await user.save();
        if (!user) {
            return res.status(500)
                .json({
                    type: 'Internal server error',
                    message: 'could not create user'
                });
        }
        return res.status(201).json(user);
    } catch (error) {
        if (error.message.include('email_1 dup key')) {
            return res.status(409).json({
                type: 'AuthError',
                message: ''
            })
        }
        return res.status(500).json({ type: error.message, message: error.message });
    }

};
/*
This code defines a function called login that uses async to handle asynchronous operations.
It sets the HTTP status to 201 and sends a JSON response with the name and age.
*/
exports.login = async (req, res) => {

    res.status(201).json({ name: 'Casey', age: 20, });
};
/*
This code exports a function called forgotPassword as a module.
When this function is called, it sends the string 'auth' as a response to the client making the request.
The function is defined as an asynchronous function, indicated by the async keyword.
*/
exports.forgotPassword = async (req, res) => {

    res.send('auth');
};
/*
This code snippet exports an asynchronous function named verifyOTP
that sends the string 'auth' as a response when called with request
and response objects in a Node.js environment.
*/
exports.verifyPasswordOTP = async (req, res) => {

    res.send('auth');
};
/*
This code exports an asynchronous function called resetPassword that takes in two parameters: req and res.
When this function is called, it sends the string 'auth' as the response.
*/
exports.resetPassword = async (req, res) => {

    res.send('auth');
};

