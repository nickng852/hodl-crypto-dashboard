import React from "react";
import { useParams } from "react-router-dom";

const CoinInfo = ({ coins }) => {
  const { uuid } = useParams();

  return (
    <>
      {coins
        .filter((coin) => coin.uuid === uuid)
        .map((coin, index) => (
          <>
            <div className="px-24 py-16">
              <div key={index} className="flex gap-5">
                <div>
                  <img
                    alt={crypto}
                    src={coin.iconUrl}
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-center ">
                  <div className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    {coin.name}
                  </div>
                  <div className="text-lg font-normal text-gray-400 dark:text-gray-500">
                    {coin.symbol}
                  </div>
                </div>
              </div>
              <div className="py-10">Related articles</div>
            </div>
          </>
        ))}
    </>
  );
};

export default CoinInfo;
