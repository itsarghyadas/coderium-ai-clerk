import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiVoiceprintFill } from "react-icons/ri";
import { BsSend } from "react-icons/bs";

function ChatInput({ chatInputRef, handleSubmit, loading }) {
  const [inputHeight, setInputHeight] = useState("auto");

  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    setInputHeight(textarea.style.height);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading) {
        setInputHeight("auto");
      }
      handleSubmit(e);
    }
  };

  return (
    <div>
      <form
        className="chat-input-holder z-10 m-auto max-w-4xl px-6 py-1"
        onSubmit={handleSubmit}
      >
        <div className="chat-input-textarea relative flex w-full flex-grow flex-col rounded-md border border-black/10 py-2">
          <textarea
            rows={1}
            ref={chatInputRef}
            style={{ height: inputHeight }}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            spellCheck="false"
            placeholder="Send a message..."
            className="h-full w-full resize-none placeholder:text-slate-500/40 placeholder:font-semibold placeholder:text-base bg-transparent text-base lg:text-[1.1rem] leading-6 p-1 pr-12 pl-8 font-semibold outline-none"
          ></textarea>
          <button className="absolute bottom-2.5 left-2 rounded-md p-1 text-gray-500">
            <RiVoiceprintFill size={22} />
          </button>
          <button className="absolute bottom-2.5 right-2 rounded-md p-1 text-gray-500">
            {loading ? (
              <div className="animate-spin duration-50 font-bold">
                <AiOutlineLoading3Quarters className="h-5 w-5 font-bold text-slate-500" />
              </div>
            ) : (
              <BsSend className="text-xl" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInput;
