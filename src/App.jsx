import './App.css';
import Navbar from './Components/NavbarCom.jsx';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import MusicPlayer from './Components/MusicPlayerCom.jsx';
import SongList from './Components/SongList';
import SearchResults from './Components/SearchResults';
import Downloads from './Components/DownloadsPage';
import { saveSong } from '../src/lib/indexedDb';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [suggestedSongs, setSuggestedSongs] = useState([]);


  const navigate = useNavigate();

  const handlePlay = (song) => {
    setCurrentSong(song);
    // Generate suggested songs based on the current song
    setSuggestedSongs(searchResults.filter(s => s.id !== song.id)); // Assuming searchResults are still available
    navigate('/player');
  };

  const handleAutoSuggest = (song) => {
    setCurrentSong(song);
    // Generate next suggested songs based on the current song
    setSuggestedSongs(searchResults.filter(s => s.id !== song.id)); // Assuming searchResults are still available
  };

  const handleDownloadClick = async (song) => {
    setIsDownloading(true);
    const response = await fetch(song.mediaUrl);
    const blob = await response.blob();
    const songData = {
      id: song.id,
      title: song.title,
      artist: song.artist,
      blob,
    };
    await saveSong(songData);
    setIsDownloading(false);
    alert('Song downloaded and saved to IndexedDB!');
  };


  return (
    <div>
      <Navbar updateSearchResults={setSearchResults} />
      <Routes>
        <Route path="/" element={<SongList onPlay={handlePlay} />} />
        {/* <Route path="/" element={
              <div>
                <h2>Song</h2>
                <img src={song.image} alt={song.song} width="100" height="100" />
                <p>{song.song}</p>
                <DownloadSong song={song} />
              </div>
            }
          /> */}
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/search" element={<SearchResults searchResults={searchResults} handlePlay={handlePlay} />} />
        <Route path="/player" element={<MusicPlayer currentSong={currentSong} suggestedSongs={suggestedSongs} handlePlay={handlePlay} handleAutoSuggest={handleAutoSuggest} />} />
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
