"use client";

import { useState } from "react";
import { MOCK_GOVT_PORTALS, GovtPortal } from "@/lib/mockData";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import {
  Building2,
  CheckCircle2,
  ExternalLink,
  FileText,
  Shield,
  HelpCircle,
  Clock,
  Coins,
  ArrowRight,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Scale,
  Award,
} from "lucide-react";

export default function LaunchpadPage() {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    pan: true,
    aadhaar: true,
  });

  const legalDocs = [
    { id: "pan", name: "Permanent Account Number (PAN)", portal: "Income Tax / NSDL", mandatory: true },
    { id: "aadhaar", name: "Aadhaar Card (Linked with Mobile)", portal: "UIDAI", mandatory: true },
    { id: "dsc", name: "Class 3 Digital Signature Certificate (DSC)", portal: "Certifying Authority (e-Mudhra)", mandatory: true },
    { id: "din", name: "Director Identification Number (DIN)", portal: "MCA Portal (SPICe+)", mandatory: true },
    { id: "moa", name: "Memorandum & Articles of Association (MOA/AOA)", portal: "MCA e-MOA (INC-33)", mandatory: true },
    { id: "name", name: "RUN / SPICe+ Part A Name Reservation", portal: "mca.gov.in", mandatory: true },
    { id: "gst", name: "GST Registration Certificate", portal: "gst.gov.in", mandatory: false },
    { id: "msme", name: "Udyam MSME Registration Certificate", portal: "udyamregistration.gov.in", mandatory: false },
    { id: "tm", name: "Trademark Registration (Form TM-A)", portal: "ipindia.gov.in", mandatory: false },
    { id: "startupindia", name: "DPIIT Startup India Recognition", portal: "startupindia.gov.in", mandatory: false },
  ];

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / legalDocs.length) * 100);

  const stages = [
    {
      step: 1,
      title: "Idea Validation & Entity Selection",
      description: "Pick the optimal business structure for funding, liability, and tax efficiency.",
      details: [
        "Private Limited Company (Pvt Ltd): Ideal for startups seeking VC/Angel funding; limited liability, separate legal personality.",
        "Limited Liability Partnership (LLP): Excellent for professional agencies, bootstrapped tech businesses with lower statutory audit costs.",
        "One Person Company (OPC): Single founder with corporate limited liability shield.",
        "Sole Proprietorship: Fast to start for freelancers, but unlimited personal liability.",
      ],
      estimatedDays: "1 - 2 Days",
    },
    {
      step: 2,
      title: "Digital Signatures & Identity Credentials",
      description: "Acquire mandatory cryptographic credentials before government portal submission.",
      details: [
        "Obtain Class 3 DSC with encrypted USB token for each designated Director.",
        "Verify Aadhaar phone OTP linkage for rapid instant KYC.",
        "Gather address proof for registered business premises (Utility bill < 2 months old + NOC from owner).",
      ],
      estimatedDays: "24 - 48 Hours",
    },
    {
      step: 3,
      title: "Name Reservation (SPICe+ Part A / RUN)",
      description: "Apply for a unique business moniker complying with MCA name availability guidelines.",
      details: [
        "Check IP India trademark database to ensure no conflicting registered marks exist in Class 9, 35, 42.",
        "Submit 2 proposed distinct names through MCA SPICe+ Part A portal.",
        "Name must reflect principal business activity (e.g. 'Tech Solutions', 'Technologies', 'Innovations').",
      ],
      estimatedDays: "2 - 3 Days",
    },
    {
      step: 4,
      title: "Integrated Incorporation Filing (SPICe+ Part B)",
      description: "Single-window filing that delivers Certificate of Incorporation (CIN), PAN, TAN, EPFO & ESIC.",
      details: [
        "Draft electronic Memorandum of Association (e-MOA INC-33) and Articles of Association (e-AOA INC-34).",
        "Generate INC-9 Director non-conviction declaration signed digitally with DSC.",
        "Select designated integrated bank for instant corporate current account opening via AGILE-PRO-S.",
      ],
      estimatedDays: "3 - 5 Days",
    },
    {
      step: 5,
      title: "Post-Incorporation Compliance & DPIIT Benefits",
      description: "Unlock government startup tax holidays, MSME subsidies, and intellectual property rebates.",
      details: [
        "File INC-20A (Commencement of Business declaration) within 180 days of incorporation.",
        "Apply for DPIIT Recognition on Startup India portal to unlock Section 80-IAC 3-year tax holiday.",
        "File Udyam Registration (100% free) for priority bank credit guarantees.",
        "File Form TM-A on IP India with 80% government fee subsidy.",
      ],
      estimatedDays: "5 - 7 Days",
    },
  ];

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
            <Link href="/launchpad" className="text-indigo-500 font-semibold">
              Govt Launchpad
            </Link>
            <Link
              href="/advocates"
              className="text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
            >
              Legal Advocates
            </Link>
            <Link
              href="/explore-startups"
              className="text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
            >
              Startups
            </Link>
            <Link
              href="/products"
              className="text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
            >
              Marketplace
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

      {/* Hero */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-subtle)] bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-semibold mb-3">
            <Award className="w-3.5 h-3.5" /> Official Indian & Global Portal Registry
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Startup Launchpad & Company Builder
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
            From raw idea to incorporated legal entity. Step-by-step roadmap, interactive document readiness checklists, and direct online links to official government application portals.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Document Readiness Progress Bar */}
        <div className="glass-panel p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-500" /> Startup Legal Document Readiness Tracker
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Check off documents you have in hand to evaluate your incorporation readiness.
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-emerald-400">{progressPercent}%</span>
              <p className="text-[11px] text-[var(--text-muted)]">
                {completedCount} of {legalDocs.length} Documents Ready
              </p>
            </div>
          </div>

          <div className="w-full bg-[var(--bg-surface-elevated)] h-2.5 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {legalDocs.map((doc) => {
              const isChecked = !!checkedDocs[doc.id];
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => toggleDoc(doc.id)}
                  className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isChecked
                      ? "bg-emerald-500/10 border-emerald-500/30 text-[var(--text-primary)]"
                      : "bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-slate-400"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border transition-colors ${
                      isChecked
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-[var(--border-prominent)]"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-tight">{doc.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{doc.portal}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5-Stage Step-by-Step Company Builder Roadmap */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-1">
              5-Stage Interactive Company Builder Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              Follow this standardized workflow to file your startup documents with zero legal friction.
            </p>
          </div>

          <div className="space-y-4">
            {stages.map((st) => {
              const isOpen = activeStage === st.step;
              return (
                <div
                  key={st.step}
                  className={`glass-card p-6 cursor-pointer transition-all ${
                    isOpen ? "border-indigo-500/50 shadow-lg shadow-indigo-500/10" : ""
                  }`}
                  onClick={() => setActiveStage(isOpen ? 0 : st.step)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center text-sm ${
                          isOpen
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                            : "bg-[var(--bg-surface-elevated)] text-[var(--text-muted)]"
                        }`}
                      >
                        0{st.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-[var(--text-primary)]">
                          {st.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)]">
                          {st.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hidden sm:inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {st.estimatedDays}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-indigo-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[var(--text-muted)]" />
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="mt-5 pt-5 border-t border-[var(--border-subtle)] space-y-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                      {st.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Government Portals Directory */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-1">
                Official Government Online Application Portals
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Direct government URLs with official guidance on forms, documentation, and statutory fee estimates.
              </p>
            </div>
            <Link
              href="/advocates"
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
            >
              Need filing help? Hire verified advocate <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_GOVT_PORTALS.map((portal) => (
              <div
                key={portal.id}
                className="glass-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400">
                      {portal.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400 bg-slate-800/40 px-2 py-0.5 rounded border border-slate-700/50">
                      {portal.officialTag}
                    </span>
                  </div>

                  <h3 className="font-bold text-base mb-1">{portal.name}</h3>
                  <p className="text-xs text-emerald-400 font-medium mb-3">
                    {portal.authority}
                  </p>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                    {portal.description}
                  </p>

                  <div className="space-y-1.5 mb-5 p-3 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
                      Required Documents:
                    </p>
                    {portal.documentsNeeded.map((doc, idx) => (
                      <div key={idx} className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-indigo-400" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block">Est. Govt Fee:</span>
                    <span className="font-semibold text-emerald-400">{portal.feeEstimate}</span>
                  </div>

                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs py-1.5 px-3.5 flex items-center gap-1.5"
                  >
                    <span>Visit Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
