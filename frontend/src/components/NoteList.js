// src/components/NoteList.js

import React, { useEffect, useState } from 'react';
import { fetchNotes } from '../api';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const response = await fetchNotes();
        setNotes(response.data);  // Set the notes from the response
      } catch (error) {
        console.error('Failed to load notes:', error);
        // Handle 401 error (Unauthorized) - e.g., redirect to login
      }
    };

    loadNotes();  // Fetch notes on component mount
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
