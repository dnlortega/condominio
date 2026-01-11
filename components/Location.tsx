"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Location = () => {
    const mapsLink = "https://maps.app.goo.gl/X6dXRkss6QoJXis68";

    return (
        <section id="location" className="py-24 bg-background transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-8 bg-primary/40" />
                            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Conexão Urbana</span>
                        </div>
                        <h2 className="text-4xl font-bold text-foreground mb-8 uppercase tracking-tight">
                            Eixo de <br /> <span className="text-primary/40 italic font-light">Valorização</span>
                        </h2>
                        <p className="text-foreground/40 text-lg leading-relaxed mb-10 font-light">
                            O Residencial está no epicentro de uma das regiões que mais evoluem em Bauru, unindo a conveniência de estar próximo à FIB com a fluidez das principais vias de acesso.
                        </p>

                        <div className="space-y-6 mb-10">
                            {[
                                { title: "Vias Rápidas", desc: "Acesso direto à Av. Castelo Branco e J.S. Martha." },
                                { title: "Educação", desc: "A poucos minutos da faculdade FIB." },
                                { title: "Comércio", desc: "Infraestrutura completa de mercados e serviços ao redor." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">{item.title}</h4>
                                        <p className="text-foreground/40 text-sm font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            asChild
                            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-7 text-xs font-bold uppercase tracking-[0.2em] shadow-xl hover:shadow-primary/20 transition-all group"
                        >
                            <a href={mapsLink} target="_blank" rel="noopener noreferrer">
                                <MapPin className="w-4 h-4 mr-2" />
                                Abrir no Google Maps
                                <ExternalLink className="w-3 h-3 ml-2 opacity-40 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="lg:w-1/2 relative group"
                    >
                        {/* A stylized "Map" visual representation instead of a heavy iframe */}
                        <div className="relative aspect-[16/9] lg:aspect-square rounded-[3rem] overflow-hidden border border-border bg-muted/20">
                            <div className="absolute inset-0 grayscale opacity-40 group-hover:opacity-60 transition-opacity duration-1000">
                                {/* Placeholder for a map-like texture or simplified map image */}
                                <div className="absolute inset-0 bg-[radial-gradient(oklch(var(--foreground)/0.1)_1px,transparent_1px)] [background-size:20px_20px]" />
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative z-10"
                                >
                                    <div className="bg-card p-6 rounded-3xl shadow-2xl border border-primary/10 flex flex-col items-center transition-colors duration-500">
                                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground mb-4 shadow-lg shadow-primary/30">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <span className="text-xs font-bold text-foreground uppercase tracking-widest text-center">Recanto dos <br /> Pássaros</span>
                                    </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                                        <div className="w-4 h-4 bg-card border-r border-b border-primary/10 rotate-45 transition-colors duration-500" />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Decorative Grid */}
                            <div className="absolute top-10 right-10 flex gap-2">
                                <div className="w-2 h-2 rounded-full bg-primary/20" />
                                <div className="w-2 h-2 rounded-full bg-primary/10" />
                                <div className="w-2 h-2 rounded-full bg-primary/5" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="section-divider opacity-30" />
            </div>
        </section>
    );
};

export default Location;
