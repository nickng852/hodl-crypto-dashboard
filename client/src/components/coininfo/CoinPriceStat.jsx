import moment from 'moment'
import { useSelector } from 'react-redux'

import { selectCoin } from '../../features/coins/coinsSlice'

const CoinPriceStat = () => {
    const coin = useSelector(selectCoin)

    const name = coin?.name
    const symbol = coin?.symbol
    const price = Number(coin?.price) // string returned from API
    const marketCap = Number(coin?.marketCap) // string returned from API
    const volume = Number(coin?.['24hVolume']) // string returned from API
    const allTimeHighPrice = Number(coin?.allTimeHigh?.price) // string returned from API
    const allTimeHighDate = moment
        .unix(coin?.allTimeHigh?.timestamp)
        .format('YYYY/MM/DD')

    return (
        <>
            <main className="flex flex-col rounded-2xl bg-white p-6 dark:bg-secondary dark:text-gray-100">
                <div className="text-base font-bold 2xl:text-xl">
                    {symbol} Price Statistics
                </div>

                <div className="border-b border-gray-200 py-2 text-xs text-gray-400 dark:border-gray-700 dark:text-gray-500 2xl:text-sm">
                    {name} Price Today
                </div>

                <div className="flex justify-between border-b border-gray-200 py-4 text-sm dark:border-gray-700 2xl:text-base">
                    <div>{name} Price</div>

                    <div>
                        $
                        {`${
                            price < 1
                                ? price.toPrecision(4)
                                : price.toLocaleString(undefined, {
                                      maximumFractionDigits: 2,
                                  })
                        }`}
                    </div>
                </div>

                <div className="flex items-center justify-between border-b border-gray-200 py-4 text-right text-sm dark:border-gray-700 2xl:text-base">
                    <div>All Time High</div>

                    <div>
                        <div>
                            $
                            {`${
                                allTimeHighPrice < 1
                                    ? allTimeHighPrice.toPrecision(4)
                                    : allTimeHighPrice.toLocaleString(
                                          undefined,
                                          {
                                              maximumFractionDigits: 2,
                                          }
                                      )
                            }`}
                        </div>

                        <div className="text-gray-400 dark:text-gray-500">
                            ({allTimeHighDate})
                        </div>
                    </div>
                </div>

                <div className="flex justify-between border-b border-gray-200 py-4 text-sm dark:border-gray-700 2xl:text-base">
                    <div>Volume</div>

                    <div>${volume.toLocaleString()}</div>
                </div>

                <div className="flex justify-between py-4 text-sm 2xl:text-base">
                    <div>Market Cap</div>

                    <div> ${marketCap.toLocaleString()}</div>
                </div>
            </main>
        </>
    )
}

export default CoinPriceStat
