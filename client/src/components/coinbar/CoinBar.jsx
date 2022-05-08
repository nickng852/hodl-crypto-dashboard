import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCoins } from "../../features/coins/coinsSlice";

const CoinBar = ({ order }) => {
  let coins = useSelector(selectCoins);

  const coinsCopy = [...coins];

  const coinsSortedByMartketCap = coinsCopy.sort((a, b) => {
    if (Number(a.marketCap) > Number(b.marketCap)) {
      return -1;
    }
    if (Number(a.marketCap) < Number(b.marketCap)) {
      return 1;
    }
    return 0;
  });

  const slicedCoinsSortedByMarketCap = coinsSortedByMartketCap.slice(0, 15);

  const coinsCopyII = [...coins];

  const coinsSortedByVolume = coinsCopyII.sort((a, b) => {
    if (Number(a["24hVolume"]) > Number(b["24hVolume"])) {
      return -1;
    }
    if (Number(a["24hVolume"]) < Number(b["24hVolume"])) {
      return 1;
    }
    return 0;
  });

  const slicedCoinsSortedByVolume = coinsSortedByVolume.slice(0, 15);

  if (order === "sortByMarketCap") {
    coins = slicedCoinsSortedByMarketCap;
  } else if (order === "sortByVolume") {
    coins = slicedCoinsSortedByVolume;
  }

  return (
    <>
      {coins.map((result, index) => {
        const id = result.uuid;
        const icon = result.iconUrl;
        const name = result.name;
        const price = Number(result.price); // string returned from API
        const priceChange = Number(result.change); // string returned from API
        const AbsPriceChange = Math.abs(priceChange); // trim "-" for display

        return (
          <Link
            to={`/coin/${id}`}
            key={index}
            className="flex py-4 border-b border-gray-200 cursor-default 2xl:p-6 dark:bg-secondary dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-tertiary last:border-0 2xl:border-none"
          >
            <div className="flex items-center w-1/4 text-sm 2xl:text-base dark:text-gray-100">
              {index + 1}
            </div>

            <div className="flex items-center w-1/2">
              <img
                src={icon}
                alt={name}
                className="w-10 h-10 p-2 bg-white border-2 border-gray-200 rounded-full 2xl:w-12 2xl:h-12 dark:bg-gray-700 dark:border-gray-500"
              />
            </div>

            <div className="flex flex-col justify-start w-full">
              <div className="text-sm 2xl:text-base dark:text-gray-100">
                {name}
              </div>
              <div className="text-sm text-gray-400 2xl:text-base">
                $
                {`${
                  price < 1
                    ? price.toPrecision(4)
                    : price.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })
                }`}
              </div>
            </div>

            <div
              className={`flex items-center justify-end w-3/4 text-sm 2xl:w-1/2 2xl:text-base ${
                (priceChange < 0 && "text-red-500") ||
                (priceChange === 0 && "text-gray-500") ||
                (priceChange > 0 && "text-green-500")
              }`}
            >
              {`${
                (priceChange < 0 && "-" + AbsPriceChange.toFixed(2) + "%") ||
                (priceChange === 0 && AbsPriceChange.toFixed(2) + "%") ||
                (priceChange > 0 && "+" + AbsPriceChange.toFixed(2) + "%")
              }`}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default CoinBar;
