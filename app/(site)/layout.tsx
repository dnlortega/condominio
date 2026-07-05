import React from "react";
import { getActiveSeasonalTheme } from "@/app/actions/seasonal-theme";
import { SeasonalThemeProvider } from "@/app/providers/SeasonalThemeProvider";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await getActiveSeasonalTheme();

  return (
    <div style={theme ? (theme.cssVars as React.CSSProperties) : undefined}>
      <SeasonalThemeProvider theme={theme}>{children}</SeasonalThemeProvider>
    </div>
  );
}
