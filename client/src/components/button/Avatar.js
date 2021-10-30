import React from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import ClickAwayListener from "react-click-away-listener";

const Avatar = ({ open, setOpen, setIsLogged }) => {
  const toggle = () => {
    setOpen(!open);
  };

  let history = useHistory();

  const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setIsLogged(false);
      history.push("/");
    });
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md dark:text-gray-50 focus:outline-none"
        id="options-menu"
        onClick={toggle}
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
      </button>
      {open ? (
        <ClickAwayListener onClickAway={toggle}>
          <div className="relative">
            <div className="absolute right-0 z-10 w-56 mt-8 origin-top-right bg-white rounded-lg shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
              <Link to="#">
                <span className="flex px-4 py-3 text-gray-700 rounded-t-lg text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600 ">
                  Account
                </span>
              </Link>
              <Link to="#">
                <span className="flex px-4 py-3 text-gray-700 text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
                  Settings
                </span>
              </Link>
              <Link to="#" onClick={logOut}>
                <span className="flex px-4 py-3 text-gray-700 rounded-b-lg text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
                  Logout
                </span>
              </Link>
            </div>
          </div>
        </ClickAwayListener>
      ) : null}
    </>
  );
};

export default Avatar;
