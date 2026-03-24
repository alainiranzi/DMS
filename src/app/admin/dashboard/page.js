"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex h-screen bg-white">
    
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

    
      <div className="flex-1 flex flex-col">
        <Header />

        
        {activePage === "users" && (
          <div className="px-6 pt-2">
            <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
          </div>
        )}

        
        <main className="flex-1 px-6 mt-2">
          {activePage === "users" && (
            <p className="text-gray-400 italic">
              Users will appear here once added to the system.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}