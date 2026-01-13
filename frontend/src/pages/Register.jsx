import { useState } from "react";
import { User, Mail, Lock, Users, AlertCircle, UserPlus } from "lucide-react";
import axios from "../api/axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    referredBy: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Name, email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = { ...form };
      if (!payload.referredBy) delete payload.referredBy;

      await axios.post("/auth/register", payload);
      window.location.href = "/";
    } catch {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl
                          flex items-center justify-center mx-auto mb-3">
            <UserPlus className="text-white" size={22} />
          </div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Create Account
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Join the investment platform
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
          {/* Name */}
          <div className="relative">
            <User size={16} className="absolute left-3 top-3 text-slate-400" />
            <input
              placeholder="Full name"
              className="w-full border rounded-lg pl-9 pr-3 py-2
                         focus:ring-2 focus:ring-indigo-200"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg pl-9 pr-3 py-2
                         focus:ring-2 focus:ring-indigo-200"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg pl-9 pr-3 py-2
                         focus:ring-2 focus:ring-indigo-200"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Referral (optional) */}
          <div className="relative">
            <Users size={16} className="absolute left-3 top-3 text-slate-400" />
            <input
              placeholder="Referral ID (optional)"
              className="w-full border rounded-lg pl-9 pr-3 py-2
                         focus:ring-2 focus:ring-indigo-200"
              value={form.referredBy}
              onChange={e => setForm({ ...form, referredBy: e.target.value })}
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
            <UserPlus size={16} />
            {loading ? "Creating account..." : "Register"}
          </button>
        </div>

        {/* Footer */}
        <p className="mt-5 text-sm text-center text-slate-600">
          Already have an account?{" "}
          <Link to="/" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
