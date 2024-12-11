import React from "react";

interface InputFieldProps {
  name: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formValue: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  error,
  handleChange,
  formValue,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="text-lg text-white-600 capitalize">
        {name}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        className="w-full bg-black-300 px-5 py-2 min-h-14 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
        placeholder={`Enter Your ${name}`}
        required
        onChange={handleChange}
        value={formValue}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
