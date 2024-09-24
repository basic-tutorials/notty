// src/components/NoteForm.js
import React, { useState } from 'react';
import { createNote } from '../api';

const NoteForm = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNote(formData);
      alert('Note created successfully!');
      setFormData({ title: '', content: '' });  // Clear the form after success
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Token may be invalid or expired');
      } else {
        console.error('Error creating note:', error);
      }
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
