


const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.send('auth');
});

router.post('/login', (req, res) => {
    res.send('auth');
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