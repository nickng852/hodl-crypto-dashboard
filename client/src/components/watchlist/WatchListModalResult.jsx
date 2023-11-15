import { doc, updateDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'

import { selectUser } from '../../features/auth/authSlice'
import useAuth from '../../features/auth/useAuth'
import { db } from '../../firebase/firebase.config'

const WatchListModalResult = ({
    id,
    icon,
    name,
    symbol,
    setWatchListSearch,
}) => {
    const { currentUser } = useAuth()
    const user = useSelector(selectUser)

    // Add individual item to watchlist
    const addItem = () => {
        // block duplicate insert

        const isDuplicated = user.watchlist.includes(id)

        if (!isDuplicated) {
            // Add watchlist data to Firestore
            const docData = {
                watchlist: [...user.watchlist, id],
            }

            updateDoc(doc(db, 'users', currentUser.uid), docData)

            setWatchListSearch('')
        }
    }

    return (
        <>
            <main
                key={id}
                className="flex cursor-default justify-between px-5 py-4 xl:hover:bg-gray-50 xl:dark:hover:bg-tertiary 2xl:px-6"
                onClick={addItem}
            >
                <div className="w-full">
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-100 2xl:font-medium">
                        {name}
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400 2xl:text-sm">
                        {symbol}
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <img
                        src={icon}
                        alt={name}
                        className="h-5 w-5 rounded-full 2xl:h-7 2xl:w-7"
                    />
                </div>
            </main>
        </>
    )
}

export default WatchListModalResult
