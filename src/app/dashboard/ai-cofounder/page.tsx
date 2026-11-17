"use client";

import { useState } from "react";
import { MOCK_USERS } from "@/lib/mockData";
import { UserAvatar } from "@/components/UserAvatar";
import {
  Bot,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building,
  Scale,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function AiCoFounderWorkspacePage() {
  const [activeTab, setActiveTab] = useState<"validate" | "guide" | "match">("validate");
  const [ideaInput, setIdeaInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaInput.trim()) return;

    setAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      setAnalysisResult({
        title: ideaInput.slice(0, 40) + "...",
        verdict: "GO",
        score: 89,
        marketDemand: "High (Estimated TAM of $4.2B in B2B Automation and Cross-Border Compliance).",
        techComplexity: "Moderate — Can be launched initially as a modular Next.js web application utilizing edge vector embeddings.",
        regulatoryHurdles: "Data protection rules (GDPR / Indian DPDP Act 2023). Requires standard Data Processing Addendums (DPA) and Privacy Disclaimers.",
        actionPlan: [
          { step: "Phase 1: Legal Incorporation", desc: "Register as a Private Limited Company or Delaware C-Corp via SPICe+ Part A/B." },
          { step: "Phase 2: Intellectual Property", desc: "File Form TM-A on IP India to protect brand identity with 80% startup discount." },
          { step: "Phase 3: Co-Founder & Tech Build", desc: "Partner with verified embedded or full-stack developers on the Clear Launch network." },
        ],
        suggestedCoFounders: [MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[3]],
      });
      setAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen Startup Intelligence
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Personal AI Co-Founder & Advisory Workspace
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Validate business feasibility, get instant company registration instructions, and discover verified co-founders.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--border-subtle)] gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab("validate")}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "validate"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          🚀 1. Idea Feasibility & Go / No-Go Analyzer
        </button>
        <button
          onClick={() => setActiveTab("guide")}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "guide"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          🏛️ 2. Company Registration & Govt Portal Guide
        </button>
        <button
          onClick={() => setActiveTab("match")}
          className={`pb-3 border-b-2 transition-colors cursor-pointer ${
            activeTab === "match"
              ? "border-purple-500 text-purple-400"
              : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          }`}
        >
          🤝 3. Smart Co-Founder Matchmaking
        </button>
      </div>

      {/* Tab 1: Idea Validator */}
      {activeTab === "validate" && (
        <div className="space-y-6">
          <form onSubmit={handleAnalyze} className="glass-panel p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" /> Pitch Your Startup Idea
            </h2>
            <textarea
              rows={4}
              value={ideaInput}
              onChange={(e) => setIdeaInput(e.target.value)}
              placeholder="e.g. An AI-powered continuous legal compliance monitor for cross-border software startups selling into the EU and US..."
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-sm focus:border-indigo-500 focus:outline-none transition-colors resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">
                Our AI analyzes Market Demand, Tech Complexity, and Legal Exposure.
              </span>
              <button
                type="submit"
                disabled={analyzing || !ideaInput.trim()}
                className="btn-primary text-xs px-5 py-2.5 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {analyzing ? "Running Deep Analysis..." : "Run Feasibility Check"}
              </button>
            </div>
          </form>

          {analysisResult && (
            <div className="glass-panel p-6 sm:p-8 space-y-6 border-indigo-500/40">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                    Analysis Report
                  </span>
                  <h3 className="text-xl font-bold">{analysisResult.title}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-black tracking-wider">
                    VERDICT: {analysisResult.verdict} ({analysisResult.score}/100)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                    Market Viability
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {analysisResult.marketDemand}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
                    Tech Complexity
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {analysisResult.techComplexity}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                    Legal & Compliance
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {analysisResult.regulatoryHurdles}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  Strategic Action Plan
                </h4>
                <div className="space-y-2.5">
                  {analysisResult.actionPlan.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-[var(--text-primary)]">{item.step}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  Recommended Mutual-Interest Co-Founders & Advocates
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {analysisResult.suggestedCoFounders.map((user: any) => (
                    <div
                      key={user.id}
                      className="p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-between"
                    >
                      <UserAvatar
                        userId={user.id}
                        name={user.name}
                        avatar={user.avatar}
                        subtitle={user.profession}
                        size="sm"
                        showName={true}
                      />
                      <Link
                        href={`/profile/${user.id}`}
                        className="text-xs text-indigo-400 hover:underline"
                      >
                        Profile
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Legal Guide */}
      {activeTab === "guide" && (
        <div className="space-y-6">
          <div className="glass-panel p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-400" /> Startup Registration Step-by-Step
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              To incorporate a technology company with VC readiness, we recommend a <strong>Private Limited Company (India)</strong> or a <strong>Delaware C-Corporation (US)</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-2">
                <span className="text-xs font-bold text-emerald-400">Step 1: MCA SPICe+ Portal</span>
                <p className="text-xs text-[var(--text-muted)]">
                  Submit Part A for name reservation, then Part B for Certificate of Incorporation, PAN, TAN, and current bank account.
                </p>
                <a
                  href="https://www.mca.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400 flex items-center gap-1 font-semibold"
                >
                  Visit MCA Portal <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] space-y-2">
                <span className="text-xs font-bold text-indigo-400">Step 2: Startup India DPIIT</span>
                <p className="text-xs text-[var(--text-muted)]">
                  Apply for DPIIT recognition within 30 days to claim 3-year Section 80-IAC income tax exemptions and patent subsidies.
                </p>
                <a
                  href="https://www.startupindia.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400 flex items-center gap-1 font-semibold"
                >
                  Visit Startup India <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-between items-center">
              <span className="text-xs text-[var(--text-muted)]">
                Want a professional to handle your filings directly?
              </span>
              <Link href="/advocates" className="btn-primary text-xs px-4 py-2">
                Browse Verified Legal Advocates
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Co-Founder Matchmaking */}
      {activeTab === "match" && (
        <div className="space-y-6">
          <div className="glass-panel p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" /> AI Co-Founder & Partner Discovery
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Our neural matchmaking matches technical builders, hardware engineers, and legal counsels based on mutual startup interests and complementary tech stacks.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {MOCK_USERS.map((user) => (
                <div
                  key={user.id}
                  className="glass-card p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <UserAvatar
                        userId={user.id}
                        name={user.name}
                        avatar={user.avatar}
                        subtitle={user.profession}
                        size="md"
                        showName={true}
                      />
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                        {user.role}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
                      {user.bio}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {user.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-medium">
                      94% Match Compatibility
                    </span>
                    <Link
                      href={`/profile/${user.id}`}
                      className="btn-secondary text-xs px-3 py-1 flex items-center gap-1"
                    >
                      View Profile <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
