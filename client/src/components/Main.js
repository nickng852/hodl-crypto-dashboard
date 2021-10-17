import React from "react";
import CoinCard from "./CoinCard";
import CoinList from "./CoinList";
import NavBar from "./navbar/NavBar";

const Main = ({
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
      <div className="flex flex-col w-full bg-gray-50 justify-items-center">
        <NavBar
          user={user}
          coins={coins}
          search={search}
          setSearch={setSearch}
          open={open}
          setOpen={setOpen}
          setIsLogged={setIsLogged}
        />
        <CoinCard coins={coins} />
        <CoinList coins={coins} />
      </div>
    </>
  );
};

export default Main;
