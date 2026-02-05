"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import {
    Flame,
    Wifi,
    Wrench,
    PhoneCall,
    Phone,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    Zap,
    ExternalLink,
    ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1280px)': { slidesToScroll: 3 },
        }
    });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    const getIcon = (iconName: string | null) => {
        switch (iconName) {
            case 'Flame': return <Flame className="w-6 h-6" />;
            case 'Wifi': return <Wifi className="w-6 h-6" />;
            case 'Wrench':
            case 'Hammer': return <Wrench className="w-6 h-6" />;
            case 'PhoneCall':
            case 'Shield': return <PhoneCall className="w-6 h-6" />;
            case 'Zap': return <Zap className="w-6 h-6" />;
            default: return <Phone className="w-6 h-6" />;
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
        <section id="services" className="py-16 md:py-32 bg-background transition-colors duration-500 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="h-px w-8 bg-primary/40" />
                                <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">Guia de Utilidades</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-foreground leading-[1.1] uppercase tracking-tighter mb-6">
                                Rede de Apoio & <br />
                                <span className="text-primary/30 font-light italic serif lowercase">convênios</span>
                            </h2>
                            <p className="text-foreground/50 text-base md:text-lg font-light leading-relaxed max-w-lg">
                                Conecte-se instantaneamente com os serviços e prestadores essenciais para o seu bem-estar no Recanto dos Pássaros.
                            </p>
                        </motion.div>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollPrev}
                            disabled={!canScrollPrev}
                            className="rounded-full h-14 w-14 border-primary/10 bg-secondary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-500 disabled:opacity-20"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollNext}
                            disabled={!canScrollNext}
                            className="rounded-full h-14 w-14 border-primary/10 bg-secondary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-500 disabled:opacity-20"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </div>
                </div>

                <div className="overflow-visible" ref={emblaRef}>
                    <div className="flex gap-6 md:gap-8">
                        {servicesData.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)] xl:flex-[0_0_calc(33.333%-1.5rem)] min-w-0"
                            >
                                <div className={cn(
                                    "relative h-full bg-secondary/10 dark:bg-card/30 backdrop-blur-sm border border-border/40 rounded-[2.5rem] p-8 md:p-10 transition-all duration-700 group",
                                    hoveredIndex === index ? "border-primary/30 shadow-2xl shadow-primary/5 -translate-y-2" : ""
                                )}>
                                    {/* Icon Header */}
                                    <div className="flex items-start justify-between mb-8 md:mb-12">
                                        <div className="w-16 h-16 rounded-2xl bg-background border border-border/50 flex items-center justify-center text-primary shadow-sm relative overflow-hidden transition-transform duration-500 group-hover:scale-110">
                                            <div className="relative z-10">{service.icon}</div>
                                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary transition-all duration-500" />
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <ArrowUpRight className="w-5 h-5 text-primary/40" />
                                        </div>
                                    </div>

                                    <h3 className="text-xs font-bold text-foreground uppercase tracking-[0.3em] mb-12 group-hover:text-primary transition-colors duration-500">
                                        {service.category}
                                    </h3>

                                    <div className="space-y-8 md:space-y-10">
                                        {service.providers.map((provider, idx) => (
                                            <div key={idx} className="relative group/item border-l-2 border-transparent hover:border-primary/30 pl-4 -ml-4 transition-all duration-300">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.2em] mb-2">{provider.name}</span>
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="text-xl md:text-2xl font-bold text-foreground/80 tracking-tight group-hover/item:text-primary transition-colors duration-500 font-heading">
                                                            {provider.contact}
                                                        </span>
                                                        <motion.a
                                                            whileHover={{ scale: 1.15 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            href={(() => {
                                                                const cleanNum = provider.contact.replace(/\D/g, '');
                                                                if (provider.hasWhatsApp !== false && cleanNum.length >= 10 && !cleanNum.startsWith('0800')) {
                                                                    return `https://api.whatsapp.com/send?phone=55${cleanNum}&text=${encodeURIComponent(`Olá ${provider.name}, encontrei seu contato no guia do condomínio.`)}`;
                                                                }
                                                                return `tel:${cleanNum}`;
                                                            })()}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={cn(
                                                                "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500",
                                                                provider.hasWhatsApp !== false ? "bg-[#25D366] shadow-green-500/20" : "bg-primary shadow-primary/20",
                                                                "group-hover/item:rotate-[-5deg]"
                                                            )}
                                                        >
                                                            {provider.hasWhatsApp !== false ? (
                                                                <MessageCircle className="w-5 h-5 fill-current" />
                                                            ) : (
                                                                <Phone className="w-5 h-5" />
                                                            )}
                                                        </motion.a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Subtle Gradient Bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-24 md:mt-32 border-t border-border/40 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-foreground/40 font-bold uppercase tracking-[0.3em]">
                        Atualizado em Fevereiro 2026
                    </p>
                    <div className="flex items-center gap-3 text-primary/60 hover:text-primary transition-colors cursor-pointer group">
                        <span className="text-xs font-bold uppercase tracking-widest">Acesse a lista completa</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceContacts;
