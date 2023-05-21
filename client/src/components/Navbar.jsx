import React from "react";
import { GiBrain } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { RiGalleryLine } from "react-icons/ri";
import {
  MdOutlineDashboard,
  MdEmail,
  MdGeneratingTokens,
} from "react-icons/md";
import {
  AiOutlineHome,
  AiOutlineCreditCard,
  AiOutlineCloseCircle,
  AiFillInstagram,
  AiOutlineCamera,
} from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { FaTwitter } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;

const SignOutButton = () => {
  const { signOut } = useClerk();
  return <button onClick={() => signOut()}>Sign out</button>;
};

const MobileMenu = React.memo(({ totalToken }) => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  return (
    <div className="main-nav-menu-mobile w-[300px] bg-gray-100 md:w-[300px] lg:flex lg:w-[300px] lg:flex-col">
      <div>
        <div className="header-menu lg:hidden">
          <ul className="flex-col space-y-7 px-7 py-10 text-[1.1rem] font-bold text-slate-700">
            <div className="flex items-center space-x-3">
              <div className="nav-home-icon">
                <AiOutlineHome className="text-xl text-teal-500" />
              </div>
              <li className="mt-1">
                <button onClick={() => navigate("/")}>Home</button>
              </li>
            </div>
            <div className="flex items-center space-x-3">
              <div className="nav-home-icon">
                <AiOutlineCreditCard className="text-xl text-red-500" />
              </div>
              <li className="mt-1">
                <button onClick={() => navigate("/pricing")}>Pricing</button>
              </li>
            </div>
            <div className="flex items-center space-x-3">
              <div className="nav-home-icon">
                <RiGalleryLine className="text-xl text-green-500" />
              </div>
              <li className="mt-1">
                <button onClick={() => navigate("/gallery")}>Gallery</button>
              </li>
            </div>
            <div className="flex items-center space-x-3">
              <div className="nav-home-icon">
                <MdOutlineDashboard className="text-xl text-orange-500" />
              </div>
              <li className="mt-1">
                <button onClick={() => navigate("/dashboard")}>
                  Dashboard
                </button>
              </li>
            </div>
            <div className="flex items-center space-x-3">
              <div className="nav-home-icon">
                <IoChatbubblesOutline className="text-xl text-cyan-500" />
              </div>
              <li className="mt-1">
                <button onClick={() => navigate("/chat")}>Chat</button>
              </li>
            </div>
            <div className="flex items-center space-x-3">
              <div className="nav-home-icon">
                <AiOutlineCamera className="text-xl text-indigo-500" />
              </div>
              <li className="mt-0">
                <button onClick={() => navigate("/imagica")}>Imagica</button>
              </li>
            </div>
          </ul>
          <div className="header-button space-y-2">
            <div className=" px-6 lg:flex lg:items-center">
              {isSignedIn ? (
                <div className="profile-menu flex w-full gap-3 rounded-full border-2 border-slate-700/90 bg-orange-500 px-4 py-2 pl-2 text-left font-bold text-white">
                  <img
                    className="h-6 w-6 rounded-full bg-white ring-1 ring-slate-800/50"
                    src={user.profileImageUrl}
                    alt=""
                  />
                  <SignOutButton />
                </div>
              ) : (
                <button
                  className="profile-menu flex w-full gap-2 rounded-full border-2 border-slate-700/90 bg-slate-900 px-4 py-2 pl-6 text-left font-bold text-white"
                  onClick={() => navigate("/dashboard")}
                >
                  <span>
                    Go to Dashboard <span aria-hidden="true">→</span>
                  </span>
                </button>
              )}
            </div>
            <div className=" px-6 lg:flex lg:items-center">
              {isSignedIn ? (
                <div className="flex space-x-2 rounded-full border-2 border-black bg-amber-300 px-3.5 py-2 text-base font-semibold text-white">
                  <MdGeneratingTokens className="text-2xl text-black" />
                  <span className="font-clash font-semibold text-black">
                    {totalToken}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header-follow absolute bottom-5 left-0 right-0">
        <div className="flex items-center justify-evenly space-x-2 px-6 py-4">
          <div>
            <BsDiscord className="text-2xl text-indigo-500" />
          </div>
          <div>
            <AiFillInstagram className="text-2xl text-rose-500" />
          </div>
          <div>
            <FaTwitter className="text-2xl text-sky-600" />
          </div>
          <div>
            <MdEmail className="text-2xl text-teal-500" />
          </div>
        </div>
      </div>
    </div>
  );
});

function Navbar({ totalToken }) {
  const { user, isSignedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  let username = "";
  if (user) {
    username = user.username;
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate = useNavigate();
  const memoizedMobileMenu = useMemo(
    () => <MobileMenu totalToken={totalToken} />,
    [totalToken]
  );

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
              <li>
                <button onClick={() => navigate("/gallery")}>Gallery</button>
              </li>
              <li>
                <button onClick={() => navigate("/pricing")}>Pricing</button>
              </li>
            </ul>
          </div>
          <div className="header-button space-x-2">
            <div className="hidden lg:flex lg:items-center">
              {isSignedIn ? (
                <div className=" mr-2 flex space-x-2 rounded-full border-2 border-black bg-amber-300 px-3.5 py-1.5 text-base font-semibold text-white">
                  <MdGeneratingTokens className="text-2xl text-black" />
                  <span className="font-clash font-semibold text-black">
                    {totalToken}
                  </span>
                </div>
              ) : (
                ""
              )}
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
                  className="inline-flex justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
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
