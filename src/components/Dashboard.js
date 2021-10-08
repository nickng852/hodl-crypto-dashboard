import React from "react";
/* import Sidebar from "./Sidebar"; */
import Main from "./Main";

const Dashboard = ({ coins, search, setSearch }) => {
  return (
    <>
      {/*       <Sidebar /> */}
      <Main coins={coins} search={search} setSearch={setSearch} />
    </>
  );
};

export default Dashboard;
