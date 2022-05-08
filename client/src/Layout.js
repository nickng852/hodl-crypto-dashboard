import { Outlet } from "react-router-dom";

import NavBar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="flex h-screen h-screen-ios">
        <Sidebar />
        <main className="flex flex-col w-full h-full overflow-hidden bg-gray-50 dark:bg-primary">
          <NavBar />
          <section className="h-full overflow-auto">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
};

export default Layout;
