import React from "react";
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
      <div>
        <nav className="flex items-center justify-between bg-white dark:bg-gray-800">
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
