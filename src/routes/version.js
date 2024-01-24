// src/routes/version.js
const express = require('express');
const versionController = require('../controllers/versionController');
const { authenticateUser } = require('../utils/authMiddleware');

const router = express.Router();

// Version routes
router.post('/', authenticateUser, versionController.createVersion);
router.get('/:id', authenticateUser, versionController.getVersions);

module.exports = router;
