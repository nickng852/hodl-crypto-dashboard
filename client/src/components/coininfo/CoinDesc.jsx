import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

import { selectCoin } from '../../features/coins/coinsSlice'

const CoinDesc = () => {
    const coin = useSelector(selectCoin)

    const description = coin?.description

    return (
        <>
            <div className="rounded-2xl bg-white p-6 text-sm dark:bg-secondary dark:text-gray-100 2xl:text-base">
                {parse(description)}
            </div>
        </>
    )
}

export default CoinDesc
