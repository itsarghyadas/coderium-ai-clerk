import React from "react";
import { useUser } from "@clerk/clerk-react";
import DarkModeToggle from "../DarkModeToggle";
import "../../CSS/chatnav.css";
import { useClerk } from "@clerk/clerk-react";

const ChatSettingsNav = () => {
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
    <div className="chatSetting-navbar-parent">
      <nav className="chatSetting-navbar__container">
        <div className="chatSetting-navbar__links flex items-center justify-center space-x-5">
          <DarkModeToggle />
        </div>

        <div className="chatSetting-navbar__links">
          <div className="profile-menu flex space-x-2 rounded-full bg-slate-800 py-1 pl-3 pr-1 text-base font-semibold text-white ring ring-lime-500">
            <SignOutButton />
            <img
              className="h-6 w-6 rounded-full"
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
