// Create A component that shows a list of tracks, either as search results or part of a playlist.
// src/components/Tracklist.jsx
import React from "react";
import Track from "../Track/Track.jsx";

function Tracklist(props) {
        return (
            <div >
                {props.tracks.map(track => {
                    <Track
                        key={track.id}
                        name= {track.name}
                        artist= {track.artist}
                        album= {track.album}
                     />
                })}                
            </div>
        )
    
}


export default Tracklist; 
