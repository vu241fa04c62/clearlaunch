"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-xl border border-slate-700/50 bg-slate-800/40 flex items-center justify-center opacity-50 ${className}`}
      >
        <Moon className="w-4 h-4 text-slate-400" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`relative group p-2 rounded-xl transition-all duration-300 border backdrop-blur-md cursor-pointer ${
        isDark
          ? "bg-slate-900/80 border-slate-700/80 text-amber-300 hover:border-amber-400/50 hover:bg-slate-800 shadow-lg shadow-black/20"
          : "bg-white/90 border-slate-200 text-indigo-600 hover:border-indigo-400/60 hover:bg-slate-50 shadow-sm"
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 text-amber-400 group-hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 text-indigo-600 group-hover:-rotate-12" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
