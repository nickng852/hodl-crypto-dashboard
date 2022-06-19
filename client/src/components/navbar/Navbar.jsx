import Slidebar from "../sidebar/Slidebar.jsx";
import SearchBar from "../searchbar/SearchBar.jsx";
import NavControl from "../panel/NavControl.jsx";

const NavBar = () => {
  return (
    <>
      <main className="z-10">
        <nav className="flex items-center justify-between w-full px-4 py-3 bg-white shadow-sm 2xl:shadow-none lg:p-4 xl:justify-end dark:bg-secondary">
          <Slidebar />
          <SearchBar />
          <NavControl />
        </nav>
      </main>
    </>
  );
};

export default NavBar;
