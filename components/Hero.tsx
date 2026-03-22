"use client";

import React from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { ArrowRight, Star, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

const Counter = ({ value, suffix = "" }: { value: string, suffix?: string }) => {
    const ref = React.useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const nums = value.match(/\d+/g);
    const targetValue = nums ? parseInt(nums[nums.length - 1]) : 0;

    React.useEffect(() => {
        if (inView && ref.current) {
            const node = ref.current;
            const controls = animate(0, targetValue, {
                duration: 2.5,
                ease: [0.33, 1, 0.68, 1],
                onUpdate(value) {
                    node.textContent = Math.round(value).toString().padStart(nums && nums[0].length === 2 ? 2 : 1, '0');
                }
            });
            return () => controls.stop();
        }
    }, [inView, targetValue, nums]);
    return <span ref={ref}>00</span>;
};

const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function Hero() {
    const title = "Onde o Luxo Encontra a Paz";
    const words = title.split(" ");
    const { scrollY } = useScroll();
    const yParallax = useTransform(scrollY, [0, 800], [0, 300]);
    const scaleParallax = useTransform(scrollY, [0, 800], [1, 1.15]);
    const opacityParallax = useTransform(scrollY, [0, 500], [1, 0]);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const child = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any } },
        hidden: { opacity: 0, y: 100 },
    };

    const whatsappLink = "https://api.whatsapp.com/send?phone=5514997696946&text=Olá,%20gostaria%20de%20falar%20com%20a%20síndica%20do%20Recanto%20dos%20Pássaros.";

    return (
        <section id="home" className="relative min-h-[90vh] md:min-h-screen w-full flex items-center overflow-hidden z-10 selection:bg-primary/30">
            {/* Cinematic Background Wrapper */}
            <motion.div style={{ y: yParallax, scale: scaleParallax }} className="absolute inset-0 z-0 bg-background overflow-hidden">
                <Image
                    src="/hero.png"
                    alt="Recanto dos Pássaros Residencial"
                    fill
                    className="object-cover scale-105 opacity-20 filter saturate-50"
                    priority
                />
                
                {/* Gradients to keep text 100% readable and elegant */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-transparent to-background/90" />
                
                {/* Elegant Radial Gradient for Depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,var(--primary)_0%,transparent_100%)] opacity-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_0%_800px,var(--primary)_0%,transparent_100%)] opacity-10" />

                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[130px] pointer-events-none"
                />
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] bg-accent/40 rounded-full blur-[150px] pointer-events-none"
                />
            </motion.div>

            <div className="container mx-auto px-6 relative z-10 pt-32 pb-20 md:py-40 flex flex-col justify-center min-h-full">
                <div className="max-w-5xl mx-auto md:mx-0 w-full">
                    {/* Floating Star Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="flex items-center gap-4 mb-8 justify-center lg:justify-start"
                    >
                        <div className="flex -space-x-1.5 p-2 bg-background/50 dark:bg-white/5 backdrop-blur-xl rounded-full border border-border/50 shadow-sm">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
                            ))}
                        </div>
                        <div className="h-px w-10 bg-gradient-to-r from-primary/50 to-transparent" />
                        <span className="text-primary font-bold text-[9px] uppercase tracking-[0.4em] drop-shadow-md">
                            Residencial de Alto Padrão
                        </span>
                    </motion.div>

                    {/* Massive Typography Title */}
                    <motion.h1
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="text-[12vw] sm:text-7xl md:text-[5.5rem] lg:text-[7rem] font-bold text-foreground mb-6 leading-[0.85] uppercase text-center lg:text-left tracking-tighter flex flex-wrap gap-x-3 md:gap-x-6 justify-center lg:justify-start drop-shadow-2xl"
                    >
                        {words.map((word, index) => (
                            <div key={index} className="overflow-hidden pb-3">
                                <motion.span
                                    variants={child}
                                    className={`inline-block ${index >= 3 ? "text-primary italic font-light serif drop-shadow-[0_0_15px_rgba(var(--primary),0.3)]" : ""}`}
                                >
                                    {word}
                                </motion.span>
                            </div>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-base md:text-xl text-foreground/70 dark:text-zinc-300 mb-10 max-w-xl leading-relaxed text-center lg:text-left mx-auto lg:mx-0 font-light"
                    >
                        Central inteligente e moderna de informações do condomínio em Bauru. Transparência, tecnologia e harmonia para a sua família.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
                    >
                        <MagneticButton>
                            <Button className="bg-foreground text-background hover:bg-foreground/90 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-10 py-8 rounded-[2rem] font-bold transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] text-xs uppercase tracking-[0.2em] w-full sm:w-auto relative group overflow-hidden">
                                <span className="relative z-10">Ver Regimento</span>
                                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                    <ArrowRight className="w-4 h-4 relative z-10" />
                                </motion.div>
                                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                            </Button>
                        </MagneticButton>

                        <MagneticButton>
                            <Button asChild variant="outline" className="bg-background/20 dark:bg-white/5 backdrop-blur-xl border-border/50 dark:border-white/10 text-foreground px-10 py-8 rounded-[2rem] font-bold transition-all duration-500 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] w-full sm:w-auto shadow-sm group">
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                                    <span>Falar com a Síndica</span>
                                </a>
                            </Button>
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>

            {/* Glassmorphic Statistics Bar */}
            <motion.div
                style={{ opacity: opacityParallax }}
                custom={{ delay: 1.8 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute bottom-6 md:bottom-12 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:w-auto max-w-5xl z-20"
            >
                <div className="bg-background/60 dark:bg-black/40 backdrop-blur-2xl border border-border/50 dark:border-white/10 rounded-[2.5rem] p-6 md:px-12 md:py-8 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                    <div className="grid grid-cols-3 gap-4 md:gap-16 divide-x divide-border/30 dark:divide-white/10">
                        {[
                            { val: "45-47", label: "Área Privativa", suffix: "m²" },
                            { val: "02", label: "Dormitórios" },
                            { val: "24h", label: "Segurança" }
                        ].map((stat, i) => (
                            <div key={i} className={`flex flex-col items-center justify-center ${i !== 0 ? 'pl-4 md:pl-16' : ''}`}>
                                <span className="text-2xl md:text-4xl font-bold tracking-tighter text-foreground mb-1 drop-shadow-sm flex items-center">
                                    {i === 0 ? "45-" : ""}
                                    <Counter value={stat.val} />
                                    {stat.suffix || (stat.val.includes('h') ? 'h' : '')}
                                </span>
                                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold text-foreground/40">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
