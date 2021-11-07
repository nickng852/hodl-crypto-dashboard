import React from "react";
import CoinCard from "./CoinCard";
import CoinList from "./CoinList";

const HomePage = ({
  coins,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  return (
    <>
      <CoinCard coins={coins} />
      <CoinList
        coins={coins}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </>
  );
};

export default HomePage;
