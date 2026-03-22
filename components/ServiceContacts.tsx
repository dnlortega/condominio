"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Flame, Wifi, Wrench, PhoneCall, Phone, MessageCircle,
    Zap, ExternalLink, ShieldCheck, HeartPulse
} from 'lucide-react';
import { cn } from "@/lib/utils";

type ServiceProvider = {
    id: string;
    name: string;
    contact: string;
    hasWhatsApp?: boolean;
    category: {
        name: string;
        icon: string | null;
    }
};

const ServiceContacts = ({ dbServices }: { dbServices?: ServiceProvider[] }) => {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    const getIcon = (iconName: string | null) => {
        switch (iconName) {
            case 'Flame': return <Flame className="w-5 h-5" />;
            case 'Wifi': return <Wifi className="w-5 h-5" />;
            case 'Wrench':
            case 'Hammer': return <Wrench className="w-5 h-5" />;
            case 'PhoneCall':
            case 'Shield': return <ShieldCheck className="w-5 h-5" />;
            case 'Zap': return <Zap className="w-5 h-5" />;
            case 'Stethoscope': return <HeartPulse className="w-5 h-5" />;
            default: return <PhoneCall className="w-5 h-5" />;
        }
    };

    const servicesData = (dbServices && dbServices.length > 0) ? Object.values(dbServices.reduce((acc, provider) => {
        const catName = provider.category.name;
        if (!acc[catName]) {
            acc[catName] = {
                category: catName,
                icon: getIcon(provider.category.icon),
                providers: []
            };
        }
        acc[catName].providers.push({
            name: provider.name,
            contact: provider.contact,
            hasWhatsApp: provider.hasWhatsApp
        });
        return acc;
    }, {} as Record<string, { category: string, icon: React.ReactNode, providers: { name: string, contact: string, hasWhatsApp?: boolean }[] }>)) : [];

    if (servicesData.length === 0) return null;

    return (
        <section id="services" className="py-24 md:py-32 bg-background relative overflow-hidden">
            {/* Minimalist Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/30 rounded-full blur-[120px] opacity-40 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center justify-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Guia de Utilidades
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
                            Rede de Apoio & Convênios
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Contatos rápidos e práticos para os serviços essenciais do seu dia a dia.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesData.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            onMouseEnter={() => setHoveredCategory(service.category)}
                            onMouseLeave={() => setHoveredCategory(null)}
                            className={cn(
                                "group bg-white rounded-3xl p-8 border transition-all duration-500",
                                hoveredCategory === service.category
                                    ? "border-primary/40 shadow-xl shadow-primary/5 translate-y--1"
                                    : "border-border/50 shadow-sm"
                            )}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-500",
                                    hoveredCategory === service.category ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                                )}>
                                    {service.icon}
                                </div>
                                <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                                    {service.category}
                                </h3>
                            </div>

                            <div className="space-y-4">
                                {service.providers.map((provider, idx) => {
                                    const cleanNum = provider.contact.replace(/\D/g, '');
                                    const isWhatsApp = provider.hasWhatsApp !== false && cleanNum.length >= 10 && !cleanNum.startsWith('0800');
                                    const contactLink = isWhatsApp
                                        ? `https://api.whatsapp.com/send?phone=55${cleanNum}&text=${encodeURIComponent(`Olá ${provider.name}, encontrei seu contato no guia do condomínio.`)}`
                                        : `tel:${cleanNum}`;

                                    return (
                                        <a
                                            key={idx}
                                            href={contactLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-4 rounded-2xl bg-secondary/30 hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 group/item"
                                        >
                                            <div className="flex flex-col gap-1">
                                                <span className="text-sm font-semibold text-foreground/80 group-hover/item:text-foreground">
                                                    {provider.name}
                                                </span>
                                                <span className="text-xs font-medium text-muted-foreground">
                                                    {provider.contact}
                                                </span>
                                            </div>
                                            <div className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                                                isWhatsApp ? "bg-[#25D366]/10 text-[#25D366] group-hover/item:bg-[#25D366] group-hover/item:text-white" : "bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-white"
                                            )}>
                                                {isWhatsApp ? <MessageCircle className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-muted-foreground font-medium flex items-center justify-center gap-2">
                        Atualizado em Fevereiro 2026 <ExternalLink className="w-3.5 h-3.5" />
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ServiceContacts;
