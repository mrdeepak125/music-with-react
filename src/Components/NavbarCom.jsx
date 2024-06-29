import React, { useEffect, useState } from 'react';
import Search from '../assets/img/search.svg';
import { getSongsByQuery } from '../lib/fetch';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Navbar({ updateSearchResults }) {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);

    document.body.style.backgroundColor = isDarkMode ? '#141619' : '#fff';
    document.body.style.color = isDarkMode ? '#B3B4BD' : '#141619';
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);

    document.body.style.backgroundColor = newDarkMode ? '#141619' : '#fff';
    document.body.style.color = newDarkMode ? '#B3B4BD' : '#141619';
  };

  const handleSearch = async () => {
    try {
      const response = await getSongsByQuery(query);
      const data = await response.json();
      console.log('Search Results:', data);
      updateSearchResults(data);
      navigate('/search');
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      
      <div className="navbar">
      <div className="menu-toggle" onClick={toggleMenu}>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
      </div>
      <div className={`menu-slider ${menuOpen ? 'open' : ''}`}>
      <ul>
            <li className='first-section'>
              <Link to="/" onClick={toggleMenu}>Home</Link>
              <Link to="/downloads" onClick={toggleMenu}>Downloads</Link>
            </li>
          </ul>
          <ul>
            <li className='second-section'>
            <label className="ui-switch">
                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                <div className="slider">
                  <div className="circle" />
                </div>
              </label>
            </li>
          </ul>
      </div>
        <div className="left-section">
          <Link to="/">Home</Link>
          <Link to="/downloads">Downloads</Link>
        </div>
        <div className="right-section">
          <input
            type="text"
            placeholder="Music Search..."
            maxLength={100}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <div className="searchTerm" onClick={handleSearch}>
            <img src={Search} alt="Search" />
          </div>
          <div className="user-circle">
            {/* <img src={User} alt="User" trigger="hover"/> */}
          </div>
          <div className="dark-mode">
            <label className="ui-switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <div className="slider">
                <div className="circle" />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
