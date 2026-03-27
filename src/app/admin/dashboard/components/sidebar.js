"use client";

import { useState } from "react";
import { FaUsers, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Sidebar({ activePage, setActivePage }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-gray-70 h-full transition-all duration-300`}   // ❌ removed border-r
    >
      
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <span className="text-xl font-bold text-sky-600">DMS</span>
        )}

        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      
      <nav className="flex flex-col gap-2 px-2 mt-4">
        <button
          onClick={() => setActivePage("users")}
          className={`flex items-center gap-3 px-4 py-2 rounded transition ${
            activePage === "users"
              ? "bg-white shadow text-sky-700"
              : "hover:bg-white"
          }`}
        >
          <FaUsers />
          {!collapsed && "Users"}
        </button>
      </nav>
    </div>
  );
}