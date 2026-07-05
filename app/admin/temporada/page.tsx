import TemporadaConfig from "./client-page";
import { getSeasonalThemeSetting } from "@/app/actions/seasonal-theme";
import { getThemeForDate } from "@/lib/seasonal-themes";

export const metadata = {
  title: "Tema Sazonal | Admin",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const settings = await getSeasonalThemeSetting();
  const autoDetectedTheme = getThemeForDate();

  return <TemporadaConfig initialData={settings} autoDetectedTheme={autoDetectedTheme} />;
}
