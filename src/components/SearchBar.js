import React from "react";

const SearchBar = ({ setSearch }) => {
  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <input
          className="bg-gray-50 rounded-md w-2/4 px-5 py-3 m-16 shadow-sm"
          type="text"
          placeholder="Search..."
          onChange={changeHandler}
        />
      </div>
    </>
  );
};

export default SearchBar;
