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
          <div className="flex items-center justify-center h-full h-screen-ios">
            <Spinner />
          </div>
        </>
      )}

      {!isCoinFetching && !isNewsFetching && (
        <>
          <div className="grid h-full p-4 overflow-auto xl:gap-4 2xl:gap-20 xl:p-12 xl:grid-cols-2 2xl:grid-cols-3">
            <div className="w-full col-span-1 space-y-8 2xl:col-span-2">
              <CoinIntro />

              <div className="flex justify-end w-full">
                <TimePeriodBar
                  timePeriod={timePeriod}
                  setTimePeriod={setTimePeriod}
                />
              </div>

              <div className="flex items-center justify-center w-full h-72 xl:h-116 2xl:h-132">
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

              {/*               <div>
                  <News />
                </div> */}
            </div>

            <div className="flex flex-col w-full col-span-1 space-y-4 2xl:space-y-10">
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
