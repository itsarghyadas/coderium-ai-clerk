import React, { useState } from "react";
import { downloadImage } from "../utils";
import { FaDownload } from "react-icons/fa";

const Card = ({ _id, name, prompt, photo }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="card group relative rounded-xl font-medium drop-shadow-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <img
          className="h-auto w-full rounded-xl object-cover"
          src={photo}
          alt={prompt}
        />
        {isHovered && (
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="absolute right-2 top-2 rounded-lg border-none bg-zinc-900 p-2 outline-none ring
             ring-lime-400"
          >
            <FaDownload className="text-base text-amber-200" />
          </button>
        )}
      </div>
      <div className="card-prompt absolute bottom-0 left-0 right-0 m-2 hidden max-h-[94.5%] flex-col rounded-md bg-zinc-900 p-4 ring ring-amber-400 group-hover:flex">
        <p className="prompt overflow-y-auto text-[0.8rem] text-white">
          {prompt}
        </p>
      </div>
    </div>
  );
};

export default Card;
