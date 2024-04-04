// Create A component that Represents an individual track or song.
// src/components/Tracklist.jsx
import AudioPlayer from '../AudioPlayer/AudioPlayer.jsx';

function Track(props) {
  const addTrack = () => {
    props.onAdd(props.track);
  };

  const removeTrack = () => {
    props.onRemove(props.track);
  };

  

  return (
    <div className="flex items-center border-b border-white border-opacity-80">
      <div className="flex-grow flex flex-col justify-center h-[72px]">
        <h3 className="mb-1">{props.name} </h3>
        <p className="text-sm font-light text-white text-opacity-80
">
          {" "}
          {props.artist} | {props.album}{" "}
        </p>
      </div>
      <AudioPlayer controls previewUrl={props.preview_url} />

      {
        props.isRemoval ?
        (<button className="cursor-pointer p-2 text-lg transition-colors duration-200 border-0 bg-transparent text-white hover:text-white hover:text-opacity-50" onClick={removeTrack}>
            -
        </button> ) : (      
        <button
        className="cursor-pointer p-2 text-lg transition-colors duration-200 border-0 bg-transparent text-white hover:text-white hover:text-opacity-50"
        onClick={addTrack}
      >
        +
      </button>)}
    </div>
  );
}

export default Track;
