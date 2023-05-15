import React from "react";
import ChatSettingsNav from "./ChatSettingsNav";
import "../../CSS/chatapp.css";
import ChatAdvancedItems from "./ChatAdvancedItems";

function ChatAdvancedSetting() {
  return (
    <div className="chat-advanced hidden bg-slate-200 xl:flex xl:w-[280px] xl:flex-col">
      <ChatSettingsNav />
      <ChatAdvancedItems />
    </div>
  );
}

export default ChatAdvancedSetting;
