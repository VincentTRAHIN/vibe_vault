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
            <div className="flex flex-col justify-center items-center pt-28 mb-24 border-solid border-1 border-white ">
                <input type="text" placeholder="Enter A Song Title" className=" w-72 text-black rounded-md py-4 px-0 mb-9 text-center border-solid border-1 border-white focus:outline-none" onChange={handleTermChange} />
                <button className="bg-purple-800 hover:bg-purple-900  text-white font-bold w-32 py-3 px-0  mx-2 rounded-3xl text-center cursor-pointer" onClick={search}>
            SEARCH
          </button>
            </div>
        )
    
}

export default SearchBar; 


