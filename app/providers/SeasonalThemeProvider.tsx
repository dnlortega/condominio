"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { SeasonalTheme } from "@/lib/seasonal-themes";

const SeasonalThemeContext = createContext<SeasonalTheme | null | undefined>(undefined);

export function SeasonalThemeProvider({
  children,
  theme,
}: {
  children: ReactNode;
  theme: SeasonalTheme | null;
}) {
  return (
    <SeasonalThemeContext.Provider value={theme}>
      {children}
    </SeasonalThemeContext.Provider>
  );
}

export function useSeasonalTheme() {
  const context = useContext(SeasonalThemeContext);
  if (context === undefined) {
    throw new Error("useSeasonalTheme must be used within SeasonalThemeProvider");
  }
  return context;
}
