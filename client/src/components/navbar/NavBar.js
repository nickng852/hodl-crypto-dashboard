import React from "react";
import SearchBar from "../searchbar/SearchBar";
import NavControl from "./NavControl";

const NavBar = ({ coins, search, setSearch, open, setOpen }) => {
  return (
    <>
      <div>
        <nav className="flex items-center justify-between bg-white dark:bg-gray-800">
          <SearchBar coins={coins} search={search} setSearch={setSearch} />
          <NavControl open={open} setOpen={setOpen} />
        </nav>
      </div>
    </>
  );
};

export default NavBar;
