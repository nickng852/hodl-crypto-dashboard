import { useState } from "react";

import { useSelector } from "react-redux";
import { selectCoins } from "../../features/coins/coinsSlice";

import WatchListModalResult from "./WatchListModalResult.jsx";

import ClickAwayListener from "react-click-away-listener";

const WatchListModal = ({ modalOpen, setModalOpen }) => {
  const [watchListSearch, setWatchListSearch] = useState("");

  const coins = useSelector(selectCoins);

  const modalToggle = () => {
    setModalOpen(!modalOpen);

    setWatchListSearch("");
  };

  const handleChange = (e) => {
    setWatchListSearch(e.target.value);
  };

  // Find matched results between input value and API data
  const filteredCoins = coins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(watchListSearch.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(watchListSearch.toLowerCase())
  );

  return (
    <>
      <ClickAwayListener onClickAway={modalToggle}>
        <div className="fixed z-10 flex w-11/12 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg 2xl:w-1/4 top-1/2 left-1/2 dark:bg-secondary h-3/5 2xl:h-1/2">
          <div className="flex flex-col w-full gap-6 p-5 2xl:p-6">
            <div className="flex justify-between">
              <h1 className="flex items-center text-base font-bold cursor-default md:text-xl dark:text-gray-100">
                Add to watchlist
              </h1>

              <button
                className="flex items-center justify-center rounded cursor-default 2xl:p-2 xl:dark:hover:bg-tertiary xl:hover:bg-gray-200 dark:text-gray-300"
                onClick={modalToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="z-40 w-5 h-5 2xl:w-6 2xl:h-6"
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
                className="w-full px-2 py-1 text-gray-700 bg-white border rounded-md 2xl:rounded-xl 2xl:px-4 2xl:py-3 dark:placeholder-gray-500 dark:bg-tertiary dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring placeholder:text-sm 2xl:placeholder:text-base"
                placeholder="Search Crypto"
                onChange={handleChange}
              />
            </div>

            <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full dark:scrollbar-thumb-tertiary dark:scrollbar-track-secondary">
              {filteredCoins?.map((result, index) => {
                return (
                  <>
                    <WatchListModalResult
                      key={index}
                      id={result.uuid}
                      icon={result.iconUrl}
                      name={result.name}
                      symbol={result.symbol}
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
