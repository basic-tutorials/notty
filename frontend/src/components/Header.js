// src/components/Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate

const Header = () => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate

const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  navigate('/login');
};


  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/notes">Notes</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
