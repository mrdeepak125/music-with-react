import React, { useState, useEffect, useContext, useRef } from "react";
import { getSongs, deleteSong } from "../lib/indexedDb";
import { MusicContext } from "../Components/MusicContext";

// SVG for the three-dot menu
const ThreeDotMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
  </svg>
);

function Downloads() {
  const [songs, setSongs] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const { setCurrentSong } = useContext(MusicContext);
  const audioPlayers = useRef([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const savedSongs = await getSongs();
      setSongs(savedSongs.map(song => ({
        ...song,
        blobUrl: URL.createObjectURL(song.blob)
      })));
    };
    fetchSongs();

    return () => {
      songs.forEach(song => URL.revokeObjectURL(song.blobUrl));
    };
  }, []);

  const handleNext = () => {
    const player = audioPlayers.current[currentTrack];
    if (player) {
      player.pause();
    }
    setCurrentTrack((prevTrack) => (prevTrack + 1) % songs.length);
  };

  const handlePrevious = () => {
    const player = audioPlayers.current[currentTrack];
    if (player) {
      player.pause();
    }
    setCurrentTrack((prevTrack) => (prevTrack - 1 + songs.length) % songs.length);
  };

  useEffect(() => {
    const player = audioPlayers.current[currentTrack];
    if (player) {
      player.play();
    }
  }, [currentTrack]);

  const handleDelete = async (songId) => {
    await deleteSong(songId);
    setSongs(songs.filter(song => song.id !== songId));
  };

  return (
    <div className="container">
      <div className="offline-section">
        <h1 className="section-title">🎵 Downloaded Songs</h1>
        {songs.length === 0 ? (
          <p>No songs downloaded yet.</p>
        ) : (
          <div className="offline-song-list">
            {songs.map((song, index) => (
              <div key={song.id} className="offline-song-card">
                <img src={song.image} alt={song.title} />
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist || "unknown"}</p>
                  <audio
                    ref={el => (audioPlayers.current[index] = el)}
                    className="offline-control"
                    src={song.blobUrl}
                    controls
                  />
                  <div className="next-previous">
                    <button  onClick={handlePrevious}>
                      Previous
                    </button>
                    <button  onClick={handleNext}>
                      Next
                    </button>
                  </div>
                  <div className="menu">
                    <button
                      className="three-dot"
                      onClick={() => setMenuVisible(menuVisible === song.id ? null : song.id)}
                    >
                      <ThreeDotMenu />
                    </button>
                    {menuVisible === song.id && (
                      <div className="menu-options">
                        <button className="button" onClick={() => handleDelete(song.id)}>
                          <svg viewBox="0 0 448 512" className="svgIcon">
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Downloads;
