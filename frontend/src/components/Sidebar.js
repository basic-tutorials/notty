import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <button className="add-button">+</button>
      <div className="color-labels">
        <span className="color-label orange"></span>
        <span className="color-label yellow"></span>
        <span className="color-label purple"></span>
        <span className="color-label blue"></span>
        <span className="color-label green"></span>
      </div>
    </div>
  );
};

export default Sidebar;
