import millify from 'millify'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectCoins } from '../../features/coins/coinsSlice'

const CoinList = ({ currentPage, itemsPerPage }) => {
    const coins = useSelector(selectCoins)

    // get each page's items by slicing the response array
    const lastItem = currentPage * itemsPerPage

    const firstItem = lastItem - itemsPerPage

    const currentItems = coins.slice(firstItem, lastItem)

    return (
        <div className="overflow-x-auto">
            <div className="inline-block min-w-full overflow-hidden rounded-xl shadow">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-700">
                            <th
                                scope="col"
                                className="bg-white px-5 py-4 text-left text-sm font-normal text-gray-900 dark:bg-secondary dark:text-white 2xl:px-8 2xl:py-4 2xl:text-base"
                            >
                                Coin Name
                            </th>

                            <th
                                scope="col"
                                className="bg-white px-5 py-4 text-right text-sm font-normal text-gray-900 dark:bg-secondary dark:text-white 2xl:px-8 2xl:py-4 2xl:text-base"
                            >
                                Price
                            </th>

                            <th
                                scope="col"
                                className="bg-white px-5 py-4 text-right text-sm font-normal text-gray-900 dark:bg-secondary dark:text-white 2xl:px-8 2xl:py-4 2xl:text-base"
                            >
                                Market Cap
                            </th>

                            <th
                                scope="col"
                                className="bg-white px-5 py-4 text-right text-sm font-normal text-gray-900 dark:bg-secondary dark:text-white 2xl:px-8 2xl:py-4 2xl:text-base"
                            >
                                Volume(24h)
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {currentItems?.map((result, index) => {
                            const id = result.uuid
                            const icon = result.iconUrl
                            const name = result.name
                            const symbol = result.symbol
                            const price = Number(result.price) // string returned from API
                            const marketCap = Number(result.marketCap) // string returned from API
                            const volume = Number(result['24hVolume']) // string returned from API

                            return (
                                <tr key={index}>
                                    <td className="w-2/5 bg-white px-5 py-7 text-base dark:bg-secondary 2xl:px-8">
                                        <Link to={`/coin/${id}`}>
                                            <div className="flex shrink-0 items-center space-x-5">
                                                <div className="flex shrink-0">
                                                    <img
                                                        alt={crypto}
                                                        src={icon}
                                                        className="mx-auto h-5 w-5 rounded-full object-cover 2xl:h-6 2xl:w-6"
                                                    />
                                                </div>

                                                <div className="flex flex-col">
                                                    <div className="whitespace-no-wrap text-sm font-medium text-gray-900 dark:text-gray-100 2xl:text-base">
                                                        {name}
                                                    </div>

                                                    <span className="truncate rounded-md text-xs text-gray-600 dark:text-gray-400 ">
                                                        {symbol}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>

                                    <td className="w-1/5 bg-white px-5 py-7 text-right dark:bg-secondary dark:text-white 2xl:px-8">
                                        <div className="whitespace-no-wrap text-sm text-gray-900 dark:text-gray-100 2xl:text-base">
                                            $
                                            {`${
                                                price < 1
                                                    ? price.toPrecision(4)
                                                    : price.toLocaleString(
                                                          undefined,
                                                          {
                                                              maximumFractionDigits: 2,
                                                          }
                                                      )
                                            }`}
                                        </div>
                                    </td>

                                    <td className="w-1/5 bg-white px-5 py-7 text-right dark:bg-secondary dark:text-white 2xl:px-8">
                                        <div className="whitespace-no-wrap text-sm text-gray-900 dark:text-gray-100 2xl:text-base">
                                            $
                                            {millify(marketCap, {
                                                precision: 2,
                                            })}
                                        </div>
                                    </td>

                                    <td className="w-1/5 bg-white px-5 py-7 text-right dark:bg-secondary dark:text-white 2xl:px-8">
                                        <div className="whitespace-no-wrap text-sm text-gray-900 dark:text-gray-100 2xl:text-base">
                                            ${millify(volume, { precision: 2 })}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CoinList
