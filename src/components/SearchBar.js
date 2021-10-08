import React from "react";
import SearchBarResult from "./SearchResult";

const SearchBar = ({ coins, search, setSearch }) => {
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  console.log(filteredCoins);

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <section className="relative w-full max-w-md px-5 py-4 mx-auto rounded-md">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            placeholder="Search"
            onChange={changeHandler}
          />
        </div>
        {search && filteredCoins.length !== 0 ? (
          <div className="absolute inset-x-0 px-6 py-3 mx-5 mt-4 overflow-y-auto bg-white border border-gray-300 rounded-md max-h-72 dark:bg-gray-800 dark:border-transparent">
            {filteredCoins.map((result, index) => {
              return (
                <>
                  <SearchBarResult
                    key={index}
                    name={result.name}
                    symbol={result.symbol}
                  />
                </>
              );
            })}
          </div>
        ) : null}
      </section>
    </>
  );
};

export default SearchBar;
