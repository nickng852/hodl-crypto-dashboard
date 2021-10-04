import React from "react";

export const Coin = ({
  id,
  name,
  symbol,
  price,
  marketcap,
  percentchange24h,
  volume24h,
}) => {
  const url = `https://s2.coinmarketcap.com/static/img/coins/128x128/${id}.png`;

  return (
    <>
      <div className="flex justify-between items-center m-4">
        <img
          className="w-8 h-8 rounded-full shadow-md"
          src={url}
          alt={crypto}
        />
        <div>{name}</div>
        <div className="px-2 py-1 text-xs rounded text-white bg-gray-400 font-medium">
          {symbol}
        </div>
        <div>${price.toLocaleString()}</div>
        <div>${marketcap.toLocaleString()}</div>
        <div>{percentchange24h.toFixed(2)}%</div>
        <div>${volume24h.toLocaleString()}</div>
      </div>
    </>
  );
};
