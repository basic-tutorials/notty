import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NoteForm from './pages/NoteForm';
import NoteEdit from './pages/NoteEdit';
import NoteList from './pages/NoteList';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/notes" element={isAuthenticated ? <NoteList /> : <Login />} />
            <Route path="/create-note" element={isAuthenticated ? <NoteForm /> : <Login />} />
            <Route path="/edit-note/:id" element={isAuthenticated ? <NoteEdit /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
