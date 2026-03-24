"use client";

import { useState } from "react";
import { postData } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await postData("/api/forgot-password", { email });
      setMessage("We sent a reset link to your email");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <>
      {!message && (
        <h2 className="text-1xl font-bold mb-5 text-center text-black-700">
          Forgot Password
        </h2>
      )}
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      {message && <p className="text-black-700 text-sm mb-4 text-center">{message}</p>}

      {!message && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-200"
              required
            />
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      )}
    </>
  );
}