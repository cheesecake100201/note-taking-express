// src/controllers/versionController.js
// src/controllers/versionController.js
const Version = require('../models/version');

exports.createVersion = async (req, res) => {
    try {
        const { noteId, title, content } = req.body;
        const version = await Version.create({ noteId, title, content });

        res.json(version);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getVersions = async (req, res) => {
    try {
        const noteId = req.params.id;

        // Assuming you want to get all versions for a specific note
        const versions = await Version.findAll({ where: { noteId } });

        res.json(versions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

