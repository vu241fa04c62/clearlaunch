"use client";

import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Aurora glow orb 1 (Indigo / Royal) */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 50, 0],
          y: [0, -40, 0],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-96 md:w-[32rem] h-96 md:h-[32rem] rounded-full blur-[100px] bg-gradient-to-br from-indigo-500/30 to-purple-600/25 dark:from-indigo-600/30 dark:to-violet-700/25"
      />

      {/* Aurora glow orb 2 (Emerald / Teal) */}
      <motion.div
        animate={{
          scale: [1.1, 0.95, 1.1],
          x: [0, -60, 0],
          y: [0, 50, 0],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/3 -right-32 w-96 md:w-[34rem] h-96 md:h-[34rem] rounded-full blur-[110px] bg-gradient-to-bl from-emerald-500/25 to-teal-500/20 dark:from-emerald-500/20 dark:to-cyan-600/20"
      />

      {/* Aurora glow orb 3 (Bottom center subtle accent) */}
      <motion.div
        animate={{
          scale: [0.9, 1.15, 0.9],
          x: [-30, 30, -30],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute -bottom-48 left-1/3 w-[28rem] h-[28rem] rounded-full blur-[120px] bg-gradient-to-t from-blue-600/20 to-indigo-600/15 dark:from-indigo-700/25 dark:to-emerald-600/15"
      />

      {/* Subtle tech dot matrix grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
