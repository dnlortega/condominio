"use client";

import { motion } from "framer-motion";
import { useSeasonalTheme } from "@/app/providers/SeasonalThemeProvider";

export default function SeasonalBadge({ className = "" }: { className?: string }) {
  const theme = useSeasonalTheme();

  if (!theme) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.8 }}
      className={`inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold ${className}`}
    >
      <span aria-hidden>{theme.emoji}</span>
      <span className="uppercase tracking-[0.15em] text-[10px]">{theme.message}</span>
    </motion.div>
  );
}
