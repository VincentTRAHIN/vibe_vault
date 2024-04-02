// PlaylistListItem/PlaylistListItem.jsx

import React from 'react';

function PlaylistListItem(props) {
    const { id, name, onSelectPlaylist } = props;
    return (
        <div onClick={() => onSelectPlaylist(id)}>
            <h3>{name}</h3>
        </div>
    );
}


export default PlaylistListItem;
