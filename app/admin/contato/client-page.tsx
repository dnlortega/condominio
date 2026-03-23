"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { ContactSettingsType, updateContactSettings } from "@/app/actions/contact";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Phone, Mail, MapPin, Save, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactConfig({ initialData }: { initialData: ContactSettingsType }) {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit } = useForm<ContactSettingsType>({
    defaultValues: initialData,
  });

  const onSubmit = (data: ContactSettingsType) => {
    startTransition(async () => {
      try {
        await updateContactSettings(data);
        toast.success("Informações de contato atualizadas com sucesso!");
      } catch (error) {
        toast.error("Ocorreu um erro ao atualizar as informações.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <Phone className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Informações de Contato</h1>
          <p className="text-muted-foreground mt-1 text-sm">Gerencie os principais pontos de contato exibidos no rodapé do site.</p>
        </div>
      </div>

      <div className="bg-white/50 backdrop-blur-xl border border-border/50 rounded-3xl p-6 md:p-8 max-w-2xl shadow-xl shadow-black/5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="space-y-8">
            {/* Administration Phone */}
            <div className="space-y-3 group/input">
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-primary" />
                <Label htmlFor="administration" className="text-sm font-semibold text-foreground">Administração (Telefone/WhatsApp)</Label>
              </div>
              <Input
                {...register("administration")}
                id="administration"
                placeholder="Ex: (14) 99769-6946"
                className="h-14 bg-white/50 border-border/60 rounded-2xl px-5 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all text-base"
              />
            </div>

            {/* Customer Support Email */}
            <div className="space-y-3 group/input">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 text-primary" />
                <Label htmlFor="customerSupport" className="text-sm font-semibold text-foreground">Apoio ao Cliente (E-mail)</Label>
              </div>
              <Input
                {...register("customerSupport")}
                id="customerSupport"
                placeholder="Ex: contato@empresa.com.br"
                className="h-14 bg-white/50 border-border/60 rounded-2xl px-5 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all text-base"
              />
            </div>

            {/* Google Maps Link */}
            <div className="space-y-3 group/input">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-primary" />
                <Label htmlFor="locationLink" className="text-sm font-semibold text-foreground">Link de Localização (Google Maps)</Label>
              </div>
              <Input
                {...register("locationLink")}
                id="locationLink"
                placeholder="Cole o link do Google Maps aqui"
                className="h-14 bg-white/50 border-border/60 rounded-2xl px-5 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all text-base"
              />
              <p className="text-[10px] text-muted-foreground ml-1">Para obter esse link, abra o Google Maps, clique em "Compartilhar" no local desejado e escolha "Copiar link".</p>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-border/50">
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-full px-10 h-14 text-xs font-bold uppercase tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Save className="w-4 h-4 text-white" />}
              Salvar Alterações
            </Button>
          </div>
        </form>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="max-w-2xl bg-blue-50/50 border border-blue-100 rounded-3xl p-6 md:p-8 mt-12"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-900 mb-1 uppercase tracking-wider">Como funciona o redirecionamento?</h4>
            <p className="text-sm text-blue-800/70 leading-relaxed font-medium">
              O formulário de "Enviar Mensagem" na página inicial, quando clicado, continua redirecionando para a área administrativa.
              Isso serve como atalho para o login do gestor do condomínio.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
