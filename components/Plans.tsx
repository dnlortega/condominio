"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, BedDouble, Sofa, ArrowRight, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";

const plans = [
    {
        type: "Planta Tipo A",
        size: "45 m²",
        description: "Equilíbrio perfeito entre eficiência e conforto, com sacada gourmet integrada para momentos de lazer privativo.",
        image: "/tipo-a.jpg"
    },
    {
        type: "Planta Tipo B",
        size: "47 m²",
        description: "Ampla área social integrada, projetada para quem valoriza o convívio e o design em espaços otimizados.",
        image: "/tipo-b.jpg"
    },
    {
        type: "Planta Tipo C",
        size: "47 m²",
        description: "Layout premium com foco na fluidez circulatória e ventilação cruzada, proporcionando conforto térmico superior.",
        image: "/tipo-c.jpg"
    }
];

const Plans = () => {
    return (
        <section id="plans" className="py-32 bg-background transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                        <div className="flex items-center justify-center gap-6 mb-8">
                            <div className="h-px w-12 bg-primary/30" />
                            <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px]">Excelência Arquitetônica</span>
                            <div className="h-px w-12 bg-primary/30" />
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 uppercase tracking-tighter">
                            A Inteligência de <br /><span className="text-primary/30 font-light italic serif">Cada Metro Quadrado</span>
                        </h2>
                        <p className="text-foreground/40 text-lg md:text-xl leading-relaxed font-light">
                            Desenvolvidas por especialistas, nossas plantas priorizam a funcionalidade sem abdicar da sofisticação arquitetônica.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.type}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
                            className="flex flex-col group"
                        >
                            <div className="relative aspect-[4/3] bg-secondary border border-border/60 rounded-[3rem] overflow-hidden mb-10 transition-all duration-1000 group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]">
                                {/* Subtle overlay grid */}
                                <div className="absolute inset-0 bg-[radial-gradient(oklch(var(--foreground)/0.1)_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.03]" />

                                <div className="absolute inset-0 p-12 flex items-center justify-center">
                                    <img
                                        src={plan.image}
                                        alt={plan.type}
                                        className="max-w-full max-h-full object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute top-8 left-8 bg-card backdrop-blur-md px-6 py-2 rounded-full border border-border shadow-sm transition-colors duration-500">
                                    <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">{plan.size}</span>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    className="absolute inset-0 bg-primary/5 flex items-center justify-center pointer-events-none transition-colors duration-700"
                                >
                                    <div className="w-14 h-14 rounded-full bg-card flex items-center justify-center shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-700 ease-out">
                                        <Maximize2 className="w-6 h-6 text-primary" />
                                    </div>
                                </motion.div>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <motion.div
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="w-2 h-2 rounded-full bg-primary/60"
                                />
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">{plan.type}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-tight group-hover:text-primary transition-colors duration-500">Living Integrado</h3>
                            <p className="text-foreground/40 text-[15px] leading-relaxed mb-10 flex-grow font-light">
                                {plan.description}
                            </p>

                            <div className="flex items-center gap-10 pt-10 border-t border-border/40">
                                <div className="flex items-center gap-3 text-foreground/60 transition-colors group-hover:text-foreground">
                                    <BedDouble className="w-4 h-4 text-primary/40" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">02 Dorms</span>
                                </div>
                                <div className="flex items-center gap-3 text-foreground/60 transition-colors group-hover:text-foreground">
                                    <Sofa className="w-4 h-4 text-primary/40" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Varanda Gourmet</span>
                                </div>
                                <button className="ml-auto w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary/40 group-hover:text-primary group-hover:border-primary transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/10">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>

            <div className="section-divider mt-32 opacity-20" />
        </section>
    );
};

export default Plans;
