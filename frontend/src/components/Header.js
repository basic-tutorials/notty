import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = !!localStorage.getItem('access_token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div className="header">
      <h1>Notes</h1>
      {isAuthenticated ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
