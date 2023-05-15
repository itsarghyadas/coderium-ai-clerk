import React from "react";
import { MdOutlineAdsClick } from "react-icons/md";
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
    <div className="flex flex-col items-center justify-center w-full xl:max-w-3xl m-auto py-10 px-5">
      <div className="flex flex-col items-center justify-center py-5">
        <h1 className="relative promoting-headline font-extrabold font-cabinet text-3xl md:text-4xl lg:text-[2.6rem] text-transparent bg-clip-text drop-shadow-md">
          Unlock the Power Of AI
        </h1>
        <p className="mt-2 text-slate-800/70 font-semibold">
          Chat with AI to get answers to your questions.
        </p>
      </div>
      <div className="flex flex-col max-w-md m-auto w-full gap-y-2.5 px-5">
        {functionality.map((item) => (
          <div
            key={item.text}
            className="chatlog-work flex items-center justify-between border border-slate-500/10 shadow-sm drop-shadow-sm px-2 py-2 rounded-lg"
          >
            <div className="flex items-center gap-x-3">
              <div className={`py-1.5 px-1.5 rounded-md ${item.color}`}>
                <span className="text-xl text-slate-800/90">{item.icon}</span>
              </div>
              <h2 className="text-base font-bold text-slate-700/80">
                {item.text}
              </h2>
            </div>
            <div>
              <TbSquareRoundedChevronsRightFilled className="text-xl text-slate-700/90" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatInitialPage;
