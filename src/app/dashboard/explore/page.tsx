import { auth } from "@/auth";
import { MOCK_STARTUPS, MOCK_PRODUCTS, MOCK_ADVOCATES, MOCK_GOVT_PORTALS } from "@/lib/mockData";
import { UserAvatar } from "@/components/UserAvatar";
import Link from "next/link";
import {
  Search,
  ShoppingBag,
  Building2,
  Scale,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Bot,
  ExternalLink,
} from "lucide-react";

export default async function ExploreDashboard() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0] || "Explorer";

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-emerald-500/5 border-indigo-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Discovery & Marketplace Hub
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, <span className="text-indigo-400">{firstName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-xl">
              Explore verified tech startups, buy production boilerplates & AI agents, or browse step-by-step company registration guides.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/ai-cofounder"
              className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2"
            >
              <Bot className="w-4 h-4" /> Open AI Co-Founder
            </Link>
          </div>
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/dashboard/explore/startups"
          className="glass-card p-5 group hover:border-indigo-500/50"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)] font-medium">Verified Startups</span>
            <Search className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_STARTUPS.length}</p>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <span>+2 this week</span> • Browse all &rarr;
          </p>
        </Link>

        <Link
          href="/products"
          className="glass-card p-5 group hover:border-indigo-500/50"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)] font-medium">Marketplace Items</span>
            <ShoppingBag className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_PRODUCTS.length}</p>
          <p className="text-[11px] text-purple-400 mt-1">
            Software, AI & Hardware
          </p>
        </Link>

        <Link
          href="/launchpad"
          className="glass-card p-5 group hover:border-indigo-500/50"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)] font-medium">Govt Portals</span>
            <Building2 className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_GOVT_PORTALS.length}</p>
          <p className="text-[11px] text-emerald-400 mt-1">
            MCA, Startup India, GST
          </p>
        </Link>

        <Link
          href="/advocates"
          className="glass-card p-5 group hover:border-indigo-500/50"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-muted)] font-medium">Verified Lawyers</span>
            <Scale className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-2xl font-bold text-[var(--text-primary)]">{MOCK_ADVOCATES.length}</p>
          <p className="text-[11px] text-amber-400 mt-1">
            Instant Consultation
          </p>
        </Link>
      </div>

      {/* Featured Trending Startups */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <h2 className="text-lg font-bold">Trending Compliant Startups</h2>
          </div>
          <Link
            href="/dashboard/explore/startups"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            View all {MOCK_STARTUPS.length} startups <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_STARTUPS.slice(0, 2).map((startup) => (
            <div
              key={startup.id}
              className="glass-card p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={startup.logo}
                      alt={startup.name}
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-sm">{startup.name}</h3>
                      <span className="text-[11px] text-indigo-400">{startup.category}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> {startup.complianceScore}% Verified
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-4">
                  {startup.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <UserAvatar
                  userId={startup.founderId}
                  name={startup.founderName}
                  avatar={startup.founderAvatar}
                  subtitle={startup.founderRole}
                  size="sm"
                  showName={true}
                />
                <Link
                  href="/dashboard/explore/startups"
                  className="btn-secondary text-xs px-3 py-1 flex items-center gap-1"
                >
                  Deal Sheet
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Marketplace Picks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-purple-400" />
            <h2 className="text-lg font-bold">Featured Marketplace Software & Hardware</h2>
          </div>
          <Link
            href="/products"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            Browse all {MOCK_PRODUCTS.length} products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_PRODUCTS.slice(0, 3).map((prod) => (
            <div
              key={prod.id}
              className="glass-card p-4 flex flex-col justify-between"
            >
              <div>
                <div className="h-32 rounded-xl overflow-hidden mb-3">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase">
                    {prod.category}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    ${prod.price}
                  </span>
                </div>
                <h4 className="font-semibold text-xs mb-1 line-clamp-1">{prod.title}</h4>
                <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mb-3">
                  {prod.tagline}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <UserAvatar
                  userId={prod.sellerId}
                  name={prod.sellerName}
                  avatar={prod.sellerAvatar}
                  size="sm"
                  showName={false}
                />
                <Link
                  href="/products"
                  className="btn-primary text-[11px] py-1 px-3"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
