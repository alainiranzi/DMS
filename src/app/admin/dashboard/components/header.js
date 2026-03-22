"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false); 
  const [confirmOpen, setConfirmOpen] = useState(false); 
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
              onClick={() => setConfirmOpen(true)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        )}

     
        {confirmOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">
                Confirm Sign Out
              </h2>
              
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setConfirmOpen(false)}
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}