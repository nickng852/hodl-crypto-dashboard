import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectCoins } from "../../features/coins/coinsSlice";

import LineChart from "../linechart/LineChart";

import { Swiper, SwiperSlide } from "swiper/react/";

// import Swiper styles
import "swiper/swiper.scss";
import "swiper/swiper-bundle.css";
import "swiper/components/effect-fade/effect-fade.scss";

// import Swiper core and required modules
import SwiperCore, {
  Autoplay,
  EffectFade,
  Pagination,
  Navigation,
} from "swiper";

// install Swiper modules
SwiperCore.use([Autoplay, EffectFade, Pagination, Navigation]);

const CoinCard = ({ simplified }) => {
  const coins = useSelector(selectCoins);

  const coinCardDisplayCount = simplified ? 10 : 50;

  const slicedCoins = coins.slice(0, coinCardDisplayCount); // decide how many CoinCard will be displayed

  return (
    <>
      <Swiper
        spaceBetween={50}
        freeMode={true}
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
          },
        }}
      >
        <div className="flex">
          {slicedCoins.map((result, index) => {
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
              <SwiperSlide
                className="relative overflow-hidden bg-white rounded-3xl w-60 md:w-72 dark:bg-secondary"
                key={index}
              >
                <Link to={`/coin/${id}`}>
                  <img
                    src={icon}
                    alt={name}
                    className="absolute rounded-full 2xl:w-24 2xl:h-24 w-14 h-14 md:w-24 md:h-24 opacity-95 -top-2 -right-2 md:-top-4 md:-right-4"
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
                </Link>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>
    </>
  );
};

export default CoinCard;
