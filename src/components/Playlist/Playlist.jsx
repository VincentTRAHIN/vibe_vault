import React from "react";
import Tracklist from "../Tracklist/Tracklist.jsx";

function Playlist(props) {
    // Method that handles the change of the playlist name
    const handleNameChange = (e) => {
        props.onNameChange(e.target.value);
    };

    return (
        <div className="fflex flex-col items-center overflow-y-scroll scrollbar-hide w-[37%] max-h-[950px] p-[2.27rem 6rem] bg-[rgba(1,12,63,0.7)] shadow-[0_4px_2px_2px_#000] md:w-[90%] mb-8
        ">
            <input
                type="text"
                value={props.playlistName || ''}
                onChange={handleNameChange}
                className="w-full border-0 outline-none bg-transparent border-b border-[#6f6f6f] font-poppins text-[1.55rem] text-white
                "
            />
            <Tracklist tracks={props.tracks} onRemove={props.onRemove} isRemoval={true} />
            <button className="cursor-pointer w-[10rem] py-[.77rem] rounded-full border-0 mt-[1.27rem] bg-[#6c41ec] text-center text-[.83rem] transition-colors duration-250 text-white font-medium hover:bg-[rgba(108,65,233,0.7)]" onClick={props.onSave}>
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default Playlist;
