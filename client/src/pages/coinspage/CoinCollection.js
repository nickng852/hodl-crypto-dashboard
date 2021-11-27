import React from "react";
import CoinCard from "../../components/coincard/CoinCard";

const CoinCollection = ({ coins }) => {
  return (
    <>
      <CoinCard coins={coins} />
    </>
  );
};

export default CoinCollection;
