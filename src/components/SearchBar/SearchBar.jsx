// Create a simple SearchBar component that contains an input field and a 'Saerch' button to handle the search queries.
// src/components/SearchBar.jsx

function SearchBar() {
        return (
            <div className="flex justify-center items-center">
                <input type="text" placeholder="Enter A Song Title" className=" text-black p-2 rounded" />
                <button className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 mx-2 rounded ">
            SEARCH
          </button>
            </div>
        )
    
}

export default SearchBar; 


