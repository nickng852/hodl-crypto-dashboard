import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isExpand, setIsExpand] = useState(false);

  const handleClick = () => {
    setIsExpand(!isExpand);
  };

  return (
    <>
      <main className="z-10 h-screen bg-white shadow-xl dark:bg-secondary">
        <div className="flex">
          <div className={`h-screen ${isExpand ? "w-72" : "w-24"}`}>
            {/* Site Name */}
            <div className="flex items-center justify-center mt-10">
              <span
                className={`${
                  isExpand ? "opacity-100" : "opacity-0"
                } text-xl font-bold text-gray-600 dark:text-gray-100`}
              >
                HODL
              </span>
            </div>

            {/* Sidebar List */}
            <nav className="px-6 mt-16 space-y-8">
              {/* Dashboard */}
              <Link
                to="/dashboard"
                className={`${
                  isExpand ? "justify-start" : "justify-center"
                } py-2 px-3 flex items-center text-gray-600 transition-colors duration-200 rounded-lg focus:text-gray-900 hover:text-gray-900 focus:bg-gray-100 hover:bg-gray-100 dark:hover:text-gray-50 dark:hover:bg-tertiary dark:focus:bg-tertiary dark:text-gray-300 dark:focus:text-gray-50`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>

                <span
                  className={`${isExpand ? "block" : "hidden"} ml-4 text-md`}
                >
                  Dashboard
                </span>
              </Link>

              {/* Cryptocurrency */}
              <Link
                to="/coins"
                className={`${
                  isExpand ? "justify-start" : "justify-center"
                } py-2 px-3 flex items-center text-gray-600 transition-colors duration-200 rounded-lg focus:text-gray-900 hover:text-gray-900 focus:bg-gray-100 hover:bg-gray-100 dark:hover:text-gray-50 dark:hover:bg-tertiary dark:focus:bg-tertiary dark:text-gray-300 dark:focus:text-gray-50`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span
                  className={`${isExpand ? "block" : "hidden"} ml-4 text-md`}
                >
                  Cryptocurrency
                </span>
              </Link>

              {/* News */}
              <Link
                to="/news"
                className={`${
                  isExpand ? "justify-start" : "justify-center"
                } py-2 px-3 flex items-center text-gray-600 transition-colors duration-200 rounded-lg focus:text-gray-900 hover:text-gray-900 focus:bg-gray-100 hover:bg-gray-100 dark:hover:text-gray-50 dark:hover:bg-tertiary dark:focus:bg-tertiary dark:text-gray-300 dark:focus:text-gray-50`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>

                <span
                  className={`${isExpand ? "block" : "hidden"} ml-4 text-md`}
                >
                  News
                </span>
              </Link>

              {/* Setting */}
              <Link
                to="/setting"
                className={`${
                  isExpand ? "justify-start" : "justify-center"
                } py-2 px-3 flex items-center text-gray-600 transition-colors duration-200 rounded-lg focus:text-gray-900 hover:text-gray-900 focus:bg-gray-100 hover:bg-gray-100 dark:hover:text-gray-50 dark:hover:bg-tertiary dark:focus:bg-tertiary dark:text-gray-300 dark:focus:text-gray-50`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span
                  className={`${isExpand ? "block" : "hidden"} ml-4 text-md`}
                >
                  Setting
                </span>
              </Link>

              <div
                className={`${
                  isExpand ? "justify-end" : "justify-center"
                } flex items-center mb-10`}
              >
                <div
                  className="z-10 p-2 rounded-sm cursor-pointer dark:hover:bg-tertiary hover:bg-gray-200 dark:text-gray-300"
                  onClick={handleClick}
                >
                  {isExpand ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        />
                      </svg>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </main>
    </>
  );
};

export default Sidebar;
