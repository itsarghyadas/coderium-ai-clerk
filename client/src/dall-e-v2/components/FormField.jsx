import React from "react";

const FormField = ({
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => (
  <div>
    <div className="mb-2 flex items-center gap-2">
      {isSurpriseMe && (
        <button
          type="button"
          onClick={handleSurpriseMe}
          className="rounded-[5px] border border-[#dfdfdf] bg-indigo-500 px-2 py-1 text-xs font-semibold text-white"
        >
          Surprise me
        </button>
      )}
    </div>
    <input
      type={type}
      id={name}
      name={name}
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-[#6469ff] focus:ring-[#6469ff]"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

export default FormField;
