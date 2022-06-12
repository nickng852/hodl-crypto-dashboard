import { Outlet } from "react-router-dom";

import NavBar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex flex-col w-full h-full overflow-hidden bg-gray-50 dark:bg-primary">
          <NavBar />

          <section className="h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full dark:scrollbar-thumb-tertiary dark:scrollbar-track-secondary">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
};

export default Layout;
