import React, { useState } from "react";
import { Link } from "react-router-dom";
import CoinCard from "../../components/coincard/CoinCard";
import News from "../../components/news/News";
import WatchListModal from "../../components/watchlist/modal/WatchListModal";
import WatchList from "../../components/watchlist/WatchList";

const Dashboard = ({ user, setUser, token, coins, news }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Modal Handler
  const modalToggle = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className="flex h-full">
        <div className="w-2/3 pl-16 pr-8">
          {/* Coin Card */}
          <div>
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-2xl text-gray-500 cursor-default dark:text-gray-100 font-header">
                Dashboard
              </h1>
            </div>

            <div className="mt-6">
              <CoinCard coins={coins} simplified />
            </div>
          </div>
          {/* Coin Card */}

          {/* News */}
          <div>
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-2xl text-gray-500 cursor-default dark:text-gray-100 font-header">
                News Feed
              </h1>

              <Link to="#">
                <button className="px-5 py-3 text-sm font-medium text-blue-600 uppercase transition-colors duration-200 rounded-lg dark:hover:bg-tertiary dark:text-gray-300 hover:bg-gray-200 font-header">
                  View all
                </button>
              </Link>
            </div>

            <div className="mt-6">
              <News news={news} />
            </div>
          </div>
          {/* News */}
        </div>

        {/* Watchlist */}
        <div className="w-1/3 pl-8 pr-16">
          <div className="flex items-center justify-between mt-10">
            <h1 className="text-2xl text-gray-500 cursor-default dark:text-gray-100 font-header">
              Watchlist
            </h1>

            <button
              className="p-2 transition-colors duration-200 rounded dark:hover:bg-tertiary hover:bg-gray-200 dark:text-gray-300"
              onClick={modalToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6">
            {user.watchlist && (
              <>
                <WatchList
                  token={token}
                  user={user}
                  setUser={setUser}
                  coins={coins}
                />
              </>
            )}
          </div>
        </div>
        {modalOpen && (
          <>
            <WatchListModal
              token={token}
              user={user}
              setUser={setUser}
              coins={coins}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          </>
        )}
        {/* Watchlist */}
      </div>
    </>
  );
};

export default Dashboard;
