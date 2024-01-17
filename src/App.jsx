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
    <div className="min-h-screen bg-purple-600 text-white">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">VibeVault</h1>
      </header>
      <main className="px-4">
        <div className="max-w-md mx-auto">
          <SearchBar />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center  ">
          <div className="col-span-1">
            <SearchResults searchResults={searchResults} />
          </div>
          <div className="col-span-1">
            <Playlist />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;