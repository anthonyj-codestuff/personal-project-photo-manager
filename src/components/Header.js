import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="header-segment">
        <Link to="/" style={{ textDecoration: 'none' }}><p>Gallery</p></Link>
      </div>
      <div className="header-segment">
        <Link to="/upload" style={{ textDecoration: 'none' }}><p>Upload</p></Link>
      </div>
      <div className="header-segment">
        <Link to="/dashboard" style={{ textDecoration: 'none' }}><p>Options</p></Link>
      </div>
      <div className="header-segment">
        <SearchBar/>
      </div>
    </header>
  );
};;

export default Header;