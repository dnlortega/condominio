"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import {
    Flame,
    Wifi,
    Wrench,
    PhoneCall,
    Phone,
    MessageCircle,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';


const hardcodedServices = [
    {
        category: "Concessionárias",
        icon: <Flame className="w-5 h-5" />,
        providers: [
            { name: "Ultragaz (Gás)", contact: "0800 7010 123" },
            { name: "CPFL (Energia)", contact: "0800 010 1010" }
        ],
    },
    {
        category: "Conectividade",
        icon: <Wifi className="w-5 h-5" />,
        providers: [
            { name: "Vivo Fibra", contact: "103 15" },
            { name: "Claro/NET", contact: "0800 721 0027" }
        ],
    },
    {
        category: "Manutenção",
        icon: <Wrench className="w-5 h-5" />,
        providers: [
            { name: "Zeladoria Local", contact: "Ramal 101" },
            { name: "Suporte Técnico", contact: "(14) 9988-7766" }
        ],
    },
    {
        category: "Operacional",
        icon: <PhoneCall className="w-5 h-5" />,
        providers: [
            { name: "Portaria 24h", contact: "Ramal 100" },
            { name: "Administradora", contact: "(14) 3222-1234" }
        ],
    }
];

type ServiceProvider = {
    id: string;
    name: string;
    contact: string;
    category: {
        name: string;
        icon: string | null;
    }
};

const ServiceContacts = ({ dbServices }: { dbServices?: ServiceProvider[] }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 640px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 },
        }
    });
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

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

    // Transform DB services to view structure if available and not empty
    const services = (dbServices && dbServices.length > 0) ? Object.values(dbServices.reduce((acc, provider) => {
        const catName = provider.category.name;
        if (!acc[catName]) {
            acc[catName] = {
                category: catName,
                // Default icon mapping or generic
                icon: provider.category.icon === 'Wifi' ? <Wifi className="w-5 h-5" /> :
                    provider.category.icon === 'Flame' ? <Flame className="w-5 h-5" /> :
                        provider.category.icon === 'Wrench' ? <Wrench className="w-5 h-5" /> :
                            provider.category.icon === 'PhoneCall' ? <PhoneCall className="w-5 h-5" /> :
                                <Phone className="w-5 h-5" />,
                providers: []
            };
        }
        acc[catName].providers.push({ name: provider.name, contact: provider.contact });
        return acc;
    }, {} as Record<string, { category: string, icon: any, providers: { name: string, contact: string }[] }>)) : hardcodedServices;


    return (
        <section id="services" className="py-32 bg-background transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                        <div className="flex items-center gap-6 mb-8">
                            <div className="h-px w-12 bg-primary/30" />
                            <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px]">Guia de Serviços & Utilidades</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-[1.1] uppercase tracking-tighter mb-8">
                            Rede de Apoio & <br /><span className="text-primary/30 font-light italic serif">Conveniência</span>
                        </h2>
                        <p className="text-foreground/40 text-lg font-light leading-relaxed max-w-lg">
                            Um diretório exclusivo com os principais prestadores e serviços internos, assegurando praticidade e eficiência ao seu cotidiano.
                        </p>
                    </motion.div>
                </div>

                {/* Carousel Navigation */}
                <div className="flex justify-end gap-2 mb-8">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className="rounded-full h-12 w-12 border-primary/20 hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        className="rounded-full h-12 w-12 border-primary/20 hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>

                {/* Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                                className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(33.333%-1.5rem)] min-w-0 group"
                            >
                                <div className="flex items-center gap-6 mb-12">
                                    <div className="w-14 h-14 rounded-2xl border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 shadow-sm relative overflow-hidden">
                                        <div className="relative z-10">{service.icon}</div>
                                        <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    </div>
                                    <div className="h-px flex-grow bg-border opacity-30" />
                                </div>

                                <h3 className="text-[11px] font-bold text-foreground uppercase tracking-[0.3em] mb-10 group-hover:text-primary transition-colors duration-500">{service.category}</h3>

                                <div className="space-y-10">
                                    {service.providers.map((provider, idx) => (
                                        <div key={idx} className="relative group/item">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-bold text-foreground/30 uppercase tracking-[0.2em] mb-3">{provider.name}</span>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xl font-bold text-foreground/80 tracking-tight group-hover/item:text-primary transition-colors duration-500">{provider.contact}</span>
                                                    <motion.a
                                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        href={(() => {
                                                            const cleanNum = provider.contact.replace(/\D/g, '');
                                                            if (cleanNum.length >= 10 && !cleanNum.startsWith('0800')) {
                                                                return `https://api.whatsapp.com/send?phone=55${cleanNum}&text=${encodeURIComponent(`Olá ${provider.name}, encontrei seu contato no guia do condomínio.`)}`;
                                                            }
                                                            return `tel:${cleanNum}`;
                                                        })()}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-sm transition-all duration-500 hover:scale-110"
                                                    >
                                                        <MessageCircle className="w-5 h-5 fill-current" />
                                                    </motion.a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="section-divider mt-32 opacity-20" />
            </div>
        </section>
    );
};

export default ServiceContacts;
