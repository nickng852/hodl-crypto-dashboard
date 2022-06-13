import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center absolute inset-0 dark:bg-secondary">
        <div className="flex flex-col items-center justify-center p-6 lg:space-x-6 lg:flex-row">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-gray-800 lg:h-44 lg:w-44 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-xl text-center text-gray-800 lg:text-left lg:text-3xl dark:text-gray-400">
                404 Not Found
              </span>

              <span className="text-base font-thin text-center text-gray-800 lg:text-left lg:text-xl dark:text-gray-400">
                Oops! We can't seem to find the page you're looking for.
              </span>
            </div>

            <div className="text-center lg:text-left">
              <Link to="/dashboard">
                <button className="px-4 py-2 text-sm transition ease-in border-2 border-gray-800 rounded-lg hover:text-gray-200 hover:bg-gray-800 dark:border-gray-400 lg:text-base dark:hover:text-gray-800 dark:hover:bg-gray-400 dark:text-gray-400">
                  Back to home page
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
