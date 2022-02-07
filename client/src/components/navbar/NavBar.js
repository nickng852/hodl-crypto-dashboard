import React from "react";

// Components
import SearchBar from "../searchbar/SearchBar";
import NavControl from "../panel/NavControl";
import Menu from "../Menu";

const NavBar = ({ setToken, user, setUser, setIsLogged }) => {
  return (
    <>
      <div className="z-10">
        <nav className="static flex items-center justify-between w-full p-4 2xl:w-auto bg-gray-50 dark:bg-secondary">
          <Menu />
          <SearchBar />
          <NavControl
            setToken={setToken}
            user={user}
            setUser={setUser}
            setIsLogged={setIsLogged}
          />
        </nav>
      </div>
    </>
  );
};

export default NavBar;
