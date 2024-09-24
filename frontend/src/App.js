// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  const isAuthenticated = !!localStorage.getItem('access_token');  // Check if token exists

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/notes"
          element={isAuthenticated ? <NoteList /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-note"
          element={isAuthenticated ? <NoteForm /> : <Navigate to="/login" />}
        />
        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
