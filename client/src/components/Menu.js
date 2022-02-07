import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClickAway = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <div
        className="z-10 p-2 rounded-sm cursor-pointer 2xl:hidden dark:hover:bg-tertiary hover:bg-gray-200 dark:text-gray-300"
        onClick={handleClick}
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
            d="M4 8h16M4 16h16"
          />
        </svg>
      </div>

      <ClickAwayListener onClickAway={handleClickAway}>
        <div
          className={`absolute top-0 w-1/3 h-full bg-gray-300 bg-opacity-95 ease-in-out duration-500 dark:bg-primary dark:bg-opacity-95 ${
            isOpen ? "left-0" : "-left-1/3"
          }`}
        ></div>
      </ClickAwayListener>
    </>
  );
};

export default Menu;
