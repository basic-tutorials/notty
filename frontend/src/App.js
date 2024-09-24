// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

function App() {
  return (
    <Router>
      <Header />
      <Routes>  {/* Use Routes instead of Switch */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<NoteList />} />
        <Route path="/create-note" element={<NoteForm />} />
      </Routes>
    </Router>
  );
}

export default App;
