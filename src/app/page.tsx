"use client";

import Link from "next/link";
import {
  Rocket,
  Shield,
  Scale,
  TrendingUp,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Building2,
  CheckCircle2,
  Lock,
  Globe,
  Bot,
  Star,
  Users,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Animated Mesh & Aurora Background */}
      <BackgroundEffects />

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Rocket className="w-4 h-4" />
            </div>
            <span className="text-xl font-black tracking-tight">
              Clear Launch<span className="text-indigo-500 ml-0.5">🚀</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[var(--text-secondary)]">
            <Link
              href="/products"
              className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Products Marketplace</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/10 text-indigo-400 font-bold">
                NEW
              </span>
            </Link>
            <Link
              href="/explore-startups"
              className="hover:text-indigo-400 transition-colors"
            >
              Startups Directory
            </Link>
            <Link
              href="/launchpad"
              className="hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5" /> Govt Launchpad
            </Link>
            <Link
              href="/advocates"
              className="hover:text-indigo-400 transition-colors flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" /> Legal Advocates
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="btn-secondary text-xs px-3.5 py-1.5"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="btn-primary text-xs px-4 py-1.5 hidden sm:inline-flex"
            >
              Launch Startup
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 md:pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-indigo-500/30 text-xs text-indigo-400 font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Legal Navigator • Govt Portals • Global Marketplace</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6">
            From Raw Idea to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400">
              Legally Registered
            </span>{" "}
            Company
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
            An all-in-one startup incubator and compliance assistant. Generate automated legal roadmaps, connect with verified Advocates, navigate direct Government portals, and trade software & hardware.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/register"
              className="btn-primary text-xs sm:text-sm px-6 py-3 flex items-center gap-2 w-full sm:w-auto justify-center shadow-xl shadow-indigo-500/20"
            >
              <Rocket className="w-4 h-4" /> Start Company Filing Free
            </Link>
            <Link
              href="/products"
              className="btn-secondary text-xs sm:text-sm px-6 py-3 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <ShoppingBag className="w-4 h-4 text-indigo-400" /> Browse Marketplace
            </Link>
          </div>

          {/* Trust stats banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-[var(--border-subtle)] text-left">
            <div>
              <p className="text-2xl font-black text-[var(--text-primary)]">98.4%</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">Statutory Filing Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-black text-indigo-400">5 Portals</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">MCA, Startup India, GST</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">250+ Advocates</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">Bar Certified Counsel</p>
            </div>
            <div>
              <p className="text-2xl font-black text-purple-400">100% Secure</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">Encrypted Legal Sessions</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Feature Pillar Cards Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            The Complete Modern Startup Incubator Stack
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Everything an ambitious founder needs to move from inception to Series A.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: AI Legal Compliance Navigator */}
          <div className="glass-card p-6 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">
                AI Legal Compliance Navigator
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Pitch your startup idea and receive instant jurisdiction suitability analysis, mandatory license checklists, and data privacy disclosures.
              </p>
            </div>
            <Link
              href="/register"
              className="text-xs text-indigo-400 font-semibold flex items-center gap-1 group-hover:underline pt-3 border-t border-[var(--border-subtle)]"
            >
              Test Legal Engine &rarr;
            </Link>
          </div>

          {/* Card 2: Government Portal Directory & Company Builder */}
          <div className="glass-card p-6 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">
                Company Builder & Govt Portals
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Step-by-step company incorporation roadmap with direct links to MCA SPICe+, Startup India DPIIT, Udyam MSME, and Trademark portals.
              </p>
            </div>
            <Link
              href="/launchpad"
              className="text-xs text-emerald-400 font-semibold flex items-center gap-1 group-hover:underline pt-3 border-t border-[var(--border-subtle)]"
            >
              Open Govt Launchpad &rarr;
            </Link>
          </div>

          {/* Card 3: Always-Visible Marketplace */}
          <div className="glass-card p-6 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">
                Tech & Hardware Marketplace
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                Buy and sell verified production code boilerplates, fine-tuned AI agent RAG models, and industrial IoT dev kits from verified engineers.
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs text-purple-400 font-semibold flex items-center gap-1 group-hover:underline pt-3 border-t border-[var(--border-subtle)]"
            >
              Explore Products &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--card-bg)] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Rocket className="w-3.5 h-3.5" />
            </div>
            <span className="text-sm font-bold">
              Clear Launch<span className="text-indigo-500 ml-0.5">🚀</span>
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)] text-center md:text-left max-w-md">
            ⚖️ Clear Launch provides automated legal routing, statutory compliance workflows, and directory services. It does not provide legal advice. Consult verified advocates for sensitive filings.
          </p>

          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <Link href="/products" className="hover:text-indigo-400">Marketplace</Link>
            <Link href="/launchpad" className="hover:text-indigo-400">Launchpad</Link>
            <Link href="/advocates" className="hover:text-indigo-400">Advocates</Link>
            <Link href="/login" className="hover:text-indigo-400">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
