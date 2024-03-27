/*
This code snippet exports a function named register that is an asynchronous function. It takes in two parameters, req and res, which represent the request and response objects in an Express.js application.Inside the function, there are two comments indicating that there should be validation of the data before creating a user and creating a user in the database. However, the actual implementation of these tasks is missing from the code snippet.Finally, the function sends the string 'auth' as the response using the res.send() method.
*/
const { validationResult } = require('express-validator');
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { Token } = require('../models/token');

const ACCESS_TOKEN = '@##$$IHUGFYUGHHJYGKGKKGKUKKKGU'
const REFRESH_TOKEN_SECRET = '@##$$IHUGFYUGHHJYGKG'

exports.register = async (req, res) => {
    /*
    This code snippet defines a function called "register" that handles the registration of a user. It first validates the request data, then creates a new user in the database using the provided data and a hashed password.
    If validation fails, it returns an error response with the validation messages. If an error occurs during user creation, it returns a 500 error response with the error details.
    The function takes in the request and response objects as parameters. It first checks if there are any validation errors in the request data. If there are errors, it returns a 400 error response with the validation messages.
    If there are no validation errors, it creates a new User object with the request data and a hashed password using the bcrypt library. It then saves the user object to the database using the save() method. If the save operation fails,
    it returns a 500 error response with the error details. If the save operation is successful, it returns a 201 success response with the saved user object.
    If an error occurs during the save operation, it checks if the error message includes the string 'email_1 dup key'. If it does, it means that there was a duplicate key error related to the email field,
    indicating that a user with the same email already exists in the database. In this case, it returns a 409 error response with an AuthError indicating that a user with a same email already exists.
    If the error message does not include 'email_1 dup key', it means that there was some other type of error. In this case, it returns a 500 error response with the error type and message.
    Overall, this code snippet handles the registration of a user by validating the request data, creating a new user object, saving it to the database, and returning appropriate responses based on the success or failure of these operations.
    */

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
        /*
        The user.save() method returns a promise that resolves to the saved user object if the save operation is successful. If the save operation fails, it returns null.In the code snippet, the if (!user) condition is checking if the user object is falsy (i.e., null or undefined). If it is falsy, it means that the save operation failed and an internal server error response is returned with a status code of 500 and a JSON object containing the error details.If the user object is truthy (i.e., the save operation was successful), a success response is returned with a status code of 201 and the saved user object is sent as the JSON response.
        */
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
        /*
                This code snippet checks if the error message includes the string 'email_1 dup key'. If it does, it means that there was a duplicate key error related to the email field, which indicates that a user with the same email already exists in the database. In this case, it returns a 409 status code with a JSON response indicating an AuthError with an empty message.If the error message does not include 'email_1 dup key', it means that there was some other type of error. In this case, it returns a 500 status code with a JSON response containing the error type and message.
        */
        if (error.message.includes('email_1 dup key')) {
            return res.status(409).json({
                type: 'AuthError',
                message: 'A user with a same email already exists'
            })
        }
        return res.status(500).json({ type: error.message, message: error.message });
    }
};
// Register Function End

