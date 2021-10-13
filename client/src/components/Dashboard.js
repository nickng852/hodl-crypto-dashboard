import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Dashboard = ({
  coins,
  search,
  setSearch,
  open,
  setOpen,
  setIsLogged,
}) => {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <Main
          coins={coins}
          search={search}
          setSearch={setSearch}
          open={open}
          setOpen={setOpen}
          setIsLogged={setIsLogged}
        />
      </div>
    </>
  );
};

export default Dashboard;
