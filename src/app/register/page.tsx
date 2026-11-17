"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Rocket,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Briefcase,
  Scale,
  TrendingUp,
  Globe,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { ThemeToggle } from "@/components/ThemeToggle";

const ROLES = [
  {
    value: "ENTREPRENEUR",
    label: "Entrepreneur",
    icon: Briefcase,
    desc: "Launch & validate startup ideas with AI",
  },
  {
    value: "LAWYER",
    label: "Legal Advisor",
    icon: Scale,
    desc: "Provide incorporation & filing counsel",
  },
  {
    value: "INVESTOR",
    label: "Investor",
    icon: TrendingUp,
    desc: "Discover compliance-verified deal flow",
  },
  {
    value: "USER",
    label: "Explorer",
    icon: Globe,
    desc: "Browse products & startup directory",
  },
] as const;

export default function RegisterPage() {
  const router = useRouter();
  // Strictly empty initial states to avoid ugly browser autofill
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("ENTREPRENEUR");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
        return;
      }

      // Redirect to login on success
      window.location.href = "/login?registered=true";
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
        className="relative z-10 w-full max-w-lg"
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
            Join the Next-Gen Startup & Legal Compliance Network
          </span>
        </div>

        {/* Register Card */}
        <div className="glass-panel p-8 shadow-2xl border-[var(--border-prominent)]">
          <div className="mb-6">
            <h1 className="text-xl font-bold tracking-tight">Create your account</h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Select your track and access your customized incubator workspace.
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
            {/* Role Selection Grid */}
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-2">
                I am registering as a:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const isSelected = role === r.value;
                  return (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value)}
                      className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-indigo-600/10 border-indigo-500 text-indigo-400 shadow-sm"
                          : "bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-slate-400"
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? "text-indigo-400" : "text-[var(--text-muted)]"}`} />
                      <span className="text-xs font-bold leading-tight">{r.label}</span>
                      <span className="text-[10px] text-[var(--text-muted)] mt-0.5 leading-tight line-clamp-1">
                        {r.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="register-name"
                className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Patel"
                  required
                  autoComplete="off"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                <input
                  id="register-email"
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
              <label
                htmlFor="register-password"
                className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5"
              >
                Password (min 6 characters)
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
                <input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Provisioning Account...
                </>
              ) : (
                <>
                  Create {role === "ENTREPRENEUR" ? "Founder" : role === "LAWYER" ? "Advisor" : role === "INVESTOR" ? "Investor" : "Member"} Account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center mt-6 text-xs text-[var(--text-muted)]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
          >
            Sign in
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
