"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    Calendar,
    Volume2,
    Car,
    Trash2,
    ShieldCheck,
    Hammer,
    PawPrint,
    ArrowLeft,
    AlertTriangle,
    Home,
    Droplets,
    Wind,
    UserCheck,
    Truck,
    Mail
} from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NormasPage = () => {
    const categories = [
        {
            title: "Áreas Comuns",
            icon: <Home className="w-6 h-6" />,
            rules: [
                "O horário de funcionamento dos Quiosques, Sala de Jogos e Playground é das 08h às 22h.",
                "Salão de Festas: Disponível das 08h às 22h com som ambiente, e das 22h às 00h exclusivamente sem som.",
                "Reservas de Quiosques: Devem ser realizadas via aplicativo oficial. Taxa de manutenção de R$ 20,00 via boleto. Capacidade máxima de 20 convidados.",
                "Reservas do Salão de Festas: Solicitações via Portaria ou WhatsApp (14) 99750-0577. Taxa de R$ 100,00 (Pix: res.recantodospassaros.sindica@gmail.com). Limite de 80 convidados. A limpeza é de responsabilidade do locador."
            ]
        },
        {
            title: "Lei do Silêncio",
            icon: <Volume2 className="w-6 h-6" />,
            rules: [
                "O respeito ao sossego alheio é dever de todos em qualquer horário. A perturbação do sossego configura infração sujeita a penalidades.",
                "Após as 22h: É terminantemente proibido qualquer excesso sonoro, sob pena de medidas administrativas e acionamento das autoridades."
            ]
        },
        {
            title: "Garagem e Veículos",
            icon: <Car className="w-6 h-6" />,
            rules: [
                "O estacionamento é permitido estritamente dentro da área delimitada (quadrante amarelo).",
                "É proibido avançar sobre calçadas ou vias de circulação interna.",
                "Não é permitido o armazenamento de materiais de obra ou outros objetos nas vagas.",
                "Veículos com vazamento de óleo não devem permanecer nas vagas até o devido reparo.",
                "Uso obrigatório de TAG Eletrônica para acesso. Solicitação com a síndica mediante custo de R$ 25,00."
            ]
        },
        {
            title: "Gestão de Resíduos",
            icon: <Trash2 className="w-6 h-6" />,
            rules: [
                "Coleta de resíduos (Orgânico, Reciclável e Óleo): Terças, quintas e sábados.",
                "O lixo deve ser devidamente ensacado e as sacolas bem lacradas.",
                "Descarte apenas no interior das lixeiras, otimizando o espaço. É proibido deixar resíduos fora dos coletores.",
                "Não é permitido o descarte de entulho, móveis ou isopor nas lixeiras comuns (utilize Ecopontos ou caçambas particulares)."
            ]
        },
        {
            title: "Acesso e Segurança",
            icon: <ShieldCheck className="w-6 h-6" />,
            rules: [
                "Delivery: Identificação obrigatória na portaria. O condômino deve retirar o pedido pessoalmente no respectivo bloco.",
                "Correspondências Simples: Serão depositadas nas caixas de correio de cada bloco.",
                "Correspondências Registradas (AR) e Encomendas: Disponíveis para retirada na portaria após aviso ao morador.",
                "Prestadores de Serviço: Entrada permitida de segunda a sexta (08h às 17h) e sábados (08h às 12h)."
            ]
        },
        {
            title: "Reformas e Mudanças",
            icon: <Hammer className="w-6 h-6" />,
            rules: [
                "Agendamento prévio obrigatório junto à administradora para alinhamento de horários e diretrizes.",
                "O condômino é responsável por instruir seus prestadores sobre as normas vigentes do residencial.",
                "Eventuais danos ou descumprimento de regras por prestadores são de inteira responsabilidade do proprietário/morador."
            ]
        },
        {
            title: "Animais de Estimação",
            icon: <PawPrint className="w-6 h-6" />,
            rules: [
                "O tutor é civilmente responsável por qualquer dano ao patrimônio ou a terceiros causado pelo animal.",
                "É proibida a permanência ou passeios em áreas comuns, exceto no trajeto direto de entrada e saída.",
                "A higienização imediata de eventuais dejetos é obrigatória em todo o perímetro do condomínio.",
                "Uso obrigatório de coleira e guia. Focinheira é exigida para animais de porte médio/grande e raças específicas."
            ]
        },
        {
            title: "Regras de Convivência",
            icon: <UserCheck className="w-6 h-6" />,
            rules: [
                "É dever de todos preservar as áreas comuns. Sujeiras acidentais em corredores ou elevadores devem ser limpas imediatamente pelo responsável.",
                "É terminantemente proibido lançar água ou objetos das sacadas para as unidades inferiores ou áreas comuns.",
                "Varal: Permitido apenas modelo de chão na sacada (sem ultrapassar o limite da grade). Lavanderias comportam modelos de teto ou sanfonados.",
                "Não é permitido estender roupas, toalhas ou tapetes na grade da sacada.",
                "Mantenha o hall e áreas de circulação livres de objetos pessoais (calçados, vasos, bicicletas, etc).",
                "Menores de 12 anos devem estar acompanhados por um responsável nas áreas comuns.",
                "O uso de Skate, Bicicleta e Patins é restrito à área dos quiosques.",
                "É proibido empinar pipas e o uso de bolas fora de locais permitidos (exceto bolas de plástico com supervisão)."
            ]
        },
        {
            title: "Fachada e Comunicação",
            icon: <AlertTriangle className="w-6 h-6" />,
            rules: [
                "Alterações na fachada (cores, esquadrias, fechamentos) são proibidas sem aprovação assemblear.",
                "Não é permitido afixar cartazes de venda ou aluguel em unidades ou áreas comuns.",
                "A instalação de películas e grama sintética deve seguir rigorosamente o padrão deliberado em assembleia.",
                "Churrasqueiras: Apenas modelos de alvenaria ou pré-moldados conectados ao duto central são autorizados.",
                "O uso de substâncias ilícitas é expressamente proibido. Infrações serão reportadas às autoridades competentes.",
                "Sugestões e reclamações formais devem ser encaminhadas ao e-mail: res.recantodospassaros.sindica@gmail.com"
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] mb-12 hover:gap-4 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar para o Início
                </Link>

                <div className="max-w-4xl mb-20 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-5 mb-8 justify-center lg:justify-start"
                    >
                        <div className="h-px w-12 bg-primary/30" />
                        <span className="text-primary font-bold uppercase tracking-[0.5em] text-[10px]">Conduta Recomendada</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-[1.1] uppercase tracking-tighter"
                    >
                        Regimento Interno & <br /> <span className="text-primary/30 italic font-light serif">Normas de Convivência</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-foreground/50 text-xl font-light leading-relaxed max-w-2xl"
                    >
                        Para garantir o bem-estar e a harmonia de todos os moradores do Recanto dos Pássaros,
                        estabelecemos as diretrizes fundamentais de uso e convivência do nosso residencial.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * idx }}
                            className="bg-secondary/20 border border-border/40 p-10 rounded-[2.5rem] hover:border-primary/20 transition-colors group"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    {cat.icon}
                                </div>
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                                    {cat.title}
                                </h2>
                            </div>

                            <ul className="space-y-6">
                                {cat.rules.map((rule, ridx) => (
                                    <li key={ridx} className="flex gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary/30 mt-1.5 shrink-0" />
                                        <p className="text-[13px] text-foreground/60 leading-relaxed font-light">
                                            {rule}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 p-12 md:p-20 rounded-[4rem] bg-primary text-primary-foreground text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8 relative z-10">
                        Respeito é a Base <br /> de uma Boa Vizinhança
                    </h2>
                    <p className="text-primary-foreground/80 font-light mb-12 max-w-xl mx-auto relative z-10">
                        A observância destas normas é fundamental para a valorização do nosso patrimônio e para a qualidade de vida de todas as famílias.
                    </p>

                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-3 px-12 py-6 bg-primary-foreground text-primary rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-all relative z-10"
                    >
                        <span>Contatar Administração</span>
                        <Mail className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
};

export default NormasPage;
