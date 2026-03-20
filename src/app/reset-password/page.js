"use client"; 

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (searchParams) {
      setToken(searchParams.get("token") || "");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("Token is missing or invalid");
      return;
    }

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}