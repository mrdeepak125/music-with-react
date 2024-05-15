import React from 'react';

const SongCard = ({ title, image, artist, id }) => {
    return (
        <a href={"/" + id} className="cursor-pointer" title={title}>
            <div className="rounded-md h-fit w-fit grid gap-2">
                <div>
                    <img className="song-image" src={image} alt={title} />
                </div>
                <div className="grid place-content-center text-center">
                    <h1 className="song-title">{title}</h1>
                    <p className="song-artist">{artist}</p>
                </div>
            </div>
        </a>
    );
};

export default SongCard;
