import React from "react";
import NavBar from "./navbar/NavBar";

const Main = ({ coins, search, setSearch, open, setOpen }) => {
  return (
    <>
      <div className="w-full bg-gray-50">
        <NavBar
          coins={coins}
          search={search}
          setSearch={setSearch}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </>
  );
};

export default Main;
