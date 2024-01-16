import SearchBar from './components/SearchBar.jsx'
import SearchResults from './components/SearchResults.jsx'
import Playlist from './components/Playlist.jsx'
import './global.css'

function App() {
  return (
    
    <div >
      <header>
        <h1>VibeVault</h1>
      </header>
      <main>
        <SearchBar />
        <div >
          <SearchResults />
          <Playlist />
        </div>
      </main>
    </div>
  );
}

export default App;