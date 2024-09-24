import React, { useState, useEffect } from 'react';
import { fetchNotes, deleteNote } from '../api';
import { Link } from 'react-router-dom';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetchNotes();  // Fetch the list of notes
        setNotes(response);
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    };

    loadNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);  // Delete the note
      setNotes(notes.filter(note => note.id !== id));  // Update the list after deletion
      alert('Note deleted successfully!');
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div>
      <h1>Your Notes</h1>
      <Link to="/create-note">Add New Note</Link>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <Link to={`/edit-note/${note.id}`}>Edit</Link>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
