import { useState } from "react";
import { useParams } from "react-router-dom";

// Components
import Spinner from "../../components/loader/Spinner";
import News from "../../components/news/News";

// Library
import moment from "moment";
import parse from "html-react-parser";
import { Line } from "react-chartjs-2";

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

  const stat = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(200, 200, 200, 500);

    if (priceChange < 0) {
      gradient.addColorStop(0, "rgba(214, 69, 65, 0.5)");
      gradient.addColorStop(1, "rgba(214, 69, 65,0.01)");
    } else {
      gradient.addColorStop(0, "rgba(34, 153, 84,0.5)");
      gradient.addColorStop(1, "rgba(34, 153, 84,0.01)");
    }

    return {
      labels: chartLabel,
      datasets: [
        {
          data: chartStat,
          fill: true,
          backgroundColor: gradient,
          borderColor: priceChange < 0 ? "#e74c3c" : "#218c74",
          borderWidth: 2,
          pointBackgroundColor: priceChange < 0 ? "#e74c3c" : "#218c74",
        },
      ],
    };
  };

  const options = {
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    radius: 0,
    tension: 0.4,
    spanGaps: true, // skip null data value
  };

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
          <div className="flex h-full">
            <div className="w-2/3 pl-16 pr-8">
              <div className="flex gap-5 mt-14">
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
                      className={`${
                        priceChange < 0
                          ? "bg-red-600 text-gray-100 px-2 py-1 text-xs font-medium leading-5 truncate rounded-md"
                          : "bg-green-500 text-gray-100 px-2 py-1 text-xs font-medium leading-5 truncate rounded-md"
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
                      className={`${
                        timePeriod === "3h"
                          ? "dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg bg-white hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent sm:text-base whitespace-nowrap focus:outline-none uppercase"
                          : "dark:hover:bg-gray-700 rounded-lg hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none uppercase"
                      }`}
                      onClick={() => setTimePeriod("3h")}
                    >
                      3h
                    </button>

                    <button
                      className={`${
                        timePeriod === "24h"
                          ? "dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg bg-white hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent sm:text-base whitespace-nowrap focus:outline-none uppercase"
                          : "dark:hover:bg-gray-700 rounded-lg hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none uppercase"
                      }`}
                      onClick={() => setTimePeriod("24h")}
                    >
                      24h
                    </button>

                    <button
                      className={`${
                        timePeriod === "7d"
                          ? "dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg bg-white hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent sm:text-base whitespace-nowrap focus:outline-none uppercase"
                          : "dark:hover:bg-gray-700 rounded-lg hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none uppercase"
                      }`}
                      onClick={() => setTimePeriod("7d")}
                    >
                      7d
                    </button>

                    <button
                      className={`${
                        timePeriod === "30d"
                          ? "dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg bg-white hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent sm:text-base whitespace-nowrap focus:outline-none uppercase"
                          : "dark:hover:bg-gray-700 rounded-lg hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none uppercase"
                      }`}
                      onClick={() => setTimePeriod("30d")}
                    >
                      30d
                    </button>

                    <button
                      className={`${
                        timePeriod === "3m"
                          ? "dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg bg-white hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent sm:text-base whitespace-nowrap focus:outline-none uppercase"
                          : "dark:hover:bg-gray-700 rounded-lg hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none uppercase"
                      }`}
                      onClick={() => setTimePeriod("3m")}
                    >
                      3m
                    </button>

                    <button
                      className={`${
                        timePeriod === "1y"
                          ? "dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg bg-white hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent sm:text-base whitespace-nowrap focus:outline-none uppercase"
                          : "dark:hover:bg-gray-700 rounded-lg hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none uppercase"
                      }`}
                      onClick={() => setTimePeriod("1y")}
                    >
                      1y
                    </button>

                    <button
                      className={`${
                        timePeriod === "3y"
                          ? "dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg bg-white hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent sm:text-base whitespace-nowrap focus:outline-none uppercase"
                          : "dark:hover:bg-gray-700 rounded-lg hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none uppercase"
                      }`}
                      onClick={() => setTimePeriod("3y")}
                    >
                      3y
                    </button>

                    <button
                      className={`${
                        timePeriod === "5y"
                          ? "dark:text-white dark:hover:bg-gray-700 dark:bg-gray-700 rounded-lg bg-white hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center bg-transparent sm:text-base whitespace-nowrap focus:outline-none uppercase"
                          : "dark:hover:bg-gray-700 rounded-lg hover:bg-gray-50 h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none uppercase"
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
                    <Line key={index} data={stat} options={options} />
                  )}
                </div>
              </div>
              {/*               <div>
                <News news={news} />
              </div> */}
            </div>

            <div className="w-1/3 pl-8 pr-16">
              <div className="flex flex-col p-8 rounded-2xl mt-14 dark:text-gray-100 bg-gray-50 dark:bg-secondary">
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
                  <div className="px-10 py-6 text-justify rounded-2xl mt-14 dark:text-gray-100 bg-gray-50 dark:bg-secondary">
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
