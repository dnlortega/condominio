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
            <div className="border-b border-white/5 pb-8 relative">
                {/* Decorative Elements */}
                <div className="absolute right-0 top-0 hidden md:flex gap-2 opacity-30 pointer-events-none">
                    <div className="w-1 h-8 rounded bg-primary/40 block" />
                    <div className="w-1 h-12 rounded bg-primary/60 block" />
                    <div className="w-1 h-6 rounded bg-primary/80 block" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
                    Dashboard <span className="text-primary font-light italic serif px-2">Overview</span>
                </h1>
                <p className="text-zinc-400 max-w-xl text-lg tracking-wide font-light">
                    Bem-vindo ao centro de controle operativo do Residencial. Monitore infraestrutura, visualize os últimos serviços e mantenha o recinto operando.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
                    <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500" /> Sistema Operacional</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                    <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Tráfego Normal</span>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-8">
                {/* Cartão de Concessionárias */}
                <Link href="/admin/concessionarias" className="group">
                    <div className="relative h-full bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                            <Zap className="w-32 h-32 text-primary" />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                                    <Zap className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Concessionárias</h2>
                                <p className="text-zinc-500 text-sm tracking-wide">Gerenciamento de prestadores de serviços essenciais e contato emergencial.</p>
                            </div>
                            <div className="flex items-end justify-between border-t border-white/5 pt-6">
                                <div>
                                    <span className="text-5xl font-bold text-white tracking-tighter block mb-1">{providerCount}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Registros Ativos</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Cartão de Categorias */}
                <Link href="/admin/categorias" className="group">
                    <div className="relative h-full bg-[#0d0d0d] border border-white/5 rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-sky-500/5 hover:-translate-y-1">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                            <List className="w-32 h-32 text-sky-500" />
                        </div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-sky-500 group-hover:scale-110 group-hover:bg-sky-500/10 transition-all">
                                    <List className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Módulos Logísticos</h2>
                                <p className="text-zinc-500 text-sm tracking-wide">Categorização e estruturação dos registros e documentação interna do residencial.</p>
                            </div>
                            <div className="flex items-end justify-between border-t border-white/5 pt-6">
                                <div>
                                    <span className="text-5xl font-bold text-white tracking-tighter block mb-1">{categoryCount}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Setores Mapeados</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Secção Decorativa Extra */}
            <div className="w-full bg-[#111] border border-white/5 rounded-3xl p-8 relative overflow-hidden group mt-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold tracking-tight text-white mb-1 group-hover:text-primary transition-colors">Portal de Moradores</h3>
                            <p className="text-sm text-zinc-500">Em Breve: Área destinada exclusivamente para locatários e proprietários.</p>
                        </div>
                    </div>
                    <span className="px-4 py-2 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 border border-white/10">Under Development</span>
                </div>
            </div>
        </div>
    );
}
