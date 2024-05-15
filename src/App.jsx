import { useState } from 'react'
import './App.css'
import Navbar from './Components/NavbarCom.jsx';
import MusicPlaylist from './Components/MusicPlaylist.jsx';
import MusicPlayer from './Components/musicPlayer.jsx';
import SearchResults from './Components/SearchResults.jsx';

function App() {

  const [searchResults, setSearchResults] = useState([]);

    const updateSearchResults = (results) => {
        setSearchResults(results);
    };
return(
  <>
  <Navbar updateSearchResults={updateSearchResults} />
  {searchResults.length > 0 && <SearchResults results={searchResults} />}
  {/* <searchResults /> */}
  <MusicPlaylist />
  <MusicPlayer />
  </>  
)
}

export default App;