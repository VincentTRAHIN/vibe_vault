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
    <div className='w-1/2 h-[950px] overflow-y-scroll scrollbar-hide p-[.88rem] bg-[rgba(1,12,63,0.7)] shadow-[0_4px_2px_2px_#000] md:w-[90%] md:mb-[2rem]'>
      <h3 className='font-poppins text-[1.55rem] text-center'>Playlists</h3>
      {playlists.map(playlist => (
        <PlaylistListItem key={playlist.id} id={playlist.id} name={playlist.name} onSelectPlaylist={selectPlaylist} />
      ))}
    </div>
  );
}

export default PlaylistList;
