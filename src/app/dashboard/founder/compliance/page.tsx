"use client";

import { useState } from "react";
import {
  Shield,
  Send,
  Loader2,
  MapPin,
  CheckSquare,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  Building,
} from "lucide-react";
import Link from "next/link";

interface ComplianceResult {
  geographicalSuitability: {
    recommended: { region: string; reason: string }[];
    cautionary: { region: string; reason: string }[];
  };
  complianceChecklist: {
    item: string;
    category: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
    description: string;
  }[];
  actionableLinks: {
    title: string;
    url: string;
    description: string;
  }[];
  summary: string;
}

export default function CompliancePage() {
  const [idea, setIdea] = useState("");
  const [targetRegion, setTargetRegion] = useState("");
  const [businessModel, setBusinessModel] = useState("B2C");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<ComplianceResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const res = await fetch("/api/compliance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: idea.trim(),
          targetRegion: targetRegion.trim() || undefined,
          businessModel,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to analyze. Please try again.");
        return;
      }

      setResults(data.results);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const priorityColor = (p: string) => {
    switch (p) {
      case "HIGH":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "MEDIUM":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      case "LOW":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      default:
        return "text-slate-400 bg-slate-800";
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/founder"
          className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-indigo-400 transition-colors mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Founder Dashboard
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" /> RAG Legal Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
          <Shield className="w-7 h-7 text-indigo-400" />
          AI Legal Compliance & Statutory Navigator
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)]">
          Describe your startup concept. Our AI will analyze mandatory licenses, data regulations, and jurisdictional suitability.
        </p>
      </div>

      {/* Intake Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
            Describe your startup or technology idea *
          </label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder='e.g. "AI-powered drone delivery platform for medicines across urban hospital clusters, storing patient EHR health records with biometric signature verification"'
            rows={4}
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
              Target Geographical Market (optional)
            </label>
            <input
              value={targetRegion}
              onChange={(e) => setTargetRegion(e.target.value)}
              placeholder="e.g. India, United States, EU, Singapore"
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
              Business Model
            </label>
            <select
              value={businessModel}
              onChange={(e) => setBusinessModel(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="B2C">B2C (Business to Consumer)</option>
              <option value="B2B">B2B (Business to Business Enterprise)</option>
              <option value="B2B2C">B2B2C (Hybrid Platform)</option>
              <option value="D2C">D2C (Direct to Consumer Hardware)</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !idea.trim()}
          className="btn-primary text-xs px-6 py-2.5 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Cross-Referencing Global Statutes...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Run Statutory Compliance Analysis
            </>
          )}
        </button>
      </form>

      {/* Results Display */}
      {results && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="glass-panel p-6">
            <h2 className="text-base font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Executive Compliance Summary
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {results.summary}
            </p>
          </div>

          {/* Geographical Suitability */}
          <div className="glass-panel p-6">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-400" /> Geographical Suitability
            </h2>
            {results.geographicalSuitability.recommended.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  ✅ Recommended Jurisdictions
                </h3>
                <div className="space-y-2">
                  {results.geographicalSuitability.recommended.map((r, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3"
                    >
                      <span className="font-bold text-[var(--text-primary)]">{r.region}</span>
                      <span className="text-[var(--text-secondary)]">— {r.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {results.geographicalSuitability.cautionary.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-2">
                  ⚠️ Cautionary Jurisdictions
                </h3>
                <div className="space-y-2">
                  {results.geographicalSuitability.cautionary.map((r, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3"
                    >
                      <span className="font-bold text-[var(--text-primary)]">{r.region}</span>
                      <span className="text-[var(--text-secondary)]">— {r.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Compliance Checklist */}
          <div className="glass-panel p-6">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-indigo-400" /> Mandatory Statutory Checklist
            </h2>
            <div className="space-y-3">
              {results.complianceChecklist.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h4 className="text-xs font-bold text-[var(--text-primary)]">{item.item}</h4>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-bold flex-shrink-0 ${priorityColor(
                        item.priority
                      )}`}
                    >
                      {item.priority} PRIORITY
                    </span>
                  </div>
                  <p className="text-[11px] text-indigo-400 mb-1">{item.category}</p>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Government Links */}
          <div className="glass-panel p-6">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-indigo-400" /> Actionable Government & Regulatory Links
            </h2>
            <div className="space-y-3">
              {results.actionableLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] hover:border-indigo-500/50 transition-colors group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
                      {link.title}
                    </h4>
                    <ExternalLink className="w-3 h-3 text-indigo-400" />
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">{link.description}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Next Steps CTA */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[var(--text-secondary)]">
              Ready to execute these filings? Connect with an accredited legal counsel.
            </span>
            <Link href="/advocates" className="btn-primary text-xs py-1.5 px-3.5 whitespace-nowrap">
              Hire Verified Advocate
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
