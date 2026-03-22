"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Code, Sparkles, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary pt-24">
      <Navbar />

      <div className="container mx-auto px-6 py-20 lg:py-32 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Sobre o Desenvolvedor</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
              Criando Soluções <br /> com Propósito
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Conheça as mãos e a mente por trás do sistema do Recanto dos Pássaros.
            </p>
          </motion.div>

          {/* Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden group shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              {/* Fallback image if Daniel's photo isn't available, but we use a sleek placeholder */}
              <div className="absolute inset-0 bg-primary/5 dark:bg-zinc-900 flex items-center justify-center">
                <Code className="w-32 h-32 text-primary/20" />
              </div>
              <Image
                src={`https://github.com/dnlortega.png`}
                alt="Daniel Ortega Pereira"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'; // Fallback handled by div above
                }}
              />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full backdrop-blur-sm border-t border-white/10 dark:border-white/5">
                <h2 className="text-3xl font-bold text-white mb-2">Daniel Ortega Pereira</h2>
                <p className="text-white/80 font-medium">Analista e Desenvolvedor de Sistemas</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Sobre Mim & Tecnologia</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sou estudante de Análise e Desenvolvimento de Sistemas (ADS), especializado na criação de sistemas que 
                  simplificam tarefas do dia a dia. Com foco especial em automação de processos e relatórios, construo pontes
                  entre a tecnologia digital e a eficiência do mundo real.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Atualmente foco meus projetos e estudos usando frameworks como Next.js, React, Node.js, PHP e Laravel,
                  aprimorando meus conhecimentos constantemente em JavaScript, TypeScript e Python. O sistema do Recanto dos Pássaros,
                  por exemplo, é fruto de uma arquitetura robusta unida a um design ultra-moderno, feito para entregar uma
                  experiência premium a todos os administradores e moradores.
                </p>
              </div>

              {/* Skills/Stack */}
              <div className="pt-6 border-t border-border">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Tech Stack do Projeto</h4>
                <div className="flex flex-wrap gap-3">
                  {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma ORM', 'PostgreSQL', 'Framer Motion'].map((tech) => (
                    <span key={tech} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Links */}
              <div className="pt-6 border-t border-border flex flex-wrap gap-4">
                <Button asChild className="rounded-full shadow-lg" size="lg">
                  <a href="https://github.com/dnlortega" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full" size="lg">
                  <a href="https://www.linkedin.com/in/daniel-op/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="ghost" className="rounded-full" size="lg">
                  <a href="mailto:dnlortega@gmail.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Contato
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
          
          {/* Mission Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 p-12 lg:p-16 rounded-[3rem] bg-gradient-to-br from-primary/10 via-background to-secondary/50 border border-primary/20 text-center relative overflow-hidden"
          >
             <Terminal className="absolute -top-10 -right-10 w-64 h-64 text-primary/5 -rotate-12" />
             <div className="relative z-10 max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold mb-6">"O código é a poesia da tecnologia"</h3>
                <p className="text-lg text-muted-foreground">
                  Mais do que resolver problemas, a missão é construir pontes entre as pessoas e a eficiência. 
                  Sistemas devem ser intuitivos, rápidos e visualmente impressionantes.
                </p>
             </div>
          </motion.div>

        </div>
      </div>
      
      <Footer />
    </main>
  );
}
