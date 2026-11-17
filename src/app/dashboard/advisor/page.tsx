import { auth } from "@/auth";
import { MOCK_STARTUPS } from "@/lib/mockData";
import { Scale, Users, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function AdvisorDashboard() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "Advisor";

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 sm:p-8 bg-gradient-to-r from-emerald-500/10 via-indigo-500/5 to-purple-500/5 border-emerald-500/20">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Welcome back, <span className="text-emerald-400">{firstName}</span>
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
          Review incoming compliance leads from vetted tech startups and assist them with incorporation, trademark filings, and cross-border structuring.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5">
          <span className="text-xs text-[var(--text-muted)] font-medium">New Startup Leads</span>
          <p className="text-2xl font-bold text-emerald-400 mt-1">4 Active</p>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">Ready for SPICe+ & IP filings</p>
        </div>
        <div className="glass-card p-5">
          <span className="text-xs text-[var(--text-muted)] font-medium">Verified Advocates</span>
          <p className="text-2xl font-bold text-indigo-400 mt-1">Bar Certified</p>
          <p className="text-[11px] text-indigo-400 mt-1">
            <Link href="/advocates">View Public Registry &rarr;</Link>
          </p>
        </div>
        <div className="glass-card p-5">
          <span className="text-xs text-[var(--text-muted)] font-medium">Official Portals</span>
          <p className="text-2xl font-bold text-purple-400 mt-1">5 Integrated</p>
          <p className="text-[11px] text-purple-400 mt-1">
            <Link href="/launchpad">MCA & Startup India Portals &rarr;</Link>
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-4">Startups Seeking Legal Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_STARTUPS.slice(0, 2).map((s) => (
            <div key={s.id} className="glass-card p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm">{s.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                    {s.complianceScore}% Verified
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
                  {s.description}
                </p>
              </div>
              <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-between items-center text-xs">
                <span className="text-[var(--text-muted)]">Stage: {s.stage}</span>
                <Link
                  href={`/profile/${s.founderId}`}
                  className="btn-primary text-xs py-1 px-3"
                >
                  Contact Founder
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
