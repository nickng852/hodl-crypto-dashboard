import { Link } from "react-router-dom";

const CoinBar = ({ coins, order }) => {
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
        const priceChange = result.change;
        const AbsPriceChange = Math.abs(priceChange); // trim "-" for display

        return (
          <>
            <Link
              to={`/coin/${id}`}
              className="flex p-6 border-b border-gray-200 cursor-default dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-secondary"
            >
              <div className="flex items-center w-1/4 dark:text-gray-100">
                {index + 1}
              </div>

              <div className="w-1/2">
                <img
                  src={icon}
                  alt={name}
                  className="w-12 h-12 p-2 border-2 border-gray-200 rounded-full dark:border-gray-700"
                />
              </div>

              <div className="w-full">
                <div className="dark:text-gray-100">{name}</div>
                <div className="text-gray-400">
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
                className={`${
                  priceChange < 0
                    ? "w-1/2 items-center text-red-600 flex justify-end"
                    : "w-1/2 items-center text-green-500 flex justify-end"
                }`}
              >
                {`${
                  priceChange < 0
                    ? "-" + AbsPriceChange.toFixed(2) + "%"
                    : "+" + AbsPriceChange.toFixed(2) + "%"
                }`}
              </div>
            </Link>
          </>
        );
      })}
    </>
  );
};

export default CoinBar;
