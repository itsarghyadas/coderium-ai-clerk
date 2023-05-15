import React from "react";
import { MdOutlineTune } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { MdLibraryBooks } from "react-icons/md";
import "../../CSS/chatapp.css";
import MyToggle from "../ToggleSwitch";

function ChatAdvancedItems() {
  const chatButton = [
    {
      text: "Characters",
      color: "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
      icon: <RxAvatar />,
    },
    {
      text: "Prompt Book",
      color: "bg-gradient-to-r from-red-500 to-red-800",
      icon: <MdLibraryBooks />,
    },
    {
      text: "Model Settings",
      color: "bg-gradient-to-r from-blue-500 to-blue-800",
      icon: <MdOutlineTune />,
    },
  ];

  const integrationButton = [
    {
      text: "Google Integration",
      color: "text-slate-600/80",
    },
  ];

  function ChatButton({ text, color, icon }) {
    return (
      <button
        className={`pointer-events-auto flex items-center space-x-2.5 rounded-md text-sm ${color} py-3 px-5 text-white shadow-md`}
      >
        <span className="text-lg">{icon}</span> <span>{text}</span>
      </button>
    );
  }
  return (
    <div className="scrollable-container">
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
            />
          ))}
          <div className="mt-3">
            <p className="rounded-md border-2 border-slate-500/60 p-2 text-xs font-extrabold text-slate-600/80">
              Infinite Memory implementation is coming soon.
            </p>
          </div>
        </div>
        <div className="mt-5">
          {integrationButton.map((item) => (
            <MyToggle text={item.text} key={item.text} color={item.color} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatAdvancedItems;
