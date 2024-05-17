import './App.css'
import Navbar from './Components/NavbarCom.jsx';
// import Home from './Components/Home.jsx';
// import SearchResults from './Components/SearchResults.jsx';
// import AudioPlayer from './Components/Player.jsx'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongCard from './Components/SongCard.jsx';
import MusicPlayer from './Components/MusicPlayerCom.jsx';
import { newSongs } from './lib/catchedSong.js';
import SongList from './Components/SongList';

function App() {

  const [searchResults, setSearchResults] = useState([]);

    const updateSearchResults = (results) => {
        setSearchResults(results);
    };
  const [currentSong, setCurrentSong] = useState(null);

  const handlePlay = (song) => {
    setCurrentSong(song);
  };
return(
  // <>
  // <Navbar updateSearchResults={updateSearchResults} />
  // {searchResults.length > 0 && <SearchResults results={searchResults} />}
  // {/* <searchResults /> */}
  // <Home />
  // <MusicPlayer />
  // {/* <AudioPlayer /> */}
  // </>  
  <Router>
    <div>
    <Navbar updateSearchResults={updateSearchResults} onPlay={handlePlay} />
    {searchResults.length > 0 && <SearchResults results={searchResults} />}
  <Routes>
        <Route path="/" element={<SongList onPlay={handlePlay} />} />
        <Route path="/player" element={<MusicPlayer currentSong={currentSong} />} />
    </Routes>
    </div>
</Router>
)
}

export default App;