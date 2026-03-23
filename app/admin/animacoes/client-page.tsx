"use client";

import React, { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AnimationSettingsType, updateAnimationSettings } from "@/app/actions/settings";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Palette, Info, MonitorPlay, Save } from "lucide-react";
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
    <div className="space-y-8 pb-32">
      <div className="flex items-center gap-5">
        <div className="h-14 w-14 rounded-3xl bg-primary/5 text-primary flex items-center justify-center shadow-sm border border-primary/10 transition-transform duration-500 hover:scale-105">
          <Palette className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-none">Animações da Interface</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium tracking-wide">Controle quais efeitos visuais ficam ativos no sistema para todos os usuários.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-12 xl:col-span-7 space-y-8">
          <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-12 shadow-sm hover:shadow-md transition-all duration-500">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              
              <div className="space-y-2 divide-y divide-slate-50">
                {/* Fade and Slide */}
                <div className="flex items-center justify-between py-6 first:pt-0">
                  <div className="space-y-1.5 max-w-[80%] pr-8">
                    <label className="text-base font-bold text-slate-900 flex items-center gap-2">
                      Aparecimento (Fade & Slide)
                    </label>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">O efeito de rolagem onde os elementos entram de baixo para cima suavemente.</p>
                  </div>
                  <Switch
                    checked={watchAll.fadeAndSlide}
                    onCheckedChange={(checked) => setValue("fadeAndSlide", checked, { shouldDirty: true })}
                    disabled={isPending}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                {/* Cascading Text */}
                <div className="flex items-center justify-between py-6">
                  <div className="space-y-1.5 max-w-[80%] pr-8">
                    <label className="text-base font-bold text-slate-900">Textos em Cascata</label>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">O título principal entrando palavra por palavra, criando um ar de sofisticação.</p>
                  </div>
                  <Switch
                    checked={watchAll.cascadingText}
                    onCheckedChange={(checked) => setValue("cascadingText", checked, { shouldDirty: true })}
                    disabled={isPending}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                {/* Hover Effects */}
                <div className="flex items-center justify-between py-6">
                  <div className="space-y-1.5 max-w-[80%] pr-8">
                    <label className="text-base font-bold text-slate-900">Interações (Hover)</label>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Botões e cartões levantando ou escalando ao passar o mouse.</p>
                  </div>
                  <Switch
                    checked={watchAll.hoverEffects}
                    onCheckedChange={(checked) => setValue("hoverEffects", checked, { shouldDirty: true })}
                    disabled={isPending}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                {/* Counters */}
                <div className="flex items-center justify-between py-6">
                  <div className="space-y-1.5 max-w-[80%] pr-8">
                    <label className="text-base font-bold text-slate-900">Contadores Automáticos</label>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Os números que sobem sozinhos na seção de características.</p>
                  </div>
                  <Switch
                    checked={watchAll.counters}
                    onCheckedChange={(checked) => setValue("counters", checked, { shouldDirty: true })}
                    disabled={isPending}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                {/* ProgressBar */}
                <div className="flex items-center justify-between py-6">
                  <div className="space-y-1.5 max-w-[80%] pr-8">
                    <label className="text-base font-bold text-slate-900">Barra de Progresso (Menu)</label>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">A linha colorida no topo indicando a posição do rolamento da página.</p>
                  </div>
                  <Switch
                    checked={watchAll.progressBar}
                    onCheckedChange={(checked) => setValue("progressBar", checked, { shouldDirty: true })}
                    disabled={isPending}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                {/* Background Orbs */}
                <div className="flex items-center justify-between py-6 last:pb-0">
                  <div className="space-y-1.5 max-w-[80%] pr-8">
                    <label className="text-base font-bold text-slate-900">Plano de Fundo (Esferas)</label>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">As luzes ambientais girando suavemente por trás das páginas.</p>
                  </div>
                  <Switch
                    checked={watchAll.backgroundOrbs}
                    onCheckedChange={(checked) => setValue("backgroundOrbs", checked, { shouldDirty: true })}
                    disabled={isPending}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-10 border-t border-slate-50">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="rounded-full h-14 px-12 text-[10px] font-black uppercase tracking-[0.3em] bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3"
                >
                  {isPending ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4 text-white" />}
                  Salvar Preferências
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* PREVIEW PANEL */}
        <div className="lg:col-span-12 xl:col-span-5 sticky top-8">
          <div className="bg-[#0f172a] rounded-[3rem] p-10 border border-slate-800 shadow-2xl overflow-hidden relative min-h-[550px] transition-all duration-700 hover:shadow-primary/5">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <MonitorPlay className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Preview em Tempo Real</span>
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
                      rotate: [0, 90, 0],
                      x: [0, 30, 0],
                      y: [0, 20, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -left-10 w-48 h-48 bg-primary/20 rounded-full blur-[70px]"
                  />
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, -45, 0],
                      x: [0, -30, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-10 -right-10 w-56 h-56 bg-accent/20 rounded-full blur-[90px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10 space-y-12">
              {/* Progress Bar Preview */}
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner flex items-center">
                <AnimatePresence>
                  {watchAll.progressBar && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "70%" }}
                      exit={{ width: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-primary to-primary/40 rounded-full"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Cascading Text Preview */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-x-3 text-3xl font-black text-white tracking-tight">
                  {["Experiência", "Recanto", "Pássaros"].map((word, i) => (
                    <motion.span
                      key={word + i}
                      initial={watchAll.cascadingText ? { opacity: 0, scale: 0.9, y: 15, filter: "blur(10px)" } : { opacity: 1, y: 0 }}
                      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ 
                        delay: watchAll.cascadingText ? i * 0.2 : 0,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Counters Preview */}
              <div className="flex gap-12 pt-4">
                <div className="space-y-2">
                  <div className="text-4xl font-black text-primary tracking-tighter tabular-nums drop-shadow-sm">
                    {watchAll.counters ? `0${counter}` : "00"}
                  </div>
                  <div className="h-px w-6 bg-primary/30" />
                  <div className="text-[9px] uppercase font-black tracking-[0.4em] text-white/30">Setores</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-black text-white/90 tracking-tighter tabular-nums drop-shadow-sm">
                    {watchAll.counters ? `${counter * 10}%` : "0%"}
                  </div>
                  <div className="h-px w-6 bg-white/10" />
                  <div className="text-[9px] uppercase font-black tracking-[0.4em] text-white/30">Progresso</div>
                </div>
              </div>

              {/* Fade & Slide Preview */}
              <div className="grid grid-cols-2 gap-6">
                <AnimatePresence mode="wait">
                  {[1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={watchAll.fadeAndSlide ? { opacity: 0, y: 30, scale: 0.9 } : { opacity: 1, y: 0 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: watchAll.fadeAndSlide ? i * 0.25 : 0,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="aspect-[4/3] bg-white/[0.03] border border-white/[0.08] rounded-3xl flex items-center justify-center shadow-inner relative overflow-hidden"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 shadow-sm" />
                      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/5 to-transparent" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Hover Effects Preview */}
              <div className="pt-6">
                <motion.div
                  whileHover={watchAll.hoverEffects ? { y: -10, scale: 1.03, boxShadow: "0 20px 40px -10px rgba(var(--primary-rgb), 0.2)" } : {}}
                  className="bg-white/5 border border-white/10 p-8 rounded-[2rem] cursor-pointer text-center group transition-colors hover:border-primary/30 active:scale-95"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-primary/70 transition-colors">Interação Premium</span>
                </motion.div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 p-6 bg-black/20 border border-white/[0.03] rounded-3xl"
            >
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4 text-primary opacity-50" />
                <p className="text-[9px] text-white/30 leading-relaxed font-bold uppercase tracking-[0.2em]">
                  Os efeitos refletem o comportamento global do sistema.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}


