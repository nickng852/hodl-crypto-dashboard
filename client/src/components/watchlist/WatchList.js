import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";

const WatchList = ({ coins }) => {
  // states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // get each page's items by slicing the response array
  const lastItem = currentPage * itemsPerPage;

  const firstItem = lastItem - itemsPerPage;

  const currentItems = coins.slice(firstItem, lastItem);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden">
          <table className="min-w-full table-auto">
            {currentItems.map((result, index) => {
              const id = result.uuid;
              const icon = result.iconUrl;
              const symbol = result.symbol;
              const price = Number(result.price); // string returned from API
              const priceChange = result.change;
              const AbsPriceChange = Math.abs(priceChange);

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
                <tbody key={index}>
                  <tr className="rounded-3xl hover:rounded-3xl hover:bg-gray-50">
                    <td className="w-2/5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 text-md">
                      <div className="flex items-center ">
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
                    </td>
                    <td className="w-1/5 border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <div className="w-36">
                        <Line key={index} data={data} options={options} />
                      </div>
                    </td>
                    <td className="w-1/5 px-8 py-5 text-right border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <p className="text-gray-900 whitespace-no-wrap dark:text-gray-100">
                        $
                        {`${
                          price < 1
                            ? price.toPrecision(4)
                            : price.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })
                        }`}
                      </p>
                    </td>
                    <td className="w-1/5 px-8 py-5 text-right border-b border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                      <p
                        className={`${
                          priceChange < 0
                            ? "text-red-600 whitespace-no-wrap"
                            : "text-green-500 whitespace-no-wrap"
                        }`}
                      >
                        {`${
                          priceChange < 0
                            ? AbsPriceChange.toFixed(2) + "%"
                            : AbsPriceChange.toFixed(2) + "%"
                        }`}
                      </p>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
};

export default WatchList;
