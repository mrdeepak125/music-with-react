import React, { useEffect, useState } from 'react';
import Search from '../assets/img/search.svg';
import { getSongsByQuery } from '../lib/fetch';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function Navbar({ updateSearchResults }) {
  const [darkMode, setDarkMode] = useState(false);
  const [query, setQuery] = useState('');

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

  return (
    <div className="navbar">
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
  );
}

export default Navbar;
