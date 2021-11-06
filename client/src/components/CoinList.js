import React from "react";
import Pagination from "./Pagination";

const CoinList = ({ coins, currentPage, setCurrentPage, itemsPerPage }) => {
  const lastItem = currentPage * itemsPerPage;

  const firstItem = lastItem - itemsPerPage;

  const currentItems = coins.slice(firstItem, lastItem);

  return (
    <>
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="px-4 py-4 overflow-x-auto">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full table-auto">
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
              {currentItems.map((result, index) => {
                const symbol = result.symbol;
                const name = result.name;
                const price = Number(result.price);
                const marketCap = result.marketCap;
                const volume = result.volume;

                return (
                  <tbody key={index}>
                    <tr>
                      <td className="w-2/5 px-8 py-8 bg-white border-b border-gray-100 dark:border-gray-500 dark:bg-gray-600 text-md">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              alt={crypto}
                              src={result.iconUrl}
                              className="object-cover w-6 h-6 mx-auto rounded-full "
                            />
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
                      <td className="w-1/5 px-8 py-5 text-right bg-white border-b border-gray-100 dark:border-gray-500 dark:bg-gray-600">
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
                      <td className="w-1/5 px-8 py-5 text-right bg-white border-b border-gray-100 dark:border-gray-500 dark:bg-gray-600">
                        <p className="text-gray-900 whitespace-no-wrap dark:text-gray-100">
                          $
                          {marketCap.toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                          })}
                        </p>
                      </td>
                      <td className="w-1/5 px-8 py-5 text-right bg-white border-b border-gray-100 dark:border-gray-500 dark:bg-gray-600">
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

      <div className="container px-4 mx-auto max-w-7xl">
        <div className="float-right px-4 py-4">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            coins={coins}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </>
  );
};

export default CoinList;
