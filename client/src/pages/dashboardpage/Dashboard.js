import React from "react";
import { Link } from "react-router-dom";
import CoinCard from "../../components/coincard/CoinCard";
import CoinList from "../../components/coinlist/CoinList";

const HomePage = ({
  coins,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-col w-4/5 px-16 ">
          <div>
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-2xl text-gray-500 font-header">Dashboard</h1>
            </div>
            <div className="mt-6">
              <CoinCard coins={coins} simplified />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mt-10">
              <h1 className="text-2xl text-gray-500 font-header">
                Cryptocurrency
              </h1>
              <Link to="/cryptocurrencies">
                <h1 className="p-4 text-sm font-bold text-gray-400 uppercase font-header">
                  View more
                </h1>
              </Link>
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

        <div className="w-1/5 bg-red-300">
          <h1>test</h1>
        </div>
      </div>
    </>
  );
};

export default HomePage;
