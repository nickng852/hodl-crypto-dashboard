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
      <div className="m-4 flex items-center justify-between">
        <img className="w-8 h-8 rounded-full" src={url} alt={crypto} />
        <div>{name}</div>
        <div className=" px-3 py-2 bg-gray-100 rounded-md text-xs">
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
