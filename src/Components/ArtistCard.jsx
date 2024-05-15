import React from 'react';

const ArtistCard = ({ name, image, handleArtistClick }) => {
    const handleClick = () => {
        handleArtistClick(name);
    };

    return (
        <a href="#" className="cursor-pointer" onClick={handleClick} title={title}>
            <div className="rounded-md grid gap-2">
                <div>
                    <img className="transition hover:opacity-75 rounded-md max-w-200 w-200 h-200 bg-secondary aspect-square max-h-200 resize-none object-cover" src={image} alt={title} />
                </div>
                <div className="grid place-content-center text-center">
                    <h1 className="text-sm text-ellipsis overflow-hidden max-w-150 font-bold">{title}</h1>
                    <p className="text-xs text-ellipsis overflow-hidden -mt-2 max-w-100 mx-auto">{artist}</p>
                </div>
            </div>
        </a>
    );
}

export default ArtistCard;
