import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [IsActive, setIsActive] = useState("Dashboard");

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setIsActive("Dashboard");
        break;

      case "/coins":
        setIsActive("Cryptocurrency");
        break;

      case "/news":
        setIsActive("News");
        break;

      case "/setting":
        setIsActive("Setting");
        break;

      default:
        setIsActive("");
    }
  }, [location.pathname]);

  return (
    <>
      <main className="z-10 hidden bg-white shadow-xl xl:block dark:bg-secondary">
        <div className="flex">
          <div className="w-24 h-screen">
            {/* Sidebar List */}
            <nav className="px-6 mt-32 space-y-8">
              {/* Dashboard */}
              <Link
                to="/dashboard"
                className={`
                ${
                  IsActive === "Dashboard"
                    ? "text-gray-900 bg-gray-100 dark:text-gray-50 dark:bg-tertiary"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-tertiary"
                }
                justify-center flex items-center px-3 py-2 transition-colors duration-200 rounded-lg`}
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
              </Link>

              {/* Cryptocurrency */}
              <Link
                to="/coins"
                className={`
                ${
                  IsActive === "Cryptocurrency"
                    ? "text-gray-900 bg-gray-100 dark:text-gray-50 dark:bg-tertiary"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-tertiary"
                }
              justify-center flex items-center px-3 py-2 transition-colors duration-200 rounded-lg`}
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
              </Link>

              {/* News */}
              <Link
                to="/news"
                className={`
                ${
                  IsActive === "News"
                    ? "text-gray-900 bg-gray-100 dark:text-gray-50 dark:bg-tertiary"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-tertiary"
                }
               justify-center flex items-center px-3 py-2 transition-colors duration-200 rounded-lg`}
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
              </Link>

              {/* Setting */}
              <Link
                to="/setting"
                className={`
                ${
                  IsActive === "Setting"
                    ? "text-gray-900 bg-gray-100 dark:text-gray-50 dark:bg-tertiary"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-tertiary"
                }
              justify-center flex items-center px-3 py-2 transition-colors duration-200 rounded-lg`}
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
              </Link>
            </nav>
          </div>
        </div>
      </main>
    </>
  );
};

export default Sidebar;
