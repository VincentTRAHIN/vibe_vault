import React, { useState } from "react";


function SearchBar(props) {
const [searchTerm, setSearchTerm] = useState("");

const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
}

const search = () => {
    props.onSearch(searchTerm);
}

        return (
            <div className="flex justify-center items-center">
                <input type="text" placeholder="Enter A Song Title" className=" text-black p-2 rounded" onChange={handleTermChange} />
                <button className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 mx-2 rounded" onClick={search}>
            SEARCH
          </button>
            </div>
        )
    
}

export default SearchBar; 


