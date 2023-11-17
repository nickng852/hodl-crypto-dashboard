import { useSelector } from 'react-redux'

import { selectCoins } from '../../features/coins/coinsSlice'

const CoinListPagination = ({ currentPage, setCurrentPage, itemsPerPage }) => {
    const coins = useSelector(selectCoins)

    const lastPage = Math.ceil(coins?.length / itemsPerPage)

    const previousPage = () => {
        // block if currentPage = firstPage
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPage = () => {
        // block if currentPage = lastPage
        if (currentPage !== lastPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <>
            <main className="flex">
                <div
                    className={`mr-2 flex transform items-center rounded-lg bg-white p-2 shadow transition-colors duration-200 dark:bg-secondary ${
                        currentPage === 1
                            ? 'cursor-auto text-gray-300 dark:text-gray-600'
                            : 'cursor-pointer text-gray-600 hover:bg-indigo-500 hover:text-white dark:text-gray-300 dark:hover:bg-indigo-500 dark:hover:text-white'
                    }`}
                    onClick={previousPage}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                <div
                    className={`
          flex transform items-center rounded-lg bg-white p-2 shadow transition-colors duration-200 dark:bg-secondary ${
              currentPage === lastPage
                  ? 'cursor-auto text-gray-300 dark:text-gray-600'
                  : 'cursor-pointer text-gray-600 hover:bg-indigo-500 hover:text-white dark:text-gray-300 dark:hover:bg-indigo-500 dark:hover:text-white'
          }`}
                    onClick={nextPage}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </main>
        </>
    )
}

export default CoinListPagination
