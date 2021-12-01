import React from "react";
import { Link } from "react-router-dom";
import CoinCard from "../../components/coincard/CoinCard";
import CoinList from "../../components/coinlist/CoinList";
import News from "../../components/news/News";

const Dashboard = ({
  coins,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  news,
}) => {
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
                News
              </h1>
              <Link to="#">
                <h1 className="px-5 py-3 text-sm font-medium text-gray-500 uppercase transition-colors duration-200 dark:hover:bg-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 font-header">
                  View more
                </h1>
              </Link>
            </div>
            <div className="mt-6">
              {/*               <CoinList
                coins={coins}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              /> */}
              <News news={news} />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-1/3">
          <div>
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-2xl text-gray-500 cursor-default dark:text-white font-header">
                Cryptocurrency
              </h1>
            </div>
            <div className="mt-6">
              <CoinList coins={coins} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
