import React, { useState, useEffect, useRef } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineSetting, AiOutlineCloseCircle } from "react-icons/ai";
import ChatSettingsNav from "../ChatSettings/ChatSettingsNav";
import ChatAdvancedItems from "../ChatSettings/ChatAdvancedItems";
import SideMenuItem from "../SideMenuItem";
import "../../CSS/chatapp.css";
import "../../CSS/chatnav.css";

function ChatLogNav({ clearChat, totalToken, handleRoleSelected }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobilMenuRef = useRef(null);

  useEffect(() => {
    // Add event listener to handle outside clicks/taps
    const handleClickOutside = (event) => {
      if (
        mobilMenuRef.current &&
        !mobilMenuRef.current.contains(event.target)
      ) {
        handleMobileMenuToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleMobileMenuToggle]);

  const handleSideMenuToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  const sideMenuRef = useRef(null);

  useEffect(() => {
    // Add event listener to handle outside clicks/taps
    const handleClickOutside = (event) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
        handleSideMenuToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleSideMenuToggle]);

  return (
    <div>
      <div className="chatlog-navbar-parent">
        <nav>
          <div className="chatlog-navbar__container relative flex h-full items-center justify-between px-6 py-3 xl:py-[26px]">
            <div className="chatlog-left-navbar__links flex items-center justify-center space-x-5">
              <div className="z-50 flex items-center justify-center space-x-5 rounded text-sm font-medium focus:outline-none lg:hidden">
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
                <AiOutlineSetting
                  className={`text-2xl text-slate-900 focus:outline-none active:scale-110 ${
                    isMobileMenuOpen ? "rotate-360" : "rotate--360"
                  }`}
                />
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div
        className={`main-nav-menu fixed inset-0 z-[30] transform overflow-auto bg-black bg-transparent bg-opacity-50 backdrop-blur-sm transition duration-150 lg:hidden ${
          isSideMenuOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        {isSideMenuOpen && (
          <div className="sidemenu h-full">
            <SideMenuItem
              clearChat={clearChat}
              totalToken={totalToken}
              handleRoleSelected={handleRoleSelected}
              isSideMenuOpen={isSideMenuOpen}
              handleSideMenuToggle={() => handleSideMenuToggle()}
              sideMenuRef={sideMenuRef}
            />
          </div>
        )}
      </div>
      <div
        className={`fixed inset-0 z-[29] transform overflow-auto bg-black bg-transparent bg-opacity-50 backdrop-blur-sm transition duration-150 xl:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {isMobileMenuOpen && (
          <div
            className="chat-advanced w-[250px] bg-zinc-100 md:w-[250px] lg:flex lg:w-[250px] lg:flex-col lg:rounded-br-md"
            ref={mobilMenuRef}
          >
            {/*  <ChatSettingsNav /> */}
            <ChatAdvancedItems
              isMobileMenuOpen={isMobileMenuOpen}
              handleMobileMenuToggle={handleMobileMenuToggle}
              totalToken={totalToken}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatLogNav;
