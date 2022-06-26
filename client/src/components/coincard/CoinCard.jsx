import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCoins } from "../../features/coins/coinsSlice";

import LineChart from "../linechart/LineChart";

import { Swiper, SwiperSlide } from "swiper/react/";

// import Swiper styles
import "swiper/swiper.scss";
import "swiper/swiper-bundle.css";

// import Swiper core and required modules
import SwiperCore, { Autoplay } from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay]);

const CoinCard = ({ simplified }) => {
  const coins = useSelector(selectCoins);

  const coinCardDisplayCount = simplified ? 10 : 50;

  const slicedCoins = coins?.slice(0, coinCardDisplayCount); // decide how many CoinCard will be displayed

  return (
    <>
      <Swiper
        spaceBetween={50}
        autoplay={{ delay: 5000 }}
        loop={true}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
          2000: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
      >
        {slicedCoins?.map((result, index) => {
          const id = result.uuid;
          const icon = result.iconUrl;
          const name = result.name;
          const symbol = result.symbol;
          const price = Number(result.price); // string returned from API
          const priceChange = Number(result.change); // string returned from API
          const AbsPriceChange = Math.abs(priceChange); // trim "-" for display

          // LineChart Data
          const chartLabel = [];
          const chartStat = [];

          for (let i = 0; i < result.sparkline?.length; i++) {
            chartLabel.push(i); // get each index from the individual array
            chartStat.push(result.sparkline[i]); // get each array from the response
          }

          return (
            <SwiperSlide key={index}>
              <Link to={`/coin/${id}`}>
                <div className="relative w-full overflow-hidden bg-white rounded-3xl dark:bg-secondary">
                  <img
                    src={icon}
                    alt={name}
                    className="absolute 2xl:w-20 2xl:h-20 w-14 h-14 md:w-16 md:h-16 opacity-95 top-4 right-4"
                  />

                  <div className="px-4 py-5 sm:p-5">
                    <dl>
                      <span className="px-2 py-1 text-xs font-medium leading-5 text-gray-600 truncate bg-gray-200 rounded-md">
                        {symbol}
                      </span>

                      <dd className="mt-4 font-semibold text-gray-500">
                        <span className="mr-3 dark:text-gray-100">{name}</span>

                        <span
                          className={`${
                            (priceChange < 0 && "text-red-500") ||
                            (priceChange === 0 && "text-gray-500") ||
                            (priceChange > 0 && "text-green-500")
                          }`}
                        >
                          {`${
                            (priceChange < 0 &&
                              "▼ " + AbsPriceChange.toFixed(2) + "%") ||
                            (priceChange === 0 &&
                              AbsPriceChange.toFixed(2) + "%") ||
                            (priceChange > 0 &&
                              "▲ " + AbsPriceChange.toFixed(2) + "%")
                          }`}
                        </span>
                      </dd>

                      <dd className="mt-1 text-3xl font-semibold leading-9 text-gray-900 dark:text-gray-100">
                        $
                        {`${
                          price < 1
                            ? price.toPrecision(4)
                            : price.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })
                        }`}
                      </dd>
                    </dl>
                  </div>

                  <div className="px-4 pb-5 sm:pb-5">
                    <LineChart
                      key={index}
                      chartLabel={chartLabel}
                      chartStat={chartStat}
                      priceChange={priceChange}
                      coinCard
                    />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default CoinCard;
