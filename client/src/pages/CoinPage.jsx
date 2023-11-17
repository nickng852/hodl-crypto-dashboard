import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import CoinDesc from '../components/coininfo/CoinDesc.jsx'
import CoinIntro from '../components/coininfo/CoinIntro.jsx'
import CoinPriceStat from '../components/coininfo/CoinPriceStat.jsx'
import TimePeriodBar from '../components/coininfo/TimePeriodBar.jsx'
import LineChart from '../components/linechart/LineChart'
import Spinner from '../components/loader/Spinner.jsx'
import { setCoin, setCoinPriceHistory } from '../features/coins/coinsSlice'
import {
    useGetCoinQuery,
    useGetCoinPriceHistoryQuery,
} from '../services/cryptoApi'

const CoinPage = () => {
    const [timePeriod, setTimePeriod] = useState('24h')

    const { uuid } = useParams()

    const dispatch = useDispatch()

    // Coinranking API call - GET coin
    const { data: getCoinApi, isLoading: isCoinLoading } = useGetCoinQuery(uuid)

    dispatch(setCoin({ coin: getCoinApi?.data?.coin }))

    // Coinranking API - GET coin price history
    const {
        data: getCoinPriceHistoryApi,
        isLoading: isCoinPriceHistoryLoading,
    } = useGetCoinPriceHistoryQuery({ uuid, timePeriod })

    const response = getCoinPriceHistoryApi?.data?.history

    const unflattedCoinPriceHistory = []

    if (response) {
        const reversedCoinPriceHistory = [...response].reverse()

        unflattedCoinPriceHistory.push(reversedCoinPriceHistory)
    }

    const coinPriceHistory = unflattedCoinPriceHistory.flat(1)

    dispatch(setCoinPriceHistory({ coinPriceHistory: coinPriceHistory }))

    // Chart.js
    const chartLabel = []
    const chartStat = []

    return (
        <>
            {isCoinLoading && (
                <div className="flex h-full items-center justify-center">
                    <Spinner />
                </div>
            )}

            {!isCoinLoading && (
                <div className="grid gap-4 sm:gap-10 xl:grid-cols-2 2xl:grid-cols-3 2xl:gap-20">
                    <div className="col-span-1 w-full space-y-8 2xl:col-span-2">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <CoinIntro />

                            <div className="flex justify-end">
                                <TimePeriodBar
                                    timePeriod={timePeriod}
                                    setTimePeriod={setTimePeriod}
                                />
                            </div>
                        </div>

                        <div className="flex h-72 w-full items-center justify-center xl:h-116 2xl:h-132">
                            {isCoinPriceHistoryLoading ? (
                                <>
                                    <Spinner />
                                </>
                            ) : (
                                <LineChart
                                    chartLabel={chartLabel}
                                    chartStat={chartStat}
                                    coinInfo
                                />
                            )}
                        </div>
                    </div>

                    <div className="col-span-1 flex w-full flex-col space-y-4 p-1 2xl:space-y-10">
                        <CoinPriceStat />
                        <CoinDesc />
                    </div>
                </div>
            )}
        </>
    )
}

export default CoinPage
