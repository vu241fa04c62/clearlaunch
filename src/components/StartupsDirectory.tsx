"use client";

import { useState } from "react";
import { MOCK_STARTUPS, Startup } from "@/lib/mockData";
import { UserAvatar } from "@/components/UserAvatar";
import {
  Search,
  SlidersHorizontal,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  Sparkles,
  ArrowRight,
  X,
  Building,
  Target,
} from "lucide-react";

export function StartupsDirectory({ inDashboard = false }: { inDashboard?: boolean }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [activeStartup, setActiveStartup] = useState<Startup | null>(null);

  const categories = ["All", "AI & ML", "FinTech", "Hardware & IoT", "EdTech", "CleanTech", "SaaS"];
  const stages = ["All", "Idea", "Prototype", "Seed", "Series A", "Bootstrapped"];

  const filteredStartups = MOCK_STARTUPS.filter((s) => {
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    const matchesStage = selectedStage === "All" || s.stage === selectedStage;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tagline.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesStage && matchesSearch;
  });

  return (
    <div>
      {/* Title & Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
              Explore Verified Startups
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Browse emerging tech startups that have passed Clear Launch legal and regulatory compliance checks.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search startups, keywords..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="space-y-3">
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-indigo-400/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stage Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mr-1">
              Stage:
            </span>
            {stages.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStage(st)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedStage === st
                    ? "bg-emerald-600 text-white"
                    : "bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-emerald-400/40"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Startup Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStartups.map((startup) => (
          <div
            key={startup.id}
            className="glass-card p-6 flex flex-col justify-between group hover:border-indigo-500/50"
          >
            <div>
              {/* Header with Logo, Name & Compliance Score */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-[var(--border-subtle)] flex-shrink-0">
                    <img
                      src={startup.logo}
                      alt={startup.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[var(--text-primary)] group-hover:text-indigo-400 transition-colors">
                      {startup.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-indigo-400 font-medium">
                        {startup.category}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">•</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        {startup.stage}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Compliance Badge */}
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold"
                  title="Legal & Regulatory Compliance Score"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{startup.complianceScore}% Verified</span>
                </div>
              </div>

              {/* Tagline & Description */}
              <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">
                {startup.tagline}
              </p>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3 mb-4">
                {startup.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {startup.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] mb-5 text-center">
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase">Traction</p>
                  <p className="text-xs font-bold text-[var(--text-primary)]">{startup.metrics.users}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase">Revenue / ARR</p>
                  <p className="text-xs font-bold text-emerald-400">{startup.metrics.arr}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase">Growth</p>
                  <p className="text-xs font-bold text-indigo-400">{startup.metrics.growth}</p>
                </div>
              </div>
            </div>

            {/* Bottom Founder Info & Action */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <p className="text-[10px] text-[var(--text-muted)] mb-1">Founder & Team</p>
                <UserAvatar
                  userId={startup.founderId}
                  name={startup.founderName}
                  avatar={startup.founderAvatar}
                  subtitle={startup.founderRole}
                  size="sm"
                  showName={true}
                />
              </div>

              <button
                onClick={() => setActiveStartup(startup)}
                className="btn-secondary text-xs px-3.5 py-1.5 flex items-center gap-1.5 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all cursor-pointer"
              >
                View Deal Sheet <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Startup Details Modal */}
      {activeStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveStartup(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-800 border border-[var(--border-subtle)]">
                <img
                  src={activeStartup.logo}
                  alt={activeStartup.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{activeStartup.name}</h2>
                <p className="text-xs text-indigo-400 font-semibold">{activeStartup.tagline}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 font-semibold">
                Category: {activeStartup.category}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold">
                Stage: {activeStartup.stage}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 font-semibold">
                Target Round: {activeStartup.fundingNeeded}
              </span>
            </div>

            <div className="space-y-4 mb-6 text-xs text-[var(--text-secondary)] leading-relaxed">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Company Overview & Thesis
              </h4>
              <p>{activeStartup.description}</p>
            </div>

            {/* Compliance Verified Breakdown */}
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 mb-6">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-2">
                <ShieldCheck className="w-4 h-4" /> Verified Compliance Credentials
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-muted)]">
                {activeStartup.tags.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Founder connect */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
              <div>
                <p className="text-[11px] text-[var(--text-muted)]">Lead Founder</p>
                <UserAvatar
                  userId={activeStartup.founderId}
                  name={activeStartup.founderName}
                  avatar={activeStartup.founderAvatar}
                  subtitle={activeStartup.founderRole}
                  size="sm"
                  showName={true}
                />
              </div>

              <div className="flex items-center gap-2">
                {activeStartup.website && (
                  <a
                    href={activeStartup.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs px-3.5 py-2 flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Visit Site
                  </a>
                )}
                <a
                  href={`/profile/${activeStartup.founderId}`}
                  className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5"
                >
                  Connect with Founder
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
