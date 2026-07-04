import { getAnnouncements } from "@/app/actions/announcements";
import { AlertTriangle, Megaphone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortalAvisosPage() {
    const announcements = await getAnnouncements();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Avisos e Comunicados</h1>
                <p className="text-slate-500">Fique por dentro das novidades do condomínio.</p>
            </div>

            <div className="space-y-4">
                {announcements.map((a) => (
                    <div
                        key={a.id}
                        className={`rounded-2xl p-6 border ${a.isUrgent ? "bg-red-50 border-red-100" : "bg-white border-slate-200/60"}`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {a.isUrgent ? (
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                            ) : (
                                <Megaphone className="w-4 h-4 text-primary" />
                            )}
                            <span className={`text-xs font-bold uppercase tracking-widest ${a.isUrgent ? "text-red-500" : "text-primary"}`}>
                                {a.isUrgent ? "Urgente" : "Aviso"}
                            </span>
                        </div>
                        <h3 className={`font-semibold text-lg ${a.isUrgent ? "text-red-900" : "text-slate-900"}`}>{a.title}</h3>
                        <p className={`text-sm mt-1 whitespace-pre-line ${a.isUrgent ? "text-red-700/80" : "text-slate-600"}`}>{a.content}</p>
                        <p className="text-xs text-slate-400 mt-3">
                            {new Date(a.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                        </p>
                    </div>
                ))}
                {announcements.length === 0 && (
                    <div className="text-center py-12 text-slate-400">Nenhum aviso publicado ainda.</div>
                )}
            </div>
        </div>
    );
}
