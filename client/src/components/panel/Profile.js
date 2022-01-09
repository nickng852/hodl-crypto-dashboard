import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import ClickAwayListener from "react-click-away-listener";

const Profile = ({ setToken, user, setUser, setIsLogged }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  let history = useHistory();

  const logOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        // Logout account
        setToken("");
        setUser("");
        setIsLogged(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center w-full p-2 text-sm font-medium text-gray-700 rounded-md dark:text-gray-50 focus:outline-none"
        id="options-menu"
        onClick={menuToggle}
      >
        {user.profileImg ? (
          <>
            <img
              alt="User Icon"
              src={user.profileImg}
              className="object-cover w-6 h-6 rounded-full"
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </button>
      {menuOpen ? (
        <ClickAwayListener onClickAway={menuToggle}>
          <div className="relative">
            <div className="absolute right-0 z-10 w-56 mt-8 origin-top-right bg-white rounded-lg shadow-lg dark:bg-secondary ring-1 ring-black ring-opacity-5">
              <Link to="/profile">
                <span className="flex px-4 py-3 text-gray-700 rounded-t-lg text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-tertiary">
                  Account
                </span>
              </Link>
              <Link to="/setting">
                <span className="flex px-4 py-3 text-gray-700 text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-tertiary">
                  Settings
                </span>
              </Link>
              <Link to="#" onClick={logOut}>
                <span className="flex px-4 py-3 text-gray-700 rounded-b-lg text-md hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-tertiary">
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

export default Profile;
