import { Outlet } from "react-router-dom";

import NavBar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="flex min-h-full">
        <Sidebar />
        <main className="flex flex-col w-full h-full">
          <NavBar />
          <div className="absolute inset-0 bg-gray-50 dark:bg-primary">
            <section className="h-full mt-16 overflow-auto lg:mt-0 lg:pt-24 2xl:pt-16 xl:pl-24 bg-gray-50 dark:bg-primary scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full dark:scrollbar-thumb-tertiary dark:scrollbar-track-secondary">
              <Outlet />
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
