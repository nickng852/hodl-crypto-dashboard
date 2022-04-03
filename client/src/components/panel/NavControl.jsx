import Profile from "./Profile.jsx";
import ThemeSwticher from "./ThemeSwticher.jsx";

const NavControl = () => {
  return (
    <>
      <section className="relative max-w-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div>
              <ThemeSwticher />
            </div>
            <div>
              <Profile />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NavControl;
