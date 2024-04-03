import React from "react";
import Tracklist from "../Tracklist/Tracklist.jsx";

function SearchResults(props) {

    return (
        <div className=" h-950px p-4 shadow-md">
          <h2 className="text-2xl mb-4">Results</h2>
          <div>
            <Tracklist tracks={props.searchResults} onAdd={props.onAdd} />
          </div>
        </div>
      );
   
    
}

export default SearchResults; 
