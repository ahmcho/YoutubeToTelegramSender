import React from "react";

const Button = ({ onClick, label}) => {
    return (
        <button
          type="button"
          className="w-full rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase text-white shadow-md transition hover:bg-blue-700"
          onClick={onClick}
        >
          {label}
        </button>
    );
}

export default Button;