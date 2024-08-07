import React, { ChangeEvent } from "react";

interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  change: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, name, type, placeholder, value, change }) => {
  return (
    <div className="my-4">
      <label htmlFor={name} className="sr-only">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={change}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      />
    </div>
  );
};

export default Input;
