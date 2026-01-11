"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Flame,
    Wifi,
    Wrench,
    PhoneCall,
    Phone,
    ArrowUpRight
} from 'lucide-react';

const services = [
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

const ServiceContacts = () => {
    return (
        <section id="services" className="py-32 bg-background transition-colors duration-500">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                            className="group"
                        >
                            <div className="flex items-center gap-6 mb-12">
                                <div className="w-14 h-14 rounded-2xl border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-sm relative overflow-hidden">
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
                                                    whileHover={{ scale: 1.1, rotate: 45 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    href={`tel:${provider.contact.replace(/\D/g, '')}`}
                                                    className="w-10 h-10 rounded-full flex items-center justify-center text-primary/30 hover:text-primary bg-secondary/50 transition-all duration-500 border border-transparent hover:border-primary/20"
                                                >
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </motion.a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="section-divider mt-32 opacity-20" />
            </div>
        </section>
    );
};

export default ServiceContacts;
