import React from "react";

const HeaderText = ({ name }) => {
  return (
    <div className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-[#BEC1CF] via-[#D5D8EA] to-[#D5D8EA] bg-clip-text text-transparent relative z-10 w-full sm:w-1/3 text-center sm:text-left">
      {name}
    </div>
  );
};

export default HeaderText;
