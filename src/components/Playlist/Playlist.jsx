import React from "react";
import Tracklist from "../Tracklist/Tracklist.jsx";

function Playlist(props) {
    // Method that handles the change of the playlist name
    const handleNameChange = (e) => {
        props.onNameChange(e.target.value);
    };

    return (
        <div className="flex flex-col items-center w-full max-h-950px py-9 px-7">
            <input
                type="text"
                value={props.playlistName || ''}
                onChange={handleNameChange}
                className="text-gray-700 mb-4 p-2 w-full border outline   "
            />
            <Tracklist tracks={props.tracks} onRemove={props.onRemove} isRemoval={true} />
            <button className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 w-full cursor-pointer w-40 rounded-3xl border-0 text-center " onClick={props.onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;
