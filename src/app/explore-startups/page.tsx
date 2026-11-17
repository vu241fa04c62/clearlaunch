import { StartupsDirectory } from "@/components/StartupsDirectory";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ExploreStartupsPublicPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-[var(--border-subtle)] bg-[var(--card-bg)] backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">
              Clear Launch<span className="text-indigo-500 ml-0.5">🚀</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
            <Link
              href="/explore-startups"
              className="text-indigo-500 font-semibold"
            >
              Startups
            </Link>
            <Link
              href="/products"
              className="text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/launchpad"
              className="text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
            >
              Govt Launchpad
            </Link>
            <Link
              href="/advocates"
              className="text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
            >
              Legal Advocates
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/dashboard" className="btn-secondary text-xs px-3.5 py-1.5">
            Dashboard
          </Link>
          <Link href="/login" className="btn-primary text-xs px-3.5 py-1.5">
            Sign In
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StartupsDirectory inDashboard={false} />
      </main>
    </div>
  );
}
