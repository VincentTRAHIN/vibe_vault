// Create A component that Represents an individual track or song.
// src/components/Tracklist.jsx

function Track(props) {
  const addTrack = () => {
    props.onAdd(props.track);
  };

  const removeTrack = () => {
    props.onRemove(props.track);
  };

  return (
    <div className="flex items-center border-b border-white border-opacity-80
    ">
      <div className="flex-grow flex flex-col justify-center h-18
">
        <h3 className="mb-1">{props.name} </h3>
        <p className="text-sm font-light text-white text-opacity-80
">
          {" "}
          {props.artist} | {props.album}{" "}
        </p>
      </div>

      {
        props.isRemoval ?
        (<button className="cursor-pointer w-1/5 p-2 text-lg transition-colors duration-200 border-0 bg-transparent text-black hover:text-white
        " onClick={removeTrack}>
            -
        </button> ) : (      
        <button
        className="cursor-pointer w-1/5 p-2 text-lg transition-colors duration-200 border-0 bg-transparent text-black hover:text-white"
        onClick={addTrack}
      >
        +
      </button>)}
    </div>
  );
}

export default Track;
