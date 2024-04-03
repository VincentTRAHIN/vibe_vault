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
        <div className="flex flex-col items-center pt-[6.94rem] mb-[6.33rem]">
                <input type="text" placeholder="Enter A Song Title" className=" w-[287px] py-[.88rem] px-0 border border-white rounded text-center text-[1rem] text-[#010c3f] mb-[2.22rem] focus:outline-none" onChange={handleTermChange} />
                <button className="cursor-pointer w-[8.11rem] py-[.77rem] px-0 rounded-full bg-[#010c3f] text-center text-[.833rem] transition-colors duration-250 border-0 text-white font-medium hover:bg-[rgba(108,65,233,.7)]" onClick={search}>
                    SEARCH
                </button>
        </div>
        )
    
}

export default SearchBar; 


