import React, { useState } from "react";
import Profile from "../panel/Profile";
import ThemeSwticher from "../panel/ThemeSwticher";

const NavControl = ({ setToken, user, setUser, setIsLogged, setCoins }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="px-8">
        <div className="flex items-center justify-between h-16">
          <div className="block">
            <div className="flex items-center ml-4 md:ml-6">
              <div className="relative ml-3">
                <div className="relative inline-block text-left">
                  <div className="flex items-center">
                    <span className="px-6 text-gray-600 dark:text-gray-400">
                      {user.name}
                    </span>
                    <ThemeSwticher />
                    <Profile
                      setToken={setToken}
                      setUser={setUser}
                      setIsLogged={setIsLogged}
                      setCoins={setCoins}
                      menuOpen={menuOpen}
                      setMenuOpen={setMenuOpen}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavControl;
