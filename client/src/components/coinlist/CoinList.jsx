import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCoins } from "../../features/coins/coinsSlice";

import millify from "millify";

const CoinList = ({ currentPage, itemsPerPage }) => {
  const coins = useSelector(selectCoins);

  // get each page's items by slicing the response array
  const lastItem = currentPage * itemsPerPage;

  const firstItem = lastItem - itemsPerPage;

  const currentItems = coins.slice(firstItem, lastItem);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full overflow-hidden shadow rounded-xl">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-5 py-4 text-sm font-normal text-left text-gray-900 bg-white border-b border-gray-100 2xl:px-8 2xl:py-4 2xl:text-base dark:border-gray-700 dark:bg-secondary dark:text-white text-md"
                >
                  Coin Name
                </th>

                <th
                  scope="col"
                  className="px-5 py-4 text-sm font-normal text-right text-gray-900 bg-white border-b border-gray-100 2xl:px-8 2xl:py-4 2xl:text-base dark:border-gray-700 dark:bg-secondary dark:text-white text-md"
                >
                  Price
                </th>

                <th
                  scope="col"
                  className="px-5 py-4 text-sm font-normal text-right text-gray-900 bg-white border-b border-gray-100 2xl:px-8 2xl:py-4 2xl:text-base dark:border-gray-700 dark:bg-secondary dark:text-white text-md"
                >
                  Market Cap
                </th>

                <th
                  scope="col"
                  className="px-5 py-4 text-sm font-normal text-right text-gray-900 bg-white border-b border-gray-100 2xl:px-8 2xl:py-4 2xl:text-base dark:border-gray-700 dark:bg-secondary dark:text-white text-md"
                >
                  Volume(24h)
                </th>
              </tr>
            </thead>

            {currentItems.map((result, index) => {
              const id = result.uuid;
              const icon = result.iconUrl;
              const name = result.name;
              const symbol = result.symbol;
              const price = Number(result.price); // string returned from API
              const marketCap = Number(result.marketCap); // string returned from API
              const volume = Number(result["24hVolume"]); // string returned from API

              return (
                <tbody key={index}>
                  <tr>
                    <td className="w-2/5 px-5 bg-white border-b border-gray-100 2xl:px-8 py-7 dark:border-gray-700 dark:bg-secondary text-md last:border-0">
                      <Link to={`/coin/${id}`}>
                        <div className="flex items-center space-x-5 shrink-0">
                          <div className="flex shrink-0">
                            <img
                              alt={crypto}
                              src={icon}
                              className="object-cover w-5 h-5 mx-auto rounded-full 2xl:w-6 2xl:h-6"
                            />
                          </div>

                          <div className="flex flex-col">
                            <div className="text-sm font-medium text-gray-900 whitespace-no-wrap 2xl:text-base dark:text-gray-100">
                              {name}
                            </div>

                            <span className="text-xs text-gray-600 truncate rounded-md dark:text-gray-400 ">
                              {symbol}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </td>

                    <td className="w-1/5 px-5 text-right bg-white border-b border-gray-100 2xl:px-8 py-7 dark:border-gray-700 dark:bg-secondary dark:text-white ">
                      <div className="text-sm text-gray-900 whitespace-no-wrap dark:text-gray-100 2xl:text-base">
                        $
                        {`${
                          price < 1
                            ? price.toPrecision(4)
                            : price.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })
                        }`}
                      </div>
                    </td>

                    <td className="w-1/5 px-5 text-right bg-white border-b border-gray-100 2xl:px-8 py-7 dark:border-gray-700 dark:bg-secondary dark:text-white">
                      <div className="text-sm text-gray-900 whitespace-no-wrap dark:text-gray-100 2xl:text-base">
                        ${millify(marketCap, { precision: 2 })}
                      </div>
                    </td>

                    <td className="w-1/5 px-5 text-right bg-white border-b border-gray-100 2xl:px-8 py-7 dark:border-gray-700 dark:bg-secondary dark:text-white">
                      <div className="text-sm text-gray-900 whitespace-no-wrap dark:text-gray-100 2xl:text-base">
                        ${millify(volume, { precision: 2 })}
                      </div>
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

export default CoinList;
