import { useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";

function DarkModeToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center">
      {enabled ? (
        <button
          className="flex items-center justify-center text-slate-600 ring-1 ring-slate-800/30 bg-amber-300 p-1.5 rounded focus:outline-none"
          onClick={() => setEnabled(false)}
        >
          <MdOutlineDarkMode size={20} />
        </button>
      ) : (
        <button
          className="flex items-center justify-center text-slate-100 bg-slate-700 p-1.5 rounded focus:outline-none"
          onClick={() => setEnabled(true)}
        >
          <BsFillSunFill size={20} />
        </button>
      )}
    </div>
  );
}

export default DarkModeToggle;
