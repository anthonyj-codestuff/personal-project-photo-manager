import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/" style={{ textDecoration: 'none' }}><p>Home</p></Link>
      </div>
      <div>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}><p>Dashboard</p></Link>
      </div>
      <div>
        <Link to="/upload" style={{ textDecoration: 'none' }}><p>Upload</p></Link>
      </div>
    </header>
  );
};

export default Header;