// SongCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function SongCard({ id, image, artist, title, onPlay }) {
  const navigate = useNavigate();

  const handleClick = () => {
    onPlay({ id, image, artist, title, media_url: `path/to/song${id}.mp3` });
    navigate(`/player/${id}`);
  };

  return (
    <div className="song-card" onClick={handleClick}>
      <img src={image} alt={title} />
      <div className="song-info">
        <h3>{title}</h3>
        <p>{artist}</p>
      </div>
    </div>
  );
}

export default SongCard;
