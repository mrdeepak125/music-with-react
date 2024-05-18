import React, { useState, useEffect } from 'react';
import { getSongs } from '../lib/indexedDb';

const Downloads = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const savedSongs = await getSongs();
      setSongs(savedSongs);
    };
    fetchSongs();
  }, []);

  return (
    <div>
      <h1>Downloaded Songs</h1>
      {songs.length === 0 ? (
        <p>No songs downloaded yet.</p>
      ) : (
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
                <img src={song.image} alt="" />
              <h3>{song.title} by {song.artist}</h3>
              <audio controls src={URL.createObjectURL(song.blob)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Downloads;
