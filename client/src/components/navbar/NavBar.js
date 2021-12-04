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
  watchList,
  setWatchList,
}) => {
  return (
    <>
      <div className="z-10">
        <nav className="flex items-center justify-between px-5 py-4 bg-gray-50 dark:bg-gray-800">
          <SearchBar
            coins={coins}
            search={search}
            setSearch={setSearch}
            watchList={watchList}
            setWatchList={setWatchList}
          />
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
