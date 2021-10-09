import React from "react";

const Sidebar = () => {
  const url = "";

  return (
    <>
      <div className="relative flex bg-white shadow-xl dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="h-screen w-72">
            <div className="flex items-center justify-center mt-10">
              <span className="text-xl font-bold text-gray-600 dark:text-gray-300">
                HODL
              </span>
            </div>
            <nav className="px-6 mt-10 ">
              <a
                className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                href={url}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span className="mx-4 font-normal text-md">Dashboard</span>
                <span className="flex-grow text-right"></span>
              </a>
              <a
                className="flex items-center p-2 my-6 text-gray-800 transition-colors duration-200 bg-gray-100 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-100 dark:bg-gray-600"
                href={url}
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
                <span className="mx-4 font-normal text-md">Exchange</span>
                <span className="flex-grow text-right"></span>
              </a>
              <a
                className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                href={url}
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
              </a>
              <a
                className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
                href={url}
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
              </a>
            </nav>
            <div className="absolute bottom-0 my-10">
              <a
                className="flex items-center px-8 py-2 text-gray-600 transition-colors duration-200 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                href={url}
              >
                <svg
                  width="20"
                  fill="currentColor"
                  height="20"
                  className="w-5 h-5"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"></path>
                </svg>
                <span className="mx-4 font-medium">Support</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
