// Components
import SearchBar from "../searchbar/SearchBar.jsx";
import NavControl from "../panel/NavControl.jsx";
import Menu from "../Menu.jsx";
import { Link } from "react-router-dom";

const NavBar = ({ setToken, user, setUser, setIsLogged }) => {
  return (
    <>
      <div className="z-10">
        <nav className="static flex items-center justify-between w-full p-4 bg-white 2xl:w-auto dark:bg-secondary">
          <Menu />
          <SearchBar />
          <Link
            className="text-gray-700 md:d-flex d-none dark:text-white"
            to="/dashboard"
          >
            HODL
          </Link>
          <NavControl
            setToken={setToken}
            user={user}
            setUser={setUser}
            setIsLogged={setIsLogged}
          />
        </nav>
      </div>
    </>
  );
};

export default NavBar;
