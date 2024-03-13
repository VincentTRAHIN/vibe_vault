// Create A component that shows a list of tracks, either as search results or part of a playlist.
// src/components/Tracklist.jsx
import React from "react";
import Track from "../Track/Track.jsx";

function Tracklist(props) {
  const tracks = props.tracks || [];

    return (
        <div className="space-y-3">
          {tracks.map(track => (
            <Track
              key={track.id}
              track={track}
              name={track.name}
              artist={track.artist}
              album={track.album}
              onAdd={() => props.onAdd(track)}
              onRemove={() => props.onRemove(track)}
              isRemoval={props.isRemoval}
            />
          ))}
        </div>
      );
}

export default Tracklist;
