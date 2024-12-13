import React from "react";

// Define props interface for type safety
interface HeaderTextProps {
  name: string;
  className?: string;
}

const HeaderText: React.FC<HeaderTextProps> = ({ name, className = "" }) => {
  return (
    <div
      className={`text-lg sm:text-2xl font-semibold bg-gradient-to-r from-[#BEC1CF] via-[#D5D8EA] to-[#D5D8EA] bg-clip-text text-transparent relative z-10  text-center sm:text-left ${className}`}
    >
      {name}
    </div>
  );
};

export default HeaderText;
