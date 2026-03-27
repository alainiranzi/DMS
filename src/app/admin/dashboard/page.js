"use client";

import { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import UsersPage from "./components/users";
import { Toaster } from "react-hot-toast";

export default function DashboardPage() {
  const [activePage, setActivePage] = useState("users");

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-right" />

      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          {activePage === "users" && <UsersPage />}
        </main>
      </div>
    </div>
  );
}