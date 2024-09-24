// src/api.js

import axios from 'axios';

// Set the base URL for the Django backend
const API_URL = 'http://127.0.0.1:8000/api';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the JWT token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Register user
export const registerUser = (userData) => axiosInstance.post('/register/', userData);

// Login user and set tokens in localStorage
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/token/', userData);
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// Refresh token
export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh_token');
    const response = await axiosInstance.post('/token/refresh/', { refresh });
    localStorage.setItem('access_token', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};

// Fetch notes
export const fetchNotes = async () => {
  try {
    const response = await axiosInstance.get('/notes/');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Token may be invalid or expired');
      // Optionally, try to refresh the token and retry the request
      try {
        await refreshToken();
        return await fetchNotes();  // Retry after refreshing token
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // Redirect to login or handle logout
        window.location.href = '/login';
      }
    }
    throw error;
  }
};

// Fetch a single note by ID
export const getNote = (id) => axiosInstance.get(`/notes/${id}/`);

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
