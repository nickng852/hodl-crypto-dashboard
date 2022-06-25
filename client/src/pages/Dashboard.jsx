import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectToken, setUser } from "../features/auth/authSlice";
import { setCoins } from "../features/coins/coinsSlice";
import { selectKeyword, setNews } from "../features/news/newsSlice";

import Spinner from "../components/loader/Spinner.jsx";
import CoinCard from "../components/coincard/CoinCard.jsx";
import CoinBar from "../components/coinbar/CoinBar.jsx";
import WatchList from "../components/watchlist/WatchList.jsx";
import WatchListModal from "../components/watchlist/WatchListModal.jsx";
import NewsList from "../components/news/NewsList.jsx";

import ClickAwayListener from "react-click-away-listener";

// Firebase
import { db } from "../firebase/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";

import { useGetCoinsQuery, useGetNewsQuery } from "../services/cryptoApi";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rank, setRank] = useState("Market Cap");
  const [order, setOrder] = useState("sortByMarketCap");

  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const keyword = useSelector(selectKeyword);

  // Get logged user's info from firebase after successful login
  useEffect(() => {
    if (token) {
      const getUser = () => {
        onSnapshot(doc(db, "users", token.uid), (doc) => {
          dispatch(setUser(doc.data()));
        });
      };

      getUser();
    }
  }, [dispatch, token]);

  const menuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const modalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const sortByMarketCap = () => {
    setOrder("sortByMarketCap");
    setMenuOpen(!menuOpen);
    setRank("Market Cap");
  };

  const sortByVolume = () => {
    setOrder("sortByVolume");
    setMenuOpen(!menuOpen);
    setRank("Volume");
  };

  // Coinranking API call - GET coins
  const { data: getCoinsApi, isFetching: isCoinsFetching } = useGetCoinsQuery();

  dispatch(setCoins({ coins: getCoinsApi?.data?.coins }));

  // News API - GET news
  const { data: newsApi, isFetching: isNewsFetching } = useGetNewsQuery({
    keyword,
    page: 1,
    pageSize: 3,
  });

  dispatch(setNews(newsApi?.articles));

  return (
    <>
      {(isCoinsFetching || isNewsFetching) && (
        <>
          <div className="flex items-center justify-center w-full h-full">
            <Spinner />
          </div>
        </>
      )}

      {!isCoinsFetching && !isNewsFetching && (
        <>
          <main className="space-y-8 2xl:space-y-0 2xl:space-x-10 2xl:flex">
            <div className="flex flex-col justify-between space-y-6 2xl:w-2/3">
              {/* Coin Card */}
              <section className="space-y-4">
                <header className="flex items-center">
                  <h1 className="text-xl text-gray-500 cursor-default dark:text-gray-100 font-header">
                    Dashboard
                  </h1>
                </header>

                <div>
                  <CoinCard simplified />
                </div>
              </section>

              {/* Coin Bar */}
              <section className="p-6 space-y-4 bg-white 2xl:p-8 rounded-3xl dark:bg-secondary ">
                <header className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h1 className="text-xl text-gray-500 cursor-default dark:text-gray-100 font-header">
                      Top 15 Cryptocurrency by&nbsp;
                      <div className="relative inline-block">
                        <button
                          className="relative flex items-center text-sm text-gray-600 dark:text-white"
                          onClick={menuToggle}
                        >
                          <span className="text-xl text-gray-500 dark:text-gray-100 font-header">
                            {rank}
                          </span>

                          <svg
                            className="w-6 h-6 mx-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>

                        {menuOpen && (
                          <>
                            <ClickAwayListener onClickAway={menuToggle}>
                              <div className="relative">
                                <div className="absolute left-0 z-10 w-56 mt-2 origin-top-left bg-white rounded-lg shadow-lg dark:bg-secondary ring-1 ring-black ring-opacity-5">
                                  <span
                                    className="flex px-4 py-3 text-base text-gray-500 transition rounded-t-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white dark:hover:bg-tertiary"
                                    onClick={sortByMarketCap}
                                  >
                                    MarketCap
                                  </span>

                                  <span
                                    className="flex px-4 py-3 text-base text-gray-500 transition rounded-b-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white dark:hover:bg-tertiary"
                                    onClick={sortByVolume}
                                  >
                                    Volume
                                  </span>
                                </div>
                              </div>
                            </ClickAwayListener>
                          </>
                        )}
                      </div>
                    </h1>
                  </div>

                  <Link to="/coins">
                    <button className="p-2 text-sm font-medium text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 font-header 2xl:dark:hover:bg-tertiary 2xl:hover:bg-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Link>
                </header>

                <div className="grid grid-cols-1 mt-6 gap-x-6 md:grid-cols-2 2xl:grid-cols-3">
                  <CoinBar order={order} />
                </div>
              </section>
            </div>

            <div className="space-y-4 2xl:justify-between 2xl:flex 2xl:flex-col">
              {/* Watchlist */}
              <section className="space-y-4">
                <header className="flex items-center justify-between">
                  <h1 className="text-xl text-gray-500 cursor-default dark:text-gray-100 font-header">
                    Watchlist
                  </h1>

                  <button
                    className="p-2 transition-colors duration-200 rounded 2xl:dark:hover:bg-tertiary 2xl:hover:bg-gray-200 dark:text-gray-300"
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

                <div>
                  <WatchList />

                  {modalOpen && (
                    <>
                      <WatchListModal
                        modalOpen={modalOpen}
                        setModalOpen={setModalOpen}
                      />
                    </>
                  )}
                </div>
              </section>

              {/* News */}
              <section className="hidden md:block">
                <header className="flex items-center justify-between mt-10">
                  <h1 className="text-xl text-gray-500 cursor-default dark:text-gray-100 font-header">
                    News Feed
                  </h1>

                  <Link to="/news">
                    <button className="px-5 py-3 text-sm font-medium text-gray-500 transition-colors duration-200 rounded-lg dark:hover:bg-tertiary dark:text-gray-300 hover:bg-gray-200 font-header">
                      See all
                    </button>
                  </Link>
                </header>

                <div className="mt-6">
                  <NewsList />
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
