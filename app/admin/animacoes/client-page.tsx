"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { AnimationSettingsType, updateAnimationSettings } from "@/app/actions/settings";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Palette } from "lucide-react";

export default function AnimacoesConfig({ initialData }: { initialData: AnimationSettingsType }) {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, watch, setValue } = useForm<AnimationSettingsType>({
    defaultValues: initialData,
  });

  const onSubmit = (data: AnimationSettingsType) => {
    startTransition(async () => {
      try {
        await updateAnimationSettings(data);
        toast.success("Configurações de animação atualizadas!");
      } catch (error) {
        toast.error("Ocorreu um erro ao atualizar configurações.");
      }
    });
  };

  const watchAll = watch();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <Palette className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Animações da Interface</h1>
          <p className="text-muted-foreground mt-1 text-sm">Controle quais efeitos visuais ficam ativos no sistema para todos os usuários.</p>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="space-y-6 divide-y divide-border/30">
            {/* Fade and Slide */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <label className="text-sm font-semibold text-foreground">Aparecimento (Fade & Slide)</label>
                <p className="text-xs text-muted-foreground">O efeito de rolagem onde as caixas "nascem" de baixo para cima.</p>
              </div>
              <Switch
                checked={watchAll.fadeAndSlide}
                onCheckedChange={(checked) => setValue("fadeAndSlide", checked, { shouldDirty: true })}
                disabled={isPending}
              />
            </div>

            {/* Cascading Text */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <label className="text-sm font-semibold text-foreground">Textos em Cascata</label>
                <p className="text-xs text-muted-foreground">O título principal entrando palavra por palavra suavemente.</p>
              </div>
              <Switch
                checked={watchAll.cascadingText}
                onCheckedChange={(checked) => setValue("cascadingText", checked, { shouldDirty: true })}
                disabled={isPending}
              />
            </div>

            {/* Hover Effects */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <label className="text-sm font-semibold text-foreground">Interações (Hover)</label>
                <p className="text-xs text-muted-foreground">Botões e cartões levantando/escalando ao passar o mouse.</p>
              </div>
              <Switch
                checked={watchAll.hoverEffects}
                onCheckedChange={(checked) => setValue("hoverEffects", checked, { shouldDirty: true })}
                disabled={isPending}
              />
            </div>

            {/* Counters */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <label className="text-sm font-semibold text-foreground">Contadores Automáticos</label>
                <p className="text-xs text-muted-foreground">Os números que sobem sozinhos na tela inicial ("02 Quartos").</p>
              </div>
              <Switch
                checked={watchAll.counters}
                onCheckedChange={(checked) => setValue("counters", checked, { shouldDirty: true })}
                disabled={isPending}
              />
            </div>

            {/* ProgressBar */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <label className="text-sm font-semibold text-foreground">Barra de Progresso (Menu)</label>
                <p className="text-xs text-muted-foreground">A linha colorida no topo indicando o rolamento da página.</p>
              </div>
              <Switch
                checked={watchAll.progressBar}
                onCheckedChange={(checked) => setValue("progressBar", checked, { shouldDirty: true })}
                disabled={isPending}
              />
            </div>

            {/* Background Orbs */}
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <label className="text-sm font-semibold text-foreground">Esferas Iluminadas (Plano de Fundo)</label>
                <p className="text-xs text-muted-foreground">As luzes circulantes girando eternamente por trás das páginas.</p>
              </div>
              <Switch
                checked={watchAll.backgroundOrbs}
                onCheckedChange={(checked) => setValue("backgroundOrbs", checked, { shouldDirty: true })}
                disabled={isPending}
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-border/50">
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-full px-8 text-xs font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Salvar Configurações
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
