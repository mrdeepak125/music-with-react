import React, { useState, useEffect, useContext, useRef } from "react";
import { getSongs, deleteSong } from "../lib/indexedDb";
import { MusicContext } from "../Components/MusicContext";
import { useNavigate } from "react-router-dom";
import Empty from "../assets/img/empty.png";

// SVG for the three-dot menu
const ThreeDotMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
  </svg>
);

function Downloads({ onPlay }) {
  const [songs, setSongs] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const { setCurrentSong } = useContext(MusicContext);
  const audioPlayers = useRef([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    const handleEnded = () => {
      setCurrentTrack((prevTrack) => (prevTrack + 1) % songs.length);
    };

    const player = audioPlayers.current[currentTrack];
    if (player) {
      player.addEventListener("ended", handleEnded);
      // player.play();
    }

    return () => {
      if (player) {
        player.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentTrack, songs]);

  useEffect(() => {
    if (audioPlayers.current[currentTrack]) {
      // audioPlayers.current[currentTrack].play();
    }
    updateMediaSession();
  }, [songs, currentTrack]);

  const playTrack = (trackIndex) => {
    if (audioPlayers.current[currentTrack]) {
      audioPlayers.current[currentTrack].pause();
      audioPlayers.current[currentTrack].currentTime = 0;
    }
    setCurrentTrack(trackIndex);
  };

  const handleDelete = async (songId) => {
    await deleteSong(songId);
    setSongs(songs.filter(song => song.id !== songId));
  };

  const updateMediaSession = () => {
    const song = songs[currentTrack];
    if ('mediaSession' in navigator && song) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song.title,
        artist: song.artist || "unknown",
        album: "Downloaded Songs",
        artwork: [
          { src: song.image, sizes: '512x512', type: 'image/png' }
        ]
      });

      navigator.mediaSession.setActionHandler('previoustrack', () => {
        playTrack((currentTrack - 1 + songs.length) % songs.length);
      });

      navigator.mediaSession.setActionHandler('nexttrack', () => {
        playTrack((currentTrack + 1) % songs.length);
      });

      navigator.mediaSession.setActionHandler('play', () => {
        audioPlayers.current[currentTrack].play();
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        audioPlayers.current[currentTrack].pause();
      });
    }
  };

  const handleClickOutsideMenu = (event) => {
    if (menuVisible && !event.target.closest('.menu')) {
      setMenuVisible(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, [menuVisible]);

  const handleSongClick = (song) => {
    onPlay(song);
    navigate(`/player/${song.id}`);
  };

  return (
    <div className="container">
      <div className="offline-section">
        <h1 className="section-title">🎵 Downloaded Songs</h1>
        {songs.length === 0 ? (
          <div className="empty-results">
            <img src={Empty} alt="No Results" />
          <h1>No songs downloaded yet.</h1>
          </div>
        ) : (
          <div className="offline-song-list">
            {songs.map((song, index) => (
              <div key={song.id} className="offline-song-card">
                <img src={song.image} alt={song.title} onClick={() => handleSongClick(song)} />
                <div className="song-info" onClick={() => handleSongClick(song)}>
                  <h3>{song.title}</h3>
                  <p>{song.artist || "unknown"}</p>
                </div>
                  <div className="menu">
                    <button className="three-dot" onClick={() => setMenuVisible(menuVisible === song.id ? null : song.id)}>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Downloads;
