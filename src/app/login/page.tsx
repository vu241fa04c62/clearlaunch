"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Rocket, Mail, Lock, ArrowRight, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  // Strictly empty initial states to prevent unwanted pre-fill
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please verify your email and password.");
      } else {
        // Use full navigation to ensure session cookie is processed on both cloud and local
        window.location.href = "/dashboard";
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Dynamic Animated Aurora Background */}
      <BackgroundEffects />

      {/* Top Controls */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3">
        <ThemeToggle />
        <Link href="/" className="btn-secondary text-xs px-3.5 py-1.5">
          Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="flex items-center gap-2.5 mb-2 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-400 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight">
              Clear Launch<span className="text-indigo-500 ml-0.5">🚀</span>
            </span>
          </Link>
          <span className="text-xs text-[var(--text-muted)] font-medium">
            AI Compliance Navigator & Startup Marketplace
          </span>
        </div>

        {/* Login Card */}
        <div className="glass-panel p-8 shadow-2xl border-[var(--border-prominent)]">
          <div className="mb-6">
            <h1 className="text-xl font-bold tracking-tight">Sign in to your account</h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Access your startup dashboard, AI compliance logs, and deal flow.
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
            >
              <span>{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@example.com"
                  required
                  autoComplete="off"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold text-[var(--text-secondary)]"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying Credentials...
                </>
              ) : (
                <>
                  Sign In to Dashboard <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Register Link */}
        <p className="text-center mt-6 text-xs text-[var(--text-muted)]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            Create an account
          </Link>
        </p>

        {/* Legal Disclaimer */}
        <p className="text-center mt-6 text-[11px] text-[var(--text-muted)] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Automated routing & compliance navigation. Not legal counsel.</span>
        </p>
      </motion.div>
    </div>
  );
}
