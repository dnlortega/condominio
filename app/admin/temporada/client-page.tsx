"use client";

import React, { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, CalendarHeart, Save, Info } from "lucide-react";
import { motion } from "framer-motion";
import {
  SeasonalThemeSettingType,
  updateSeasonalThemeSetting,
} from "@/app/actions/seasonal-theme";
import { SEASONAL_THEMES, SeasonalTheme } from "@/lib/seasonal-themes";
import { useState } from "react";

const THEME_OPTIONS = Object.values(SEASONAL_THEMES);

export default function TemporadaConfig({
  initialData,
  autoDetectedTheme,
}: {
  initialData: SeasonalThemeSettingType;
  autoDetectedTheme: SeasonalTheme | null;
}) {
  const [isPending, startTransition] = useTransition();
  const [enabled, setEnabled] = useState(initialData.enabled);
  const [forcedThemeId, setForcedThemeId] = useState<string>(initialData.forcedThemeId ?? "auto");

  const onSubmit = () => {
    startTransition(async () => {
      try {
        await updateSeasonalThemeSetting({
          enabled,
          forcedThemeId: forcedThemeId === "auto" ? null : forcedThemeId,
        });
        toast.success("Configurações do tema sazonal atualizadas!");
      } catch (error) {
        toast.error("Ocorreu um erro ao atualizar configurações.");
      }
    });
  };

  const previewTheme: SeasonalTheme | null =
    !enabled || forcedThemeId === "none"
      ? null
      : forcedThemeId === "auto"
      ? autoDetectedTheme
      : SEASONAL_THEMES[forcedThemeId as keyof typeof SEASONAL_THEMES] ?? null;

  return (
    <div className="space-y-8 pb-32">
      <div className="flex items-center gap-5">
        <div className="h-14 w-14 rounded-3xl bg-primary/5 text-primary flex items-center justify-center shadow-sm border border-primary/10 transition-transform duration-500 hover:scale-105">
          <CalendarHeart className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-none">Tema Sazonal</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium tracking-wide">
            O site público muda de cor automaticamente em datas como Natal, Páscoa e Carnaval.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-12 xl:col-span-7 space-y-8">
          <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-12 shadow-sm hover:shadow-md transition-all duration-500">
            <div className="space-y-10">
              <div className="space-y-2 divide-y divide-slate-50">
                <div className="flex items-center justify-between py-6 first:pt-0">
                  <div className="space-y-1.5 max-w-[80%] pr-8">
                    <label className="text-base font-bold text-slate-900">Ativar tema sazonal</label>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      Quando ligado, a cor de destaque do site muda automaticamente conforme o calendário.
                    </p>
                  </div>
                  <Switch
                    checked={enabled}
                    onCheckedChange={setEnabled}
                    disabled={isPending}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                <div className="space-y-3 py-6 last:pb-0">
                  <label className="text-base font-bold text-slate-900">Forçar tema</label>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium mb-3">
                    Deixe em Automático para detectar pela data, ou force um tema específico para testar/antecipar uma comemoração.
                  </p>
                  <select
                    className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium disabled:opacity-50"
                    value={forcedThemeId}
                    onChange={(e) => setForcedThemeId(e.target.value)}
                    disabled={isPending || !enabled}
                  >
                    <option value="auto">Automático (detectar pela data)</option>
                    <option value="none">Nenhum (forçar desativado)</option>
                    {THEME_OPTIONS.map((theme) => (
                      <option key={theme.id} value={theme.id}>
                        {theme.emoji} {theme.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-10 border-t border-slate-50">
                <Button
                  onClick={onSubmit}
                  disabled={isPending}
                  className="rounded-full h-14 px-12 text-[10px] font-black uppercase tracking-[0.3em] bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3"
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4 text-white" />}
                  Salvar Preferências
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className="lg:col-span-12 xl:col-span-5 sticky top-8">
          <div className="bg-[#0f172a] rounded-[3rem] p-10 border border-slate-800 shadow-2xl overflow-hidden relative min-h-[400px] transition-all duration-700">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <CalendarHeart className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Preview do Site</span>
            </div>

            {previewTheme ? (
              <motion.div
                key={previewTheme.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl shadow-lg"
                  style={{ background: previewTheme.cssVars["--primary"] }}
                >
                  {previewTheme.emoji}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">{previewTheme.label}</h3>
                  <p className="text-white/50 text-sm mt-1">{previewTheme.message}</p>
                </div>
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: `color-mix(in oklch, ${previewTheme.cssVars["--primary"]} 15%, transparent)`,
                    color: previewTheme.cssVars["--primary"],
                    border: `1px solid color-mix(in oklch, ${previewTheme.cssVars["--primary"]} 30%, transparent)`,
                  }}
                >
                  <span>{previewTheme.emoji}</span>
                  <span className="uppercase tracking-[0.15em] text-[10px]">{previewTheme.message}</span>
                </div>
              </motion.div>
            ) : (
              <div className="text-white/40 text-sm">
                Nenhum tema ativo — o site usa a paleta padrão (verde/esmeralda).
              </div>
            )}

            <div className="mt-16 p-6 bg-black/20 border border-white/[0.03] rounded-3xl">
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4 text-primary opacity-50 shrink-0" />
                <p className="text-[9px] text-white/30 leading-relaxed font-bold uppercase tracking-[0.2em]">
                  {autoDetectedTheme
                    ? `Hoje, o calendário indicaria: ${autoDetectedTheme.label}`
                    : "Hoje não há nenhuma data comemorativa mapeada."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
