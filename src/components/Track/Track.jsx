// Create A component that Represents an individual track or song.
// src/components/Tracklist.jsx

function Track(props) {
        return (
            <div >
                <div >
                    <h3>{props.name}  </h3>
                    <p> {props.artist} | {props.album} </p>
                </div>
                <button className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded w-full">
            + or -
          </button>
            </div>
        )
    
}

export default Track; 
