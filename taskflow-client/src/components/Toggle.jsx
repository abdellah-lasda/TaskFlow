import { useState } from "react";

export default function Toggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 
      ${enabled ? "bg-blue-500" : "bg-gray-300"}`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 
        ${enabled ? "translate-x-4" : ""}`}
      />
    </button>
  );
}