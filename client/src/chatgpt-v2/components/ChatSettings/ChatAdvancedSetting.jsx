import React from "react";
import ChatSettingsNav from "./ChatSettingsNav";
import "../../CSS/chatapp.css";
import ChatAdvancedItems from "./ChatAdvancedItems";

function ChatAdvancedSetting({ totalToken }) {
  return (
    <div className="chat-advanced hidden bg-zinc-50 xl:flex xl:w-[235px] xl:flex-col">
      {/* <ChatSettingsNav /> */}
      <ChatAdvancedItems totalToken={totalToken} />
    </div>
  );
}

export default ChatAdvancedSetting;
