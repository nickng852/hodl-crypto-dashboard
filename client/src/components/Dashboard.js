import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Dashboard = ({ coins, search, setSearch, open, setOpen }) => {
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
        />
      </div>
    </>
  );
};

export default Dashboard;
