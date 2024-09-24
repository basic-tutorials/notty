// src/components/NoteList.js

import React, { useEffect, useState } from 'react';
import { fetchNotes, deleteNote } from '../api';
import { Link } from 'react-router-dom';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        console.error('Failed to load notes:', error);
        setError('Failed to load notes. Please try again.');
      }
    };

    loadNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
      setError('Failed to delete note. Please try again.');
    }
  };

  return (
    <div>
      <h1>Your Notes</h1>
      <Link to="/create-note">Add New Note</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
