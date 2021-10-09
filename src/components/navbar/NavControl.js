import React from "react";
import Avatar from "../button/Avatar";
import ThemeSwticher from "../button/ThemeSwticher";

const NavControl = ({ open, setOpen }) => {
  return (
    <>
      <div className="px-8">
        <div className="flex items-center justify-between h-16">
          <div className="block">
            <div className="flex items-center ml-4 md:ml-6">
              <div className="relative ml-3">
                <div className="relative inline-block text-left">
                  <div className="flex">
                    <ThemeSwticher />
                    <Avatar open={open} setOpen={setOpen} />
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
