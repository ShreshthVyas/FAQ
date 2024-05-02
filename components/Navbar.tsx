import React from "react";

const Navbar = () => {
  return (
    <div className=" top-0 py-2 w-full flex items-center justify-center h-[55px] fixed  shadow-lg shadow-[#2563eb]/50 bg-[#03001417] backdrop-blur-md z-50">
      <div className="flex items-center justify-between w-full max-w-[500px] h-full border border-[#2563eb] bg-[#0300145e] px-[20px] py-[10px] rounded-full text-gray-200">
        <a href="/" className="cursor-pointer" >
          Home
        </a>
        <a href="https://youtube.com/@chromebookindia?si=RDdUKVaNAQB_EzoP" className="cursor-pointer" target="_blank">
          Youtube
        </a>
        <a href="https://www.instagram.com/chromebook_townhouse?igsh=MW9kNzZ5c2wyeXNqbw==" className="cursor-pointer" target="_blank">
          Instagram
        </a>
      </div>
    </div>
  );
};

export default Navbar;
