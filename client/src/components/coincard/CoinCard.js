import React from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2"; // chart library

const CoinCard = ({ coins, simplified }) => {
  const coinsCount = simplified ? 4 : 50;
  const slicedCoins = coins.slice(0, coinsCount); // decide how many CoinCards will be displayed

  return (
    <>
      <div className="flex flex-wrap justify-between">
        {slicedCoins.map((result, index) => {
          const id = result.uuid;
          const icon = result.iconUrl;
          const name = result.name;
          const symbol = result.symbol;
          const price = Number(result.price); // string returned from API
          const priceChange = result.change;
          const AbsPriceChange = Math.abs(priceChange); // trim "-" for display

          const chartLabel = [];
          const chartData = [];

          for (let i = 0; i < result.history?.length; i++) {
            chartLabel.push(i); // get each index from the individual array
            chartData.push(result.history[i]); // get each array from the response
          }

          const data = (canvas) => {
            const ctx = canvas.getContext("2d");
            const gradient = ctx.createLinearGradient(0, 0, 0, 110);

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
                  borderWidth: 2,
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
              tooltip: {
                enabled: false,
              },
            },
            radius: 0,
            pointHitRadius: 0,
            tension: 0.4,
          };

          return (
            <Link
              className="relative overflow-hidden transition-shadow duration-200 bg-white shadow hover:shadow-lg rounded-3xl w-60 md:w-72 dark:bg-secondary"
              key={index}
              to={`/cryptocurrencies/${id}`}
            >
              <img
                src={icon}
                alt={crypto}
                className="absolute w-24 h-24 rounded-full opacity-95 -top-6 -right-6 md:-right-4"
              />
              <div className="px-4 py-5 sm:p-5">
                <dl>
                  <span className="px-2 py-1 text-xs font-medium leading-5 text-gray-600 truncate bg-gray-200 rounded-md">
                    {symbol}
                  </span>
                  <dd className="mt-4 font-semibold text-gray-500">
                    <span className="mr-3 dark:text-gray-100">{name}</span>
                    <span
                      className={`${
                        priceChange < 0 ? "text-red-600" : "text-green-500"
                      }`}
                    >
                      {`${
                        priceChange < 0
                          ? "▼ " + AbsPriceChange.toFixed(2) + "%"
                          : "▲ " + AbsPriceChange.toFixed(2) + "%"
                      }`}
                    </span>
                  </dd>
                  <dd className="mt-1 text-3xl font-semibold leading-9 text-gray-900 dark:text-gray-100">
                    $
                    {`${
                      price < 1
                        ? price.toPrecision(4)
                        : price.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })
                    }`}
                  </dd>
                </dl>
              </div>
              <div className="px-4 pb-5 sm:pb-5">
                <Line key={index} data={data} options={options} />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CoinCard;
