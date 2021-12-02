import React from "react";
import { Link } from "react-router-dom";
import CoinCard from "../../components/coincard/CoinCard";
import News from "../../components/news/News";
import WatchList from "../../components/watchlist/WatchList";

const Dashboard = ({ coins, news }) => {
  return (
    <>
      <div className="flex h-full">
        <div className="flex flex-col w-2/3 px-16">
          <div>
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-2xl text-gray-500 cursor-default dark:text-white font-header">
                Dashboard
              </h1>
            </div>
            <div className="mt-6">
              <CoinCard coins={coins} simplified />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-2xl text-gray-500 cursor-default dark:text-white font-header">
                News Feed
              </h1>
              <Link to="#">
                <h1 className="px-5 py-3 text-sm font-medium text-blue-600 uppercase transition-colors duration-200 dark:hover:bg-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 font-header">
                  View all
                </h1>
              </Link>
            </div>
            <div className="mt-6">
              <News news={news} />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/3 pr-16">
          <div>
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-2xl text-gray-500 cursor-default dark:text-white font-header">
                Watchlist
              </h1>
            </div>
            <div className="mt-6">
              <WatchList coins={coins} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
