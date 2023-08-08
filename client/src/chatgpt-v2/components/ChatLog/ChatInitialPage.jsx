import React from "react";
import {
  MdOutlineAdsClick,
  MdOutlineArrowDropDownCircle,
} from "react-icons/md";
import { AiOutlineCodepen } from "react-icons/ai";
import { TbSquareRoundedChevronsRightFilled } from "react-icons/tb";
import { BsImage } from "react-icons/bs";
import "../../CSS/chatapp.css";

function ChatInitialPage() {
  const functionality = [
    {
      text: "Code Generation",
      color: "bg-yellow-400",
      icon: <AiOutlineCodepen />,
    },
    {
      text: "Essay Generation",
      color: "bg-sky-300/70",
      icon: <BsImage />,
    },
    {
      text: "Image Generation",
      color: "bg-pink-400",
      icon: <MdOutlineAdsClick />,
    },
    {
      text: "Question & Answer",
      color: "bg-green-300",
      icon: <MdOutlineAdsClick />,
    },
  ];
  return (
    <div className="m-auto flex w-full flex-col items-center justify-center px-5 py-10 xl:max-w-3xl">
      <div className="flex flex-col items-center justify-center py-5">
        <h1 className="promoting-headline relative bg-gradient-to-r from-slate-600 via-gray-800 to-black bg-clip-text font-cabinet text-3xl font-extrabold text-transparent drop-shadow-md md:text-4xl lg:text-[2.6rem]">
          Unlock the Power Of AI
        </h1>
        <p className="mt-2 font-semibold text-slate-800/70">
          Chat with AI to get answers to your questions.
        </p>
      </div>
      <div className="m-auto flex w-full max-w-md flex-col gap-y-2.5 px-5">
        {functionality.map((item) => (
          <div
            key={item.text}
            className="chatlog-work flex items-center justify-between rounded-lg border border-slate-500/10 px-2 py-2 shadow-sm drop-shadow-sm"
          >
            <div className="flex items-center gap-x-3">
              <div className="rounded-md px-1.5 py-1.5 ">
                <span className="text-xl text-slate-800/90">{item.icon}</span>
              </div>
              <h2 className="text-base font-bold text-slate-700/80">
                {item.text}
              </h2>
            </div>
            <div>
              <MdOutlineArrowDropDownCircle className="text-xl text-slate-700/90" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatInitialPage;
