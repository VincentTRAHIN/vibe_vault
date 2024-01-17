import React from "react";
import Tracklist from "../Tracklist/Tracklist.jsx";

function SearchResults(props) {

    return (
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl mb-4">Results</h2>
          <div>
            <Tracklist tracks={props.searchResults} />
          </div>
        </div>
      );
   
    
}

export default SearchResults; 
