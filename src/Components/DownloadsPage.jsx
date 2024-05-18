// import React, { useState, useEffect } from 'react';
// import { getSongs } from '../lib/indexedDb';

// function Downloads  (handlePlay) {
//   const [songs, setSongs] = useState([]);

//   useEffect(() => {
//     const fetchSongs = async () => {
//       const savedSongs = await getSongs();
//       setSongs(savedSongs);
//     };
//     fetchSongs();
//   }, []);


//   return (
//     <>
//     <div className="container">
//     <div className="section">
//       <h1 className="section-title">🎵 Downloaded Songs</h1>
//       {songs.length === 0 ? (
//         <p>No songs downloaded yet.</p>
//       ) : (
//       <div className="song-list">
//         {songs.map((song) => (
//           <div key={song.id} className="song-card" onClick={() => handlePlay(song)}>
//             <img src={song.image} alt={song.title} />
//             <div className="song-info">
//               <h3>{song.title}</h3>
//               <p>{song.artist || 'unknown'}</p>
              
//             </div>
//           </div>
//         ))}
//       </div>
//       )}
//     </div>
//   </div>
//     </>
//   );
// };

// export default Downloads;
























import React, { useState, useEffect, useContext } from 'react';
import { getSongs } from '../lib/indexedDb';
import { MusicContext } from '../Components/MusicContext';

function Downloads({ handlePlay }) {
  const [songs, setSongs] = useState([]);
  const { setCurrentSong } = useContext(MusicContext);

  useEffect(() => {
    const fetchSongs = async () => {
      const savedSongs = await getSongs();
      setSongs(savedSongs);
    };
    fetchSongs();
  }, []);

  return (
    <div className="container">
      <div className="section">
        <h1 className="section-title">🎵 Downloaded Songs</h1>
        {songs.length === 0 ? (
          <p>No songs downloaded yet.</p>
        ) : (
          <div className="song-list">
            {songs.map((song) => (
              <div key={song.id} className="offline-song-card">
                <img src={song.image} alt={song.title} />
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist || 'unknown'}</p>
                  <audio className='offline-control' src={URL.createObjectURL(song.blob)} controls/>
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
