import React from "react";
import { useParams } from "react-router-dom";

const CoinInfo = ({ coins }) => {
  const { uuid } = useParams();

  return (
    <>
      {coins
        .filter((coin) => coin.uuid === uuid)
        .map((coin, index) => (
          <div key={index}>
            <h1>{coin.name}</h1>
            <h1>{coin.symbol}</h1>
            <img
              alt={crypto}
              src={coin.iconUrl}
              className="w-16 h-16 rounded-full"
            />
          </div>
        ))}
    </>
  );
};

export default CoinInfo;
