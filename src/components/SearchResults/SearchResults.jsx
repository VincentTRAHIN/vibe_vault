import React from "react";
import Tracklist from "../Tracklist/Tracklist.jsx";

function SearchResults(props) {

return (
    <div >
        <h2>Results</h2>
        <div >
            <Tracklist tracks={props.searchResults} />
        </div>
    </div>
)

   
    
}

export default SearchResults; 
