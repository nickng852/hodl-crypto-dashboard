import React from "react";
import { Link } from "react-router-dom";

const SearchBarResult = ({ id, name, symbol }) => {
  return (
    <>
      <Link key={id} to="#">
        <div className="flex justify-between px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-600">
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-100">
              {name}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {symbol}
            </p>
          </div>
          <div className="flex items-center">
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${id}.png`}
              alt={crypto}
              className="rounded-full w-7 h-7"
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchBarResult;
