// src/routes/auth.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
// Registration route
router.post('/register', authController.register);

module.exports = router;
