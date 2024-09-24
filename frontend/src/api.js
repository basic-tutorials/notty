import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Set Authorization headers for authenticated requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API calls

// Login
export const loginUser = async (formData) => {
  const response = await axiosInstance.post('/token/', formData);
  return response.data;
};

// Register
export const registerUser = async (formData) => {
  const response = await axiosInstance.post('/register/', formData);
  return response.data;
};

// Fetch all notes
export const fetchNotes = async () => {
  const response = await axiosInstance.get('/notes/');
  return response.data;
};

// Fetch a single note
export const getNote = (id) => axiosInstance.get(`/notes/${id}/`);

// Create a new note
export const createNote = (noteData) => axiosInstance.post('/notes/', noteData);

// Update a note
export const updateNote = (id, noteData) => axiosInstance.put(`/notes/${id}/`, noteData);

// Delete a note
export const deleteNote = (id) => axiosInstance.delete(`/notes/${id}/`);
