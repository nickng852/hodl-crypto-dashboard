import { useState } from 'react'
import { useDispatch } from 'react-redux'

import CoinList from '../components/coinlist/CoinList.jsx'
import CoinListPagination from '../components/coinlist/CoinListPagination.jsx'
import Spinner from '../components/loader/Spinner.jsx'
import { setCoins } from '../features/coins/coinsSlice'
import { useGetCoinsQuery } from '../services/cryptoApi'

const CoinsPage = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 10

    const dispatch = useDispatch()

    // Coinranking API call - GET coins
    const { data: getCoinsApi, isLoading: isCoinsLoading } = useGetCoinsQuery()

    dispatch(setCoins({ coins: getCoinsApi?.data?.coins }))

    return (
        <section className="flex min-h-full flex-col gap-4 2xl:gap-6">
            <header className="flex items-center justify-between">
                <h1 className="cursor-default font-header text-xl text-gray-500 dark:text-gray-100">
                    Cryptocurrency
                </h1>

                <CoinListPagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                />
            </header>

            <div className="flex flex-grow">
                {isCoinsLoading && (
                    <div className="flex flex-1 items-center justify-center">
                        <Spinner />
                    </div>
                )}

                {!isCoinsLoading && (
                    <>
                        <div className="w-full">
                            <CoinList
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default CoinsPage
