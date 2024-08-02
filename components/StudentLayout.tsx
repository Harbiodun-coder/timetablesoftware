
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/router";
import Hamburger3 from "./Hamburger3";



const Layout = ({ children }) => {
  
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const router = useRouter();
 
  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
    
  };

  const profileOptions = ["Profile", "Logout"];

  return (
    <div className="flex h-screen overflow-hidden ">
      <div className="md:w-1/4  ">
        <Hamburger3   />
      </div>

      <div className="w-full overflow-y-scroll bg-white-100">
        <div className="flex justify-between mb-2 bg-white-100 py-3 px-4  md:px-9 relative border-b border-white-300">
          {/* Render search bar and icons only on larger screens */}
          <div className=" w-1/3 md:w-full flex relative items-center ">
            <CiSearch className="h-5 w-5 text-[#475367] absolute left-4" />
            <input
              type="text"
              placeholder=" Search here..."
              className=" py-2 pl-10 pr-2 text-sm bg-[#F9FAFB]  rounded-sm focus:outline-none w-[629px] focus:border-blue-500 focus:border"
            />
          </div>
          <div className="md:flex  hidden justify-between items-center gap-4">
            {/* Render icons only on larger screens */}
            <div className="hidden md:flex w-10 h-10 items-center justify-center bg-[#F0F2F5] rounded-[50%] ">
              <IoMdNotificationsOutline className="h-6 w-6 text-[#475367]" />
              
            </div>

            <div className="hidden md:block">
              <img
                src="/admin.png"
                alt="Image"
                className="w-10 h-10 rounded-full"
                onClick={handleProfileClick}
              />
               {profileDropdownOpen && (
                <div className="absolute z-50 right-0 mt-2 rounded-lg bg-white-100 shadow-lg py-1 px-2">
                  <ul>
                    {profileOptions.map((option, index) => (
                      <li
                        key={index}
                        className="block font-medium px-4 py-1 hover:bg-blue-600 hover:text-blue-100 cursor-pointer"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
         
        </div>
        <div className=" h-[calc(100vh-64px)] bg-white-100 p-4 rounded-lg overflow-y-scroll scrollbar-hidden">
       
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
