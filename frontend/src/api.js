// src/api.js

import axios from 'axios';

// Set the base URL for the Django backend
const API_URL = 'http://127.0.0.1:8000/api';

// Helper to get access token from local storage
const getAuthToken = () => localStorage.getItem('access_token');

// Axios instance with auth header
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

// Register user
export const registerUser = (userData) => axios.post(`${API_URL}/register/`, userData);

// Login user and set tokens in localStorage
export const loginUser = async (userData) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/token/', userData);
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};


export const fetchNotes = async () => {
  try {
    const response = await axiosInstance.get('/notes/');
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Token may be invalid or expired');
      // Optionally redirect to login or refresh the token
    }
    throw error;  // Propagate error so it can be handled in the component
  }
};


// Fetch notes
// export const fetchNotes = () => axiosInstance.get('/notes/');

// Create a new note
export const createNote = (noteData) => axiosInstance.post('/notes/', noteData);

// Update a note
export const updateNote = (id, noteData) => axiosInstance.put(`/notes/${id}/`, noteData);

// Delete a note
export const deleteNote = (id) => axiosInstance.delete(`/notes/${id}/`);

// Fetch categories
export const fetchCategories = () => axiosInstance.get('/categories/');

// Create a category
export const createCategory = (categoryData) => axiosInstance.post('/categories/', categoryData);

// Create a subcategory
export const createSubcategory = (subcategoryData) => axiosInstance.post('/subcategories/', subcategoryData);
