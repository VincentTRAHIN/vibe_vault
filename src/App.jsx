import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import SearchResults from "./components/SearchResults/SearchResults.jsx";
import Playlist from "./components/Playlist/Playlist.jsx";
import "./global.css";

function App() {
  const [searchResults, setSearchResults] = useState([
    {
      id: "1",
      name: "Shape of You",
      artist: "Ed Sheeran",
      album: "÷",
      uri: "spotify:track:7qiZfU4dY1lWllzX7mPBI3",
    },
    {
      id: "2",
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      uri: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
    },
    {
      id: "3",
      name: "Rockstar",
      artist: "Post Malone",
      album: "Beerbongs & Bentleys",
      uri: "spotify:track:0e7ipj03S05BNilyu5bRzt",
    },
    {
      id: "4",
      name: "Someone Like You",
      artist: "Adele",
      album: "21",
      uri: "spotify:track:3bNv3VuUOKgrf5hu3YcuRo",
    },
    {
      id: "5",
      name: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      uri: "spotify:track:2Fxmhks0bxGSBdJ92vM42m",
    },
  ]);

  // Add state for the <playlistN></playlistN>ame
  const [playlistName, setPlaylistName] = useState("My 1st Playlist");

  // Add state for the playlistTracks
  const [playlistTracks, setPlaylistTracks] = useState([]);

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
  const trackURIs = playlistTracks.map((track) => track.uri);

  // Reset the playlist name and tracks
  setPlaylistName("New Playlist");
  setPlaylistTracks([]);
}

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
            <SearchResults searchResults={searchResults} onAdd={addTrack} />
          </div>
          <div className="col-span-1">
            <Playlist
              playlistName={playlistName}
              tracks={playlistTracks}
              onNameChange={setPlaylistName}
              onRemove={removeTrack}
              onSave={savePlaylist}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
