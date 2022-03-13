import { useState } from "react";
import { useParams } from "react-router-dom";

// Components
import Spinner from "../../components/loader/Spinner.jsx";
import LineChart from "../../components/linechart/LineChart";
import News from "../../components/news/News.jsx";

// Library
import moment from "moment";
import parse from "html-react-parser";

// Services
import {
  useGetCoinQuery,
  useGetCoinHistoryQuery,
  useGetNewsQuery,
} from "../../services/cryptoApi";

const CoinInfo = ({ keyword, setKeyword }) => {
  const { uuid } = useParams();

  const [timePeriod, setTimePeriod] = useState("24h");

  // Coinranking API call
  const { data: coinApi, isFetching: isCoinFetching } = useGetCoinQuery(uuid);

  const coin = coinApi?.data?.coin;

  if (coinApi) {
    setKeyword(coin.name);
  }

  const { data: coinHistoryApi, isFetching: isCoinHistoryFetching } =
    useGetCoinHistoryQuery({ uuid, timePeriod });

  const response = coinHistoryApi?.data?.history;

  const unflattedCoinHistory = [];

  if (response) {
    const reversedCoinHistory = [...response].reverse();

    unflattedCoinHistory.push(reversedCoinHistory);
  }

  const coinHistory = unflattedCoinHistory.flat(1);

  console.log(coinHistory);

  // News API call
  const { data: newsApi, isFetching: isNewsFetching } = useGetNewsQuery({
    keyword,
    pageSize: "5",
  });

  const news = newsApi?.articles;

  // API response handling
  const index = coin?.uuid;
  const symbol = coin?.symbol;
  const name = coin?.name;
  const description = coin?.description;
  const icon = coin?.iconUrl;
  const volume = Number(coin?.["24hVolume"]);
  const marketCap = Number(coin?.marketCap);
  const price = Number(coin?.price);
  const priceChange = coin?.change;
  const AbsPriceChange = Math.abs(priceChange); // trim "-" for display
  const rank = coin?.rank;
  const allTimeHighPrice = Number(coin?.allTimeHigh?.price);
  const allTimeHighDate = moment
    .unix(coin?.allTimeHigh?.timestamp)
    .format("YYYY/MM/DD");

  // Chart JS handling
  const chartLabel = [];
  const chartStat = [];

  for (let i = 0; i < coinHistory?.length; i += 1) {
    chartLabel.push(
      moment.unix(coinHistory[i]?.timestamp).format("YYYY/MM/DD h:mm a")
    ); // get each index from the individual array
    chartStat.push(coinHistory[i]?.price); // get each array from the response
  }

  return (
    <>
      {(isCoinFetching || isNewsFetching) && (
        <>
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        </>
      )}

      {!isCoinFetching && !isNewsFetching && (
        <>
          <div className="block h-full gap-16 p-20 xl:flex">
            <div className="w-full xl:w-2/3">
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
              <div className="mt-10">
                <div className="flex justify-end">
                  <div class="flex bg-gray-200 rounded-lg p-1 space-x-2 dark:bg-secondary">
                    <button
                      className={`
                      h-10 px-4 py-2 -mb-px text-sm text-center uppercase bg-transparent rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50 sm:text-base whitespace-nowrap focus:outline-none ${
                        timePeriod === "3h"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setTimePeriod("3h")}
                    >
                      3h
                    </button>

                    <button
                      className={`
                      h-10 px-4 py-2 -mb-px text-sm text-center uppercase bg-transparent rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50 sm:text-base whitespace-nowrap focus:outline-none ${
                        timePeriod === "24h"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setTimePeriod("24h")}
                    >
                      24h
                    </button>

                    <button
                      className={`
                      h-10 px-4 py-2 -mb-px text-sm text-center uppercase bg-transparent rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50 sm:text-base whitespace-nowrap focus:outline-none ${
                        timePeriod === "7d"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setTimePeriod("7d")}
                    >
                      7d
                    </button>

                    <button
                      className={`
                      h-10 px-4 py-2 -mb-px text-sm text-center uppercase bg-transparent rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50 sm:text-base whitespace-nowrap focus:outline-none ${
                        timePeriod === "30d"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setTimePeriod("30d")}
                    >
                      30d
                    </button>

                    <button
                      className={`
                      h-10 px-4 py-2 -mb-px text-sm text-center uppercase bg-transparent rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50 sm:text-base whitespace-nowrap focus:outline-none ${
                        timePeriod === "3m"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setTimePeriod("3m")}
                    >
                      3m
                    </button>

                    <button
                      className={`
                      h-10 px-4 py-2 -mb-px text-sm text-center uppercase bg-transparent rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50 sm:text-base whitespace-nowrap focus:outline-none ${
                        timePeriod === "1y"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setTimePeriod("1y")}
                    >
                      1y
                    </button>

                    <button
                      className={`
                      h-10 px-4 py-2 -mb-px text-sm text-center uppercase bg-transparent rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50 sm:text-base whitespace-nowrap focus:outline-none ${
                        timePeriod === "3y"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setTimePeriod("3y")}
                    >
                      3y
                    </button>

                    <button
                      className={`
                      h-10 px-4 py-2 -mb-px text-sm text-center uppercase bg-transparent rounded-lg dark:text-white dark:hover:bg-gray-700 hover:bg-gray-50 sm:text-base whitespace-nowrap focus:outline-none ${
                        timePeriod === "5y"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setTimePeriod("5y")}
                    >
                      5y
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-52 h-96">
                  {isCoinHistoryFetching ? (
                    <>
                      <Spinner />
                    </>
                  ) : (
                    <LineChart
                      key={index}
                      chartLabel={chartLabel}
                      chartStat={chartStat}
                      priceChange={priceChange}
                      coinInfo
                    />
                  )}
                </div>
              </div>
              {/*               <div>
                <News news={news} />
              </div> */}
            </div>

            <div className="w-full xl:w-1/3">
              <div className="flex flex-col p-8 bg-white rounded-2xl dark:text-gray-100 dark:bg-secondary">
                <div className="text-xl font-bold">
                  {symbol} Price Statistics
                </div>
                <div className="py-2 text-sm text-gray-400 border-b border-gray-200 dark:text-gray-500 dark:border-gray-700">
                  {name} Price Today
                </div>

                <div className="flex justify-between py-4 border-b border-gray-200 text-md dark:border-gray-700">
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

                <div className="flex items-center justify-between py-4 text-right border-b border-gray-200 dark:border-gray-700 text-md">
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

                <div className="flex justify-between py-4 border-b border-gray-200 dark:border-gray-700 text-md">
                  <div>Volume</div>
                  <div>${volume.toLocaleString()}</div>
                </div>

                <div className="flex justify-between py-4 border-b border-gray-200 dark:border-gray-700 text-md">
                  <div>Market Cap</div>
                  <div> ${marketCap.toLocaleString()}</div>
                </div>
              </div>

              {description && (
                <>
                  <div className="px-10 py-6 text-justify bg-white rounded-2xl mt-14 dark:text-gray-100 dark:bg-secondary">
                    {parse(description)}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CoinInfo;
