const NewsCardPagination = ({ page, setPage }) => {
  const previousPage = () => {
    // block if currentPage = firstPage
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <main className="flex">
        <div
          className={`flex items-center p-2 mr-2 transition-colors duration-200 transform bg-white rounded-lg shadow dark:bg-secondary ${
            page === 1
              ? "text-gray-300 cursor-auto dark:text-gray-600"
              : "text-gray-600 dark:text-gray-300 hover:bg-indigo-500 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white cursor-pointer"
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
        </div>

        <div
          className={`
          flex items-center p-2 transition-colors duration-200 transform bg-white rounded-lg shadow dark:bg-secondary ${
            page === 100
              ? "text-gray-300 cursor-auto dark:text-gray-600"
              : "text-gray-600 dark:text-gray-300 hover:bg-indigo-500 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white cursor-pointer"
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
        </div>
      </main>
    </>
  );
};

export default NewsCardPagination;
