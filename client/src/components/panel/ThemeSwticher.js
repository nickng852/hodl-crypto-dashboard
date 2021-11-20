import React from "react";

const ThemeSwticher = () => {
  const toggleTheme = () => {
    const html = document.querySelector("html");

    html.classList.length === 0
      ? html.classList.add("dark")
      : html.classList.remove("dark");
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md dark:text-gray-50 focus:outline-none"
        onClick={toggleTheme}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="white"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
    </>
  );
};

export default ThemeSwticher;
