import React from "react";
import { GiBrain } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsDiscord } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlineCreditCard,
  AiOutlineCloseCircle,
  AiOutlineInstagram,
} from "react-icons/ai";
import { useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const { signOut } = useClerk();
  return <button onClick={() => signOut()}>Sign out</button>;
};

const MobileMenu = React.memo(() => {
  return (
    <div className="main-nav-menu-mobile w-[300px] bg-gray-100 md:w-[300px] lg:flex lg:w-[300px] lg:flex-col">
      <div>
        <div className="header-menu lg:hidden">
          <ul className="flex-col space-y-7 px-7 py-10 text-[1.1rem] font-bold text-slate-700">
            <div className="flex items-center space-x-3">
              <div className="nav-home-icon">
                <AiOutlineHome className="text-xl text-slate-900" />
              </div>
              <li className="mt-1.5">Home</li>
            </div>
            <div className="flex items-center space-x-3">
              <div className="nav-home-icon">
                <AiOutlineCreditCard className="text-xl text-slate-900" />
              </div>
              <li className="mt-1.5">Pricing</li>
            </div>
            <div className="flex items-center space-x-3">
              <div className="nav-home-icon">
                <AiOutlineHome className="text-xl text-slate-900" />
              </div>
              <li className="mt-1.5">About</li>
            </div>
            <div className="flex items-center space-x-3">
              <div className="nav-home-icon">
                <AiOutlineHome className="text-xl text-slate-900" />
              </div>
              <li className="mt-1.5">Chats</li>
            </div>
            <div className="flex items-center space-x-3">
              <div className="nav-home-icon">
                <AiOutlineHome className="text-xl text-slate-900" />
              </div>
              <li className="mt-1.5">Documentation</li>
            </div>
          </ul>
        </div>
        <div className="header-button">
          <div className="flex flex-col gap-y-2 px-6">
            <button className="w-full rounded-full border-2 border-slate-700/90 bg-orange-500 py-2 px-4 pl-6 text-left font-bold text-white hover:bg-slate-800">
              <a href="#">
                <span>
                  Get Started <span aria-hidden="true">→</span>
                </span>
              </a>
            </button>
            <button className="w-full rounded-full border-2 border-slate-800/80 bg-white py-2 px-4 pl-6 text-left font-bold text-black hover:bg-slate-800">
              <a href="#">
                <span>
                  Login <span aria-hidden="true">→</span>
                </span>
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="header-follow absolute bottom-5 left-0 right-0">
        <div className="flex items-center justify-evenly space-x-2 px-6 py-4">
          <div>
            <BsDiscord className="text-2xl text-slate-900" />
          </div>
          <div>
            <AiOutlineInstagram className="text-2xl text-slate-900" />
          </div>
          <div>
            <BsDiscord className="text-2xl text-slate-900" />
          </div>
          <div>
            <BsDiscord className="text-2xl text-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
});

function Navbar() {
  const { user, isSignedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate = useNavigate();
  const memoizedMobileMenu = useMemo(() => <MobileMenu />, []);

  if (user) {
    const username = user.username;
    const userEmailId = user.emailAddresses[0]?.emailAddress;
  }

  return (
    <div className="navbar-home fixed top-0 z-10 w-full bg-transparent lg:relative ">
      <nav className="z-1000 sticky top-0 mx-auto max-w-7xl border-b border-dashed px-5 py-2.5 lg:border-none lg:py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/")}>
            <div className="header-logo flex items-center space-x-2">
              <GiBrain className="text-3xl text-red-600" />
              <h1 className="font-clash text-xl font-bold text-slate-600">
                coderium
                <span className="ml-1.5 rounded border-2 border-slate-600 px-0.5 text-[15px] font-bold text-slate-600">
                  AI
                </span>
              </h1>
            </div>
          </button>
          <div className="header-menu hidden lg:block">
            <ul className="flex space-x-10 text-base font-bold text-slate-700">
              <li>
                <button onClick={() => navigate("/dashboard")}>
                  Dashboard
                </button>
              </li>
              <li>Gallery</li>
              <li>Contact</li>
              <li>
                <button onClick={() => navigate("/pricing")}>Pricing</button>
              </li>
            </ul>
          </div>
          <div className="header-button space-x-2">
            <div className="hidden lg:flex lg:items-center">
              {isSignedIn ? (
                <div className="hidden lg:flex lg:items-center">
                  <div className="profile-menu flex space-x-2 rounded-full bg-black py-1 pl-4 pr-1 text-base font-semibold text-white">
                    <SignOutButton />
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.profileImageUrl}
                      alt=""
                    />
                  </div>
                </div>
              ) : (
                <button
                  className="inline-flex justify-center rounded-lg bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white hover:bg-slate-800"
                  onClick={() => navigate("/dashboard")}
                >
                  <span>
                    Go to Dashboard <span aria-hidden="true">→</span>
                  </span>
                </button>
              )}
            </div>
          </div>
          <div className=" flex items-center justify-center lg:hidden">
            <button
              className={`advanced-setting-toggle focus:outline-none ${
                isMobileMenuOpen
                  ? "rounded-full bg-slate-800 text-slate-200"
                  : "text-slate-900"
              }`}
              onClick={handleMobileMenuToggle}
            >
              {isMobileMenuOpen ? (
                <AiOutlineCloseCircle className="text-2xl focus:outline-none active:scale-110 active:text-slate-900" />
              ) : (
                <HiMenuAlt3 className="text-2xl text-slate-900 focus:outline-none active:scale-110 active:text-red-500" />
              )}
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`main-nav-menu fixed inset-0 top-[51px] z-[2000] transform overflow-auto bg-transparent transition duration-150 lg:hidden ${
          isMobileMenuOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        {memoizedMobileMenu}
      </div>
    </div>
  );
}

export default Navbar;
