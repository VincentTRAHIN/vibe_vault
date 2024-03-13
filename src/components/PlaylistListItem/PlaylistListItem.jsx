// PlaylistListItem/PlaylistListItem.jsx

import React from 'react';

const PlaylistListItem = ({ id, name, onSelectPlaylist }) => { // Add onSelectPlaylist here
    return (
      <div onClick={() => onSelectPlaylist(id)}>
        <h3>{name}</h3>
      </div>
    );
  };

export default PlaylistListItem;
