import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";

function MyToggle({ text, color }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled === true) {
      localStorage.setItem("google-enable", "true");
    } else {
      localStorage.setItem("google-enable", "false");
    }
  }, [enabled]);

  return (
    <div className="mt-2.5 rounded-md border border-slate-800/50 bg-white px-5 py-3 ">
      <div className="flex items-center justify-between ">
        <h1 className={`text-sm font-[780] text-slate-800 ${color}`}>{text}</h1>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-green-500" : "bg-gray-400"
          } relative inline-flex h-4 w-[35px] items-center rounded-full border border-slate-200/70 outline-none`}
        >
          <span
            className={`${
              enabled ? "translate-x-5 bg-white" : "translate-x-[1px] bg-white"
            } pointer-events-none inline-block h-3 w-3 transform rounded-full transition`}
          />
        </Switch>
      </div>
    </div>
  );
}

export default MyToggle;
