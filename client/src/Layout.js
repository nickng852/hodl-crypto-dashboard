import { Outlet } from "react-router-dom";

import NavBar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <main className="flex flex-col w-full overflow-hidden justify-items-center bg-gray-50 dark:bg-primary">
          <NavBar />
          <section className="h-full overflow-hidden">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
};

export default Layout;
