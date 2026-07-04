import { getDocuments } from "@/app/actions/documents";
import { FileText, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortalDocumentosPage() {
    const documents = await getDocuments();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Documentos</h1>
                <p className="text-slate-500">Regimento interno, atas, balancetes e outros documentos do condomínio.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {documents.map((d) => (
                    <a
                        key={d.id}
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border border-slate-200/60 rounded-2xl p-5 hover:border-primary/20 hover:shadow-lg transition-all hover:-translate-y-1 block"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-primary" />
                            {d.category && <span className="text-xs font-bold uppercase tracking-wide text-primary">{d.category}</span>}
                        </div>
                        <h3 className="font-semibold text-slate-900">{d.title}</h3>
                        {d.description && <p className="text-sm text-slate-500 mt-1">{d.description}</p>}
                        <span className="text-sm text-primary mt-3 flex items-center gap-1">Abrir <ExternalLink className="w-3 h-3" /></span>
                    </a>
                ))}
                {documents.length === 0 && (
                    <div className="col-span-full text-center py-8 text-slate-400">Nenhum documento publicado ainda.</div>
                )}
            </div>
        </div>
    );
}
