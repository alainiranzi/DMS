"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="h-16 flex justify-end items-center px-6 bg-white shadow-sm relative">
      
      <div className="relative">
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 bg-sky-600 text-white flex items-center justify-center rounded-full cursor-pointer hover:opacity-90 transition"
        >
          <FaUser />
        </div>

        
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-md py-2 z-50">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}