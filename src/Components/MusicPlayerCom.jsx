import { MusicContext } from "./MusicContext";
import React, { useRef, useState, useEffect, useContext } from "react";
import { getSongs, saveSong } from "../lib/indexedDb";
import { allsongs } from "../lib/nextsong";

function MusicPlayer({ handleAutoSuggest, handlePlay }) {
  const { currentSong, setCurrentSong, suggestedSongs } =
    useContext(MusicContext);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [songs, setSongs] = useState([]);

  const PlayIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-play-fill"
      viewBox="0 0 16 16"
    >
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
    </svg>
  );

  const PauseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-pause-fill"
      viewBox="0 0 16 16"
    >
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
    </svg>
  );

  const ForwardIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-skip-end-fill"
      viewBox="0 0 16 16"
    >
      <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0z" />
    </svg>
  );

  const BackwardIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-skip-start-fill"
      viewBox="0 0 16 16"
    >
      <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0z" />
    </svg>
  );

  const ReplayIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-repeat"
      viewBox="0 0 16 16"
    >
      <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
    </svg>
  );

  const DownloadIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-download"
      viewBox="0 0 16 16"
    >
      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
    </svg>
  );

  const SuccessIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-check2-circle"
      viewBox="0 0 16 16"
    >
      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
    </svg>
  );

  useEffect(() => {
    const fetchSongs = async () => {
      const savedSongs = await getSongs();
      setSongs(
        savedSongs.map((song) => ({
          ...song,
          blobUrl: URL.createObjectURL(song.blob),
        }))
      );
    };
    fetchSongs();

    return () => {
      songs.forEach((song) => URL.revokeObjectURL(song.blobUrl));
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedData = () => {
      setDuration(audio.duration);
      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleError = () => {
      console.error("Error loading audio source");
      setPlaying(false);
    };

    if (currentSong && currentSong.media_url) {
      audio.src = currentSong.media_url;
      audio.load(); // Ensure the audio is loaded
      audio.addEventListener("loadeddata", handleLoadedData);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("loadeddata", handleLoadedData);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("error", handleError);
      }
    };
  }, [currentSong, suggestedSongs, handleAutoSuggest]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    setPlaying(!playing);
  };
  const handleForward = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentSong(songs[nextIndex]);
  };

  const handleBackward = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentSong(songs[prevIndex]);
  };

  const handleReplay = () => {
    audioRef.current.currentTime = 0;
  };

  useEffect(() => {
    if (!currentSong && suggestedSongs.length > 0) {
      // Automatically play the next suggested song
      handleAutoSuggest(suggestedSongs[0]);
    }
  }, [currentSong, suggestedSongs, handleAutoSuggest]);

  if (!currentSong) return null;

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadClick = async (song) => {
    setIsDownloading(true);
    setDownloadComplete(false);
    setDownloadProgress(0);
    try {
      const response = await fetch(song.media_url);
      if (!response.ok) throw new Error("Network response was not ok");

      const reader = response.body.getReader();
      const contentLength = +response.headers.get("Content-Length");
      let receivedLength = 0;
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;
        setDownloadProgress(Math.floor((receivedLength / contentLength) * 100));
      }

      const blob = new Blob(chunks);
      const songData = {
        id: song.id,
        title: song.song,
        artist: song.singers,
        image: song.image,
        mediaUrl: song.media_url,
        blob,
      };
      await saveSong(songData);
      setDownloadComplete(true);
    } catch (error) {
      console.error("Failed to download song:", error);
      alert("Failed to download song");
    } finally {
      setIsDownloading(false);
    }
  };
  const handleEnded = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length; // Loop back to the first song if at the end
    setCurrentSong(songs[nextIndex]);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedData = () => {
      setDuration(audio.duration);
      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleError = () => {
      console.error("Error loading audio source");
      setPlaying(false);
    };

    if (currentSong) {
      audio.src = currentSong.blobUrl || currentSong.media_url;
      audio.load();
      audio.addEventListener("loadeddata", handleLoadedData);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("error", handleError);
    }

    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [currentSong, songs]);


  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentSong?.song,
        artist: currentSong?.singers,
        album: "Music World",
        artwork: [
          { src: currentSong?.image, sizes: "512x512", type: "image/png" },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () =>
        audioRef.current.play()
      );
      navigator.mediaSession.setActionHandler("pause", () =>
        audioRef.current.pause()
      );
      navigator.mediaSession.setActionHandler("previoustrack", () =>
        handlePrevious()
      );
      navigator.mediaSession.setActionHandler("nexttrack", () => handleNext());
    }
  }, [currentSong]);
  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedData = () => {
      setDuration(audio.duration);
      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleError = () => {
      console.error("Error loading audio source");
      setPlaying(false);
    };

    if (currentSong) {
      if (currentSong.blobUrl) {
        audio.src = currentSong.blobUrl;
      } else {
        audio.src = currentSong.media_url;
      }
      audio.load(); // Ensure the audio is loaded
      audio.addEventListener("loadeddata", handleLoadedData);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("error", handleError);
    }

    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("error", handleError);
    };
  }, [currentSong]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const skipForward = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentSong(songs[nextIndex]);
    }
  };

  const skipBackward = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
      setCurrentSong(songs[prevIndex]);
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await saveSong(currentSong, setDownloadProgress);
      setDownloadComplete(true);
      setIsDownloading(false);
    } catch (error) {
      console.error("Error downloading song:", error);
      setIsDownloading(false);
    }
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.code === "Space") {
          event.preventDefault();
          togglePlayPause();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [togglePlayPause]);
  };
  return (
    <div className="music-player">
      {currentSong && (
        <>
          <img
            src={currentSong.image}
            alt={currentSong.title}
            className="song-image"
          />
          <h2>{currentSong.song}</h2>
          <p>{currentSong.singers}</p>
          <audio ref={audioRef} />
          <div className="controls">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              value={currentTime}
              max={duration}
              onChange={(e) => (audioRef.current.currentTime = e.target.value)}
            />
            <span>{formatTime(duration)}</span>
          </div>
          <div className="contlorls">
            <button onClick={handleReplay}>
              <ReplayIcon />
            </button>
            <button onClick={handleBackward}>
              <BackwardIcon />
            </button>
            <button onClick={togglePlayPause}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button onClick={handleForward}>
              <ForwardIcon />
            </button>
            <button
              onClick={() => handleDownloadClick(currentSong)}
              disabled={downloadProgress > 0 && downloadProgress < 100}
            >
              {downloadComplete ? (
                <SuccessIcon />
              ) : downloadProgress > 0 ? (
                <div className="progress-circle">{downloadProgress}%</div>
              ) : (
                <DownloadIcon />
              )}
            </button>
          </div>
          <div className="suggestions">
            <h3>Suggested Songs</h3>
            <ul>
              {suggestedSongs.map((song) => (
                <li key={song.id} onClick={() => handleAutoSuggest(song)}>
                  {song.song} by {song.singers || "unknown"}
                </li>
              ))}
            </ul>
          </div>
          <p>NEXT SONGS</p>
          <div className="next-section">
            {songs.map((song) => (
              <div
                key={song.id}
                onClick={() => handlePlay(song)}
                className="next-song-card"
              >
                <img src={song.image} alt={song.title} />
                <div className="next-song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist || "unknown"}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MusicPlayer;
