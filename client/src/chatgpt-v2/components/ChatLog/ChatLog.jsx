import React, { memo } from "react";
import ChatLogNav from "./ChatLogNav";
import "../../CSS/chatapp.css";
import ChatInput from "../ChatInput";
import ChatInitialPage from "./ChatInitialPage";
import ChatMessage from "./ChatMessage";
import { v4 as uuidv4 } from "uuid";

function ChatLog({
  chatInputRef,
  chatLogRef,
  handleSubmit,
  loading,
  messages,
  imageUrl,
  totalToken,
  clearChat,
  handleRoleSelected,
}) {
  return (
    <div className="chatlog w-full bg-[#fefefe] lg:border-0 lg:border-dashed xl:w-[calc(100%-235px)]">
      <ChatLogNav
        clearChat={clearChat}
        totalToken={totalToken}
        handleRoleSelected={handleRoleSelected}
      />
      {messages.length > 0 ? (
        <div
          className="chat-message-container relative max-h-[85%] overflow-y-auto"
          ref={chatLogRef}
        >
          {messages.map((message) => (
            <ChatMessage message={message} imageUrl={imageUrl} key={uuidv4()} />
          ))}
        </div>
      ) : (
        <ChatInitialPage />
      )}
      <div>
        <ChatInput
          chatInputRef={chatInputRef}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default memo(ChatLog);
