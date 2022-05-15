const TimePeriodBar = ({ timePeriod, setTimePeriod }) => {
  return (
    <>
      <div className="flex p-1 space-x-2 bg-gray-200 rounded-lg dark:bg-secondary">
        <button
          className={`
                      px-2 py-1 h-8 2xl:h-10  2xl:px-4 2xl:py-2 -mb-px text-xs 2xl:text-sm text-center uppercase bg-transparent rounded-lg dark:text-white xl:dark:hover:bg-gray-700 xl:hover:bg-gray-50 whitespace-nowrap focus:outline-none ${
                        timePeriod === "3h"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
          onClick={() => setTimePeriod("3h")}
        >
          3h
        </button>

        <button
          className={`
                      px-2 py-1 h-8 2xl:h-10 2xl:px-4 2xl:py-2 -mb-px text-xs 2xl:text-sm text-center uppercase bg-transparent rounded-lg dark:text-white xl:dark:hover:bg-gray-700 xl:hover:bg-gray-50 whitespace-nowrap focus:outline-none ${
                        timePeriod === "24h"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
          onClick={() => setTimePeriod("24h")}
        >
          24h
        </button>

        <button
          className={`
                      px-2 py-1 h-8 2xl:h-10 2xl:px-4 2xl:py-2 -mb-px text-xs 2xl:text-sm text-center uppercase bg-transparent rounded-lg dark:text-white xl:dark:hover:bg-gray-700 xl:hover:bg-gray-50 whitespace-nowrap focus:outline-none ${
                        timePeriod === "7d"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
          onClick={() => setTimePeriod("7d")}
        >
          7d
        </button>

        <button
          className={`
                      px-2 py-1 h-8 2xl:h-10 2xl:px-4 2xl:py-2 -mb-px text-xs 2xl:text-sm text-center uppercase bg-transparent rounded-lg dark:text-white xl:dark:hover:bg-gray-700 xl:hover:bg-gray-50 whitespace-nowrap focus:outline-none ${
                        timePeriod === "30d"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
          onClick={() => setTimePeriod("30d")}
        >
          30d
        </button>

        <button
          className={`
                      px-2 py-1 h-8 2xl:h-10 2xl:px-4 2xl:py-2 -mb-px text-xs 2xl:text-sm text-center uppercase bg-transparent rounded-lg dark:text-white xl:dark:hover:bg-gray-700 xl:hover:bg-gray-50 whitespace-nowrap focus:outline-none ${
                        timePeriod === "3m"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
          onClick={() => setTimePeriod("3m")}
        >
          3m
        </button>

        <button
          className={`
                      px-2 py-1 h-8 2xl:h-10 2xl:px-4 2xl:py-2 -mb-px text-xs 2xl:text-sm text-center uppercase bg-transparent rounded-lg dark:text-white xl:dark:hover:bg-gray-700 xl:hover:bg-gray-50  whitespace-nowrap focus:outline-none ${
                        timePeriod === "1y"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
          onClick={() => setTimePeriod("1y")}
        >
          1y
        </button>

        <button
          className={`
                     px-2 py-1 h-8 2xl:h-10 2xl:px-4 2xl:py-2 -mb-px text-xs 2xl:text-sm text-center uppercase bg-transparent rounded-lg dark:text-white xl:dark:hover:bg-gray-700 xl:hover:bg-gray-50 whitespace-nowrap focus:outline-none ${
                       timePeriod === "3y"
                         ? "bg-white dark:bg-gray-700"
                         : "dark:hover:bg-gray-700 hover:bg-gray-50"
                     }`}
          onClick={() => setTimePeriod("3y")}
        >
          3y
        </button>

        <button
          className={`
                      px-2 py-1 h-8 2xl:h-10 2xl:px-4 2xl:py-2 -mb-px text-xs 2xl:text-sm text-center uppercase bg-transparent rounded-lg dark:text-white xl:dark:hover:bg-gray-700 xl:hover:bg-gray-50 whitespace-nowrap focus:outline-none ${
                        timePeriod === "5y"
                          ? "bg-white dark:bg-gray-700"
                          : "dark:hover:bg-gray-700 hover:bg-gray-50"
                      }`}
          onClick={() => setTimePeriod("5y")}
        >
          5y
        </button>
      </div>
    </>
  );
};

export default TimePeriodBar;
