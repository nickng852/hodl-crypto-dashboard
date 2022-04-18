import SearchBar from "../searchbar/SearchBar.jsx";
import NavControl from "../panel/NavControl.jsx";

const NavBar = () => {
  return (
    <>
      <div className="z-10">
        <nav className="flex items-center justify-end w-full p-4 bg-white 2xl:w-auto dark:bg-secondary">
          {/*           <Menu /> */}
          <SearchBar />
          <NavControl />
        </nav>
      </div>
    </>
  );
};

export default NavBar;
