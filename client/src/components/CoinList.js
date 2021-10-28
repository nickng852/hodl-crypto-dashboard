import React from "react";
import { Link } from "react-router-dom";

const CoinList = ({ coins }) => {
  const slicedCoins = coins.slice(0, 20);

  return (
    <>
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="px-4 py-4 overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow ">
            <table className="min-w-full leading-normal ">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-8 py-3 font-normal text-left text-gray-900 bg-white border-b border-gray-100 dark:border-gray-500 dark:text-gray-100 dark:bg-gray-600 text-md"
                  >
                    Coin Name
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-3 font-normal text-right text-gray-900 bg-white border-b border-gray-100 dark:border-gray-500 dark:text-gray-100 text-md dark:bg-gray-600"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-3 font-normal text-right text-gray-900 bg-white border-b border-gray-100 dark:border-gray-500 dark:text-gray-100 text-md dark:bg-gray-600"
                  >
                    Market Cap
                  </th>
                  <th
                    scope="col"
                    className="px-8 py-3 font-normal text-right text-gray-900 bg-white border-b border-gray-100 dark:border-gray-500 dark:text-gray-100 text-md dark:bg-gray-600"
                  >
                    Volume(24h)
                  </th>
                </tr>
              </thead>
              {slicedCoins.map((result) => {
                const id = result.id;
                const symbol = result.symbol;
                const name = result.name;
                const price = result.quote.USD.price;
                const marketCap = result.quote.USD.market_cap;
                const volume = result.quote.USD.volume_24h;

                return (
                  <tbody>
                    <tr>
                      <td className="px-8 py-8 bg-white border-b border-gray-100 dark:border-gray-500 dark:bg-gray-600 text-md ">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Link to="#" className="relative block">
                              <img
                                alt={crypto}
                                src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${id}.png`}
                                className="object-cover w-6 h-6 mx-auto rounded-full "
                              />
                            </Link>
                          </div>
                          <div className="ml-3">
                            <p className="font-medium text-gray-900 whitespace-no-wrap dark:text-gray-100">
                              {name}
                            </p>
                          </div>
                          <div className="ml-3">
                            <span className="text-xs text-gray-600 truncate rounded-md ">
                              {symbol}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right bg-white border-b border-gray-100 dark:border-gray-500 dark:bg-gray-600">
                        <p className="text-gray-900 whitespace-no-wrap dark:text-gray-100">
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
                        </p>
                      </td>
                      <td className="px-8 py-5 text-right bg-white border-b border-gray-100 dark:border-gray-500 dark:bg-gray-600">
                        <p className="text-gray-900 whitespace-no-wrap dark:text-gray-100">
                          $
                          {marketCap.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </td>
                      <td className="px-8 py-5 text-right bg-white border-b border-gray-100 dark:border-gray-500 dark:bg-gray-600">
                        <p className="text-gray-900 whitespace-no-wrap dark:text-gray-100">
                          $
                          {volume.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinList;
