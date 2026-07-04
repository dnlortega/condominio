import Link from "next/link";
import { getResidentSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Megaphone, CalendarDays, Wrench, UserCheck, ArrowRight, AlertTriangle, Package, AlertOctagon, Vote, LayoutGrid } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortalHomePage() {
    const user = await getResidentSession();

    const [urgentAnnouncements, upcomingReservations, openTickets, pendingVisitors, pendingPackages, myOpenIncidents, openPolls, activePosts] = await Promise.all([
        prisma.announcement.findMany({
            where: { isUrgent: true },
            orderBy: { createdAt: "desc" },
            take: 3,
        }),
        prisma.reservation.findMany({
            where: { userId: user!.id, status: { not: "CANCELLED" }, date: { gte: new Date() } },
            include: { amenity: true },
            orderBy: { date: "asc" },
            take: 3,
        }),
        prisma.ticket.count({ where: { userId: user!.id, status: { not: "RESOLVED" } } }),
        prisma.visitor.count({ where: { userId: user!.id, isUsed: false, visitDate: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
        prisma.package.count({ where: { userId: user!.id, pickedUpAt: null } }),
        prisma.incident.count({ where: { userId: user!.id, status: { not: "RESOLVED" } } }),
        prisma.poll.count({ where: { isOpen: true } }),
        prisma.post.count({ where: { isActive: true } }),
    ]);

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-2">
                    Olá, {user!.name.split(" ")[0]}
                </h1>
                <p className="text-slate-500">Bem-vindo ao seu espaço no condomínio.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Link href="/portal/avisos" className="bg-white border border-slate-200/60 rounded-3xl p-6 hover:border-primary/20 hover:shadow-lg transition-all hover:-translate-y-1">
                    <Megaphone className="w-6 h-6 text-primary mb-4" />
                    <span className="text-3xl font-black text-slate-900 block">{urgentAnnouncements.length}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avisos urgentes</span>
                </Link>
                <Link href="/portal/reservas" className="bg-white border border-slate-200/60 rounded-3xl p-6 hover:border-primary/20 hover:shadow-lg transition-all hover:-translate-y-1">
                    <CalendarDays className="w-6 h-6 text-primary mb-4" />
                    <span className="text-3xl font-black text-slate-900 block">{upcomingReservations.length}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Próximas reservas</span>
                </Link>
                <Link href="/portal/chamados" className="bg-white border border-slate-200/60 rounded-3xl p-6 hover:border-primary/20 hover:shadow-lg transition-all hover:-translate-y-1">
                    <Wrench className="w-6 h-6 text-primary mb-4" />
                    <span className="text-3xl font-black text-slate-900 block">{openTickets}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Chamados em aberto</span>
                </Link>
                <Link href="/portal/visitantes" className="bg-white border border-slate-200/60 rounded-3xl p-6 hover:border-primary/20 hover:shadow-lg transition-all hover:-translate-y-1">
                    <UserCheck className="w-6 h-6 text-primary mb-4" />
                    <span className="text-3xl font-black text-slate-900 block">{pendingVisitors}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Visitantes esperados hoje</span>
                </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Link href="/portal/encomendas" className="bg-white border border-slate-200/60 rounded-3xl p-6 hover:border-primary/20 hover:shadow-lg transition-all hover:-translate-y-1">
                    <Package className="w-6 h-6 text-primary mb-4" />
                    <span className="text-3xl font-black text-slate-900 block">{pendingPackages}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Encomendas aguardando</span>
                </Link>
                <Link href="/portal/ocorrencias" className="bg-white border border-slate-200/60 rounded-3xl p-6 hover:border-primary/20 hover:shadow-lg transition-all hover:-translate-y-1">
                    <AlertOctagon className="w-6 h-6 text-primary mb-4" />
                    <span className="text-3xl font-black text-slate-900 block">{myOpenIncidents}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Minhas ocorrências abertas</span>
                </Link>
                <Link href="/portal/enquetes" className="bg-white border border-slate-200/60 rounded-3xl p-6 hover:border-primary/20 hover:shadow-lg transition-all hover:-translate-y-1">
                    <Vote className="w-6 h-6 text-primary mb-4" />
                    <span className="text-3xl font-black text-slate-900 block">{openPolls}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enquetes abertas</span>
                </Link>
                <Link href="/portal/mural" className="bg-white border border-slate-200/60 rounded-3xl p-6 hover:border-primary/20 hover:shadow-lg transition-all hover:-translate-y-1">
                    <LayoutGrid className="w-6 h-6 text-primary mb-4" />
                    <span className="text-3xl font-black text-slate-900 block">{activePosts}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Anúncios no mural</span>
                </Link>
            </div>

            {urgentAnnouncements.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Avisos urgentes</h2>
                    <div className="space-y-3">
                        {urgentAnnouncements.map((a) => (
                            <div key={a.id} className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-red-900">{a.title}</h3>
                                    <p className="text-sm text-red-700/80 mt-1">{a.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {upcomingReservations.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Suas próximas reservas</h2>
                    <div className="space-y-3">
                        {upcomingReservations.map((r) => (
                            <div key={r.id} className="bg-white border border-slate-200/60 rounded-2xl p-5 flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-slate-900">{r.amenity.name}</h3>
                                    <p className="text-sm text-slate-500">
                                        {new Date(r.date).toLocaleString("pt-BR", { dateStyle: "long", timeStyle: "short" })}
                                    </p>
                                </div>
                                <Link href="/portal/reservas" className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                                    Ver todas <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
