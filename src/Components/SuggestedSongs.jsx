import React from "react";

function SuggestedSongs({ songs, handlePlay }) {
  return (
    <div className="suggested-songs">
      <h3>Suggested Songs</h3>
      <div className="song-list">
        {songs.map((song) => (
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
    </div>
  );
}

export default SuggestedSongs;
