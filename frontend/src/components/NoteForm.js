import React, { useState } from 'react';
import { createNote } from '../api';
import { useNavigate } from 'react-router-dom';

const NoteForm = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNote(formData);
      alert('Note created successfully!');
      navigate('/notes');  // Redirect to the notes list after creation
    } catch (error) {
      console.error('Failed to create note:', error);
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
      <button type="submit">Create Note</button>
    </form>
  );
};

export default NoteForm;
