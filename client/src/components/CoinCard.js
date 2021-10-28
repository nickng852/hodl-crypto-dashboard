import React from "react";

const CoinCard = ({ coins }) => {
  const slicedCoins = coins.slice(0, 5);

  return (
    <>
      <div className="flex flex-wrap items-center justify-center max-w-8xl mt-14">
        {slicedCoins.map((result, index) => {
          const id = result.id;
          const symbol = result.symbol;
          const name = result.name;
          const price = result.quote.USD.price;
          const priceChange = result.quote.USD.percent_change_24h;
          const AbsPriceChange = Math.abs(priceChange);

          return (
            <div
              className="relative m-5 overflow-hidden bg-white rounded-lg shadow w-60 md:w-72 dark:bg-gray-600"
              key={index}
            >
              <img
                src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${id}.png`}
                alt={crypto}
                className="absolute w-24 h-24 rounded-full opacity-95 -top-6 -right-6 md:-right-4"
              />
              <div className="px-4 py-5 sm:p-6">
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
                        ? price.toLocaleString(undefined, {
                            maximumFractionDigits: 10,
                          })
                        : price.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })
                    }`}
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
