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
                "Horário de uso (Quiosques, Jogos e Playground): 08:00 às 22:00.",
                "Salão de Festas: 08:00 às 22:00 (com som ambiente) e 22:01 às 00:00 (sem som).",
                "Reserva de Quiosques: Via APLICATIVO. Taxa de R$ 20,00 (boleto). Limite de 20 convidados.",
                "Reserva de Salão de Festas: Na portaria ou WhatsApp (14) 99750-0577. Taxa de R$ 100,00 (Pix: res.recantodospassaros.sindica@gmail.com). Limite de 80 convidados. Limpeza por conta do locador."
            ]
        },
        {
            title: "Lei do Silêncio",
            icon: <Volume2 className="w-6 h-6" />,
            rules: [
                "Perturbação de sossego é crime! Respeite o próximo em qualquer horário.",
                "Após as 22:00: Proibido quaisquer excessos, sujeito a medidas administrativas e criminais."
            ]
        },
        {
            title: "Garagem e Veículos",
            icon: <Car className="w-6 h-6" />,
            rules: [
                "Estacionamento permitido apenas dentro da área delimitada (quadrante amarelo).",
                "Proibido avançar sobre calçadas ou vias de trânsito.",
                "Proibido armazenar materiais de obra na vaga (exceções urgentes sob avaliação da diretoria).",
                "Proibido veículos com vazamento de óleo na vaga.",
                "TAG Eletrônica: Uso obrigatório. Custo de R$ 25,00 (solicitar com a síndica)."
            ]
        },
        {
            title: "Gestão de Resíduos",
            icon: <Trash2 className="w-6 h-6" />,
            rules: [
                "Coleta Orgânica, Reciclagem e Óleo: Terças, Quintas e Sábados.",
                "Ensaque corretamente o lixo e feche bem as sacolas.",
                "Descarte dentro das lixeiras, utilizando todo o espaço disponível. Proibido deixar lixo fora.",
                "Proibido descarte de entulho, móveis ou isopor (utilize Ecopontos ou caçambas)."
            ]
        },
        {
            title: "Acesso e Segurança",
            icon: <ShieldCheck className="w-6 h-6" />,
            rules: [
                "Delivery: Identificação na portaria. O condômino deve descer para retirar o pedido no bloco.",
                "Correspondências simples: Retirada nas caixas de correio dos blocos.",
                "Correspondências registradas (AR) e Encomendas: Retirada na portaria (o morador será avisado).",
                "Prestadores de Serviço: Entrada permitida Seg-Sex (08h-17h) e Sábado (08h-12h)."
            ]
        },
        {
            title: "Reformas e Mudanças",
            icon: <Hammer className="w-6 h-6" />,
            rules: [
                "Agendamento obrigatório na administradora para orientações e horários.",
                "O morador é responsável por informar as regras do condomínio aos prestadores.",
                "O morador responde por descumprimentos de regras pelos seus prestadores."
            ]
        },
        {
            title: "Animais de Estimação",
            icon: <PawPrint className="w-6 h-6" />,
            rules: [
                "Dono é responsável por qualquer dano físico ao patrimônio ou morador.",
                "Proibido passeios nas áreas comuns. Apenas percurso de entrada e saída.",
                "Limpeza imediata de dejetos é obrigatória.",
                "Uso obrigatório de coleira e guia. Focinheira obrigatória para animais de grande porte."
            ]
        },
        {
            title: "Regras de Convivência",
            icon: <UserCheck className="w-6 h-6" />,
            rules: [
                "Zelar e conservar áreas comuns. Sujeiras em áreas comuns/halls devem ser limpas pelo morador.",
                "Proibido jogar água ou objetos das sacadas para as unidades inferiores.",
                "Varal: Permitido apenas varal de chão na sacada (sem ultrapassar a grade). Permitido varal de teto/sanfonado na lavanderia.",
                "Proibido pendurar roupas, toalhas ou objetos na grade da sacada.",
                "Proibido manter objetos no hall (área comum), como sapatos, vasos ou guarda-chuvas.",
                "Crianças até 12 anos: Devem estar acompanhadas por responsáveis nas áreas comuns.",
                "Skate, Bicicleta, Patins: Permitido apenas na área dos quiosques.",
                "Proibido empinar pipas. Proibido uso de bolas (exceto plástico com acompanhamento)."
            ]
        },
        {
            title: "Fachada e Comunicação",
            icon: <AlertTriangle className="w-6 h-6" />,
            rules: [
                "Proibido alterações na fachada (cor, adequações).",
                "Proibido cartazes de venda/aluguel em unidades, áreas comuns ou murais.",
                "Películas e grama sintética: Apenas conforme deliberado em assembleia.",
                "Churrasqueiras: Apenas alvenaria/pré-moldada conectada ao duto central.",
                "Entorpecentes: Uso expressamente proibido. Flagrantes serão reportados à PM!",
                "Reclamações/Sugestões: Registrar via e-mail: res.recantodospassaros.sindica@gmail.com"
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
                    className="mt-24 p-12 md:p-20 rounded-[4rem] bg-primary text-white text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                    <h2 className="text-3xl font-bold uppercase tracking-tighter mb-8 relative z-10">
                        Respeito é a Base <br /> de uma Boa Vizinhança
                    </h2>
                    <p className="text-white/80 font-light mb-12 max-w-xl mx-auto relative z-10">
                        A observância destas normas é fundamental para a valorização do nosso patrimônio e para a qualidade de vida de todas as famílias.
                    </p>

                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-3 px-12 py-6 bg-white text-primary rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-all relative z-10"
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
