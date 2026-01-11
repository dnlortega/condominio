"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const Hero = () => {
    const title = "Onde o Luxo Encontra a Paz";
    const words = title.split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    } as const;

    const whatsappLink = "https://api.whatsapp.com/send?phone=5514997696946&text=Olá,%20gostaria%20de%20falar%20com%20a%20síndica%20do%20Recanto%20dos%20Pássaros.";

    return (
        <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden z-10">
            {/* Background Image with Parallax-like movement */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="https://images.unsplash.com/photo-1545324418-f1d3ac1ef000?q=80&w=2000&auto=format&fit=crop"
                    alt="Recanto dos Pássaros Residencial"
                    fill
                    className="object-cover brightness-100"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/90 dark:from-black/30 dark:via-transparent dark:to-black/90 lg:bg-gradient-to-r lg:from-white/95 lg:via-white/40 lg:to-transparent lg:dark:from-black/95 lg:dark:via-black/40 lg:dark:to-transparent" />
            </motion.div>

            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-4xl">
                    <div className="overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 1 }}
                            className="flex items-center gap-4 mb-8 justify-center lg:justify-start"
                        >
                            <div className="flex -space-x-1.5">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                    >
                                        <Star className="w-3.5 h-3.5 text-primary fill-primary opacity-60" />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="h-px w-8 bg-primary/20" />
                            <span className="text-primary font-bold text-[10px] uppercase tracking-[0.4em]">
                                Residencial de Alto Padrão
                            </span>
                        </motion.div>
                    </div>

                    <motion.h1
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="text-5xl sm:text-6xl md:text-8xl font-bold text-foreground mb-8 leading-[0.9] uppercase text-center lg:text-left tracking-tighter flex flex-wrap gap-x-4 lg:gap-x-6 justify-center lg:justify-start"
                    >
                        {words.map((word, index) => (
                            <motion.span
                                variants={child}
                                key={index}
                                className={index >= 3 ? "text-primary/95 italic font-light serif" : ""}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="text-lg md:text-xl text-foreground/60 mb-12 max-w-xl leading-relaxed text-center lg:text-left mx-auto lg:mx-0 font-light"
                    >
                        Central de informações do condomínio em Bauru, onde a transparência e a organização garantem a harmonia que sua família merece.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                    >
                        <Button className="bg-primary hover:bg-zinc-900 text-white px-10 py-8 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-3 group shadow-2xl shadow-primary/20 text-xs uppercase tracking-[0.3em] w-full sm:w-auto overflow-hidden relative border border-primary">
                            <span className="relative z-10">Ver Regimento</span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                <ArrowRight className="w-4 h-4 relative z-10" />
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 bg-white/10"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6 }}
                            />
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="bg-white/10 dark:bg-black/20 hover:bg-white/20 dark:hover:bg-black/40 backdrop-blur-md text-foreground border-border px-10 py-8 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] w-full sm:w-auto shadow-sm group"
                        >
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                                <span className="group-hover:text-primary transition-colors">Falar com a Síndica</span>
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1.5 }}
                        className="mt-16 lg:mt-24 grid grid-cols-3 gap-6 md:gap-16 lg:flex lg:items-center border-t border-border/50 pt-10"
                    >
                        {[
                            { val: "45-47", label: "Área Privativa" },
                            { val: "02", label: "Dormitórios" },
                            { val: "24h", label: "Segurança" }
                        ].map((stat, i) => (
                            <React.Fragment key={i}>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 2.2 + (i * 0.2) }}
                                    className="flex flex-col items-center lg:items-start"
                                >
                                    <span className="text-3xl md:text-4xl font-bold text-foreground leading-none tracking-tighter mb-2">{stat.val}</span>
                                    <span className="text-foreground/30 text-[9px] uppercase tracking-[0.4em] font-bold">{stat.label}</span>
                                </motion.div>
                                {i < 2 && <div className="hidden lg:block w-px h-12 bg-border/60" />}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Premium Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1.5 }}
                className="absolute bottom-10 left-12 hidden lg:flex flex-col items-center gap-4"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[8px] font-bold text-primary uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">Descubra Mais</span>
                    <div className="w-px h-20 bg-gradient-to-b from-primary/60 via-primary/20 to-transparent overflow-hidden relative">
                        <motion.div
                            animate={{ y: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-primary w-full h-[50%]"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
