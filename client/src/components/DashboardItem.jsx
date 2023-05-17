import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const DashboardItem = ({
  title,
  details,
  link,
  linkName,
  id,
  version,
  steps,
  image,
}) => {
  const navigate = useNavigate();
  return (
    <div className="card-one w-full rounded-lg px-8 py-8 lg:px-10 ">
      {steps && steps.length > 0 && (
        <div className=" flex flex-col md:flex-row ">
          <div className="w-full">
            <img className="rounded" src={image} alt="" />
            <div className="my-6 flex items-center space-x-2">
              <p className=" text-xl font-bold underline decoration-slate-500 decoration-dashed decoration-1 underline-offset-8">
                How this works
              </p>
              <BsArrowDownCircleFill
                className=" border- mt-0.5 rounded-full border-slate-500 text-slate-600"
                size="1.25rem"
              />
            </div>
            {steps.map((step, index) => (
              <div key={index} className="step flex space-x-4">
                <div className="step-description">
                  <ol className="relative flex flex-col border-l border-stone-300/50 md:flex-row">
                    <li className="ml-4">
                      <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-amber-400/50 bg-amber-400" />
                      <p className="flex flex-row flex-wrap items-center justify-start gap-4 text-xs md:text-sm">
                        <span className="inline-block rounded-md bg-slate-700 px-2 py-1 text-sm font-semibold text-white">
                          {step.step}
                        </span>
                      </p>
                      <p className="py-4 text-sm font-semibold text-slate-500">
                        {step.description}
                      </p>
                    </li>
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="absolute -right-2.5 -top-2.5 rounded bg-purple-600 px-4 py-1.5 text-sm font-medium text-white shadow drop-shadow">
        {id}
      </div>
      <div className="flex flex-col md:flex-row"></div>
      <div className="back flex w-full flex-col gap-y-2 rounded-lg pt-7">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-black">{title}</h1>
          <span className="version font-regular rounded-full bg-purple-700 px-3 py-0.5 text-[12px] text-white">
            {version}
          </span>
        </div>
        <p className="text-sm font-bold leading-6 text-slate-500">{details}</p>
        <button
          className={`mt-2 flex h-11 w-full cursor-pointer items-center justify-center rounded-lg ${
            title === "IMAGIPIX"
              ? "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
              : "bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500"
          } px-8 py-2 text-base font-semibold text-white shadow drop-shadow transition-all hover:brightness-110 active:scale-95`}
          onClick={() => navigate(link)}
        >
          {linkName}
          <FiExternalLink className="mb-0.5 ml-2 inline" />
        </button>
      </div>
    </div>
  );
};

export default DashboardItem;
