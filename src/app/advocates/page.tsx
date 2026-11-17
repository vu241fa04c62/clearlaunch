"use client";

import { useState } from "react";
import { MOCK_ADVOCATES, LegalAdvocate } from "@/lib/mockData";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserAvatar } from "@/components/UserAvatar";
import Link from "next/link";
import {
  Scale,
  ShieldCheck,
  Star,
  Search,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  X,
  Send,
  ArrowRight,
  Briefcase,
} from "lucide-react";

export default function AdvocatesPage() {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");

  // Booking Modal State
  const [bookingAdvocate, setBookingAdvocate] = useState<LegalAdvocate | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingTopic, setBookingTopic] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Chat Modal State
  const [chatAdvocate, setChatAdvocate] = useState<LegalAdvocate | null>(null);
  const [chatMessages, setChatMessages] = useState<
    { sender: "advocate" | "user"; text: string; time: string }[]
  >([]);
  const [chatInput, setChatInput] = useState("");

  const specialties = [
    "All",
    "Company Incorporation",
    "IP Trademark & Patents",
    "Startup India Tax Exemptions",
    "Cross-Border Structuring",
    "RBI Fintech Licensing",
    "Delaware C-Corp Flip",
  ];

  const filteredAdvocates = MOCK_ADVOCATES.filter((adv) => {
    const matchesSpecialty =
      selectedSpecialty === "All" ||
      adv.specialties.some((s) =>
        s.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    const matchesSearch =
      adv.name.toLowerCase().includes(search.toLowerCase()) ||
      adv.firm.toLowerCase().includes(search.toLowerCase()) ||
      adv.bio.toLowerCase().includes(search.toLowerCase()) ||
      adv.specialties.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesSpecialty && matchesSearch;
  });

  const handleOpenChat = (adv: LegalAdvocate) => {
    setChatAdvocate(adv);
    setChatMessages([
      {
        sender: "advocate",
        text: `Hello! I'm ${adv.name} from ${adv.firm}. How can I assist you with your startup legal compliance or document filings today?`,
        time: "Just now",
      },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      sender: "user" as const,
      text: chatInput.trim(),
      time: "Just now",
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "advocate" as const,
          text: `Thank you for the details. I am reviewing your query regarding your corporate filings and entity structure. I will share a tailored document checklist shortly.`,
          time: "Just now",
        },
      ]);
    }, 1200);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingAdvocate(null);
    }, 2500);
  };

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
            <Link href="/advocates" className="text-indigo-500 font-semibold">
              Legal Advocates
            </Link>
            <Link
              href="/launchpad"
              className="text-[var(--text-secondary)] hover:text-indigo-500 transition-colors"
            >
              Govt Launchpad
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
            <ShieldCheck className="w-3.5 h-3.5" /> Bar Council Verified Startup Advocates
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Connect Directly with Verified Legal Advocates
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto">
            Book consultations, get term sheet reviews, and execute corporate filings with vetted corporate lawyers who specialize in tech startups.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`text-xs px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedSpecialty === spec
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-indigo-400"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, specialty, firm..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs focus:border-indigo-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Advocates Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdvocates.map((adv) => (
            <div
              key={adv.id}
              className="glass-card p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header with Avatar, Bar Verification & Rating */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border border-[var(--border-subtle)] flex-shrink-0">
                    <img
                      src={adv.avatar}
                      alt={adv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base text-[var(--text-primary)]">
                        {adv.name}
                      </h3>
                      <span title="Bar Council Verified">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      </span>
                    </div>
                    <p className="text-xs text-indigo-400 font-medium">{adv.title}</p>
                    <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {adv.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] mb-4">
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    Bar ID: {adv.barCouncilNumber}
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {adv.rating} ({adv.reviewsCount})
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-4">
                  {adv.bio}
                </p>

                {/* Specialties */}
                <div className="space-y-1 mb-5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Expertise:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {adv.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-[var(--text-muted)]">Consultation Rate:</span>
                  <span className="font-bold text-emerald-400">{adv.hourlyRate}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenChat(adv)}
                    className="btn-secondary text-xs py-2 px-3 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" /> In-App Chat
                  </button>
                  <button
                    onClick={() => setBookingAdvocate(adv)}
                    className="btn-primary text-xs py-2 px-3 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Call
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Book Consultation Modal */}
      {bookingAdvocate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel max-w-md w-full p-6 relative">
            <button
              onClick={() => setBookingAdvocate(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>

            {bookingConfirmed ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-400 mb-1">
                  Consultation Booked!
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Calendar invite and video meeting link sent to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={bookingAdvocate.avatar}
                    alt={bookingAdvocate.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-base">{bookingAdvocate.name}</h3>
                    <p className="text-xs text-indigo-400">{bookingAdvocate.hourlyRate}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Select Consultation Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs focus:outline-none"
                  >
                    <option value="">Choose slot...</option>
                    <option value="10:00 AM">10:00 AM - 10:45 AM</option>
                    <option value="02:00 PM">02:00 PM - 02:45 PM</option>
                    <option value="04:30 PM">04:30 PM - 05:15 PM</option>
                    <option value="06:00 PM">06:00 PM - 06:45 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                    Filing Topic / Query Details
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={bookingTopic}
                    onChange={(e) => setBookingTopic(e.target.value)}
                    placeholder="Briefly describe your company formation, trademark, or agreement questions..."
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full text-xs py-2.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Confirm Video Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* In-App Encrypted Chat Simulation Modal */}
      {chatAdvocate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel max-w-lg w-full h-[540px] flex flex-col relative overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-surface)]">
              <div className="flex items-center gap-3">
                <img
                  src={chatAdvocate.avatar}
                  alt={chatAdvocate.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-xs">{chatAdvocate.name}</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)]">
                    End-to-End Encrypted Legal Session
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatAdvocate(null)}
                className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[var(--bg-primary)]/40">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-bl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] opacity-60 block text-right mt-1">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-[var(--border-subtle)] flex items-center gap-2 bg-[var(--bg-surface)]"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask your legal advocate a question..."
                className="flex-1 px-3 py-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="btn-primary p-2 rounded-xl text-white cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
