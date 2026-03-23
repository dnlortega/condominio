import Link from 'next/link';
import { Zap, List, Users, ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
    const [providerCount, categoryCount] = await Promise.all([
        prisma.serviceProvider.count(),
        prisma.category.count(),
    ]);

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            <div className="border-b border-slate-200 pb-10 relative">
                {/* Decorative Elements */}
                <div className="absolute right-0 top-0 hidden md:flex gap-2 opacity-10 pointer-events-none">
                    <div className="w-1.5 h-10 rounded-full bg-primary/40 block" />
                    <div className="w-1.5 h-16 rounded-full bg-primary/60 block" />
                    <div className="w-1.5 h-8 rounded-full bg-primary/80 block" />
                </div>

                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-5 text-slate-900 leading-[1.1]">
                    Dashboard <span className="text-primary font-light italic serif px-2 bg-primary/5 rounded-3xl mx-1">Visão Geral</span>
                </h1>
                <p className="text-slate-500 max-w-2xl text-lg tracking-normal font-medium leading-relaxed">
                    Bem-vindo ao centro de controle operativo do Residencial. Monitore infraestrutura, visualize os últimos serviços e mantenha o condomínio funcionando em plena harmonia.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    <span className="flex items-center gap-2.5 px-4 py-2 bg-green-50 text-green-600 rounded-full border border-green-100 shadow-sm"><ShieldCheck className="w-3.5 h-3.5" /> Sistema Online</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                    <span className="flex items-center gap-2.5 px-4 py-2 bg-primary/5 text-primary rounded-full border border-primary/10 shadow-sm"><Activity className="w-3.5 h-3.5" /> Tráfego Normal</span>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 lg:gap-10">
                {/* Cartão de Concessionárias */}
                <Link href="/admin/concessionarias" className="group">
                    <div className="relative h-full bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 overflow-hidden transition-all duration-700 hover:border-primary/20 hover:shadow-[0_20px_60px_-15px_rgba(var(--primary-rgb),0.15)] hover:-translate-y-2">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">
                            <Zap className="w-40 h-40 text-primary" />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="mb-12">
                                <div className="w-14 h-14 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-center mb-8 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-3 group-hover:text-primary transition-colors">Concessionárias</h2>
                                <p className="text-slate-500 text-sm tracking-normal leading-relaxed font-medium">Gerenciamento de prestadores de serviços essenciais e contato de emergência rápida.</p>
                            </div>
                            <div className="flex items-end justify-between border-t border-slate-50 pt-8">
                                <div>
                                    <span className="text-6xl font-black text-slate-900 tracking-tighter block mb-1 group-hover:text-primary transition-colors">{providerCount}</span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Registros Ativos</span>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Cartão de Categorias */}
                <Link href="/admin/categorias" className="group">
                    <div className="relative h-full bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 overflow-hidden transition-all duration-700 hover:border-sky-200 hover:shadow-[0_20px_60px_-15px_rgba(14,165,233,0.15)] hover:-translate-y-2">
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">
                            <List className="w-40 h-40 text-sky-500" />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="mb-12">
                                <div className="w-14 h-14 rounded-3xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-8 text-sky-500 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 shadow-sm">
                                    <List className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">Módulos Logísticos</h2>
                                <p className="text-slate-500 text-sm tracking-normal leading-relaxed font-medium">Categorização e estruturação dos registros e documentação interna do residencial.</p>
                            </div>
                            <div className="flex items-end justify-between border-t border-slate-50 pt-8">
                                <div>
                                    <span className="text-6xl font-black text-slate-900 tracking-tighter block mb-1 group-hover:text-sky-600 transition-colors">{categoryCount}</span>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Setores Mapeados</span>
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-sky-500 transition-all duration-500">
                                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Secção Decorativa Extra */}
            <div className="w-full bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group mt-10 shadow-sm hover:shadow-md transition-all">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-8">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-all duration-500 shadow-inner">
                            <Users className="w-7 h-7" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-1.5 group-hover:text-primary transition-colors">Portal de Moradores</h3>
                            <p className="text-sm text-slate-500 font-medium">Área em desenvolvimento para acesso restrito de locatários e proprietários.</p>
                        </div>
                    </div>
                    <span className="px-5 py-2.5 rounded-full bg-slate-50 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border border-slate-100 shadow-sm group-hover:bg-primary/5 group-hover:text-primary/70 transition-all">Under Construction</span>
                </div>
            </div>
        </div>
    );
}
