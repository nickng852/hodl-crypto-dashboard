import React from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";

const WatchList = ({ watchList, setWatchList }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden">
          {watchList.length ? (
            <>
              {watchList.map((result, index) => {
                const id = result.uuid;
                const icon = result.iconUrl;
                const symbol = result.symbol;
                const price = Number(result.price); // string returned from API
                const priceChange = result.change;
                const AbsPriceChange = Math.abs(priceChange);

                const handleClick = () => {
                  watchList.splice(index, 1); // removed items
                };

                const chartLabel = [];
                const chartData = [];

                for (let i = 0; i < result.history?.length; i++) {
                  chartLabel.push(i); // get each index from the individual array
                  chartData.push(result.history[i]); // get each array from the response
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
                    y: {
                      display: false,
                    },
                    x: {
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

                return (
                  <>
                    <div className="relative">
                      <Link to={`/cryptocurrencies/${id}`} className="z-0">
                        <div className="flex h-24 hover:bg-gray-50">
                          <div className="flex w-1/6 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 text-md">
                            <div className="flex items-center">
                              <div>
                                <img
                                  alt={crypto}
                                  src={icon}
                                  className="object-cover w-6 h-6 mx-auto rounded-full "
                                />
                              </div>
                              <div className="ml-5">
                                <p className="font-medium text-gray-900 whitespace-no-wrap dark:text-gray-100">
                                  {symbol}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-center w-2/6 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                            <div className="flex items-center w-36">
                              <Line key={index} data={data} options={options} />
                            </div>
                          </div>

                          <div className="flex items-center justify-center w-1/6 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                            <p className="flex items-center text-gray-900 whitespace-no-wrap dark:text-gray-100">
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

                          <div className="flex items-center justify-center w-1/6 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                            <p
                              className={`${
                                priceChange < 0
                                  ? "text-red-600 whitespace-no-wrap flex items-center"
                                  : "text-green-500 whitespace-no-wrap flex items-center"
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

                      <button
                        className="absolute right-0 flex items-center justify-center p-4 transform -translate-y-1/2 rounded cursor-pointer top-1/2 hover:bg-gray-100"
                        onClick={handleClick}
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
                  </>
                );
              })}
            </>
          ) : (
            <>
              <div className="flex h-24 hover:bg-gray-50">
                <div className="flex w-2/5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 text-md">
                  <div className="flex items-center">
                    <div>
                      <div className="object-cover w-6 h-6 mx-auto bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="ml-5">
                      <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center w-1/5 border-b border-gray-100 dark:border-gray-700">
                  <div className="h-6 bg-gray-200 rounded w-36 animate-pulse" />
                </div>

                <div className="flex items-center w-1/5 px-8 py-5 text-right border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse" />
                </div>

                <div className="flex items-center w-1/5 px-8 py-5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse"></div>
                </div>
              </div>

              <div className="flex h-24 hover:bg-gray-50">
                <div className="flex w-2/5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 text-md">
                  <div className="flex items-center">
                    <div>
                      <div className="object-cover w-6 h-6 mx-auto bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="ml-5">
                      <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center w-1/5 border-b border-gray-100 dark:border-gray-700">
                  <div className="h-6 bg-gray-200 rounded w-36 animate-pulse" />
                </div>

                <div className="flex items-center w-1/5 px-8 py-5 text-right border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse" />
                </div>

                <div className="flex items-center w-1/5 px-8 py-5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse"></div>
                </div>
              </div>

              <div className="flex h-24 hover:bg-gray-50">
                <div className="flex w-2/5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 text-md">
                  <div className="flex items-center">
                    <div>
                      <div className="object-cover w-6 h-6 mx-auto bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="ml-5">
                      <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center w-1/5 border-b border-gray-100 dark:border-gray-700">
                  <div className="h-6 bg-gray-200 rounded w-36 animate-pulse" />
                </div>

                <div className="flex items-center w-1/5 px-8 py-5 text-right border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse" />
                </div>

                <div className="flex items-center w-1/5 px-8 py-5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse"></div>
                </div>
              </div>

              <div className="flex h-24 hover:bg-gray-50">
                <div className="flex w-2/5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 text-md">
                  <div className="flex items-center">
                    <div>
                      <div className="object-cover w-6 h-6 mx-auto bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="ml-5">
                      <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center w-1/5 border-b border-gray-100 dark:border-gray-700">
                  <div className="h-6 bg-gray-200 rounded w-36 animate-pulse" />
                </div>

                <div className="flex items-center w-1/5 px-8 py-5 text-right border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse" />
                </div>

                <div className="flex items-center w-1/5 px-8 py-5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse"></div>
                </div>
              </div>

              <div className="flex h-24 hover:bg-gray-50">
                <div className="flex w-2/5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 text-md">
                  <div className="flex items-center">
                    <div>
                      <div className="object-cover w-6 h-6 mx-auto bg-gray-200 rounded-full animate-pulse" />
                    </div>
                    <div className="ml-5">
                      <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center w-1/5 border-b border-gray-100 dark:border-gray-700">
                  <div className="h-6 bg-gray-200 rounded w-36 animate-pulse" />
                </div>

                <div className="flex items-center w-1/5 px-8 py-5 text-right border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse" />
                </div>

                <div className="flex items-center w-1/5 px-8 py-5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                  <div className="h-6 bg-gray-200 rounded w-28 animate-pulse"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WatchList;
