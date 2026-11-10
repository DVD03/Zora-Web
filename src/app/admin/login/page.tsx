'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Authentication failed.');
        setLoading(false);
        return;
      }

      // Full navigation so browser sends the newly issued HttpOnly JWT cookie
      window.location.assign('/admin');
    } catch {
      setError('Network error while connecting to Zora Auth Gateway.');
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#030712] px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid bg-[size:48px_48px] opacity-25" />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 font-mono text-xs text-slate-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Zora Solutions Website</span>
        </Link>

        <div className="rounded-3xl border border-white/25 bg-[#071022] p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/10 p-2.5 shadow-lg">
              <img
                src="/assets/logo.png"
                alt="Zora Solutions Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 font-mono text-[11px] font-bold text-amber-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>FOUNDER ADMIN PORTAL</span>
            </div>

            <h1 className="mt-3 font-display text-2xl font-extrabold text-white">
              Zora Solutions Admin
            </h1>
            <p className="mt-1 text-xs text-slate-300">
              Sign in with your authorized founder credentials to manage inquiries, quotations, and projects.
            </p>
          </div>

          {error && (
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 text-xs text-rose-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block font-mono text-xs font-semibold uppercase text-slate-200">
                Founder Email
              </label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter founder email..."
                  className="w-full rounded-xl border border-white/20 bg-[#02050D] pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-semibold uppercase text-slate-200">
                Master Password
              </label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter CMS password..."
                  className="w-full rounded-xl border border-white/20 bg-[#02050D] pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-display text-sm font-extrabold text-[#030712] shadow-lg transition-colors hover:bg-[#00F0FF] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In to Admin Dashboard</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
