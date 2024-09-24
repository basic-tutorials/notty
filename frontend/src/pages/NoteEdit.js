import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, updateNote } from '../api';

const NoteEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const loadNote = async () => {
      try {
        const response = await getNote(id);
        setFormData({ title: response.data.title, content: response.data.content });
      } catch (error) {
        console.error('Failed to load note:', error);
      }
    };
    loadNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote(id, formData);
      alert('Note updated successfully!');
      navigate('/notes');
    } catch (error) {
      console.error('Failed to update note:', error);
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
      <button type="submit">Update Note</button>
    </form>
  );
};

export default NoteEdit;
