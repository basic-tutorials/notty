import React, { useState, useEffect } from 'react';
import { fetchNotes, deleteNote } from '../api';
import { Link } from 'react-router-dom';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const isAuthenticated = !!localStorage.getItem('access_token');

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetchNotes();
        setNotes(response);
      } catch (error) {
        console.error('Failed to load notes:', error);
      }
    };

    loadNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
      alert('Note deleted successfully!');
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div>
      <h1>Your Notes</h1>
      {isAuthenticated && <Link to="/create-note">Add New Note</Link>}
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            {isAuthenticated && (
              <>
                <Link to={`/edit-note/${note.id}`}>Edit</Link>
                <button onClick={() => handleDelete(note.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
