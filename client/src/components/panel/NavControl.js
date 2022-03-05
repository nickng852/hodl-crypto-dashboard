import Profile from "../panel/Profile";
import ThemeSwticher from "../panel/ThemeSwticher";

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
