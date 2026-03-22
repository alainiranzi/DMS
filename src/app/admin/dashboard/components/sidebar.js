"use client";

import { useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";

export default function Sidebar({ activePage, setActivePage }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-gray-100 text-gray-700 flex flex-col h-screen transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >

      <div className="flex items-center justify-between p-4">
        <span className="font-bold text-sky-700 text-2xl tracking-wide">
          {collapsed ? "D" : "DMS"}
        </span>

    <button
  onClick={() => setCollapsed(!collapsed)}
  className="p-2 rounded hover:bg-gray-200 hover:shadow-sm transition-all duration-200 cursor-pointer focus:outline-none"
>
  <FaBars
    className={`transition-transform duration-300 ${
      collapsed ? "rotate-180" : "rotate-0"
    }`}
  />
</button>
      </div>

    
      <nav className="flex flex-col mt-4">
        <button
          onClick={() =>
            setActivePage(activePage === "users" ? null : "users")
          }
          className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-md transition ${
            activePage === "users"
              ? "bg-white shadow-sm"
              : "hover:bg-gray-200"
          }`}
        >
          <FaUser className="text-gray-600" />

          {!collapsed && <span>Users</span>}
        </button>
      </nav>
    </div>
  );
}