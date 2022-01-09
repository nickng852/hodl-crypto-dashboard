import React from "react";
import Menu from "../Menu";
import SearchBar from "../searchbar/SearchBar";
import NavControl from "../panel/NavControl";

const NavBar = ({
  setToken,
  user,
  setUser,
  setIsLogged,
  coins,
  search,
  setSearch,
}) => {
  return (
    <>
      <div className="z-10">
        <nav className="static flex items-center justify-between w-full p-4 2xl:w-auto bg-gray-50 dark:bg-secondary">
          <Menu />
          <SearchBar coins={coins} search={search} setSearch={setSearch} />
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