// Login Function Start
exports.login = async (req, res) => {
    /*
This code snippet defines an asynchronous function called login that handles user authentication.
It first retrieves the user's email and password from the request body.
Then it checks if the email exists in the database by querying the user collection.
If the user is not found, it returns a JSON response with a 404 status code and an error message.
If the user is found, it checks if the provided password matches the hashed password stored in the database.
If the password is incorrect, it returns a JSON response with a 400 status code and an error message.
If the password is correct, it generates a JSON Web Token (JWT) using the jsonwebtoken library. The token contains the user's ID and admin status.
The token is signed using a secret stored in the process.env.ACCESS_TOKEN environment variable and has an expiration time of 24 hours.
If any errors occur during the process, it returns a JSON response with a 500 status code and the error message.
Overall, this code snippet handles the login process by validating user credentials, generating an access token, and handling error scenarios.
*/
    try {
        // first we get the users email and password from the request body.
        const { email, password } = req.body;
        // then we check if the email exists in the database
        const user = await User.findOne({ email });
        // if the user is not found, we return an error response
        if (!user) {
            return res.json({ status: 404, message: "user not found\nCheck your email and try again" });
        }
        // if the user is found, we check if the password is correct

        /*
        In this code, bcrypt.compareSync(password, user.passwordHash) compares the provided password
        with the hashed password stored in the user.passwordHash variable.
        If the passwords do not match, it means the password is incorrect.
        The code then returns a JSON response with a 400 status code and an "Incorrect password" message.
        Please note that this code assumes you have the bcrypt library installed and imported correctly.
        Additionally, the code assumes that the password and user.passwordHash variables are properly defined and contain the respective values.
         */
        if (!bcrypt.compareSync(password, user.passwordHash)) {
            // if the password is incorrect, we return a success response
            return res.status(400).json({ message: "Incorrect password" });
        }
        // we should create access token

        /* This code snippet is using the jwt.sign method from the jsonwebtoken library to generate a JSON Web Token (JWT) for user authentication.
        It's signing the payload { id: user.id, isAdmin: user.isAdmin } with the access token secret stored in the process.env.ACCESS_TOKEN environment variable,
        and setting an expiration time of 24 hours for the token. */
        const accesstoken = jwt.sign(
            { id: user.id, isAdmin: user.isAdmin },
            ACCESS_TOKEN,
            { expiresIn: '24h' }
        );

        const refreshtoken = jwt.sign(
            /*
            using the jwt.sign method to generate a JSON Web Token (JWT) for refreshing the user's authentication.
            The method takes three arguments: the payload, the secret key, and options such as expiration time.
            In this case, the payload includes the user's id and isAdmin status, the secret key is retrieved from the process.env.REFRESH_TOKEN_SECRET,
            and the token is set to expire in 60 days.
             */
            { id: user.id, isAdmin: user.isAdmin },
            REFRESH_TOKEN_SECRET,
            { expiresIn: '60d' }
        );
        /*
        The code snippet you provided is written in JavaScript and is used to manage tokens for an API.
        It uses an await keyword to handle asynchronous operations. Here's a breakdown of what the code does:
        It finds a token by calling the findOne method on the token object, passing in the userId property as a filter.
        If a token is found (if (token)), it performs the following actions:
        Deletes the existing token by calling the deleteOne method on the token object.
        Creates a new token by calling the token constructor and passing in the userId, accesstoken, and refreshtoken properties.
        Saves the new token by calling the save method on the newly created token object.
        Please note that without further context or access to the codebase,
        it's difficult to provide more specific details about the purpose or functionality of this code snippet.
        */
        const token = await Token.findOne({ userId: user.id });
        //i think here is where the error happens
        if (token) await token.deleteOne();
        await new Token({ userId: user.id, accesstoken, refreshtoken }).save();
        user.passwordHash = undefined;
        return res.json({ ...user._doc, accesstoken });
    } catch (error) {
        return res.status(500).json({ type: error.name, message: error.message });
    }
};
// Login Function End

exports.VerifyToken = async (req, res) => {
    /*
This code defines an asynchronous function named VerifyToken that checks
if there is an access token in the request headers. If no token is found, it returns a JSON response with false.
If an error occurs, it returns a 500 status with the error details. Finally, it sends the string 'auth' as the response.
   */
    try {
        /* The code snippet you provided is checking if the authorization header exists in the req.headers object.
            If it does not exist, the code will not proceed further and will likely result in an error.
            If the header does exist, it will be assigned to the accessToken variable.
        */
        let accessToken = req.headers.authorization;

        if (!accessToken) return res.json(false);
        /*
        The code you provided is written in JavaScript and it replaces the string 'Bearer ' with an empty string in the accessToken variable.
        The trim() method is then called to remove any leading or trailing whitespace from the resulting string.
        */
        accessToken = accessToken.replace('Bearer ', '').trim();
        /*
        The code snippet const token = await Token.findOne({ accessToken }); is using the Mongoose model
        Token to find a document in the database that matches the provided accessToken.
        Here's a breakdown of what the code is doing:
        Token.findOne() is a Mongoose method that searches for a document in the Token collection that matches the specified query.
        { accessToken } is the query object that specifies the condition for the search. In this case, it's searching for a document where the accessToken field matches the value of the accessToken variable.
        await is used to wait for the findOne() method to complete and return the result. Since it's an asynchronous operation, await ensures that the code execution pauses until the result is returned.
        The result of the findOne() method is assigned to the token variable. If a matching document is found, it will be stored in the token variable. If no matching document is found, the token variable will be null.
        So, in summary, this code is searching for a document in the Token collection that has an accessToken field matching the value of the accessToken variable.
        */
        const token = await Token.findOne({ accessToken });
        if (!token) return res.json(false);
        const tokenData = jwt.decode(token.refreshtoken);
        /*
        After finding the token, it decodes the refreshtoken property of the token using jwt.decode().
        This function decodes the token without verifying its signature.
        */
        const user = await User.findById(tokenData.id);
        if (!user) return res.json(false);
        const isValid = jwt.verify(
            token.refreshtoken,
            REFRESH_TOKEN_SECRET);
        if (!isValid) return res.json(false);
        return res.json(true);
        /*
        It looks like you are using JWT for token verification.
        This code first finds a user by their ID, then checks if the user exists. After that,
        it verifies the refresh token using the JWT library and returns a boolean value based on the verification result.
        */
    } catch (error) {
        return res.status(500).json({ type: error.name, message: error.message });
    }
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
exports.verifyPasswordResetOTP = async (req, res) => {

    res.send('auth');
};
/*
This code exports an asynchronous function called resetPassword that takes in two parameters: req and res.
When this function is called, it sends the string 'auth' as the response.
*/
exports.resetPassword = async (req, res) => {

    res.send('auth');
};

