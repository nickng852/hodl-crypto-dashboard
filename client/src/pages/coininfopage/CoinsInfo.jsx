import { useState } from "react";

// Components
import Spinner from "../../components/loader/Spinner.jsx";
import CoinList from "../../components/coinlist/CoinList.jsx";
import CoinListPagination from "../../components/coinlist/CoinListPagination.jsx";

// Services
import { useGetCoinsQuery } from "../../services/cryptoApi";

const CoinsInfo = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Coinranking API call
  const { data: getCoinsApi, isFetching: isCoinsFetching } = useGetCoinsQuery();

  const coins = getCoinsApi?.data?.coins;

  return (
    <>
      {isCoinsFetching && (
        <>
          <div className="flex items-center justify-center h-full">
            <Spinner />
          </div>
        </>
      )}

      {!isCoinsFetching && (
        <>
          <div className="flex flex-col h-full">
            <div className="flex flex-col w-full px-16">
              <div>
                <div className="flex items-center justify-between mt-10">
                  <h1 className="text-2xl text-gray-500 cursor-default dark:text-white font-header">
                    Cryptocurrency
                  </h1>

                  <div>
                    <CoinListPagination
                      coins={coins}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <CoinList
                    coins={coins}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CoinsInfo;
