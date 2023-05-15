import React from "react";
import SideMenuItem from "./SideMenuItem";

function SideMenu({ clearChat, totalToken, handleRoleSelected }) {
  return (
    <aside className="sidemenu hidden h-full lg:block">
      <SideMenuItem
        clearChat={clearChat}
        totalToken={totalToken}
        handleRoleSelected={handleRoleSelected}
      />
    </aside>
  );
}

export default SideMenu;
