// src/routes/note.js
const express = require('express');
const noteController = require('../controllers/noteController');
const versionController = require('../controllers/versionController');
const { authenticateUser } = require('../utils/authMiddleware');

const router = express.Router();

// Note routes
router.get('/:id', authenticateUser, noteController.getNote);
router.get('/:id/versions', authenticateUser, versionController.getVersions);
router.get('/', authenticateUser, noteController.getNotes);

router.post('/', authenticateUser, noteController.createNote);

router.put('/:id', authenticateUser, noteController.updateNote);
router.delete('/:id', authenticateUser, noteController.deleteNote);

module.exports = router;
