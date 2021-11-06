import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Dashboard = ({
  user,
  coins,
  search,
  setSearch,
  open,
  setOpen,
  setIsLogged,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  chart,
  setChart,
}) => {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <Main
          user={user}
          coins={coins}
          search={search}
          setSearch={setSearch}
          open={open}
          setOpen={setOpen}
          setIsLogged={setIsLogged}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          chart={chart}
          setChart={setChart}
        />
      </div>
    </>
  );
};

export default Dashboard;
