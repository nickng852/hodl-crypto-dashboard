const TimePeriodBar = ({ timePeriod, setTimePeriod }) => {
    return (
        <div className="flex gap-2 rounded-lg bg-gray-200 p-1 dark:bg-secondary">
            <button
                className={`
                      bg-transparent -mb-px h-8 whitespace-nowrap  rounded-lg px-2 py-1 text-center text-xs uppercase focus:outline-none dark:text-white xl:hover:bg-gray-50 xl:dark:hover:bg-gray-700 2xl:h-10 2xl:px-4 2xl:py-2 2xl:text-sm ${
                          timePeriod === '3h'
                              ? 'bg-white dark:bg-gray-700'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                onClick={() => setTimePeriod('3h')}
            >
                3h
            </button>

            <button
                className={`
                      bg-transparent -mb-px h-8 whitespace-nowrap rounded-lg px-2 py-1 text-center text-xs uppercase focus:outline-none dark:text-white xl:hover:bg-gray-50 xl:dark:hover:bg-gray-700 2xl:h-10 2xl:px-4 2xl:py-2 2xl:text-sm ${
                          timePeriod === '24h'
                              ? 'bg-white dark:bg-gray-700'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                onClick={() => setTimePeriod('24h')}
            >
                24h
            </button>

            <button
                className={`
                      bg-transparent -mb-px h-8 whitespace-nowrap rounded-lg px-2 py-1 text-center text-xs uppercase focus:outline-none dark:text-white xl:hover:bg-gray-50 xl:dark:hover:bg-gray-700 2xl:h-10 2xl:px-4 2xl:py-2 2xl:text-sm ${
                          timePeriod === '7d'
                              ? 'bg-white dark:bg-gray-700'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                onClick={() => setTimePeriod('7d')}
            >
                7d
            </button>

            <button
                className={`
                      bg-transparent -mb-px h-8 whitespace-nowrap rounded-lg px-2 py-1 text-center text-xs uppercase focus:outline-none dark:text-white xl:hover:bg-gray-50 xl:dark:hover:bg-gray-700 2xl:h-10 2xl:px-4 2xl:py-2 2xl:text-sm ${
                          timePeriod === '30d'
                              ? 'bg-white dark:bg-gray-700'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                onClick={() => setTimePeriod('30d')}
            >
                30d
            </button>

            <button
                className={`
                      bg-transparent -mb-px h-8 whitespace-nowrap rounded-lg px-2 py-1 text-center text-xs uppercase focus:outline-none dark:text-white xl:hover:bg-gray-50 xl:dark:hover:bg-gray-700 2xl:h-10 2xl:px-4 2xl:py-2 2xl:text-sm ${
                          timePeriod === '3m'
                              ? 'bg-white dark:bg-gray-700'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                onClick={() => setTimePeriod('3m')}
            >
                3m
            </button>

            <button
                className={`
                      bg-transparent -mb-px h-8 whitespace-nowrap rounded-lg px-2 py-1 text-center text-xs uppercase focus:outline-none dark:text-white xl:hover:bg-gray-50 xl:dark:hover:bg-gray-700 2xl:h-10 2xl:px-4  2xl:py-2 2xl:text-sm ${
                          timePeriod === '1y'
                              ? 'bg-white dark:bg-gray-700'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                onClick={() => setTimePeriod('1y')}
            >
                1y
            </button>

            <button
                className={`
                     bg-transparent -mb-px h-8 whitespace-nowrap rounded-lg px-2 py-1 text-center text-xs uppercase focus:outline-none dark:text-white xl:hover:bg-gray-50 xl:dark:hover:bg-gray-700 2xl:h-10 2xl:px-4 2xl:py-2 2xl:text-sm ${
                         timePeriod === '3y'
                             ? 'bg-white dark:bg-gray-700'
                             : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                     }`}
                onClick={() => setTimePeriod('3y')}
            >
                3y
            </button>

            <button
                className={`
                      bg-transparent -mb-px h-8 whitespace-nowrap rounded-lg px-2 py-1 text-center text-xs uppercase focus:outline-none dark:text-white xl:hover:bg-gray-50 xl:dark:hover:bg-gray-700 2xl:h-10 2xl:px-4 2xl:py-2 2xl:text-sm ${
                          timePeriod === '5y'
                              ? 'bg-white dark:bg-gray-700'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                onClick={() => setTimePeriod('5y')}
            >
                5y
            </button>
        </div>
    )
}

export default TimePeriodBar
