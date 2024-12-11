import React from "react";

interface TextAreaFieldProps {
  name: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  formValue: string;
  rows: number;
  cols: number;
}

const TextArea: React.FC<TextAreaFieldProps> = ({
  name,
  error,
  handleChange,
  formValue,
  rows,
  cols,
}) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="text-lg text-white-600 capitalize">
        {name}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        cols={cols}
        className="w-full bg-black-300 px-5 py-2 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
        placeholder={`Enter Your ${name}`}
        required
        onChange={handleChange}
        value={formValue}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextArea;
