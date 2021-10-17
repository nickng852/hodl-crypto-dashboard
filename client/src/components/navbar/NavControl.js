import React from "react";
import Avatar from "../button/Avatar";
import ThemeSwticher from "../button/ThemeSwticher";

const NavControl = ({ user, open, setOpen, setIsLogged }) => {
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
                      {user.email}
                    </span>
                    <ThemeSwticher />
                    <Avatar
                      open={open}
                      setOpen={setOpen}
                      setIsLogged={setIsLogged}
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
