const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    //validate the data before creating a user
    //create a user in the database
    res.send('auth');
});

router.post('/login', (req, res) => {
    res.status(201).json({ name: 'Casey', age: 20, });
});

router.post('/forgot-password', (req, res) => {
    res.send('auth');
});

router.post('/verify-otp', (req, res) => {
    res.send('auth');
});

router.post('/reset-password', (req, res) => {
    res.send('auth');
});
module.exports = router