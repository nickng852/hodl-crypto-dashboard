import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import WatchListModalResult from "./WatchListModalResult";

const WatchListModal = ({
  token,
  user,
  setUser,
  coins,
  modalOpen,
  setModalOpen,
}) => {
  const [watchListSearch, setWatchListSearch] = useState("");

  // Modal Handler
  const modalToggle = () => {
    setModalOpen(!modalOpen);

    setWatchListSearch("");
  };

  const handleChange = (e) => {
    setWatchListSearch(e.target.value);
  };

  // Find matched results between input value and API data
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(watchListSearch.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(watchListSearch.toLowerCase())
  );

  return (
    <>
      <ClickAwayListener onClickAway={modalToggle}>
        <div className="absolute flex w-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg top-1/2 left-1/2 dark:bg-secondary h-1/2">
          <div className="flex flex-col w-full gap-6 p-6">
            <div className="flex justify-between">
              <h1 className="flex items-center text-xl font-bold cursor-default dark:text-gray-100">
                Add to watchlist
              </h1>

              <button
                className="flex items-center justify-center p-2 rounded cursor-default dark:hover:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
                onClick={modalToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="z-40 w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div>
              <input
                className="w-full px-4 py-3 text-gray-700 bg-white border dark:placeholder-gray-500 dark:bg-tertiary rounded-xl dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                placeholder="Search Crypto"
                onChange={handleChange}
              />
            </div>

            <div className="overflow-auto">
              {filteredCoins.map((result, index) => {
                return (
                  <>
                    <WatchListModalResult
                      key={result.id}
                      token={token}
                      user={user}
                      setUser={setUser}
                      result={result}
                      id={result.id}
                      name={result.name}
                      symbol={result.symbol}
                      icon={result.iconUrl}
                      setWatchListSearch={setWatchListSearch}
                    />
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default WatchListModal;
