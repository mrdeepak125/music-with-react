import './App.css';
import Navbar from './Components/NavbarCom.jsx';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MusicPlayer from './Components/MusicPlayerCom.jsx';
import SongList from './Components/SongList';
import SearchResults from './Components/SearchResults';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const handlePlay = (song) => {
    setCurrentSong(song);
    navigate('/player');
  };

  const navigate = useNavigate();

  return (
    <div>
      <Navbar updateSearchResults={setSearchResults} />
      <Routes>
        <Route path="/" element={<SongList onPlay={handlePlay} />} />
        <Route path="/search" element={<SearchResults searchResults={searchResults} handlePlay={handlePlay} />} />
        <Route path="/player" element={currentSong && <MusicPlayer currentSong={currentSong} />}  />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
