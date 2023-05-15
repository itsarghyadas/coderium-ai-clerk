import React from "react";
import Navbar from "../components/Navbar";
import AiTime from "../assets/timemachine-effect.jpg";
import manAvatar from "../assets/man-avatar-1.svg";
import boyAvatar from "../assets/boy-avatar.svg";
import femaleAvatar from "../assets/female-avatar.svg";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <div className="nav-component">
        <Navbar />
      </div>
      <div className="hero mx-auto max-w-7xl items-center justify-evenly gap-x-5 space-y-14 px-8 pt-[3.25rem] md:space-y-20 lg:flex lg:px-14 lg:pt-28">
        <div className="hero-left-headline mx-auto sm:w-[80%] lg:w-[60%] xl:w-2/3">
          <h1 className=" mt-4 text-4xl font-extrabold tracking-tight text-slate-900/90 md:text-6xl xl:text-7xl">
            <p className="mb-3 lg:mb-4"> Step into a world of </p>
            <span className="headline-tag relative whitespace-nowrap p-2 text-white">
              Imagination
            </span>
          </h1>
          <p className="mt-8 text-justify text-sm font-semibold text-slate-700/70 md:text-left xl:text-lg ">
            Beautifully designed, expertly crafted UI for the Advanced ChatGPT
            and Image Generation Service, built by one talented student. The
            perfect starting point for your seamless productivity.
          </p>
          <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 md:items-center md:justify-start lg:justify-start">
            <button
              className="inline-flex justify-center rounded-lg bg-slate-900 py-3 px-4 text-[15px] font-semibold text-white ring-1 ring-slate-900/70 hover:bg-slate-800"
              onClick={() => navigate("/dashboard")}
            >
              <span>
                Browse services{" "}
                <span
                  aria-hidden="true"
                  className="hidden text-slate-400 sm:inline"
                >
                  →
                </span>
              </span>
            </button>
            <button
              className="hover:ring-slate-900/15 inline-flex justify-center rounded-lg bg-white/0 py-3 px-4 text-[15px] font-semibold text-slate-900 ring-1 ring-slate-900/70 hover:bg-white/25 "
              onClick={() => navigate("/dashboard")}
            >
              <span>
                Explore Gallery{" "}
                <span
                  aria-hidden="true"
                  className="text-black/55 hidden sm:inline"
                >
                  →
                </span>
              </span>
            </button>
          </div>
          <div className="relative mt-6 flex items-center justify-start md:items-center md:justify-start lg:justify-start">
            <img
              className="supporter-image h-10 w-10 rounded-full bg-slate-400 object-cover p-0.5 shadow-sm"
              src={manAvatar}
              alt="AI Art"
            />
            <img
              className="supporter-image -ml-4 h-10 w-10 rounded-full bg-amber-400 object-cover p-0.5 shadow-sm"
              src={boyAvatar}
              alt="AI Art"
            />
            <img
              className="supporter-image -ml-4 h-10 w-10 rounded-full bg-lime-400 object-cover p-0.5 shadow-sm"
              src={femaleAvatar}
              alt="AI Art"
            />
            <img
              className="supporter-image -ml-4 h-10 w-10 rounded-full bg-red-400 object-cover p-0.5 shadow-sm"
              src={boyAvatar}
              alt="AI Art"
            />
            <img
              className="supporter-image -ml-4 h-10 w-10 rounded-full bg-amber-400 object-cover p-0.5 shadow-sm"
              src={manAvatar}
              alt="AI Art"
            />
            <h1>
              <span className="ml-4 font-bold text-slate-800/80">
                2500 + Supporters 🎉
              </span>
            </h1>
          </div>
        </div>
        <div className="hero-right-part relative sm:px-10 md:px-0 lg:w-[40%] xl:w-1/3">
          <div className="relative -z-20 rotate-6">
            <div className="testimonial-1 absolute -top-5 -left-5 flex -rotate-12 items-center justify-center space-x-4 rounded-full px-1 py-1 text-white md:-top-3 md:left-5 lg:-top-7 lg:-left-7">
              <div className="flex items-center justify-center space-x-2 rounded-full border border-slate-300 bg-slate-800/70 px-3 py-1.5">
                <div className="-ml-1 rounded-full">
                  <img
                    className="supporter-image h-8 w-8 rounded-full bg-amber-400 object-cover p-0.5 shadow-sm"
                    src={manAvatar}
                    alt="AI Art"
                  />
                </div>
                <div className="text-sm font-semibold text-amber-400 brightness-200 ">
                  The Best AI Art Generator
                </div>
              </div>
            </div>
            <img
              className="ai-image-hero h-[300px] w-full rounded-2xl border-2 border-black/70 object-cover shadow-lg md:m-auto md:h-[400px] md:w-[80%] lg:h-[400px] lg:w-[400px]"
              src={AiTime}
              alt="AI Art"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
