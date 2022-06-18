import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectUser, resetUser } from "../../features/auth/authSlice";

import ClickAwayListener from "react-click-away-listener";

// Firebase
import { getAuth, signOut } from "firebase/auth";

const Profile = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const menuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  let navigate = useNavigate();

  const logOut = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(resetUser());

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
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
        {user?.profileImg ? (
          <>
            <img
              alt="User Icon"
              src={user.profileImg}
              className="object-cover w-5 h-5 rounded-full lg:w-6 lg:h-6"
            />
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 lg:w-6 lg:h-6"
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

      {menuOpen && (
        <ClickAwayListener onClickAway={menuToggle}>
          <div className="relative">
            <div className="absolute right-0 z-10 w-56 mt-2 origin-top-left bg-white rounded-lg shadow-lg dark:bg-secondary ring-1 ring-black ring-opacity-5">
              <Link to="/setting">
                <span className="flex px-4 py-3 text-base text-gray-500 transition rounded-t-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white dark:hover:bg-tertiary">
                  Account
                </span>
              </Link>

              <Link to="#" onClick={logOut}>
                <span className="flex px-4 py-3 text-base text-gray-500 transition rounded-b-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white dark:hover:bg-tertiary">
                  Logout
                </span>
              </Link>
            </div>
          </div>
        </ClickAwayListener>
      )}
    </>
  );
};

export default Profile;
