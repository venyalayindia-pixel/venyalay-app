import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export default function AdminLogin() {
  const { isAdmin, login } = useAdmin();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (isAdmin) return <Navigate to="/admin" replace />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate("/admin");
    } else {
      setError("Incorrect password. Try the demo password below.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal px-5">
      <form onSubmit={handleSubmit} noValidate className="w-full max-w-sm bg-white rounded-3xl p-6">
        <div className="w-11 h-11 rounded-full bg-cream-deep flex items-center justify-center mb-4">
          <Lock size={18} className="text-maroon" />
        </div>
        <h1 className="font-display text-xl font-semibold text-charcoal">Admin Sign In</h1>
        <p className="text-xs text-[#9a938a] mt-1">VENYALAY secure dashboard access.</p>

        <label htmlFor="admin-password" className="text-xs font-semibold text-[#6b6560] block mt-5">Password</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? "admin-password-error" : undefined}
          className="w-full mt-1 rounded-xl px-4 py-3 text-sm bg-cream-deep outline-none"
        />
        {error && <p id="admin-password-error" role="alert" className="text-xs text-maroon mt-1">{error}</p>}

        <button type="submit" className="w-full mt-5 py-3 rounded-full text-sm font-bold bg-maroon text-white">Sign In</button>
        <p className="text-[11px] text-[#9a938a] mt-4 text-center">Demo password: <span className="font-mono">venyalay-admin</span></p>
      </form>
    </div>
  );
}
