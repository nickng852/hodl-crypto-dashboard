import React from "react";

const SearchBarResult = ({ id, name, symbol }) => {
  const url = "";

  return (
    <>
      <a key={id} href={url} className="block py-1 ">
        <h3 className="font-medium text-gray-700 dark:text-gray-100 hover:underline">
          {name}
        </h3>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {symbol}
        </p>
      </a>
    </>
  );
};

export default SearchBarResult;
