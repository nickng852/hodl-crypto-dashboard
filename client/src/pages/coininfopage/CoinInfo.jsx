import { useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCoin, setCoinPriceHistory } from "../../features/coins/coinsSlice";
import { selectKeyword, setNews } from "../../features/news/newsSlice";

import Spinner from "../../components/loader/Spinner.jsx";
import CoinIntro from "../../components/coininfo/CoinIntro.jsx";
import TimePeriodBar from "../../components/coininfo/TimePeriodBar.jsx";
import LineChart from "../../components/linechart/LineChart";
import CoinPriceStat from "../../components/coininfo/CoinPriceStat.jsx";
import CoinDesc from "../../components/coininfo/CoinDesc.jsx";
import News from "../../components/news/News.jsx";

import {
  useGetCoinQuery,
  useGetCoinPriceHistoryQuery,
  useGetNewsQuery,
} from "../../services/cryptoApi";

const CoinInfo = () => {
  const [timePeriod, setTimePeriod] = useState("24h");

  const { uuid } = useParams();

  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);

  // Coinranking API call - GET coin
  const { data: getCoinApi, isFetching: isCoinFetching } =
    useGetCoinQuery(uuid);

  dispatch(setCoin(getCoinApi?.data?.coin));

  // Coinranking API - GET coin price history
  const {
    data: getCoinPriceHistoryApi,
    isFetching: isCoinPriceHistoryFetching,
  } = useGetCoinPriceHistoryQuery({ uuid, timePeriod });

  const response = getCoinPriceHistoryApi?.data?.history;

  const unflattedCoinPriceHistory = [];

  if (response) {
    const reversedCoinPriceHistory = [...response].reverse();

    unflattedCoinPriceHistory.push(reversedCoinPriceHistory);
  }

  const coinPriceHistory = unflattedCoinPriceHistory.flat(1);

  dispatch(setCoinPriceHistory(coinPriceHistory));

  // News API - GET news
  const { data: newsApi, isFetching: isNewsFetching } = useGetNewsQuery({
    keyword,
    pageSize: "5",
  });

  dispatch(setNews(newsApi?.articles));

  // Chart.js
  const chartLabel = [];
  const chartStat = [];

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
          <div className="grid h-full grid-cols-3 gap-16 p-20 overflow-auto bg-red-200">
            <div className="w-full col-span-2 bg-blue-200">
              <CoinIntro />

              <div className="mt-10">
                <div className="flex justify-end">
                  <TimePeriodBar
                    timePeriod={timePeriod}
                    setTimePeriod={setTimePeriod}
                  />
                </div>

                <div className="flex items-center justify-center mt-52 h-96">
                  {isCoinPriceHistoryFetching ? (
                    <>
                      <Spinner />
                    </>
                  ) : (
                    <LineChart
                      chartLabel={chartLabel}
                      chartStat={chartStat}
                      priceChange
                      coinInfo
                    />
                  )}
                </div>

                <div>
                  <News />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full p-10 space-y-4 bg-green-200">
              <CoinPriceStat />
              <CoinDesc />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CoinInfo;
