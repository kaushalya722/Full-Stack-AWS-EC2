const notes = require("../models/note");

// Get all notes
const getNotes = (req, res) => {
  res.json(notes);
};

// Add a new note
const addNote = (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Note content is required" });
  }

  const note = { id: notes.length + 1, content };
  notes.push(note);
  res.status(201).json(note);
};

module.exports = { getNotes, addNote };