import AnimacoesConfig from "./client-page";
import { getAnimationSettings } from "@/app/actions/settings";

export const metadata = {
  title: "Configuração de Animações | Admin",
};

export default async function Page() {
  const settings = await getAnimationSettings();
  return <AnimacoesConfig initialData={settings} />;
}
