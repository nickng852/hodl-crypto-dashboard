import SearchBar from "../searchbar/SearchBar.jsx";
import NavControl from "../panel/NavControl.jsx";
import Menu from "../Menu.jsx";

const NavBar = () => {
  return (
    <>
      <div className="z-10">
        <nav className="flex items-center justify-between w-full p-4 bg-white xl:justify-end 2xl:w-auto dark:bg-secondary">
          <Menu />
          <SearchBar />

          <NavControl />
        </nav>
      </div>
    </>
  );
};

export default NavBar;
