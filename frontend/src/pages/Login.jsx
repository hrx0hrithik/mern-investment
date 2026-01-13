import { useState } from "react";
import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to your account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50
                          border border-red-200 text-red-700
                          rounded-lg px-3 py-2 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg pl-9 pr-3 py-2
                         focus:ring-2 focus:ring-indigo-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg pl-9 pr-3 py-2
                         focus:ring-2 focus:ring-indigo-200"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {/* Button */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2
                       bg-indigo-600 hover:bg-indigo-700
                       text-white py-2 rounded-lg
                       transition disabled:opacity-60"
          >
            <LogIn size={16} />
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>

        {/* Footer */}
        <p className="mt-5 text-sm text-center text-slate-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
