// Create A component to show a collection of tracks that users can create or modify.
// src/components/Playlist.jsx

import Tracklist from "../Tracklist/Tracklist.jsx";


function Playlist(props) {
    return (
        <div className="w-full md:w-1/2">
          <input
            type="text"
            value={props.playlistName}
            onChange={e => props.onNameChange(e.target.value)}
            className="text-gray-700 mb-4 p-2 w-full"
          />
          <Tracklist tracks={props.tracks} onRemove={props.onRemove} isRemoval={true} />
          <button className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded w-full">
            SAVE TO SPOTIFY
          </button>
        </div>
      );
    
}
export default Playlist; 

