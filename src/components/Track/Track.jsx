// Create A component that Represents an individual track or song.
// src/components/Tracklist.jsx

function Track(props) {
        return (
            <div >
                <div >
                    <h3>{props.name}  </h3>
                    <p> {props.artist} | {props.album} </p>
                </div>
                <button > + or - will go here </button>
            </div>
        )
    
}

export default Track; 
