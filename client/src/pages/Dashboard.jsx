import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import _ from 'lodash'
import ClickAwayListener from 'react-click-away-listener'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import CoinBar from '../components/coinbar/CoinBar.jsx'
import CoinCard from '../components/coincard/CoinCard.jsx'
import Spinner from '../components/loader/Spinner.jsx'
import NewsList from '../components/news/NewsList.jsx'
import WatchList from '../components/watchlist/WatchList.jsx'
import WatchListModal from '../components/watchlist/WatchListModal.jsx'
import { setUser } from '../features/auth/authSlice'
import useAuth from '../features/auth/useAuth.js'
import { setCoins } from '../features/coins/coinsSlice'
import { selectKeyword, setNews } from '../features/news/newsSlice'
import { db } from '../firebase/firebase.config'
import { useGetCoinsQuery, useGetNewsQuery } from '../services/cryptoApi'

const Dashboard = () => {
    const { currentUser } = useAuth()

    const dispatch = useDispatch()
    const keyword = useSelector(selectKeyword)

    // Get logged user's info from firebase after successful login
    useEffect(() => {
        if (currentUser && !_.isEmpty(currentUser)) {
            const getUser = () => {
                onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
                    dispatch(setUser(doc.data()))
                })
            }

            getUser()
        }
    }, [dispatch, currentUser])

    const [menuOpen, setMenuOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [rank, setRank] = useState('Market Cap')
    const [order, setOrder] = useState('sortByMarketCap')

    const menuToggle = () => {
        setMenuOpen(!menuOpen)
    }

    const modalToggle = () => {
        setModalOpen(!modalOpen)
    }

    const sortByMarketCap = () => {
        setOrder('sortByMarketCap')
        setMenuOpen(!menuOpen)
        setRank('Market Cap')
    }

    const sortByVolume = () => {
        setOrder('sortByVolume')
        setMenuOpen(!menuOpen)
        setRank('Volume')
    }

    // Coinranking API call - GET coins
    const { data: getCoinsApi, isLoading: isCoinsLoading } = useGetCoinsQuery()

    dispatch(setCoins({ coins: getCoinsApi?.data?.coins }))

    // News API - GET news
    const { data: newsApi, isLoading: isNewsLoading } = useGetNewsQuery({
        keyword,
        page: 1,
        pageSize: 3,
    })

    dispatch(setNews(newsApi?.articles))

    return (
        <>
            {(isCoinsLoading || isNewsLoading) && (
                <>
                    <div className="flex h-full w-full items-center justify-center">
                        <Spinner />
                    </div>
                </>
            )}

            {!isCoinsLoading && !isNewsLoading && (
                <>
                    <main className="space-y-8 2xl:flex 2xl:space-x-10 2xl:space-y-0">
                        <div className="flex flex-col justify-between space-y-6 2xl:w-2/3">
                            {/* Coin Card */}
                            <section className="space-y-4">
                                <header className="flex items-center">
                                    <h1 className="cursor-default font-header text-xl text-gray-500 dark:text-gray-100">
                                        Dashboard
                                    </h1>
                                </header>

                                <div>
                                    <CoinCard simplified />
                                </div>
                            </section>

                            {/* Coin Bar */}
                            <section className="space-y-4 rounded-3xl bg-white p-6 dark:bg-secondary 2xl:p-8 ">
                                <header className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <h1 className="cursor-default font-header text-xl text-gray-500 dark:text-gray-100">
                                            Top 15 Cryptocurrency by&nbsp;
                                            <div className="relative inline-block">
                                                <button
                                                    className="relative flex items-center text-sm text-gray-600 dark:text-white"
                                                    onClick={menuToggle}
                                                >
                                                    <span className="font-header text-xl text-gray-500 dark:text-gray-100">
                                                        {rank}
                                                    </span>

                                                    <svg
                                                        className="mx-1 h-6 w-6"
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
                                                        <ClickAwayListener
                                                            onClickAway={
                                                                menuToggle
                                                            }
                                                        >
                                                            <div className="relative">
                                                                <div className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-secondary">
                                                                    <span
                                                                        className="flex rounded-t-lg px-4 py-3 text-base text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-100 dark:hover:bg-tertiary dark:hover:text-white"
                                                                        onClick={
                                                                            sortByMarketCap
                                                                        }
                                                                    >
                                                                        MarketCap
                                                                    </span>

                                                                    <span
                                                                        className="flex rounded-b-lg px-4 py-3 text-base text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-100 dark:hover:bg-tertiary dark:hover:text-white"
                                                                        onClick={
                                                                            sortByVolume
                                                                        }
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
                                        <button className="rounded-lg p-2 font-header text-sm font-medium text-gray-500 transition-colors duration-200 dark:text-gray-300 2xl:hover:bg-gray-200 2xl:dark:hover:bg-tertiary">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
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

                                <div className="mt-6 grid grid-cols-1 gap-x-6 md:grid-cols-2 2xl:grid-cols-3">
                                    <CoinBar order={order} />
                                </div>
                            </section>
                        </div>

                        <div className="space-y-4 2xl:flex 2xl:flex-col 2xl:justify-between">
                            {/* Watchlist */}
                            <section className="space-y-4">
                                <header className="flex items-center justify-between">
                                    <h1 className="cursor-default font-header text-xl text-gray-500 dark:text-gray-100">
                                        Watchlist
                                    </h1>

                                    <button
                                        className="rounded p-2 transition-colors duration-200 dark:text-gray-300 2xl:hover:bg-gray-200 2xl:dark:hover:bg-tertiary"
                                        onClick={modalToggle}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
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
                                <header className="mt-10 flex items-center justify-between">
                                    <h1 className="cursor-default font-header text-xl text-gray-500 dark:text-gray-100">
                                        News Feed
                                    </h1>

                                    <Link to="/news">
                                        <button className="rounded-lg px-5 py-3 font-header text-sm font-medium text-gray-500 transition-colors duration-200 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-tertiary">
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
    )
}

export default Dashboard
