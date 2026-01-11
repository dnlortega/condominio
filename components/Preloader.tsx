"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Preloader = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 4000);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'unset';
        };
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                    }}
                    className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6"
                >
                    <div className="relative max-w-sm w-full">
                        {/* Logo Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                            }}
                            className="flex flex-col items-center"
                        >
                            <div className="relative h-48 w-48 md:h-64 md:w-64 bg-white rounded-[3rem] p-6 shadow-2xl shadow-primary/10 border border-primary/5 mb-10 overflow-hidden">
                                <Image
                                    src="/logo.png"
                                    alt="Recanto dos Pássaros"
                                    fill
                                    className="object-contain p-4"
                                    priority
                                />
                                {/* Subtle inner glow animation */}
                                <motion.div
                                    animate={{
                                        opacity: [0, 0.5, 0],
                                        rotate: [0, 360]
                                    }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 pointer-events-none"
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 1.2 }}
                                className="text-center"
                            >
                                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.5em] text-foreground mb-4 leading-none">
                                    Recanto
                                </h1>
                                <div className="h-px w-24 bg-primary/20 mx-auto mb-4" />
                                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.8em] text-primary/60 ml-[0.8em]">
                                    Dos Pássaros
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Progress indicator */}
                    <motion.div
                        className="absolute bottom-20 w-48 h-[1px] bg-border overflow-hidden"
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 3.8, ease: "easeInOut" }}
                            className="w-full h-full bg-primary"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
