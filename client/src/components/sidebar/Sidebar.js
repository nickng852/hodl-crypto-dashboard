import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="relative z-20 flex bg-white shadow-xl dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="h-screen w-72">
            <div className="flex items-center justify-center mt-10">
              <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
                HODL
              </span>
            </div>
            <nav className="px-6 mt-16">
              <Link
                className="flex items-center px-3 py-2 my-6 text-gray-700 transition-colors duration-200 rounded-lg focus:text-gray-900 hover:text-gray-800 focus:bg-gray-100 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:text-gray-400 dark:focus:text-white"
                to="/dashboard"
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
                <span className="mx-4 font-normal text-md">Dashboard</span>
                <span className="flex-grow text-right"></span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 my-6 text-gray-700 transition-colors duration-200 rounded-lg focus:bg-gray-100 focus:text-gray-900 hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 dark:focus:bg-gray-600 dark:focus:text-white"
                to="/cryptocurrencies"
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
                <span className="mx-4 font-normal text-md">
                  Cryptocurrencies
                </span>
                <span className="flex-grow text-right"></span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 my-6 text-gray-700 transition-colors duration-200 rounded-lg focus:bg-gray-100 focus:text-gray-900 hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 dark:focus:bg-gray-600 dark:focus:text-white"
                to="/profile"
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
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="mx-4 font-normal text-md">Profile</span>
                <span className="flex-grow text-right"></span>
              </Link>
              <Link
                className="flex items-center px-3 py-2 my-6 text-gray-700 transition-colors duration-200 rounded-lg focus:bg-gray-100 focus:text-gray-900 hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 dark:focus:bg-gray-600 dark:focus:text-white"
                to="/setting"
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
                <span className="mx-4 font-normal text-md">Setting</span>
                <span className="flex-grow text-right"></span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
