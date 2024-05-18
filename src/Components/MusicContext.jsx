import React, { createContext, useState } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [suggestedSongs, setSuggestedSongs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  return (
    <MusicContext.Provider value={{ currentSong, setCurrentSong, suggestedSongs, setSuggestedSongs, searchResults, setSearchResults }}>
      {children}
    </MusicContext.Provider>
  );
};
