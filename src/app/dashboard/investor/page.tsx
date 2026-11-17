import { auth } from "@/auth";
import { MOCK_STARTUPS } from "@/lib/mockData";
import { TrendingUp, ShieldCheck, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function InvestorDashboard() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "Investor";

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 sm:p-8 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-emerald-500/5 border-purple-500/20">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Welcome back, <span className="text-purple-400">{firstName}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
          Discover vetted, compliance-cleared tech startups actively raising Seed and Series A capital with verified cap tables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <span className="text-xs text-[var(--text-muted)] font-medium">Compliance-Verified Pipeline</span>
          <p className="text-2xl font-bold text-indigo-400 mt-1">{MOCK_STARTUPS.length} Startups</p>
          <p className="text-[11px] text-emerald-400 mt-1">100% legal due diligence ready</p>
        </div>
        <div className="glass-card p-5">
          <span className="text-xs text-[var(--text-muted)] font-medium">Average Compliance Score</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">94.8%</p>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">Across IP, MCA, and Tax</p>
        </div>
        <div className="glass-card p-5">
          <span className="text-xs text-[var(--text-muted)] font-medium">Marketplace Tech Assets</span>
          <p className="text-2xl font-bold text-purple-400 mt-1">Verified</p>
          <p className="text-[11px] text-purple-400 mt-1">
            <Link href="/products">Browse Assets &rarr;</Link>
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Curated Deal Flow</h2>
          <Link
            href="/dashboard/explore/startups"
            className="text-xs text-indigo-400 font-semibold"
          >
            Explore all startups &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_STARTUPS.map((s) => (
            <div key={s.id} className="glass-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm">{s.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-bold">
                    Target: {s.fundingNeeded}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
                  {s.description}
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-between items-center text-xs">
                <span className="text-emerald-400 font-semibold">Score: {s.complianceScore}%</span>
                <Link
                  href="/dashboard/explore/startups"
                  className="btn-primary text-xs py-1 px-3"
                >
                  Review Deal Sheet
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
