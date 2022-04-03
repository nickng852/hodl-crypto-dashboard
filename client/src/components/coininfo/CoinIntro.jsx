import { useSelector } from "react-redux";
import { selectCoin } from "../../features/coins/coinsSlice";

const CoinIntro = () => {
  const coin = useSelector(selectCoin);

  // Response handling
  const icon = coin?.iconUrl;
  const name = coin?.name;
  const rank = coin?.rank;
  const priceChange = Number(coin?.change);
  const AbsPriceChange = Math.abs(priceChange); // trim "-" for display
  const symbol = coin?.symbol;

  return (
    <>
      <div className="flex gap-5">
        <div>
          <img
            alt={crypto}
            src={icon}
            className="w-16 h-16 p-3 rounded-full bg-gray-50"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex">
            <div className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              {name}
            </div>
            <span className="px-2 py-1 mx-2 text-xs font-medium leading-5 text-gray-600 truncate bg-gray-200 rounded-md">
              Rank #{rank}
            </span>
            <span
              className={`px-2 py-1 text-xs font-medium leading-5 text-gray-100 truncate rounded-md ${
                priceChange < 0 ? "bg-red-600" : "bg-green-500"
              }`}
            >
              {`${
                priceChange < 0
                  ? "▼ " + AbsPriceChange.toFixed(2) + "%"
                  : "▲ " + AbsPriceChange.toFixed(2) + "%"
              }`}
            </span>
          </div>

          <div className="text-lg font-normal text-gray-400 dark:text-gray-500">
            {symbol}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinIntro;
