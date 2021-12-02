import React from "react";
import CoinList from "../../components/coinlist/CoinList";

const CoinCollection = ({
  coins,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  return (
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
  );
};

export default CoinCollection;
