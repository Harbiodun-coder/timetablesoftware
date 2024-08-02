import React, { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import AdminSidebar from './AdminSidebar';




const Hamburger = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="md:hidden absolute z-50 p-4 text-2xl right-5 text-blue-200"  onClick={() => setOpen(!open)}>
        {open ? <MdClose /> : <MdMenu />}
      </div>
      <nav className="hidden md:flex">
        <AdminSidebar />
           </nav>
      <nav className={`lg:hidden ${open ? 'block' : 'hidden'}`}>
        <AdminSidebar  />
          </nav>
    </div>
  );
};
export default Hamburger;
