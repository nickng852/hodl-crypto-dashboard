import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import CoinListPagination from "./CoinListPagination";

// Library
import millify from "millify";

const CoinList = ({ coins }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

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
                  className="px-8 py-3 font-normal text-left text-gray-900 bg-white border-b border-gray-100 dark:border-gray-700 dark:bg-secondary dark:text-white text-md"
                >
                  Coin Name
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 font-normal text-right text-gray-900 bg-white border-b border-gray-100 dark:border-gray-700 dark:bg-secondary dark:text-white text-md "
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 font-normal text-right text-gray-900 bg-white border-b border-gray-100 dark:border-gray-700 dark:bg-secondary dark:text-white text-md "
                >
                  Market Cap
                </th>
                <th
                  scope="col"
                  className="px-8 py-3 font-normal text-right text-gray-900 bg-white border-b border-gray-100 dark:border-gray-700 dark:bg-secondary dark:text-white text-md "
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
                    <td className="w-2/5 bg-white border-b border-gray-100 dark:border-gray-700 dark:bg-secondary text-md">
                      <Link
                        to={`/coin/${id}`}
                        className="flex items-center px-8 py-8"
                      >
                        <div>
                          <img
                            alt={crypto}
                            src={icon}
                            className="object-cover w-6 h-6 mx-auto rounded-full "
                          />
                        </div>
                        <div className="ml-5">
                          <div className="font-medium text-gray-900 whitespace-no-wrap dark:text-gray-100">
                            {name}
                          </div>
                        </div>
                        <div className="ml-3">
                          <span className="text-xs text-gray-600 truncate rounded-md dark:text-gray-400 ">
                            {symbol}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className="w-1/5 px-8 py-5 text-right bg-white border-b border-gray-100 dark:border-gray-700 dark:bg-secondary dark:text-white">
                      <div className="text-gray-900 whitespace-no-wrap dark:text-gray-100">
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
                    <td className="w-1/5 px-8 py-5 text-right bg-white border-b border-gray-100 dark:border-gray-700 dark:bg-secondary dark:text-white">
                      <div className="text-gray-900 whitespace-no-wrap dark:text-gray-100">
                        ${millify(marketCap, { precision: 2 })}
                      </div>
                    </td>
                    <td className="w-1/5 px-8 py-5 text-right bg-white border-b border-gray-100 dark:border-gray-700 dark:bg-secondary dark:text-white">
                      <div className="text-gray-900 whitespace-no-wrap dark:text-gray-100">
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
      <div className="float-right mt-6">
        <CoinListPagination
          coins={coins}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </>
  );
};

export default CoinList;
