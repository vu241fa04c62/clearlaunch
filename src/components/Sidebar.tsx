"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Rocket,
  LayoutDashboard,
  ShieldCheck,
  Building2,
  ShoppingBag,
  Search,
  Scale,
  TrendingUp,
  Bot,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Sparkles,
  FileText,
  Briefcase,
  ExternalLink,
} from "lucide-react";

type Role = "ENTREPRENEUR" | "LAWYER" | "INVESTOR" | "USER";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const COMMON_ITEMS: NavItem[] = [
  { label: "Products Marketplace", href: "/products", icon: ShoppingBag, badge: "New" },
  { label: "Explore Startups", href: "/dashboard/explore/startups", icon: Search },
  { label: "Govt Launchpad", href: "/launchpad", icon: Building2 },
  { label: "Legal Advocates", href: "/advocates", icon: Scale },
  { label: "AI Co-Founder", href: "/dashboard/ai-cofounder", icon: Bot, badge: "AI" },
];

const ROLE_ITEMS: Record<Role, NavItem[]> = {
  ENTREPRENEUR: [
    { label: "Founder Dashboard", href: "/dashboard/founder", icon: LayoutDashboard },
    { label: "AI Compliance Check", href: "/dashboard/founder/compliance", icon: ShieldCheck },
  ],
  LAWYER: [
    { label: "Advisor Dashboard", href: "/dashboard/advisor", icon: LayoutDashboard },
    { label: "Legal Leads & Cases", href: "/advocates", icon: Scale },
  ],
  INVESTOR: [
    { label: "Investor Dashboard", href: "/dashboard/investor", icon: LayoutDashboard },
    { label: "Verified Deal Flow", href: "/dashboard/explore/startups", icon: TrendingUp },
  ],
  USER: [
    { label: "Explorer Dashboard", href: "/dashboard/explore", icon: LayoutDashboard },
  ],
};

interface SidebarProps {
  userName: string;
  userRole: Role;
  userId?: string;
  userImage?: string;
}

export default function Sidebar({ userName, userRole, userId, userImage }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const roleNav = ROLE_ITEMS[userRole] || ROLE_ITEMS.USER;

  const roleLabels: Record<Role, string> = {
    ENTREPRENEUR: "Tech Founder",
    LAWYER: "Legal Advisor",
    INVESTOR: "Angel / VC",
    USER: "Explorer",
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--bg-surface)] text-[var(--text-primary)] border-r border-[var(--border-subtle)]">
      {/* Brand & Theme Toggle */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-subtle)]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Rocket className="w-4 h-4" />
          </div>
          <span className="text-base font-bold tracking-tight">
            Clear Launch<span className="text-indigo-500 ml-0.5">🚀</span>
          </span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto text-xs">
        {/* Role Specific Section */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Workspace
          </p>
          <div className="space-y-1">
            {roleNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Global Marketplace & Platform Discovery */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Platform Hub
          </p>
          <div className="space-y-1">
            {COMMON_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-indigo-500/10 text-indigo-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Account & Profile */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Account
          </p>
          <div className="space-y-1">
            <Link
              href="/settings"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all ${
                pathname === "/settings"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
              }`}
            >
              <Settings className="w-4 h-4 flex-shrink-0" />
              <span>Profile Settings</span>
            </Link>

            {userId && (
              <Link
                href={`/profile/${userId}`}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-medium transition-all ${
                  pathname.startsWith("/profile/")
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]"
                }`}
              >
                <User className="w-4 h-4 flex-shrink-0" />
                <span>My Public Profile</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* User Footer Card */}
      <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="flex items-center justify-between p-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-tr from-indigo-500 to-emerald-400 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
              {userImage ? (
                <img src={userImage} alt={userName} className="w-full h-full object-cover" />
              ) : (
                <span>{userName ? userName[0].toUpperCase() : "U"}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate text-[var(--text-primary)]">
                {userName || "User"}
              </p>
              <p className="text-[10px] text-[var(--text-muted)] truncate">
                {roleLabels[userRole] || "Member"}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="p-1.5 text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-primary)] shadow-lg"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Desktop / Mobile */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 lg:transform-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
