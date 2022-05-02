import { useSelector } from "react-redux";
import { selectCoin } from "../../features/coins/coinsSlice";

import moment from "moment";

const CoinPriceStat = () => {
  const coin = useSelector(selectCoin);

  const name = coin?.name;
  const symbol = coin?.symbol;
  const price = Number(coin?.price); // string returned from API
  const marketCap = Number(coin?.marketCap); // string returned from API
  const volume = Number(coin?.["24hVolume"]); // string returned from API
  const allTimeHighPrice = Number(coin?.allTimeHigh?.price); // string returned from API
  const allTimeHighDate = moment
    .unix(coin?.allTimeHigh?.timestamp)
    .format("YYYY/MM/DD");

  return (
    <>
      <main className="flex flex-col p-6 bg-white 2xl:p-8 rounded-2xl dark:text-gray-100 dark:bg-secondary">
        <div className="text-base font-bold 2xl:text-xl">
          {symbol} Price Statistics
        </div>
        <div className="py-2 text-xs text-gray-400 border-b border-gray-200 2xl:text-sm dark:text-gray-500 dark:border-gray-700">
          {name} Price Today
        </div>

        <div className="flex justify-between py-4 text-sm border-b border-gray-200 2xl:text-md dark:border-gray-700">
          <div>{name} Price</div>
          <div>
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

        <div className="flex items-center justify-between py-4 text-sm text-right border-b border-gray-200 dark:border-gray-700 2xl:text-md">
          <div>All Time High</div>
          <div>
            <div>
              $
              {`${
                allTimeHighPrice < 1
                  ? allTimeHighPrice.toPrecision(4)
                  : allTimeHighPrice.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })
              }`}
            </div>

            <div className="text-gray-400 dark:text-gray-500">
              ({allTimeHighDate})
            </div>
          </div>
        </div>

        <div className="flex justify-between py-4 text-sm border-b border-gray-200 dark:border-gray-700 2xl:text-md">
          <div>Volume</div>
          <div>${volume.toLocaleString()}</div>
        </div>

        <div className="flex justify-between py-4 text-sm border-b border-gray-200 dark:border-gray-700 2xl:text-md">
          <div>Market Cap</div>
          <div> ${marketCap.toLocaleString()}</div>
        </div>
      </main>
    </>
  );
};

export default CoinPriceStat;
