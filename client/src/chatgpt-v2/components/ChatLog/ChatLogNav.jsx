import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineSetting, AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";
import ChatSettingsNav from "../ChatSettings/ChatSettingsNav";
import ChatAdvancedItems from "../ChatSettings/ChatAdvancedItems";
import "../../CSS/chatapp.css";
import "../../CSS/chatnav.css";
import SideMenuItem from "../SideMenuItem";

function ChatLogNav({ clearChat, totalToken, handleRoleSelected }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSideMenuToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <div>
      <div className="chatlog-navbar-parent">
        <nav>
          <div className="chatlog-navbar__container relative flex h-full items-center justify-between py-3 px-6 xl:py-[26px]">
            <div className="chatlog-left-navbar__links flex items-center justify-center space-x-5">
              <div className="z-10 flex items-center justify-center space-x-5 rounded text-sm font-medium focus:outline-none lg:hidden">
                <button
                  className={`advanced-setting-toggle focus:outline-none ${
                    isSideMenuOpen
                      ? "rounded-full bg-slate-800 text-slate-200"
                      : "text-slate-200"
                  }`}
                  onClick={handleSideMenuToggle}
                >
                  {isSideMenuOpen ? (
                    <AiOutlineCloseCircle className="text-2xl focus:outline-none active:scale-110" />
                  ) : (
                    <HiMenuAlt3 className="text-2xl text-slate-800 focus:outline-none active:scale-110" />
                  )}
                </button>
              </div>
            </div>

            <div className="chatlog-right-navbar__links flex items-center justify-center xl:hidden">
              <button
                className={`advanced-setting-toggle focus:outline-none ${
                  isMobileMenuOpen ? "rotate-360" : "rotate--360"
                }`}
                onClick={handleMobileMenuToggle}
              >
                <AiOutlineSetting className="text-2xl text-slate-900 focus:outline-none active:scale-110 active:text-red-500" />
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div
        className={`main-nav-menu fixed inset-0 top-[51px] z-[2000] transform overflow-auto bg-transparent transition duration-150 lg:hidden ${
          isSideMenuOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="sidemenu h-full">
          <SideMenuItem
            clearChat={clearChat}
            totalToken={totalToken}
            handleRoleSelected={handleRoleSelected}
          />
        </div>
      </div>
      <div
        className={` fixed inset-0 top-[51px] z-[2000] transform overflow-auto bg-transparent transition duration-150 xl:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="chat-advanced w-[280px] bg-slate-200 md:w-[280px] lg:flex lg:w-[300px] lg:flex-col lg:rounded-br-md">
          <ChatSettingsNav />
          <ChatAdvancedItems />
        </div>
      </div>
    </div>
  );
}

export default ChatLogNav;
