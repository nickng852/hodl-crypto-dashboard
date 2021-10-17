import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import ClickAwayListener from "react-click-away-listener";

const Avatar = ({ open, setOpen, setIsLogged }) => {
  const toggle = () => {
    setOpen(!open);
  };

  const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setIsLogged(false);
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
          width="22"
          fill="currentColor"
          height="22"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
        </svg>
      </button>
      {open ? (
        <ClickAwayListener onClickAway={toggle}>
          <div className="absolute right-0 z-10 w-56 mt-12 origin-top-right bg-white rounded-lg shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
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
        </ClickAwayListener>
      ) : null}
    </>
  );
};

export default Avatar;
