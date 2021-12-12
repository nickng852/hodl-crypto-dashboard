import React from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { db } from "../../firebase/firebase.config";
import { doc, updateDoc } from "firebase/firestore";

const WatchList = ({ token, user, setUser }) => {
  return (
    <>
      <div className="overflow-auto h-96">
        {user.watchlist.length ? (
          <>
            {user.watchlist.map((result, index) => {
              const id = result.uuid;
              const icon = result.iconUrl;
              const symbol = result.symbol;
              const name = result.name;
              const price = Number(result.price); // string returned from API
              const priceChange = result.change;
              const AbsPriceChange = Math.abs(priceChange);

              // Chart.js
              const chartLabel = [];
              const chartData = [];

              for (let i = 0; i < result.history?.length; i++) {
                chartLabel.push(i); // get each index from individual array
                chartData.push(result.history[i]); // get each array from response
              }

              const data = (canvas) => {
                const ctx = canvas.getContext("2d");
                const gradient = ctx.createLinearGradient(0, 0, 0, 50);

                if (priceChange < 0) {
                  gradient.addColorStop(0, "rgba(214, 69, 65, 0.5)");
                  gradient.addColorStop(1, "rgba(214, 69, 65,0.01)");
                } else {
                  gradient.addColorStop(0, "rgba(34, 153, 84,0.5)");
                  gradient.addColorStop(1, "rgba(34, 153, 84,0.01)");
                }

                return {
                  labels: chartLabel,
                  datasets: [
                    {
                      data: chartData,
                      fill: true,
                      backgroundColor: gradient,
                      borderColor: priceChange < 0 ? "#e74c3c" : "#218c74",
                      borderWidth: 1,
                    },
                  ],
                };
              };

              const options = {
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                radius: 0,
                tension: 0.4,
              };

              // Remove individual item from watchlist
              const removeItem = () => {
                const currentItemIndex = index;

                const filteredList = user.watchlist.filter(
                  (result, index) => index !== currentItemIndex
                );

                setUser((prev) => ({ ...prev, watchlist: filteredList }));

                // Add watchlist data to Firestore
                const docData = {
                  watchlist: filteredList,
                };

                updateDoc(doc(db, "users", token.uid), docData);
              };

              return (
                <>
                  <div key={id} className="relative">
                    {/* Individual watchlist */}
                    <Link
                      to={`/cryptocurrencies/${id}`}
                      className="cursor-default"
                    >
                      <div className="flex h-24 border-b border-gray-100 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                        <div className="flex items-center justify-center w-1/6">
                          <img
                            alt={name}
                            src={icon}
                            className="w-6 h-6 rounded-full"
                          />

                          <p className="ml-5 font-medium text-gray-700 dark:text-gray-100">
                            {symbol}
                          </p>
                        </div>

                        <div className="flex items-center justify-center w-2/6">
                          <div className="w-32">
                            <Line
                              key={id}
                              data={data}
                              options={options}
                              className="w-32"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-center w-1/6">
                          <p className="text-gray-700 dark:text-gray-100">
                            $
                            {`${
                              price < 1
                                ? price.toPrecision(4)
                                : price.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                  })
                            }`}
                          </p>
                        </div>

                        <div className="flex items-center justify-center w-1/6">
                          <p
                            className={`${
                              priceChange < 0
                                ? "text-red-600"
                                : "text-green-500"
                            }`}
                          >
                            {`${
                              priceChange < 0
                                ? AbsPriceChange.toFixed(2) + "%"
                                : AbsPriceChange.toFixed(2) + "%"
                            }`}
                          </p>
                        </div>
                      </div>
                    </Link>
                    {/* Individual watchlist */}

                    {/* Remove button */}
                    <button
                      className="absolute p-3 transition-colors duration-200 transform -translate-y-1/2 rounded cursor-auto right-4 top-1/2 hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-gray-300"
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
                    {/* Remove button */}
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <>
            <div>Empty watchlist</div>
          </>
        )}
      </div>
    </>
  );
};

export default WatchList;
