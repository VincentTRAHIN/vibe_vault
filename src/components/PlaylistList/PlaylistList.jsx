// PlaylistList.jsx

import React, { Component } from 'react';
import Spotify from '../../utils/SpotifyApiConnexion.js';
import PlaylistListItem from '../PlaylistListItem/PlaylistListItem.jsx';

class PlaylistList extends Component {
  state = {
    playlists: [],
  };

  componentDidMount() {
    Spotify.getUserPlaylists().then(playlists => this.setState({ playlists }));
  }

  render() {
    const { selectPlaylist } = this.props; 
  
  return (
    <div>
      {this.state.playlists.map(playlist => (
        <PlaylistListItem key={playlist.id} id={playlist.id} name={playlist.name} onSelectPlaylist={selectPlaylist} />
      ))}
    </div>
  );
  }
}

export default PlaylistList;
