import SearchBar from "../searchbar/SearchBar.jsx";
import NavControl from "../panel/NavControl.jsx";
import Menu from "../Menu.jsx";

const NavBar = () => {
  return (
    <>
      <div className="z-10">
        <nav className="flex items-center justify-between w-full px-4 py-3 bg-white shadow 2xl:shadow-none lg:p-4 xl:justify-end dark:bg-secondary">
          <Menu />
          <SearchBar />

          <NavControl />
        </nav>
      </div>
    </>
  );
};

export default NavBar;
