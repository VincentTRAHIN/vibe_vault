import React, { useState } from 'react'
import SearchBar from './components/SearchBar/SearchBar.jsx'
import SearchResults from './components/SearchResults/SearchResults.jsx'
import Playlist from './components/Playlist/Playlist.jsx'
import './global.css'

function App() {

  const [searchResults, setSearchResults] = useState([
    {
      id: '1',
      name: 'Shape of You',
      artist: 'Ed Sheeran',
      album: '÷'
  },
  {
      id: '2',
      name: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours'
  },
  {
      id: '3',
      name: 'Rockstar',
      artist: 'Post Malone',
      album: 'Beerbongs & Bentleys'
  },
  {
      id: '4',
      name: 'Someone Like You',
      artist: 'Adele',
      album: '21'
  },
  {
      id: '5',
      name: 'Bad Guy',
      artist: 'Billie Eilish',
      album: 'When We All Fall Asleep, Where Do We Go?'
  }
  ]);

  return (
    <div >
      <header>
        <h1>VibeVault</h1>
      </header>
      <main>
        <SearchBar />
        <div >
          <SearchResults searchResults={searchResults} />
          <Playlist />
        </div>
      </main>
    </div>
  );
}

export default App;