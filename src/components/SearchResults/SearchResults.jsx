import React from "react";
import Tracklist from "../Tracklist/Tracklist.jsx";

function SearchResults(props) {

    return (
        <div className="w-1/2 h-[950px] overflow-y-scroll scrollbar-hide p-[.88rem] bg-[rgba(1,12,63,0.7)] shadow-[0_4px_2px_2px_#000] md:w-[90%] md:mb-[2rem]">
          <h2 className="font-poppins text-[1.55rem]">Results</h2>
          <Tracklist tracks={props.searchResults} onAdd={props.onAdd} />
        </div>
      );
   
    
}

export default SearchResults; 
