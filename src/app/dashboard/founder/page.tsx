import { auth } from "@/auth";
import { MOCK_STARTUPS, MOCK_ADVOCATES } from "@/lib/mockData";
import { Shield, Sparkles, ArrowRight, Activity, Scale, Building2, Bot } from "lucide-react";
import Link from "next/link";

export default async function FounderDashboard() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "Founder";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-emerald-500/5 border-indigo-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Founder Launchpad Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, <span className="text-indigo-400">{firstName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
              Track legal compliance status, access official incorporation portals, and hire verified legal advisors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/founder/compliance"
              className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" /> AI Compliance Check
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)] font-medium">Compliance Readiness</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-400">94%</p>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">SPICe+ & DPIIT Ready</p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)] font-medium">Govt Portals Connected</span>
            <Building2 className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">5 Portals</p>
          <p className="text-[11px] text-indigo-400 mt-1">
            <Link href="/launchpad">View Guidelines &rarr;</Link>
          </p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)] font-medium">Verified Advocates</span>
            <Scale className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_ADVOCATES.length}</p>
          <p className="text-[11px] text-amber-400 mt-1">
            <Link href="/advocates">Book Call &rarr;</Link>
          </p>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)] font-medium">AI Co-Founder</span>
            <Bot className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-bold text-purple-400">Active</p>
          <p className="text-[11px] text-purple-400 mt-1">
            <Link href="/dashboard/ai-cofounder">Open Workspace &rarr;</Link>
          </p>
        </div>
      </div>

      {/* AI Compliance Check CTA */}
      <div className="glass-panel p-6 sm:p-8 border-indigo-500/30">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-1">
              AI Legal Compliance & Statutory Roadmap Navigator
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              Describe your startup idea and our Gemini Pro legal pipeline will extract industry categories, cross-examine global regulatory requirements, and output a prioritized statutory checklist.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/founder/compliance"
                className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
              >
                Run Free Compliance Check <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/launchpad"
                className="btn-secondary text-xs px-4 py-2 flex items-center gap-1.5"
              >
                Open Govt Company Builder
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
