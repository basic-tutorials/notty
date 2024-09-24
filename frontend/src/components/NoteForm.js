// src/components/NoteForm.js

import React, { useState } from 'react';
import { createNote } from '../api';

const NoteForm = () => {
  const [formData, setFormData] = useState({ title: '', content: '', category: 1, subcategory: 1 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNote(formData);
      alert('Note created!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
      <textarea name="content" placeholder="Content" onChange={handleChange} required />
      <button type="submit">Create Note</button>
    </form>
  );
};

export default NoteForm;
