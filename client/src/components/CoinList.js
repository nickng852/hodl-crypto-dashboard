import React from "react";
import { Link } from "react-router-dom";

const CoinList = ({ coins }) => {
  const slicedCoins = coins.slice(0, 5);

  return (
    <>
      <div className="container max-w-6xl px-4 mx-auto sm:px-8">
        <div className="py-8">
          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 text-md"
                    >
                      Coin Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 text-md"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 text-md"
                    >
                      Market Cap
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 text-md"
                    >
                      Volume(24h)
                    </th>
                  </tr>
                </thead>
                {slicedCoins.map((result) => {
                  return (
                    <tbody>
                      <tr>
                        <td className="px-5 py-8 bg-white border-b border-gray-200 text-md">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <Link to="#" className="relative block">
                                <img
                                  alt={crypto}
                                  src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${result.id}.png`}
                                  className="object-cover w-6 h-6 mx-auto rounded-full "
                                />
                              </Link>
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {result.name}
                              </p>
                            </div>
                            <div className="ml-3">
                              <span className="px-2 py-1 text-xs font-medium leading-5 text-gray-600 truncate bg-gray-200 rounded-md">
                                {result.symbol}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 bg-white border-b border-gray-200 text-md">
                          <p className="text-gray-900 whitespace-no-wrap">
                            ${result.quote.USD.price.toLocaleString()}
                          </p>
                        </td>
                        <td className="px-5 py-5 bg-white border-b border-gray-200 text-md">
                          <p className="text-gray-900 whitespace-no-wrap">
                            ${result.quote.USD.market_cap.toLocaleString()}
                          </p>
                        </td>
                        <td className="px-5 py-5 bg-white border-b border-gray-200 text-md">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {result.quote.USD.volume_24h}
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
      </div>
    </>
  );
};

export default CoinList;
