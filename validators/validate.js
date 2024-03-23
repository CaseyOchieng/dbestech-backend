const { body } = require('express-validator');
/*
This code snippet defines validation rules for user input fields (name, email, and password) using the express-validator library in Node.js. The rules include checking for non-empty name, valid email format,
and password length of at least 8 characters.
*/
export const validateUser = [
    body('name').not().isEmpty().withMessage('Name require'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Please enter a password with at least 8 characters')
        .isStrongPassword()
        .withMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    body('phone').isMobilePhone().withMessage('Please enter a valid phone number'),
]


// export default validateUser;