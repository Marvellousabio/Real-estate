import React from "react";

function CustomAlert({ message, type = "info", onClose }) {
  const bgColor =
    type === "error" ? "bg-red-500" :
    type === "success" ? "bg-green-500" :
    type === "warning" ? "bg-yellow-400" :
    "bg-blue-500";

  return (
    <div
      className={`fixed top-5 right-5 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-[250px]`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 font-bold hover:text-gray-200"
      >
        ×
      </button>
    </div>
  );
};

export default CustomAlert;
