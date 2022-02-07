import React from "react";

// Components
import Spinner from "../../components/loader/Spinner";
import CoinList from "../../components/coinlist/CoinList";

// Services
import { useGetCoinsQuery } from "../../services/cryptoApi";

const CoinsInfo = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  // Coinranking API call
  const { data: coinrankingApi, isFetching: isCoinsFetching } =
    useGetCoinsQuery();

  const coins = coinrankingApi?.data?.coins;

  return (
    <>
      {isCoinsFetching && (
        <>
          <div className="flex items-center justify-center h-screen">
            <Spinner />
          </div>
        </>
      )}
      {!isCoinsFetching && (
        <>
          <div className="flex flex-col h-full">
            <div className="flex flex-col w-2/3 px-16">
              <div>
                <div className="flex items-center justify-between mt-10">
                  <h1 className="text-2xl text-gray-500 cursor-default dark:text-white font-header">
                    Cryptocurrency
                  </h1>
                </div>
                <div className="mt-6">
                  <CoinList
                    coins={coins}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
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
