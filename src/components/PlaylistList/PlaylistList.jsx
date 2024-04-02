// PlaylistList.jsx

import React, { useState, useEffect } from 'react';
import Spotify from '../../utils/SpotifyApiConnexion.js';
import PlaylistListItem from '../PlaylistListItem/PlaylistListItem.jsx';

function PlaylistList(props) {
  const { selectPlaylist } = props;
  const [playlists, setPlaylists] = useState([]);
  
  useEffect(() => {
    Spotify.getUserPlaylists().then(playlists => {
      console.log("Fetched playlists:", playlists); // Add this to debug
      setPlaylists(playlists);
    });
  }, []); // Dependency array remains empty to only fetch on component mount
  

  return (
    <div>
      {playlists.map(playlist => (
        <PlaylistListItem key={playlist.id} id={playlist.id} name={playlist.name} onSelectPlaylist={selectPlaylist} />
      ))}
    </div>
  );
}

export default PlaylistList;
