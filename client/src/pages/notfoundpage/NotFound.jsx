import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen p-6 lg:space-x-6 lg:flex-row dark:bg-secondary">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-24 w-24 lg:h-40 lg:w-40 text-gray-800 dark:text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="flex flex-col space-y-1">
          <span className="text-xl text-center text-gray-800 lg:text-left lg:text-3xl dark:text-gray-400">
            404 Not Found
          </span>

          <span className="text-base font-thin text-center text-gray-800 lg:text-left lg:text-xl dark:text-gray-400">
            Oops! We can't seem to find the page you're looking for.
          </span>
        </div>
      </div>
    </>
  );
};

export default NotFound;
