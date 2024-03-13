import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import Playlist from "./components/Playlist/Playlist.jsx";
import PlaylistList from "./components/PlaylistList/PlaylistList.jsx";
import Spotify from "./utils/SpotifyApiConnexion.js";
import "./global.css";

function App() {
  // Add state for the searchResults
  const [searchResults, setSearchResults] = useState([]);

  // Add state for the playlistName
  const [playlistName, setPlaylistName] = useState("New Playlist");

  // Add state for the playlistTracks
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Add state for the playlistId 
  const [playlistId, setPlaylistId] = useState(null);

  


  // Method that searches the Spotify API
  const search = (term) => {
    Spotify.search(term).then((results) => {
      setSearchResults(results);
    });
  }

  // Method that selectPlayList 
  const selectPlaylist = (id) => {
    Spotify.getPlaylist(id).then(playlist => {
      setPlaylistName(playlist.name);
      setPlaylistTracks(playlist.tracks);
      setPlaylistId(id); // Update the playlistId state
    });
  };
  
  




  // Method that add a track from the playlist
  const addTrack = (track) => {
    // Check if the track is already in the playlist
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return; // If it is, stop here
    }
    // Add new track to the playlist
    setPlaylistTracks([...playlistTracks, track]);
  };

  // Method that removes a track from the playlist
  const removeTrack = (track) => {
    // Filter the track out of the playlist
    const newPlaylist = playlistTracks.filter(
      (currentTrack) => currentTrack.id !== track.id
    );
    // Set the new playlist
    setPlaylistTracks(newPlaylist);
  };

// Create a method savePlaylist with URIs to save the spotify playlist

const savePlaylist = () => {
  const trackURIs = playlistTracks.map(track => track.uri);
  Spotify.savePlaylist(playlistName, trackURIs, playlistId).then(() => {
    setPlaylistName("New Playlist");
    setPlaylistTracks([]);
    setPlaylistId(null); // Reset the playlist ID
  });
};


  return (
    <div className="min-h-screen bg-purple-600 text-white">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold">VibeVault</h1>
      </header>
      <main className="px-4">
        <div className="max-w-md mx-auto">
          <SearchBar onSearch = {search} />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center ">
          <div className="col-span-1 bg-black bg-opacity-25 p-3 my-2 rounded shadow-black">
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
          </div>
          <div className="col-span-1 bg-black bg-opacity-25 p-3 my-2 rounded shadow-black">
            <Playlist
              playlistName={playlistName}
              tracks={playlistTracks}
              onNameChange={setPlaylistName}
              onRemove={removeTrack}
              onSave={savePlaylist}
            />
          </div>
          <div className="col-span-1 bg-black bg-opacity-25 p-3 my-2 rounded shadow-black">
            <PlaylistList selectPlaylist={selectPlaylist} />
        </div>
        </div>
      </main>
    </div>
  );
}

export default App;
