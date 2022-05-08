import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { selectToken, setUser } from "../../features/auth/authSlice";
import { setCoins } from "../../features/coins/coinsSlice";
import { selectKeyword, setNews } from "../../features/news/newsSlice";

import Spinner from "../../components/loader/Spinner.jsx";
import CoinCard from "../../components/coincard/CoinCard.jsx";
import CoinBar from "../../components/coinbar/CoinBar.jsx";
import WatchList from "../../components/watchlist/WatchList.jsx";
import WatchListModal from "../../components/watchlist/WatchListModal.jsx";
import News from "../../components/news/News.jsx";

import ClickAwayListener from "react-click-away-listener";

// Firebase
import { db } from "../../firebase/firebase.config";
import { doc, onSnapshot } from "firebase/firestore";

import { useGetCoinsQuery, useGetNewsQuery } from "../../services/cryptoApi";

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const modalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const menuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const sortByMarketCap = () => {
    setOrder("sortByMarketCap");
    setMenuOpen(!menuOpen);
  };

  const sortByVolume = () => {
    setOrder("sortByVolume");
    setMenuOpen(!menuOpen);
  };

  // Coinranking API call - GET coins
  const { data: getCoinsApi, isFetching: isCoinsFetching } = useGetCoinsQuery();

  dispatch(setCoins(getCoinsApi?.data?.coins));

  // News API - GET news
  const { data: newsApi, isFetching: isNewsFetching } = useGetNewsQuery({
    keyword,
    pageSize: "3",
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
          <main className="w-full h-full 2xl:flex">
            <div className="flex flex-col justify-between p-4 space-y-6 2xl:pl-12 2xl:pr-6 2xl:py-12 2xl:w-2/3">
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
                  <div className="relative">
                    <h1
                      className="text-xl text-gray-500 cursor-default dark:text-gray-100 font-header"
                      onClick={menuToggle}
                    >
                      Top 15 Cryptocurrency by
                    </h1>
                  </div>

                  <Link to="/coins">
                    <button className="p-2 text-sm font-medium text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 font-header dark:hover:bg-tertiary hover:bg-gray-200 ">
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

                  {menuOpen && (
                    <>
                      <ClickAwayListener onClickAway={menuToggle}>
                        <div className="absolute left-0 z-10 w-56 mt-2 origin-top-left bg-white rounded-lg shadow-lg dark:bg-secondary ring-1 ring-black ring-opacity-5">
                          <span
                            className="flex px-4 py-3 text-base text-gray-700 rounded-t-lg hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-tertiary"
                            onClick={sortByMarketCap}
                          >
                            MarketCap
                          </span>

                          <span
                            className="flex px-4 py-3 text-base text-gray-700 rounded-t-lg hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-tertiary"
                            onClick={sortByVolume}
                          >
                            Volume
                          </span>
                        </div>
                      </ClickAwayListener>
                    </>
                  )}
                </header>

                <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 2xl:grid-cols-3">
                  <CoinBar order={order} />
                </div>
              </section>
            </div>

            <div className="p-6 space-y-4 2xl:pl-6 2xl:pr-12 2xl:w-1/3 2xl:justify-between 2xl:flex 2xl:flex-col 2xl:py-12">
              {/* Watchlist */}
              <section className="space-y-4">
                <header className="flex items-center justify-between">
                  <h1 className="text-xl text-gray-500 cursor-default dark:text-gray-100 font-header">
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
                  <News />
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
