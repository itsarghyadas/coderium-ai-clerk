import React from "react";
import { useUser } from "@clerk/clerk-react";
import DarkModeToggle from "../DarkModeToggle";
import "../../CSS/chatnav.css";
import { useClerk } from "@clerk/clerk-react";
import { AiOutlineSetting, AiOutlineCloseCircle } from "react-icons/ai";

const ChatSettingsNav = ({ isMobileMenuOpen, handleMobileMenuToggle }) => {
  const { user } = useUser();

  const SignOutButton = () => {
    const { signOut } = useClerk();
    return <button onClick={() => signOut()}>Sign out</button>;
  };

  let userProfileImage = "";

  if (user) {
    userProfileImage = user?.profileImageUrl;
  }

  return (
    <div className="chatSetting-navbar-parent border-b border-dashed border-slate-300 px-[30px] py-[9px] shadow-sm xl:py-[10px]">
      <nav className="chatSetting-navbar__container">
        <div className="chatSetting-navbar__links flex items-center justify-center space-x-5">
          <AiOutlineSetting
            className={`text-2xl text-slate-900 focus:outline-none active:scale-110 xl:hidden ${
              isMobileMenuOpen ? "rotate--360" : "rotate-360"
            }`}
            onClick={handleMobileMenuToggle}
          />
        </div>

        <div className="chatSetting-navbar__links">
          <div className="profile-menu flex rounded-full bg-slate-800 text-base font-semibold text-white shadow drop-shadow">
            {/* <SignOutButton /> */}
            <img
              className="h-8 w-8 rounded-full"
              src={user.profileImageUrl}
              alt=""
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ChatSettingsNav;
