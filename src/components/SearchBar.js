import React from "react";

const SearchBar = ({ setSearch }) => {
  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <input
          type="text"
          id="search-bar"
          className="py-2 px-4 m-16 w-2/4 text-base placeholder-gray-400 text-gray-700 bg-white rounded-lg border border-transparent border-gray-300 shadow-sm appearance-none focus:border-transparent focus:ring-2 focus:ring-purple-600 focus:outline-none"
          placeholder="Search..."
          onChange={changeHandler}
        />
      </div>
    </>
  );
};

export default SearchBar;
