import React, { useState, useEffect } from 'react';
import Note from './components/Note';
import CreateNote from './components/CreateNote';
import NoteDetail from './components/NoteDetail';
import { api } from './services/api';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const fetchedNotes = await api.getAllNotes();
      setNotes(fetchedNotes);
    } catch (err) {
      setError('Failed to load notes');
      console.error(err);
    }
  };

  const handleCreateNote = async (newNote) => {
    try {
      const createdNote = await api.createNote(newNote);
      setNotes(prevNotes => [...prevNotes, createdNote]);
      setIsCreating(false);
    } catch (err) {
      setError('Failed to create note');
      console.error(err);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      setSelectedNote(null);
    } catch (err) {
      setError('Failed to delete note');
      console.error(err);
    }
  };

  const handleCreateButtonClick = () => {
    setIsCreating(true);
  };

  const handleUpdateNote = async (id, updatedNote) => {
    try {
      const updated = await api.updateNote(id, updatedNote);
      setNotes(prevNotes => 
        prevNotes.map(note => 
          note.id === id ? { ...note, ...updated } : note
        )
      );
    } catch (err) {
      setError('Failed to update note');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Notes App</h1>
        <button className="add-button" onClick={handleCreateButtonClick}>+</button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="notes-grid">
        {notes.map(note => (
          <Note
            key={note.id}
            {...note}
            onClick={() => setSelectedNote(note)}
          />
        ))}
      </div>

      {isCreating && (
        <CreateNote
          onClose={() => setIsCreating(false)}
          onSave={handleCreateNote}
        />
      )}

      {selectedNote && (
        <NoteDetail
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onDelete={handleDeleteNote}
          onUpdate={handleUpdateNote}
        />
      )}
    </div>
  );
}

export default App;
