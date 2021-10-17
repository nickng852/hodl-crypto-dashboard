import React from "react";

const CoinCard = ({ coins }) => {
  const slicedCoins = coins.slice(0, 5);

  return (
    <>
      <div className="flex flex-wrap justify-center space-x-16 mt-14">
        {slicedCoins.map((result, index) => {
          return (
            <div
              className="relative overflow-hidden bg-white rounded-lg shadow w-60 md:w-72 dark:bg-gray-600"
              key={index}
            >
              <img
                src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${result.id}.png`}
                alt={crypto}
                className="absolute w-24 h-24 rounded-full opacity-95 -top-6 -right-6 md:-right-4"
              />
              <div className="px-4 py-5 sm:p-6">
                <dl>
                  <span className="px-3 py-1 text-sm font-medium leading-5 text-gray-600 truncate bg-gray-200 rounded-lg ">
                    {result.symbol}
                  </span>
                  <dd className="mt-4 font-semibold text-gray-500">
                    <span className="mr-3 dark:text-gray-100">
                      {result.name}
                    </span>
                    <span
                      className={`${
                        result.quote.USD.percent_change_24h < 0
                          ? "text-red-600"
                          : "text-green-500"
                      }`}
                    >
                      {`${
                        result.quote.USD.percent_change_24h < 0
                          ? result.quote.USD.percent_change_24h.toFixed(2) + "%"
                          : "+" +
                            result.quote.USD.percent_change_24h.toFixed(2) +
                            "%"
                      }`}
                    </span>
                  </dd>
                  <dd className="mt-1 text-3xl font-semibold leading-9 text-gray-900 dark:text-gray-100">
                    ${result.quote.USD.price.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CoinCard;
