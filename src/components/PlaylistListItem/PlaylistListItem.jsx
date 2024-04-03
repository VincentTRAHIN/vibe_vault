// PlaylistListItem/PlaylistListItem.jsx

import React from 'react';

function PlaylistListItem(props) {
    const { id, name, onSelectPlaylist } = props;
    return (
        <div onClick={() => onSelectPlaylist(id)} className='flex items-center border-b border-white border-opacity-80 pt-4'>
            <h3 className='cursor-pointer py-[.77rem] border-0 mt-[1.27rem] text-center text-[.83rem] transition-colors duration-250 text-white font-medium hover:text-[rgba(108,65,233,0.7)]'>{name}</h3>
        </div>
    );
}


export default PlaylistListItem;
