import React from "react";
import SearchBar from "../components/SearchBar";

const Main = ({ coins, search, setSearch }) => {
  return (
    <>
      <SearchBar coins={coins} search={search} setSearch={setSearch} />
    </>
  );
};

export default Main;
