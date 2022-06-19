import { useState } from "react";

import { useDispatch } from "react-redux";
import { setCoins } from "../features/coins/coinsSlice";

import Spinner from "../components/loader/Spinner.jsx";
import CoinList from "../components/coinlist/CoinList.jsx";
import CoinListPagination from "../components/coinlist/CoinListPagination.jsx";

import { useGetCoinsQuery } from "../services/cryptoApi";

const CoinsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const dispatch = useDispatch();

  // Coinranking API call - GET coins
  const { data: getCoinsApi, isFetching: isCoinsFetching } = useGetCoinsQuery();

  dispatch(setCoins({ coins: getCoinsApi?.data?.coins }));

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
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <h1 className="text-xl text-gray-500 cursor-default dark:text-gray-100 font-header">
                Cryptocurrency
              </h1>

              <div>
                <CoinListPagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                />
              </div>
            </div>

            <div className="mt-6">
              <CoinList currentPage={currentPage} itemsPerPage={itemsPerPage} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CoinsPage;
