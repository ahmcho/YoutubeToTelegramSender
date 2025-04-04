import React from "react";

const Input = ({ onChange,value, label, placeholder }) => {
    return (
        <label className="mt-4 block">
        <span className="block text-sm font-medium text-white">{label}</span>
        <input
          className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-black shadow-sm transition-transform duration-300 focus:scale-105 focus:border-sky-500 focus:outline-none"
          type="text"          
          value={value}
          onChange={onChange}          
          placeholder={placeholder}
        />
      </label>
    );
}

export default Input;