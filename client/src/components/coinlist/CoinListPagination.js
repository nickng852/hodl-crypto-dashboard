import React from "react";
import { Link } from "react-router-dom";

const CoinListPagination = ({
  coins,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) => {
  const lastPage = Math.ceil(coins.length / itemsPerPage);

  const previousPage = () => {
    // block if currentPage = firstPage
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    // block if currentPage = lastPage
    if (currentPage !== lastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="flex">
        <Link
          to="#"
          className={`${
            currentPage === 1
              ? "flex items-center px-2 py-2 mr-2 text-gray-300 bg-white rounded-lg shadow cursor-auto dark:bg-secondary dark:text-gray-600"
              : "flex items-center px-2 py-2 mr-2 text-gray-700 transition-colors duration-200 transform bg-white rounded-lg shadow dark:bg-secondary dark:text-gray-200 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-gray-200"
          }`}
          onClick={previousPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>

        <Link
          to="#"
          className={`${
            currentPage === lastPage
              ? "flex items-center px-2 py-2 text-gray-300 bg-white rounded-lg shadow cursor-auto dark:bg-secondary dark:text-gray-600"
              : "flex items-center px-2 py-2 text-gray-700 transition-colors duration-200 transform bg-white rounded-lg shadow dark:bg-secondary dark:text-gray-200 hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-gray-200"
          }`}
          onClick={nextPage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default CoinListPagination;
