"use client";

import React, { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AnimationSettingsType, updateAnimationSettings } from "@/app/actions/settings";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Palette, Info, MonitorPlay } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Animation states for previews
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (watchAll.counters) {
      const interval = setInterval(() => {
        setCounter(prev => (prev < 10 ? prev + 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [watchAll.counters]);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <Palette className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Animações da Interface</h1>
          <p className="text-muted-foreground mt-1 text-sm">Controle quais efeitos visuais ficam ativos no sistema para todos os usuários.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white/50 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="space-y-6 divide-y divide-border/30">
              {/* Fade and Slide */}
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5 max-w-[70%]">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    Aparecimento (Fade & Slide)
                  </label>
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
                <div className="space-y-0.5 max-w-[70%]">
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
                <div className="space-y-0.5 max-w-[70%]">
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
                <div className="space-y-0.5 max-w-[70%]">
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
                <div className="space-y-0.5 max-w-[70%]">
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
                <div className="space-y-0.5 max-w-[70%]">
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

        {/* PREVIEW PANEL */}
        <div className="lg:col-span-5 sticky top-6">
          <div className="bg-zinc-900 rounded-[2.5rem] p-8 border border-white/5 shadow-2xl overflow-hidden relative min-h-[500px]">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-white/5">
                <MonitorPlay className="w-4 h-4 text-white/50" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">Preview em Tempo Real</span>
            </div>

            {/* Background Orbs Preview */}
            <AnimatePresence>
              {watchAll.backgroundOrbs && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-0 pointer-events-none"
                >
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      x: [0, 50, 0],
                      y: [0, 30, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[60px]"
                  />
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.3, 1],
                      x: [0, -40, 0],
                      y: [0, -20, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-[80px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10 space-y-10">
              {/* Progress Bar Preview */}
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <AnimatePresence>
                  {watchAll.progressBar && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      exit={{ width: 0 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-primary to-accent"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Cascading Text Preview */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-x-2 text-2xl font-bold text-white">
                  {["Bem-vindo", "ao", "Condomínio"].map((word, i) => (
                    <motion.span
                      key={word + i}
                      initial={watchAll.cascadingText ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: watchAll.cascadingText ? i * 0.15 : 0,
                        duration: 0.5
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Counters Preview */}
              <div className="flex gap-10">
                <div className="space-y-1">
                  <div className="text-3xl font-mono font-black text-primary">
                    {watchAll.counters ? `0${counter}` : "00"}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/30">Quartos</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-mono font-black text-white/80">
                    {watchAll.counters ? `${counter * 10}%` : "0%"}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/30">Ocupação</div>
                </div>
              </div>

              {/* Fade & Slide Preview */}
              <div className="grid grid-cols-2 gap-4">
                <AnimatePresence mode="wait">
                  {[1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={watchAll.fadeAndSlide ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: watchAll.fadeAndSlide ? i * 0.2 : 0 }}
                      className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Hover Effects Preview */}
              <div className="pt-4">
                <motion.div
                  whileHover={watchAll.hoverEffects ? { y: -8, scale: 1.02 } : {}}
                  className="bg-white/10 border border-white/20 p-6 rounded-3xl cursor-pointer text-center"
                >
                  <span className="text-sm font-bold text-white/60">Passe o mouse aqui</span>
                </motion.div>
              </div>
            </div>

            <div className="mt-12 p-4 bg-primary/5 border border-primary/10 rounded-2xl">
              <p className="text-[10px] text-primary/60 leading-relaxed italic text-center">
                Os efeitos mostrados acima refletem como o site se comportará para todos os visitantes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

