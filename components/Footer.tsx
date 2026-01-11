"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-background pt-24 pb-12 border-t border-border/40 transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-24">
                    {/* Brand Section */}
                    <div className="max-w-xs">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="relative h-12 w-12 bg-white rounded-2xl overflow-hidden shadow-sm p-2.5 border border-border">
                                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold uppercase tracking-tight text-foreground leading-none mb-1">Recanto</span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Dos Pássaros</span>
                            </div>
                        </div>
                        <p className="text-foreground/40 text-[13px] leading-relaxed font-light mb-8">
                            Um empreendimento de alto padrão projetado para elevar sua qualidade de vida através do design e da exclusividade.
                        </p>
                        <div className="flex items-center gap-6">
                            {[Instagram, Facebook, Linkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="text-foreground/20 hover:text-primary transition-all duration-500">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-20 gap-y-12">
                        <div className="flex flex-col gap-6">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-2">Imóvel</span>
                            <a href="/#about" className="text-[12px] uppercase font-bold tracking-widest text-foreground/50 hover:text-primary transition-colors">O Residencial</a>
                            <a href="/#plans" className="text-[12px] uppercase font-bold tracking-widest text-foreground/50 hover:text-primary transition-colors">Plantas</a>
                            <a href="/#location" className="text-[12px] uppercase font-bold tracking-widest text-foreground/50 hover:text-primary transition-colors">Localização</a>
                        </div>
                        <div className="flex flex-col gap-6">
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary mb-2">Condomínio</span>
                            <a href="/#services" className="text-[12px] uppercase font-bold tracking-widest text-foreground/50 hover:text-primary transition-colors">Convênios</a>
                            <a href="/normas" className="text-[12px] uppercase font-bold tracking-widest text-foreground/50 hover:text-primary transition-colors">Regimento Interno</a>
                            <a href="/#contact" className="text-[12px] uppercase font-bold tracking-widest text-foreground/50 hover:text-primary transition-colors">Atendimento</a>
                        </div>
                        <div className="col-span-2 sm:col-span-1 flex flex-col items-start lg:items-end gap-6 sm:translate-y-0 translate-y-4">
                            <button
                                onClick={scrollToTop}
                                className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-foreground/20 hover:text-primary hover:border-primary transition-all duration-700 group"
                            >
                                <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                            </button>
                            <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-foreground/20 text-right">Voltar ao Topo</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-[9px] font-bold uppercase tracking-[0.5em] text-foreground/20">
                            © 2026 Recanto dos Pássaros. Crafted for luxury living.
                        </p>
                        <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-foreground/30">
                            Criado por <span className="text-primary/60">Daniel Ortega Pereira</span> - <a href="mailto:dnlortega@gmail.com" className="hover:text-primary transition-colors lowercase tracking-normal">dnlortega@gmail.com</a>
                        </p>
                    </div>
                    <div className="flex items-center gap-10">
                        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-foreground/20 decoration-primary hover:text-primary cursor-pointer transition-colors">Bauru - SP</span>
                        <div className="h-px w-8 bg-border" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-foreground/20">Todos os direitos reservados</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
