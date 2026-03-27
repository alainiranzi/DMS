"use client";

import { useEffect, useState } from "react";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    const res = await fetch("/api/admins");
    const data = await res.json();
    setAdmins(data.admins);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Admins</h2>

      {admins.map((a) => (
        <div key={a._id} className="border p-2 mb-2">
          {a.email}
        </div>
      ))}
    </div>
  );
}