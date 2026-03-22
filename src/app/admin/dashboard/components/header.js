"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false); 
  const router = useRouter();

 const handleSignOut = () => {
  localStorage.removeItem("token");
  router.push("/"); 
};

  return (
    <header className="h-16 flex justify-end items-center px-6 bg-white relative">
      <div className="relative">
        
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 bg-sky-600 text-white flex items-center justify-center rounded-full cursor-pointer"
        >
          <FaUser />
        </div>


        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-md py-2 z-50">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
              + Create
            </button>

            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        )}    
      </div>
    </header>
  );
}