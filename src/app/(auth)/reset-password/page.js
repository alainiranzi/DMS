"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams) {
      setToken(searchParams.get("token") || "");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Token is missing or invalid");
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

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setMessage("Password reset successfully! Redirecting...");
        setTimeout(() => router.push("/"), 2000);
      }
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <>
      
      {!message && (
        <h2 className="text-1xl font-bold mb-5 text-center text-black-700">
          Reset Password
        </h2>
      )}

      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      {message && (
        <p className="text-black-700 text-sm mb-4 text-center">{message}</p>
      )}

      {!message && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-sky-200"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? "👁️" : "👁️"}
              </span>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-sky-200"
                required
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showConfirm ? "👁️" : "👁️"}
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
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </>
  );
}