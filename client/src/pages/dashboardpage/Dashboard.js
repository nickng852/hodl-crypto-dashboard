import React, { useState } from "react";
import { Link } from "react-router-dom";

// Components
import Spinner from "../../components/loader/Spinner";
import CoinCard from "../../components/coincard/CoinCard";
import CoinList from "../../components/coinlist/CoinList";
import WatchList from "../../components/watchlist/WatchList";
import WatchListModal from "../../components/watchlist/WatchListModal";
import News from "../../components/news/News";

// Services
import { useGetCoinsQuery, useGetNewsQuery } from "../../services/cryptoApi";

const Dashboard = ({ token, user, setUser }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Modal Handler
  const modalToggle = () => {
    setModalOpen(!modalOpen);
  };

  // Coinranking API call
  const { data: coinrankingApi, isFetching: isCoinsFetching } =
    useGetCoinsQuery();

  const coins = coinrankingApi?.data?.coins;

  // News API call
  const { data: newsApi, isFetching: isNewsFetching } = useGetNewsQuery();

  const news = newsApi?.articles;

  return (
    <>
      {(isCoinsFetching || isNewsFetching) && (
        <>
          <div className="flex items-center justify-center h-screen">
            <Spinner />
          </div>
        </>
      )}

      {!isCoinsFetching && !isNewsFetching && (
        <>
          <main className="block w-full h-full 2xl:flex">
            <div className="px-10 2xl:py-0 2xl:pl-16 2xl:pr-8 2xl:w-2/3">
              {/* Coin Card */}
              <section>
                <header className="flex items-center justify-between mt-10">
                  <h1 className="text-2xl text-gray-500 cursor-default dark:text-gray-100 font-header">
                    Dashboard
                  </h1>
                </header>

                <div className="mt-6">
                  <CoinCard coins={coins} simplified />
                </div>
              </section>

              {/* Coin List */}
              <section>
                <header className="flex items-center justify-between mt-10">
                  <h1 className="text-2xl text-gray-500 cursor-default dark:text-gray-100 font-header">
                    Cryptocurrency
                  </h1>
                </header>

                <div className="mt-6">
                  <CoinList coins={coins} />
                </div>
              </section>
            </div>

            <div className="p-10 2xl:py-0 2xl:pl-8 2xl:pr-16 2xl:w-1/3">
              {/* Watchlist */}
              <section>
                <header className="flex items-center justify-between mt-10">
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
                </header>

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

                  {modalOpen && (
                    <>
                      <WatchListModal
                        token={token}
                        user={user}
                        setUser={setUser}
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                        coins={coins}
                      />
                    </>
                  )}
                </div>
              </section>

              {/* News */}
              <section>
                <header className="flex items-center justify-between mt-10">
                  <h1 className="text-2xl text-gray-500 cursor-default dark:text-gray-100 font-header">
                    News Feed
                  </h1>

                  <Link to="#">
                    <button className="px-5 py-3 text-sm font-medium text-blue-600 uppercase transition-colors duration-200 rounded-lg dark:hover:bg-tertiary dark:text-gray-300 hover:bg-gray-200 font-header">
                      View all
                    </button>
                  </Link>
                </header>

                <div className="mt-6">
                  <News news={news} />
                </div>
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default Dashboard;
