import { doc, updateDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectUser, setWatchList } from '../../features/auth/authSlice'
import useAuth from '../../features/auth/useAuth'
import { selectCoins } from '../../features/coins/coinsSlice'
import { db } from '../../firebase/firebase.config'
import LineChart from '../linechart/LineChart'

const WatchList = () => {
    const dispatch = useDispatch()
    const { currentUser } = useAuth()
    const user = useSelector(selectUser)
    const coins = useSelector(selectCoins)

    const filteredWatchList = []

    if (user?.watchlist !== null) {
        for (let i = 0; i < user.watchlist.length; i++) {
            filteredWatchList.push(
                coins.filter((coin) => coin.uuid.includes(user.watchlist[i]))
            )
        }
    }

    const watchlist = filteredWatchList?.flat(1) // destructure the output

    return (
        <>
            <main className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full dark:scrollbar-thumb-tertiary dark:scrollbar-track-secondary overflow-y-scroll md:h-96 md:overflow-auto">
                {watchlist?.length !== 0 ? (
                    <>
                        {watchlist?.map((result, index) => {
                            const id = result.uuid
                            const icon = result.iconUrl
                            const name = result.name
                            const symbol = result.symbol
                            const price = Number(result.price) // string returned from API
                            const priceChange = Number(result.change) // string returned from API
                            const AbsPriceChange = Math.abs(priceChange) // trim "-" for display

                            // LineChart Data
                            const chartLabel = []
                            const chartStat = []

                            for (let i = 0; i < result.sparkline?.length; i++) {
                                chartLabel.push(i) // get each index from individual array
                                chartStat.push(result.sparkline[i]) // get each array from response
                            }

                            // Remove individual item from watchlist
                            const removeItem = () => {
                                const currentItemIndex = index

                                const filteredList = user.watchlist.filter(
                                    (result, index) =>
                                        index !== currentItemIndex
                                )

                                dispatch(
                                    setWatchList((prev) => ({
                                        ...prev,
                                        filteredList,
                                    }))
                                )

                                // Add watchlist data to Firestore
                                const docData = {
                                    watchlist: filteredList,
                                }

                                updateDoc(
                                    doc(db, 'users', currentUser.uid),
                                    docData
                                )
                            }

                            return (
                                <div className="relative" key={index}>
                                    <Link to={`/coin/${id}`}>
                                        <div className="grid h-24 cursor-default grid-cols-12 md:border-b md:border-gray-200 md:dark:border-gray-700 lg:px-6 xl:hover:bg-gray-100 xl:dark:hover:bg-secondary">
                                            <div className="col-span-4 flex items-center space-x-3 2xl:space-x-6">
                                                <img
                                                    alt={name}
                                                    src={icon}
                                                    className="h-5 w-5 rounded-full 2xl:h-6 2xl:w-6"
                                                />

                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-100 2xl:text-base">
                                                    {symbol}
                                                </span>
                                            </div>

                                            <div className="col-span-3 flex items-center justify-center md:col-span-2">
                                                <div className="flex w-full items-center md:w-5/6 2xl:w-full">
                                                    <LineChart
                                                        key={index}
                                                        chartLabel={chartLabel}
                                                        chartStat={chartStat}
                                                        priceChange={
                                                            priceChange
                                                        }
                                                        watchList
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-4 flex flex-col items-center justify-center text-sm 2xl:col-span-5 2xl:text-base">
                                                <div className="w-2/3 text-right">
                                                    <div className="text-gray-700 dark:text-gray-100">
                                                        $
                                                        {`${
                                                            price < 1
                                                                ? price.toPrecision(
                                                                      4
                                                                  )
                                                                : price.toLocaleString(
                                                                      undefined,
                                                                      {
                                                                          maximumFractionDigits: 2,
                                                                      }
                                                                  )
                                                        }`}
                                                    </div>

                                                    <div
                                                        className={`${
                                                            (priceChange < 0 &&
                                                                'text-red-500') ||
                                                            (priceChange ===
                                                                0 &&
                                                                'text-gray-500') ||
                                                            (priceChange > 0 &&
                                                                'text-green-500')
                                                        } `}
                                                    >
                                                        {`${
                                                            (priceChange < 0 &&
                                                                '-' +
                                                                    AbsPriceChange.toFixed(
                                                                        2
                                                                    ) +
                                                                    '%') ||
                                                            (priceChange ===
                                                                0 &&
                                                                AbsPriceChange.toFixed(
                                                                    2
                                                                ) + '%') ||
                                                            (priceChange > 0 &&
                                                                '+' +
                                                                    AbsPriceChange.toFixed(
                                                                        2
                                                                    ) +
                                                                    '%')
                                                        }`}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <button
                                        className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-auto rounded py-3 transition-colors duration-200 dark:text-gray-300 2xl:p-3 2xl:hover:bg-gray-200 2xl:dark:hover:bg-tertiary"
                                        onClick={removeItem}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )
                        })}
                    </>
                ) : (
                    <>
                        <div className="flex h-24 items-center justify-center md:h-full md:overflow-auto">
                            <div className="cursor-default text-gray-600 dark:text-gray-500 2xl:text-xl">
                                Your watchlist will be displayed here.
                            </div>
                        </div>
                    </>
                )}
            </main>
        </>
    )
}

export default WatchList
