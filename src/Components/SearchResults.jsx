import React from "react";
import NoResult from "../assets/img/noResult.png";

function SearchResults({ searchResults, handlePlay }) {
  return (
    <div className="container">
      <div className="section">
        <h1 className="section-title">🔎 Search Results</h1>
        {searchResults.length === 0 ? (
          <div className="empty-results">
            <img src={NoResult} alt="No Results" />
            <p>No results found</p>
          </div>
        ) : (
          <div className="song-list">
            {searchResults.map((song) => (
              <div
                key={song.id}
                className="song-card"
                onClick={() => handlePlay(song)}
              >
                <img src={song.image} alt={song.title} />
                <div className="song-info">
                  <h3>{song.song}</h3>
                  <p>{song.singers || "unknown"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
