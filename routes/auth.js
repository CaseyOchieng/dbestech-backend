const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.send('auth');
});

router.get('/login', (req, res) => {
    res.send('auth');
});


module.exports = router