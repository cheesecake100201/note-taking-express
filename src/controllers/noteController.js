// src/controllers/noteController.js
const Note = require("../models/note");
const Version = require("../models/version");
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming you have the user id from authentication middleware
    const note = await Note.create({ title, content, userId, currentVersion: 0 });

    // Create a version for the newly created note
    const version = await Version.create({ noteId: note.id, title, content });

    const noted = await Note.update({ currentVersion: version.id }, { where: { id: note.id } });

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getNote = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have the user id from authentication middleware
    const noteId = parseInt(req.params.id);
    console.log("NOTE:", noteId);
    const note = await Note.findByPk(noteId);
    console.log(JSON.stringify(note.userId),userId);
    if (note && note.userId === userId) {
      return res.status(200).json(note);
    }
    res.status(401).send('NOT ALLOWED');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have the user id from authentication middleware
    const notes = await Note.findAll({ where: { userId } });

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;
    const userId = req.user.id; // Assuming you have the user id from authentication middleware

    // Check if the note belongs to the user
    const note = await Note.findOne({ where: { id: noteId, userId } });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    
    // Create a new version for the updated note
    const newVersion = await Version.create({ noteId, title, content });

    // Update the note
    await Note.update({ title, content, currentVersion: newVersion.id }, { where: { id: noteId } });


    res.json({ message: "Note updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id; // Assuming you have the user id from authentication middleware

    // Check if the note belongs to the user
    const note = await Note.findOne({ where: { id: noteId, userId } });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Delete the note
    await Note.destroy({ where: { id: noteId } });

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
