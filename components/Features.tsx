"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Trees, MapPin, Compass, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const ImageCarousel = () => {
    const images = ['/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg', '/6.jpg', '/7.jpg'];
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-[700px]">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Condomínio imagem ${currentIndex + 1}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            {/* Controls */}
            <div className="absolute bottom-10 right-10 flex gap-4 z-30">
                <button
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-10 left-10 flex gap-2 z-30">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Features = () => {
    const features = [
        {
            icon: <MapPin className="w-5 h-5" />,
            title: "Localização Estratégica",
            description: "Situado no vetor de maior crescimento e valorização de Bauru, com acesso facilitado."
        },
        {
            icon: <Shield className="w-5 h-5" />,
            title: "Segurança de Vanguarda",
            description: "Monitoramento inteligente 24h e sistemas de controle de acesso de alta precisão."
        },
        {
            icon: <Compass className="w-5 h-5" />,
            title: "Mobilidade e Conectividade",
            description: "Conexão imediata com as principais vias expressas e infraestrutura urbana de qualidade."
        },
        {
            icon: <Sparkles className="w-5 h-5" />,
            title: "Lazer e Bem-estar",
            description: "Áreas comuns assinadas e equipadas para proporcionar experiências memoráveis em família."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    } as const;

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
        }
    } as const;

    const revealVariants = {
        hidden: { x: "-100%" },
        visible: {
            x: "100%",
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as const }
        }
    } as const;

    return (
        <section id="about" className="py-32 bg-background transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-24 items-center">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <div className="flex items-center gap-5 mb-8">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 48 }}
                                    viewport={{ once: true }}
                                    className="h-[1px] bg-primary/30"
                                />
                                <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px]">Exclusividade</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-10 leading-[1.1] uppercase tracking-tighter">
                                A Harmonia <br /> Entre <span className="text-primary/30 font-light italic serif">Viver e Evoluir</span>
                            </h2>
                            <p className="text-foreground/50 text-lg leading-relaxed mb-16 font-light max-w-lg">
                                Cada detalhe do Recanto dos Pássaros foi concebido para proporcionar uma experiência residencial superior, unindo tecnologia, segurança e conforto térmico.
                            </p>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid sm:grid-cols-2 gap-x-16 gap-y-16"
                            >
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ y: -5 }}
                                        className="group"
                                    >
                                        <div className="mb-6 flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-sm">
                                                {feature.icon}
                                            </div>
                                            <motion.div
                                                initial={{ scaleX: 0 }}
                                                whileInView={{ scaleX: 1 }}
                                                viewport={{ once: true }}
                                                className="h-px bg-border/40 flex-grow origin-left"
                                            />
                                        </div>
                                        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-foreground/40 text-[13px] leading-relaxed font-light">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                            className="relative z-10"
                        >
                            <div className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-border group relative bg-secondary/20">
                                <ImageCarousel />
                                {/* Image Reveal Slide */}
                                <motion.div
                                    variants={revealVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="absolute inset-0 bg-background z-20"
                                />
                            </div>
                        </motion.div>

                        {/* Artistic elements */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute -top-12 -right-12 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10"
                        />

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="absolute -bottom-12 -left-12 bg-background/90 backdrop-blur-xl border border-border p-12 rounded-[3.5rem] shadow-2xl z-20 hidden md:block group"
                        >
                            <div className="relative">
                                <motion.span
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="text-6xl font-bold text-primary block mb-3 tracking-tighter"
                                >
                                    45m²
                                </motion.span>
                                <span className="text-foreground/30 text-[9px] font-bold uppercase tracking-[0.4em] leading-loose block">
                                    Project Intelligence <br /> + Garagem Privativa
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="section-divider mt-32 opacity-20" />
        </section>
    );
};

export default Features;
