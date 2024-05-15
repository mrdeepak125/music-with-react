import React, { useEffect, useState } from 'react';
import Search from '../assets/img/system-solid-42-search .png'
import { getSongsByQuery } from '../lib/fetch';
// import ArtistCard from './ArtistCard';


const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        // Check if dark mode preference is saved in local storage
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);

        // Set background color based on dark mode preference
        document.body.style.backgroundColor = isDarkMode ? '#141619' : '#fff';
        document.body.style.color = isDarkMode ? '#B3B4BD' : '#141619';
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode); // Save dark mode preference to local storage

        // Toggle background color
        document.body.style.backgroundColor = newDarkMode ? '#141619' : '#fff';
        document.body.style.color = newDarkMode ? '#B3B4BD' : '#141619';
    };

    const handleSearch = async () => {
        try {
            const response = await getSongsByQuery(query);
            const data = await response.json();
            console.log('Search Results:', data); // Check the structure of data
            setSearchResults(data); // Update search results state
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleArtistClick = async (artistName) => {
        try {
            const response = await getSongsByQuery(artistName);
            const artistSongs = await response.json();
            if (artistSongs.length > 0) {
                const firstSong = artistSongs[0]; 
                setData(firstSong); 
                setPlaying(true); 
            } else {
                console.error(`No songs found for artist: ${artistName}`);
            }
        } catch (error) {
            console.error('Error fetching songs by artist:', error);
        }
    };

    return(    
        <>
 <div className="navbar">
            <div className="left-section">
                <span>Playlist</span>
                <span>Popular</span>
                <span>Recommend</span>
            </div>
            <div className="right-section">
                <input type="text"
                        placeholder="Music Search..."
                        maxLength={100}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress} // Bind enter key press event
                        />
                <div className="searchTerm" onClick={handleSearch}>
                    <img src={Search} alt="User" />
                </div>
                <div className="user-circle">
                    {/* <img src={User} alt="User" trigger="hover"/> */}
                </div>
                <div className="dark-mode">
                    <label className="ui-switch">
                    <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                        <div className="slider">
                            <div className="circle" />
                        </div>
                    </label>
                </div>
            </div>
        </div>
        {searchResults.length > 0 && (
                <div className="search-results">
                    {/* Display search results using ArtistCard component */}
                    {searchResults.map((result, index) => (
                        <div key={index} className="search-result-item">
                            <img src={result.image} alt={result.name} />
                            <p>{result.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );

}
export default Navbar;