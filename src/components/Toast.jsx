import React from "react";

const Toast = ({ type, children, onClose }) => {
  const bg =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";
  return (
    <div
      className={`mx-auto my-4 w-full max-w-md rounded-lg p-3 text-white shadow-lg transition-opacity duration-300 ease-in-out opacity-100 ${bg}`}
    >
      <div className="flex items-center justify-between">
        <div>{children}</div>
        <button onClick={onClose} className="ml-4 text-xl font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;
