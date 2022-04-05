import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  selectToken,
  selectUser,
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

  const watchlist = filteredWatchList.flat(1); // destructure the output

  return (
    <>
      <div className="overflow-auto h-96">
        {watchlist.length !== 0 ? (
          <>
            {watchlist.map((result, index) => {
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

                dispatch(
                  setWatchList((prev) => ({ ...prev, watchlist: filteredList }))
                );

                // Add watchlist data to Firestore
                const docData = {
                  watchlist: filteredList,
                };

                updateDoc(doc(db, "users", token.uid), docData);
              };

              return (
                <>
                  <div className="relative">
                    <Link
                      to={`/coin/${id}`}
                      key={index}
                      className="cursor-default"
                    >
                      <div className="flex h-24 border-b border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-secondary">
                        <div className="flex items-center justify-center w-1/6">
                          <img
                            alt={name}
                            src={icon}
                            className="w-6 h-6 rounded-full"
                          />

                          <div className="ml-5 font-medium text-gray-700 dark:text-gray-100">
                            {symbol}
                          </div>
                        </div>

                        <div className="flex items-center justify-center w-2/6">
                          <div className="w-32">
                            <LineChart
                              key={index}
                              chartLabel={chartLabel}
                              chartStat={chartStat}
                              priceChange={priceChange}
                              watchList
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-center w-1/6">
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
                        </div>

                        <div className="flex items-center justify-center w-1/6">
                          <div
                            className={`${
                              (priceChange < 0 && "text-red-500") ||
                              (priceChange === 0 && "text-gray-500") ||
                              (priceChange > 0 && "text-green-500")
                            }`}
                          >
                            {`${
                              (priceChange < 0 &&
                                AbsPriceChange.toFixed(2) + "%") ||
                              (priceChange === 0 &&
                                AbsPriceChange.toFixed(2) + "%") ||
                              (priceChange > 0 &&
                                AbsPriceChange.toFixed(2) + "%")
                            }`}
                          </div>
                        </div>
                      </div>
                    </Link>

                    <button
                      className="absolute p-3 transition-colors duration-200 transform -translate-y-1/2 rounded cursor-auto right-4 top-1/2 hover:bg-gray-200 dark:hover:bg-tertiary dark:text-gray-300"
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
                </>
              );
            })}
          </>
        ) : (
          <>
            <div className="flex items-center justify-center overflow-auto h-96">
              <div className="text-xl text-gray-600 cursor-default dark:text-gray-500">
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
