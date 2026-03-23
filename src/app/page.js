"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4 text-sky-700">DMS</h1>
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-95"
      >
        <h2 className="text-1xl font-bold mb-5 text-center text-black">
          Welcome Back
        </h2>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-200"
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm">Password</label>
            <a
              href="/forgot-password"
              className="text-sm text-gray-600 hover:text-sky-500 hover:underline"
            >
              Forgot password?
            </a>
          </div>

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
              {showPassword ? "👁️" : "👁️"}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white transition font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-500 hover:to-sky-700"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}