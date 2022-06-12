import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  selectToken,
  selectUser,
  setUser,
  setWatchList,
} from "../../features/auth/authSlice";
import { selectCoins } from "../../features/coins/coinsSlice";

import LineChart from "../linechart/LineChart";

// Firebase
import { db } from "../../firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

const WatchList = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const coins = useSelector(selectCoins);

  const filteredWatchList = [];

  if (user.watchlist != null) {
    for (let i = 0; i < user.watchlist.length; i++) {
      filteredWatchList.push(
        coins.filter((coin) => coin.uuid.includes(user.watchlist[i]))
      );
    }
  }

  const watchlist = filteredWatchList?.flat(1); // destructure the output

  return (
    <>
      <div className="overflow-y-scroll md:overflow-auto md:h-96 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full dark:scrollbar-thumb-tertiary dark:scrollbar-track-secondary">
        {watchlist?.length !== 0 ? (
          <>
            {watchlist?.map((result, index) => {
              const id = result.uuid;
              const icon = result.iconUrl;
              const name = result.name;
              const symbol = result.symbol;
              const price = Number(result.price); // string returned from API
              const priceChange = Number(result.change); // string returned from API
              const AbsPriceChange = Math.abs(priceChange); // trim "-" for display

              // LineChart Data
              const chartLabel = [];
              const chartStat = [];

              for (let i = 0; i < result.sparkline?.length; i++) {
                chartLabel.push(i); // get each index from individual array
                chartStat.push(result.sparkline[i]); // get each array from response
              }

              // Remove individual item from watchlist
              const removeItem = () => {
                const currentItemIndex = index;

                const filteredList = user.watchlist.filter(
                  (result, index) => index !== currentItemIndex
                );

                dispatch(setWatchList((prev) => ({ ...prev, filteredList })));

                // Add watchlist data to Firestore
                const docData = {
                  watchlist: filteredList,
                };

                updateDoc(doc(db, "users", token.uid), docData);
              };

              return (
                <div className="relative" key={index}>
                  <Link to={`/coin/${id}`}>
                    <div className="grid h-24 grid-cols-12 cursor-default lg:px-6 md:border-b md:border-gray-200 xl:hover:bg-gray-100 md:dark:border-gray-700 xl:dark:hover:bg-secondary">
                      <div className="flex items-center col-span-4 space-x-3 2xl:space-x-6">
                        <img
                          alt={name}
                          src={icon}
                          className="w-5 h-5 rounded-full 2xl:w-6 2xl:h-6"
                        />

                        <span className="text-sm font-medium text-gray-700 2xl:text-base dark:text-gray-100">
                          {symbol}
                        </span>
                      </div>

                      <div className="flex items-center justify-center col-span-3 md:col-span-2">
                        <div className="flex items-center w-full md:w-5/6 2xl:w-full">
                          <LineChart
                            key={index}
                            chartLabel={chartLabel}
                            chartStat={chartStat}
                            priceChange={priceChange}
                            watchList
                          />
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center col-span-4 text-sm 2xl:text-base 2xl:col-span-5">
                        <div className="w-2/3 text-right">
                          <div className="text-gray-700 dark:text-gray-100">
                            $
                            {`${
                              price < 1
                                ? price.toPrecision(4)
                                : price.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                  })
                            }`}
                          </div>

                          <div
                            className={`${
                              (priceChange < 0 && "text-red-500") ||
                              (priceChange === 0 && "text-gray-500") ||
                              (priceChange > 0 && "text-green-500")
                            } `}
                          >
                            {`${
                              (priceChange < 0 &&
                                "-" + AbsPriceChange.toFixed(2) + "%") ||
                              (priceChange === 0 &&
                                AbsPriceChange.toFixed(2) + "%") ||
                              (priceChange > 0 &&
                                "+" + AbsPriceChange.toFixed(2) + "%")
                            }`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <button
                    className="absolute py-3 transition-colors duration-200 transform -translate-y-1/2 rounded cursor-auto 2xl:p-3 right-2 top-1/2 2xl:hover:bg-gray-200 2xl:dark:hover:bg-tertiary dark:text-gray-300"
                    onClick={removeItem}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
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
              );
            })}
          </>
        ) : (
          <>
            <div className="flex items-center justify-center h-24 md:overflow-auto md:h-full">
              <div className="text-gray-600 cursor-default 2xl:text-xl dark:text-gray-500">
                Your watchlist will be displayed here.
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WatchList;
