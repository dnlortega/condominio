"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
    Menu,
    ArrowRight,
    MessageCircle,
    Home,
    Layout,
    MapPin,
    FileText,
    Handshake,
    Phone
} from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'O Residencial', href: '/#about', icon: Home },
        { name: 'Plantas', href: '/#plans', icon: Layout },
        { name: 'Utilidades', href: '/#services', icon: Handshake },
        { name: 'Localização', href: '/#location', icon: MapPin },
        { name: 'Regimento', href: '/normas', icon: FileText },
        { name: 'Contato', href: '/#contact', icon: Phone },
    ];

    const whatsappLink = "https://api.whatsapp.com/send?phone=5514997696946&text=Olá,%20gostaria%20de%20falar%20com%20a%20síndica%20do%20Recanto%20dos%20Pássaros.";

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-[70] transition-all duration-700",
            "bg-background/70 dark:bg-black/60 backdrop-blur-3xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.5)] border-b border-border/30 dark:border-white/10",
            isScrolled ? "py-3" : "py-5"
        )}>
            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-accent origin-left z-[71]"
                style={{ scaleX }}
            />

            <div className="container mx-auto px-6 flex items-center justify-between">
                <motion.a
                    href="/"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 shrink-0 group relative"
                >
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md group-hover:bg-primary/40 transition-colors duration-500" />
                    <div className="relative h-11 w-11 bg-white rounded-2xl overflow-hidden shadow-sm p-2 border border-border/50 group-hover:rotate-12 transition-transform duration-500">
                        <Image
                            src="/logo.png"
                            alt="Recanto dos Pássaros"
                            fill
                            sizes="44px"
                            className="object-contain"
                            loading="eager"
                            priority
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-bold tracking-tight uppercase transition-colors duration-500 leading-none mb-1 text-foreground drop-shadow-sm">
                            Recanto dos Pássaros
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-[0.4em] transition-opacity duration-500 text-primary drop-shadow-sm">
                            Residencial de Luxo
                        </span>
                    </div>
                </motion.a>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex items-center gap-2">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                                className="flex items-center gap-0 hover:gap-3 px-4 py-2.5 rounded-full text-foreground/70 dark:text-zinc-400 hover:bg-primary/10 hover:text-primary transition-all duration-500 group overflow-hidden"
                            >
                                <div className="flex items-center justify-center shrink-0">
                                    <link.icon className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] max-w-0 group-hover:max-w-[150px] opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap overflow-hidden">
                                    {link.name}
                                </span>
                            </motion.a>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 border-l border-border/40 dark:border-white/10 pl-6">
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="rounded-full p-0 h-10 w-10 flex items-center justify-center transition-colors text-foreground"
                            >
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-background/90 dark:bg-black/90 backdrop-blur-2xl border-l border-border dark:border-white/10 p-0 w-full sm:w-[400px]">
                            <div className="flex flex-col h-full">
                                <SheetHeader className="p-8 border-b border-border/50 dark:border-white/10 bg-muted/10 dark:bg-white/5">
                                    <SheetTitle className="flex items-center gap-4">
                                        <div className="relative h-12 w-12 bg-white rounded-2xl overflow-hidden p-2.5 border border-border shadow-sm">
                                            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                                        </div>
                                        <div className="flex flex-col items-start translate-y-1">
                                            <span className="text-xl font-bold uppercase tracking-tight text-foreground leading-none mb-1 text-left">Recanto</span>
                                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] text-left">Dos Pássaros</span>
                                        </div>
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col p-10 flex-grow">
                                    <div className="space-y-2">
                                        {navLinks.map((link) => (
                                            <SheetClose asChild key={link.name}>
                                                <a
                                                    href={link.href}
                                                    className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.3em] text-foreground/60 dark:text-zinc-400 hover:text-primary transition-all py-6 border-b border-border/30 dark:border-white/10 last:border-0 group"
                                                >
                                                    <span>{link.name}</span>
                                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-primary" />
                                                </a>
                                            </SheetClose>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-10 border-t border-border/50 dark:border-white/10 bg-muted/10 dark:bg-white/5">
                                    <p className="text-center text-[10px] text-foreground/30 mt-8 uppercase tracking-[0.4em] font-bold">
                                        Recanto dos Pássaros © 2026
                                    </p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
