import Profile from "./Profile.jsx";
import ThemeSwticher from "./ThemeSwticher.jsx";

const NavControl = ({ setToken, user, setUser, setIsLogged }) => {
  return (
    <>
      <section className="relative max-w-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <ThemeSwticher />
            </div>
            <div>
              <Profile
                setToken={setToken}
                user={user}
                setUser={setUser}
                setIsLogged={setIsLogged}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NavControl;
