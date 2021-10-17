import React from "react";
import SearchBar from "../navbar/SearchBar";
import NavControl from "./NavControl";

const NavBar = ({
  user,
  coins,
  search,
  setSearch,
  open,
  setOpen,
  setIsLogged,
}) => {
  return (
    <>
      <div>
        <nav className="flex items-center justify-between bg-white dark:bg-gray-800">
          <SearchBar coins={coins} search={search} setSearch={setSearch} />
          <NavControl
            user={user}
            open={open}
            setOpen={setOpen}
            setIsLogged={setIsLogged}
          />
        </nav>
      </div>
    </>
  );
};

export default NavBar;
