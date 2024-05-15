import { useEffect, useRef, useState } from "react";
import Backword from '../assets/img/skip-start-fill.svg';
import Play from '../assets/img/play-fill.svg';
import Pause from '../assets/img/pause-fill.svg';
import Forword from '../assets/img/skip-end-fill.svg';
import Shuffle from '../assets/img/shuffle.svg';
import Repeat from '../assets/img/repeat.svg';
import RepeatAgain from '../assets/img/repeat-1.svg';
import VolumeFull from '../assets/img/volume-up-fill.svg';
import VolumeDown from '../assets/img/volume-down-fill.svg'
import VolumeMute from '../assets/img/volume-mute-fill.svg';
// import Demo from '../assets/img/demo.jpg';
import Download from '../assets/img/download.svg'
import ArtistCard from "./ArtistCard";
// import Jaat from '../assets/music/20.mp3';

function MusicPlayer() {
  const [data, setData] = useState([]);
  const [song, setSong] = useState(null);
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isLooping, setIsLooping] = useState(false);


    // const [isPlaying, setIsPlaying] = useState(false);
    const [mode, setMode] = useState(localStorage.getItem('musicMode') || 'shuffle');
  

    const getSong = async () => {
      const get = await getSongsById(params.id);
      const data = await get.json();
      setData(data);
  };

  const handleArtistClick = async (artistName) => {
    // Fetch artist data based on artist name
    const artistData = await fetchArtistData(artistName);
    // Update data state with fetched artist data
    setData(artistData);
};
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const downloadSong = async () => {
  setIsDownloading(true);
  const response = await fetch(data.media_url);
  const datas = await response.blob();
  const url = URL.createObjectURL(datas);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.song}.mp3`;
  a.click();
  URL.revokeObjectURL(url);
  toast.success('downloaded');
  setIsDownloading(false);
};
const handleSeek = (e) => {
  const seekTime = e[0];
  audioRef.current.currentTime = seekTime;
  setCurrentTime(seekTime);
};

const loopSong = () => {
  audioRef.current.loop = !audioRef.current.loop;
  setIsLooping(!isLooping);
};

const changeRight = () => {
  audioRef.current.currentTime = audioRef.current.currentTime + 10;
}

const changeLeft = () => {
  audioRef.current.currentTime = audioRef.current.currentTime - 10;
};
const playSong = () => {
  if (song) {
      audioRef.current.src = song.media_url;
      audioRef.current.play();
  }
};
    useEffect(() => {
      localStorage.setItem('musicMode', mode);
    }, [mode]);
  
    const togglePlayPause = () => {
      if (playing) {
          audioRef.current.pause();
      } else {
          audioRef.current.play();
      }
      setPlaying(!playing);
  };

    const toggleMode = () => {
      if (mode === 'shuffle') {
        setMode('repeat');
      } else if (mode === 'repeat') {
        setMode('repeat-1');
      } else {
        setMode('shuffle');
      }
      
    };
    const [volume, setVolume] = useState(localStorage.getItem('volume') || 100);

    useEffect(() => {
      localStorage.setItem('volume', volume);
    }, [volume]);
  
    const handleVolumeChange = (event) => {
      const newVolume = parseInt(event.target.value);
      setVolume(newVolume);

      setVolume(event.target.value);

      const volumeLevel = newVolume / 100;

      // Update the volume using the Web Audio API
      const audioContext = new AudioContext();
      const gainNode = audioContext.createGain();
      gainNode.gain.value = volumeLevel;
      gainNode.connect(audioContext.destination);

      useEffect(() => {
        getSong();
        const handleTimeUpdate = () => {
            try {
                setCurrentTime(audioRef.current.currentTime);
                setDuration(audioRef.current.duration);
            }
            catch (e) {
                setPlaying(false);
            }
        };
        audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, []);
    };
    
return(
    <>
    <div className="musicPlayer">
        <div className="music-img-contaner">
        {song && <img src={song.image} alt="Song Image" />}
        </div>
        <div className="music-title">
        <h5>{song ? song.song : 'No Song Selected'}</h5>
            <br></br>
            <div className="musicSub-title">
            {song ? song.primary_artists : ''}
            </div>
        </div>
        <audio ref={audioRef} />
            {/* <button onClick={playSong}>Play</button> */}
        <div className="music-button">
        <audio onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onLoadedData={() => setDuration(audioRef.current.duration)} src={data.media_url} ref={audioRef}></audio>
        <img src={Backword} alt="Skip backward button" onClick={changeLeft} />
{playing ? (
  <img src={Pause} alt="Pause button" onClick={togglePlayPause} />
) : (
  <img src={Play} alt="Play button" onClick={togglePlayPause} />
)}
<img src={Forword} alt="Skip forward button" onClick={changeRight} />
        <img src={Shuffle} alt="Shuffle button" onClick={toggleMode} style={{ display: mode === 'shuffle' ? 'inline-block' : 'none' }} />
        <img src={Repeat} alt="Repeat button" onClick={toggleMode} style={{ display: mode === 'repeat' ? 'inline-block' : 'none' }} />
        <img src={RepeatAgain} alt="Repeat-1 button" onClick={toggleMode} style={{ display: mode === 'repeat-1' ? 'inline-block' : 'none' }} />
        <img src={Download} alt="Download button" onClick={downloadSong} />
        </div>
        <span id='currentStart'>{formatTime(currentTime)}</span>
<input className='ProgressBar' type="range" value={currentTime} max={duration} onChange={(e) => handleSeek(e.target.value)} />
<span id='currentEnd'>{formatTime(duration)}</span>
        <div className="Volume-button">
        {volume == 0 ? (
          <img src={VolumeMute} alt="Volume mute button" />
        ) : volume <= 50 ? (
          <img src={VolumeDown} alt="Volume down button" />
        ) : (
          <img src={VolumeFull} alt="Volume button" />
        )}
      </div>
      <input className='VolumeBar' type="range" min={0} max={100} value={volume} onChange={(e) => handleVolumeChange(e)} />
    </div>
    </>
)
}
export default MusicPlayer;