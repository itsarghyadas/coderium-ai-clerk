import React, { useState, useEffect, useRef } from "react";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { AiOutlineCreditCard, AiOutlineSetting } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsPlusCircleDotted } from "react-icons/bs";
import { GiBrain } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import ChatRole from "./ChatRole";
import { useUser } from "@clerk/clerk-react";

function SideMenuItem({
  clearChat,
  totalToken,
  handleRoleSelected,
  isSideMenuOpen,
  handleSideMenuToggle,
  sideMenuRef,
}) {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const { user } = useUser();
  const username = user.username;
  const userProfileImage = user.profileImageUrl;
  const userEmailId = user.emailAddresses[0].emailAddress;

  /*   function MenuItem({ icon: Icon, text, bgColor, iconColor, redirect }) {
    const handleClick = () => {
      navigate(redirect);
    };

    return (
      <div
        className={`menu mt-2 flex flex-col gap-y-2 bg-gradient-to-r px-5 py-3 font-semibold ${bgColor} rounded-md`}
      >
        <div
          className="flex cursor-pointer items-center space-x-3.5"
          onClick={handleClick}
        >
          <Icon className={`${iconColor} lg:text-2xl xl:text-xl`} />
          <h1 className="text-base text-slate-200 xl:block">{text}</h1>
        </div>
      </div>
    );
  } */

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    handleRoleSelected(role);
  };

  return (
    <div
      className="flex h-full flex-col justify-between gap-y-3"
      ref={sideMenuRef}
    >
      <div className="flex items-center justify-between border-b border-dashed border-slate-500/20 px-2.5 py-[0.5px] lg:justify-center lg:py-2">
        <button onClick={() => navigate("/")}>
          <div className="header-logo ml-3 flex items-center justify-center space-x-2 py-2 font-clash lg:ml-0">
            <GiBrain className="text-2xl text-red-600 xl:block" />
            <h1 className="text-[22px] font-semibold text-slate-200 xl:block">
              coderium
              <span className="ml-1.5 rounded border-2 border-slate-400/60 px-0.5 text-[15px] font-semibold text-slate-400/60">
                AI
              </span>
            </h1>
          </div>
        </button>
        <HiMenuAlt3
          className="mt-1 text-2xl text-amber-400 focus:outline-none active:scale-110 lg:hidden"
          onClick={handleSideMenuToggle}
        />
      </div>
      <div className="flex-1 flex-col space-y-3 px-2.5">
        <div
          className="mb-1 flex cursor-pointer items-center space-x-3.5 rounded-md bg-gradient-to-r from-green-400/20 px-5 py-3"
          onClick={clearChat}
        >
          <BsPlusCircleDotted className="text-xl text-green-500" />
          <h1 className="text-base font-semibold text-slate-200">New Chat</h1>
        </div>
        {/* <ChatRole onRoleSelected={handleRoleSelection} /> */}
      </div>

      {/*  <div className="border-t border-dashed border-slate-500/20 py-2">
        <MenuItem
          icon={AiOutlineSetting}
          iconColor="text-teal-500"
          text="Dashboard"
          bgColor="from-sky-500/20"
          redirect="/dashboard"
        />
        <MenuItem
          icon={AiOutlineCreditCard}
          iconColor="text-red-500"
          text="Buy Tokens"
          bgColor="from-red-500/25"
          redirect="/pricing"
        />
        <MenuItem
          icon={MdOutlineGeneratingTokens}
          iconColor="text-amber-500"
          text={
            <>
              Tokens:{" "}
              <span className="font-bold text-amber-500">{totalToken}</span>
            </>
          }
          bgColor="from-green-500/5"
          redirect="#"
        />
      </div> */}
      {/* <div className="border-t border-dashed border-slate-500/20 px-2.5 py-2 pt-3">
        <div className=" mb-1 flex items-center justify-start space-x-3 rounded-lg bg-gray-600/20 px-3.5 py-2 shadow drop-shadow-none">
          <div>
            {userProfileImage && (
              <img
                src={userProfileImage}
                alt="user profile"
                className="h-8 w-8 rounded-full ring-2 ring-lime-500/80"
              />
            )}
          </div>
          <div>
            {username && (
              <p className="font-space text-[13px] font-[480] text-zinc-100">
                @ {username}
              </p>
            )}
            {userEmailId && (
              <p className="font-space text-[13px] font-[480] text-lime-400">
                {userEmailId}
              </p>
            )}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default SideMenuItem;
