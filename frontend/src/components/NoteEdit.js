import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, updateNote } from '../api';

const NoteEdit = () => {
  const { id } = useParams();  // Get note ID from the URL
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const loadNote = async () => {
      try {
        const response = await getNote(id);  // Fetch the existing note data
        setFormData({
          title: response.data.title,
          content: response.data.content,
        });  // Set the data into form fields
      } catch (error) {
        console.error('Failed to load note:', error);
      }
    };

    loadNote();
  }, [id]);  // Only run this when the component mounts or the ID changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateNote(id, formData);  // Update the note with the new data
      alert('Note updated successfully!');
      navigate('/notes');  // Redirect to the notes list after update
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
        value={formData.title}  // Use the state to control the input
        onChange={handleChange}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={formData.content}  // Use the state to control the textarea
        onChange={handleChange}
        required
      />
      <button type="submit">Update Note</button>
    </form>
  );
};

export default NoteEdit;
