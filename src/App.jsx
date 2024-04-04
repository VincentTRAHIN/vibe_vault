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

  // Méthode to select a playlist
  const selectPlaylist = (id) => {
    Spotify.getPlaylist(id).then(playlistData => {
      setPlaylistName(playlistData.name); 
      setPlaylistTracks(playlistData.tracks);
      setPlaylistId(id);
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
        <h1 className="py-3 bg-[#010c3f] text-center text-[1.88rem] text-white font-poppins
">VibeVault</h1>
      <div className="h-full py-0 px-[17%] pb-[10%] bg-cover bg-center bg-no-repeat text-white font-[Work Sans] font-medium
">
          <SearchBar onSearch = {search} />
        <div className="flex justify-between w-full md:flex-col md:items-center ">
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
            <Playlist
              playlistName={playlistName}
              tracks={playlistTracks}
              onNameChange={setPlaylistName}
              onRemove={removeTrack}
              onSave={savePlaylist}
            />
            <PlaylistList selectPlaylist={selectPlaylist} />
        </div>
      </div>
    </div>
  );
}

export default App;
