import { Outlet } from "react-router-dom";

import NavBar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="absolute inset-0 flex">
        <Sidebar />
        <main className="flex flex-col w-full h-full overflow-hidden bg-gray-50 dark:bg-primary">
          <NavBar />

          <div className="h-full p-4 overflow-auto sm:p-8 md:p-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full dark:scrollbar-thumb-tertiary dark:scrollbar-track-secondary">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
