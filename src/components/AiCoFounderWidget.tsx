"use client";

import { useState } from "react";
import { MOCK_USERS, UserProfile } from "@/lib/mockData";
import { UserAvatar } from "@/components/UserAvatar";
import {
  Bot,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  Users,
  Compass,
  ArrowRight,
  Minimize2,
  Maximize2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  type?: "text" | "validation" | "matchmaking" | "guidance";
  validationData?: {
    verdict: "GO" | "PIVOT" | "NO-GO";
    score: number;
    marketViability: string;
    legalRisks: string;
    nextSteps: string[];
  };
  matchedUsers?: UserProfile[];
}

export function AiCoFounderWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"validate" | "guide" | "match">("validate");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: "👋 Hi! I'm your Personal AI Co-Founder & Compliance Advisor. Pitch me your startup idea for an instant Go/Pivot analysis, ask any legal question, or ask me to match you with co-founders!",
      type: "text",
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      let aiMsg: Message;

      if (activeTab === "validate" || userText.toLowerCase().includes("idea") || userText.toLowerCase().includes("validate")) {
        // Idea validation mode
        const isHighPotential = userText.length > 25;
        aiMsg = {
          id: "ai-" + Date.now(),
          sender: "ai",
          text: `I've analyzed your pitch: "${userText}". Here is your comprehensive feasibility and legal viability breakdown:`,
          type: "validation",
          validationData: {
            verdict: isHighPotential ? "GO" : "PIVOT",
            score: isHighPotential ? 88 : 62,
            marketViability: "Strong early signals with high addressable demand in B2B SaaS and compliance-adjacent markets.",
            legalRisks: "Data privacy regulations apply (GDPR/DPDP). Must ensure customer consent terms and trademark clearance.",
            nextSteps: [
              "Reserve business name on MCA SPICe+ Part A",
              "File provisional patent or copyright for core architecture",
              "Draft standard B2B Master Services Agreement (MSA)",
            ],
          },
        };
      } else if (activeTab === "match" || userText.toLowerCase().includes("founder") || userText.toLowerCase().includes("partner") || userText.toLowerCase().includes("match")) {
        // Co-founder matchmaking
        aiMsg = {
          id: "ai-" + Date.now(),
          sender: "ai",
          text: "Based on your technical profile and project goals, I've identified verified members who share mutual interests and complementary skill sets:",
          type: "matchmaking",
          matchedUsers: [MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[3]],
        };
      } else {
        // Legal & registration guidance
        aiMsg = {
          id: "ai-" + Date.now(),
          sender: "ai",
          text: `Regarding "${userText}": The standard statutory route is through MCA's SPICe+ portal (mca.gov.in) with Class 3 DSC. Once incorporated, immediately file for DPIIT recognition to claim Section 80-IAC tax exemption. Check our Govt Launchpad for official portal links.`,
          type: "guidance",
        };
      }

      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-500 text-white font-semibold text-xs shadow-2xl shadow-indigo-500/40 hover:scale-105 transition-all duration-300 border border-white/20 cursor-pointer group"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="tracking-wide">AI Co-Founder</span>
        </button>
      )}

      {/* Floating Drawer / Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] glass-panel shadow-2xl flex flex-col overflow-hidden border border-indigo-500/30">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-indigo-900/60 to-slate-900/90 border-b border-[var(--border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-xs text-white flex items-center gap-1.5">
                  Clear Launch AI Co-Founder
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Online
                  </span>
                </h3>
                <p className="text-[10px] text-slate-300">
                  Idea Validation • Legal Guidance • Matchmaking
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Link
                href="/dashboard/ai-cofounder"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Open Fullscreen Workspace"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[11px]">
            <button
              onClick={() => setActiveTab("validate")}
              className={`flex-1 py-2 font-semibold transition-colors cursor-pointer text-center ${
                activeTab === "validate"
                  ? "text-indigo-400 border-b-2 border-indigo-500 bg-indigo-500/5"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              Validate Idea
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`flex-1 py-2 font-semibold transition-colors cursor-pointer text-center ${
                activeTab === "guide"
                  ? "text-emerald-400 border-b-2 border-emerald-500 bg-emerald-500/5"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              Legal Guide
            </button>
            <button
              onClick={() => setActiveTab("match")}
              className={`flex-1 py-2 font-semibold transition-colors cursor-pointer text-center ${
                activeTab === "match"
                  ? "text-purple-400 border-b-2 border-purple-500 bg-purple-500/5"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
            >
              Co-Founders
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[var(--bg-primary)]/40 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-bl-none shadow-sm"
                  }`}
                >
                  <p>{m.text}</p>

                  {/* Structured Idea Validation Block */}
                  {m.type === "validation" && m.validationData && (
                    <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          Recommendation:
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-black tracking-wider ${
                            m.validationData.verdict === "GO"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {m.validationData.verdict} ({m.validationData.score}/100)
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        <strong>Market:</strong> {m.validationData.marketViability}
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        <strong>Legal Risk:</strong> {m.validationData.legalRisks}
                      </p>
                      <div className="pt-1">
                        <span className="text-[10px] font-bold text-indigo-400 block mb-1">
                          Actionable Next Steps:
                        </span>
                        {m.validationData.nextSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[10px] text-[var(--text-muted)]">
                            <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Clickable Co-Founder Matchmaking Profile Cards */}
                  {m.type === "matchmaking" && m.matchedUsers && (
                    <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] space-y-2">
                      <p className="text-[10px] font-bold uppercase text-[var(--text-muted)]">
                        Suggested Profiles (Click to view full portfolio):
                      </p>
                      {m.matchedUsers.map((user) => (
                        <div
                          key={user.id}
                          className="p-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-between hover:border-indigo-500/50 transition-colors"
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
                            className="text-[10px] text-indigo-400 font-semibold hover:underline flex items-center gap-0.5"
                          >
                            Profile <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>AI Co-Founder is analyzing feasibility...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-3 py-1.5 bg-[var(--bg-surface-elevated)] border-t border-[var(--border-subtle)] flex gap-1.5 overflow-x-auto text-[10px]">
            {activeTab === "validate" && (
              <>
                <button
                  type="button"
                  onClick={() => setInput("Validate my idea: AI compliance engine for clinical trials in EU & US")}
                  className="px-2 py-1 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-indigo-400 whitespace-nowrap border border-[var(--border-subtle)]"
                >
                  ⚡ Clinical AI Trial Idea
                </button>
                <button
                  type="button"
                  onClick={() => setInput("Validate my idea: Solar energy IoT inverter with P2P energy trading")}
                  className="px-2 py-1 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-indigo-400 whitespace-nowrap border border-[var(--border-subtle)]"
                >
                  ⚡ Hardware Solar Grid
                </button>
              </>
            )}
            {activeTab === "guide" && (
              <>
                <button
                  type="button"
                  onClick={() => setInput("What are the step by step documents needed for MCA SPICe+ filing?")}
                  className="px-2 py-1 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-emerald-400 whitespace-nowrap border border-[var(--border-subtle)]"
                >
                  🏛️ SPICe+ Documents
                </button>
                <button
                  type="button"
                  onClick={() => setInput("How to get 3-year Section 80-IAC tax exemption under Startup India?")}
                  className="px-2 py-1 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-emerald-400 whitespace-nowrap border border-[var(--border-subtle)]"
                >
                  💰 Tax Holiday Guide
                </button>
              </>
            )}
            {activeTab === "match" && (
              <>
                <button
                  type="button"
                  onClick={() => setInput("Find me a co-founder with Hardware and IoT expertise")}
                  className="px-2 py-1 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-purple-400 whitespace-nowrap border border-[var(--border-subtle)]"
                >
                  🤝 Find Hardware Co-Founder
                </button>
                <button
                  type="button"
                  onClick={() => setInput("Connect me with a legal advocate for trademark and incorporation")}
                  className="px-2 py-1 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-purple-400 whitespace-nowrap border border-[var(--border-subtle)]"
                >
                  ⚖️ Find Legal Advocate
                </button>
              </>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-2.5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                activeTab === "validate"
                  ? "Pitch your startup idea..."
                  : activeTab === "guide"
                  ? "Ask about MCA, GST, or trademarks..."
                  : "Describe your ideal co-founder..."
              }
              className="flex-1 px-3 py-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary p-2 rounded-xl text-white cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
