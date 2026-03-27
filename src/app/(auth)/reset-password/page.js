"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Password updated successfully");
        setTimeout(() => router.push("/"), 2000);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-5 text-center text-black">
        Reset Password
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      {message && (
        <p className="text-green-600 text-sm mb-4 text-center">{message}</p>
      )}

      {!message && (
        <form onSubmit={handleReset}>
          
          <div className="mb-4">
            <label className="block mb-1 text-sm">New Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                👁️
              </span>
            </div>
          </div>

          
          <div className="mb-6">
            <label className="block mb-1 text-sm">Confirm Password</label>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />

              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                👁️
              </span>
            </div>
          </div>

         
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-500 hover:to-sky-700"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </>
  );
}