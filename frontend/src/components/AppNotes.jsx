import { useState, useEffect } from "react";

const AppNotes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8000/notes");
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!newNote.trim()) return;

    try {
      const note = { content: newNote };

      const response = await fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const data = await response.json();
      setNotes([...notes, data]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="notes-page">
      <div className="notes-container">
        <header className="notes-header">
          <h1 className="notes-title">My Notes</h1>
          <p className="notes-subtitle">
            Capture your thoughts and keep them organized.
          </p>
        </header>

        <div className="notes-form">
          <input
            className="notes-input"
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addNote();
            }}
            placeholder="Write a note..."
          />

          <button className="notes-add-button" onClick={addNote}>
            + Add Note
          </button>
        </div>

        <div className="notes-list-section">
          <h2 className="notes-list-title">Your Notes</h2>

          {notes.length === 0 ? (
            <p className="notes-empty-message">
              No notes yet. Add your first note!
            </p>
          ) : (
            <ul className="notes-list">
              {notes.map((note, index) => (
                <li className="note-item" key={note._id || index}>
                  <span className="note-content">{note.content}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppNotes;