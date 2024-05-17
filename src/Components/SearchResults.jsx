import React from 'react';

function SearchResult({ searchResults, handlePlay }) {
  return (
    <div className="section">
      <h1 className="section-title">🔎 Search <span className="text-primary">.</span></h1>
      <div className="song-list">
        {searchResults.map((song) => (
          <div key={song.id} className="song-card" onClick={() => handlePlay(song)}>
            <img src={song.image} alt={song.title} />
            <div className="song-info">
              <h3>{song.song}</h3>
              <p>{song.singers || 'unknown'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
