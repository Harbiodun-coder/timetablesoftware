import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoPersonCircleOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Swal from 'sweetalert2';
import { TbCalendarTime } from "react-icons/tb";


export default function StudentSidebar() {
  const router = useRouter()
  
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        router.push('/login'); 
      }
    });
  };
  
  const nav = [


    {
      icon: <TbCalendarTime />,
      name: "Timetable",
      path: `/student/timetable`,
    },
   
    {
      icon: <IoPersonCircleOutline />,
      name: "Profile",
      path: `/student/profile`,
    },
   
   
  ];

  return (
    <div className="bg-indigo-500 w-full md:w-1/5 text-[white] p-6 h-screen  fixed z-30 md:z-0 md:bg-opacity-90 flex flex-col gap-6 ">
      <p className="text-white font-bold text-xl hidden md:block">TMS</p>
      <div className="flex flex-col gap-5 pt-10 md:pt-0">
        {nav.map((item, index) => (
          <div key={index}>
            <Link href={item.path} key={index}>
              <button
                className={`${
                  router.asPath === item.path
                    ? "bg-white-200 text-[#0065C2]"
                    : ""
                } flex gap-2 text-white w-full font-medium items-center hover:bg-white hover:text-[#0065C2] p-3 rounded-lg hover:bg-white-100 `}
              >
                <p className="text-xl">{item.icon}</p>
                <p className="text-xs">{item.name}</p>
              </button>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <button
          className="flex gap-2 text-white w-full font-medium items-center hover:bg-white hover:text-[#0065C2] p-3 rounded-lg hover:bg-white-100 "
          onClick={handleLogout}
        >
          <p className="text-2xl">
            <CiLogout />
          </p>
          <p className="text-base ">Log Out</p>
        </button>
      </div>
    </div>
  );
}
