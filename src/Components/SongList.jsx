// SongList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { lofiSongs, newSongs, relaxingSongs, romanseSongs } from '../lib/catchedSong';

function SongList({ onPlay }) {
  const navigate = useNavigate();

  const handlePlay = (song) => {
    onPlay(song);
    navigate('/player');
  };

  return (
    <div className="container">
      <div className="section">
        <h1 className="section-title">🔥 Trending<span className="text-primary">.</span></h1>
        <div className="song-list">
          {newSongs.map(song => (
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
      <div className="section">
        <h1 className="section-title">🎧 Relaxing<span className="text-primary">.</span></h1>
        <div className="song-list">
          {relaxingSongs.map(song => (
            <div key={song.id} className="song-card" onClick={() => handlePlay(song)}>
              <img src={song.image} alt={song.title} />
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.singers || 'unknown'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h1 className="section-title">💞 Romanse<span className="text-primary">.</span></h1>
        <div className="song-list">
          {romanseSongs.map(song => (
            <div key={song.id} className="song-card" onClick={() => handlePlay(song)}>
              <img src={song.image} alt={song.title} />
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.singers || 'unknown'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section">
        <h1 className="section-title">💤 Lofi<span className="text-primary">.</span></h1>
        <div className="song-list">
          {lofiSongs.map(song => (
            <div key={song.id} className="song-card" onClick={() => handlePlay(song)}>
              <img src={song.image} alt={song.title} />
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.singers || 'unknown'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SongList;
