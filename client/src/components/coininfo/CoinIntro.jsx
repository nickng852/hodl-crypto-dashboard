import { useSelector } from "react-redux";
import { selectCoin } from "../../features/coins/coinsSlice";

const CoinIntro = () => {
  const coin = useSelector(selectCoin);

  const rank = coin?.rank;
  const icon = coin?.iconUrl;
  const name = coin?.name;
  const symbol = coin?.symbol;
  const priceChange = Number(coin?.change); // string returned from API
  const AbsPriceChange = Math.abs(priceChange); // trim "-" for display

  return (
    <>
      <div className="flex gap-5">
        <div className="flex items-center">
          <img
            alt={name}
            src={icon}
            className="w-8 h-8 p-1 bg-white border-2 border-gray-200 rounded-full 2xl:w-16 2xl:h-16 2xl:p-3"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="text-base font-semibold text-gray-700 2xl:text-xl dark:text-gray-200">
              {name}
            </div>

            <div className="m-2 text-sm font-normal text-gray-400 2xl:text-lg dark:text-gray-500">
              {symbol}
            </div>
          </div>

          <div className="flex items-center space-x-1 2xl:space-x-2">
            <span className="p-1 text-xs font-medium leading-5 text-gray-600 truncate bg-gray-200 rounded-md 2xl:px-2 2xl:py-1">
              Rank #{rank}
            </span>

            <span
              className={`2xl:px-2 2xl:py-1 text-xs p-1 font-medium leading-5 text-gray-100 truncate rounded-md ${
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
        </div>
      </div>
    </>
  );
};

export default CoinIntro;
