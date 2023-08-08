import React, { useState, useEffect } from "react";
import { MdOutlineTune } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { MdLibraryBooks } from "react-icons/md";
import "../../CSS/chatapp.css";
import MyToggle from "../ToggleSwitch";
import Charactermodal from "../Charactermodal";
import Promptmodal from "../Promptmodal";
import { useNavigate } from "react-router-dom";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { AiOutlineCreditCard, AiOutlineSetting } from "react-icons/ai";
import ChatSettingsNav from "./ChatSettingsNav";

function ChatAdvancedItems({
  isMobileMenuOpen,
  handleMobileMenuToggle,
  totalToken,
}) {
  const navigate = useNavigate();
  const [showCharacterModal, setShowCharacterModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);

  const chatButton = [
    {
      text: "Characters",
      color: "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
      icon: <RxAvatar />,
      onClick: handleCharacterButtonClick,
    },
    {
      text: "Prompt Book",
      color: "bg-gradient-to-r from-slate-600 via-gray-800 to-black",
      icon: <MdLibraryBooks />,
      onClick: handlePromptButtonClick,
    },
    {
      text: "Model Settings",
      color: "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
      icon: <MdOutlineTune />,
    },
  ];

  const integrationButton = [
    {
      text: "Google Integration",
      color: "text-slate-600/80",
    },
  ];

  function MenuItem({ icon: Icon, text, bgColor, iconColor, redirect }) {
    const handleClick = () => {
      navigate(redirect);
    };

    return (
      <div className="menu flex flex-col rounded-md px-5 py-2.5 font-semibold">
        <div
          className="flex cursor-pointer items-center space-x-3.5"
          onClick={handleClick}
        >
          <Icon className="text-xl font-bold" />
          <h1 className="font-clash text-[15px] font-semibold text-slate-800 xl:block">
            {text}
          </h1>
        </div>
      </div>
    );
  }

  function handleCharacterButtonClick() {
    setShowCharacterModal(true);
  }

  function handlePromptButtonClick() {
    setShowPromptModal(true);
  }

  function ChatButton({ text, color, icon, onClick }) {
    const handleClick = () => {
      if (onClick) {
        onClick(text);
      }
    };

    return (
      <button
        className={`pointer-events-auto flex items-center space-x-2.5 rounded-md text-sm ${color} px-5 py-3 text-white shadow-md`}
        onClick={handleClick}
      >
        <span className="text-lg">{icon}</span> <span>{text}</span>
      </button>
    );
  }

  return (
    <div className="scrollable-container flex h-full select-none flex-col justify-between gap-y-3">
      <div>
        <ChatSettingsNav
          isMobileMenuOpen={isMobileMenuOpen}
          handleMobileMenuToggle={handleMobileMenuToggle}
        />
        <div className="-mb-7 p-5">
          <p className="rounded-md border-2 border-red-500/60 p-2 text-xs font-extrabold text-red-600/80">
            Refreshing the page resets all values to their default state.
          </p>
        </div>
        <div className="p-5 font-semibold">
          <div className="flex flex-col gap-y-2">
            {chatButton.map((item) => (
              <ChatButton
                key={item.text}
                text={item.text}
                color={item.color}
                icon={item.icon}
                onClick={item.onClick}
              />
            ))}
            <div className="mt-3">
              <p className="rounded-md border-2 border-slate-500/60 p-2 text-xs font-extrabold text-slate-600/80">
                Infinite Memory implementation is coming soon.
              </p>
            </div>
          </div>
          <div className="mt-5">
            {" "}
            {integrationButton.map((item) => (
              <MyToggle text={item.text} key={item.text} color={item.color} />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-dashed border-slate-500/20 py-1">
        <MenuItem
          icon={MdOutlineGeneratingTokens}
          iconColor="text-amber-500"
          text={
            <>
              <span className="font-[620] text-slate-700">{totalToken}</span>
            </>
          }
          bgColor="from-green-500/5"
          redirect="#"
        />
        <MenuItem
          icon={AiOutlineCreditCard}
          iconColor="text-red-500"
          text={
            <div className="flex items-center justify-start">
              Buy Credits
              <span className="ml-2 rounded-full border-2 border-slate-800  px-1.5 py-[1px] font-karla text-xs font-medium text-black">
                Cheap
              </span>
            </div>
          }
          bgColor="from-red-500/25"
          redirect="/pricing"
        />
        <MenuItem
          icon={AiOutlineSetting}
          iconColor="text-teal-500"
          text={
            <div className="flex items-center justify-start">
              Dashboard
              <span className="ml-2 rounded border-2 border-zinc-400 px-1.5 py-[1px] font-karla text-xs font-medium text-black">
                New
              </span>
            </div>
          }
          bgColor="from-sky-500/20"
          redirect="/dashboard"
        />
      </div>
      {showCharacterModal && (
        <Charactermodal closeModal={() => setShowCharacterModal(false)} />
      )}
      {showPromptModal && (
        <Promptmodal closeModal={() => setShowPromptModal(false)} />
      )}
    </div>
  );
}

export default ChatAdvancedItems;
