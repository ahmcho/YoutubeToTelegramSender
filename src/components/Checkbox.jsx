import React from "react";

const Checkbox = ({ onChange, checked, label}) => {
    return (
        <label
          htmlFor="autosend"
          className="relative inline-flex cursor-pointer items-center"
        >
          <input
            type="checkbox"
            name="autosend"
            className="peer sr-only"
            checked={checked}
            onChange={onChange}
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          <span className="ml-3 text-sm font-medium text-white">
            {label}
          </span>
        </label>
    );
}

export default Checkbox;