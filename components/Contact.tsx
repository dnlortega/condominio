"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Contact = () => {
    const contactItems = [
        { icon: <Phone className="w-5 h-5" />, label: "Telefone de Vendas", val: "(14) 99769-6946", type: "text" },
        { icon: <Mail className="w-5 h-5" />, label: "E-mail Corporativo", val: "contato@recantodospassaros.com.br", type: "text" },
        {
            icon: <MapPin className="w-5 h-5" />,
            label: "Localização",
            val: "Abrir no Google Maps",
            type: "link",
            href: "https://maps.app.goo.gl/X6dXRkss6QoJXis68"
        }
    ];

    return (
        <section id="contact" className="py-32 bg-background border-t border-border/40 transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-center gap-5 mb-10">
                            <div className="h-px w-12 bg-primary/30" />
                            <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px]">Canal de Atendimento</span>
                        </div>

                        <p className="text-foreground/50 text-xl mb-16 max-w-md font-light leading-relaxed">
                            Nossa equipe de especialistas está pronta para apresentar todos os detalhes do empreendimento e as condições exclusivas de lançamento.
                        </p>

                        <div className="space-y-12">
                            {contactItems.map((item, i) => (
                                item.type === "link" ? (
                                    <motion.a
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-8 group cursor-pointer"
                                        whileHover={{ x: 8 }}
                                    >
                                        <div className="w-14 h-14 rounded-2xl border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-700 shadow-sm transition-colors">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <span className="block text-foreground/40 text-[9px] uppercase font-bold tracking-[0.3em] mb-2">{item.label}</span>
                                            <span className="text-xl font-bold text-foreground/80 group-hover:text-primary transition-colors tracking-tight">{item.val}</span>
                                        </div>
                                    </motion.a>
                                ) : (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-8 group"
                                        whileHover={{ x: 8 }}
                                    >
                                        <div className="w-14 h-14 rounded-2xl border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-700 shadow-sm transition-colors">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <span className="block text-foreground/40 text-[9px] uppercase font-bold tracking-[0.3em] mb-2">{item.label}</span>
                                            <span className="text-xl font-bold text-foreground/80 group-hover:text-primary transition-colors tracking-tight">{item.val}</span>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-secondary/30 p-12 md:p-20 rounded-[4rem] border border-border relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />

                        <form className="space-y-12 relative z-10">
                            <div className="space-y-3 group/input">
                                <Label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.4em] group-focus-within/input:text-primary transition-colors">Nome Completo</Label>
                                <input
                                    type="text"
                                    placeholder="Como prefere ser chamado?"
                                    className="w-full bg-transparent border-b border-border/60 py-5 text-foreground focus:outline-none focus:border-primary transition-all duration-700 placeholder:text-foreground/30 text-lg font-light"
                                />
                            </div>
                            <div className="space-y-3 group/input">
                                <Label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.4em] group-focus-within/input:text-primary transition-colors">E-mail para Contato</Label>
                                <input
                                    type="email"
                                    placeholder="Ex: nome@empresa.com"
                                    className="w-full bg-transparent border-b border-border/60 py-5 text-foreground focus:outline-none focus:border-primary transition-all duration-700 placeholder:text-foreground/30 text-lg font-light"
                                />
                            </div>
                            <div className="space-y-3 group/input">
                                <Label className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.4em] group-focus-within/input:text-primary transition-colors">Suas Dúvidas</Label>
                                <textarea
                                    rows={4}
                                    placeholder="Descreva brevemente como podemos ajudar..."
                                    className="w-full bg-transparent border-b border-border/60 py-5 text-foreground focus:outline-none focus:border-primary transition-all duration-700 resize-none placeholder:text-foreground/30 text-lg font-light"
                                />
                            </div>
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-10 rounded-2xl transition-all duration-700 flex items-center justify-center gap-5 uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-primary/20 group/btn border border-primary">
                                <span>Solicitar Consultoria</span>
                                <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
