import { getMyPackages } from "@/app/actions/packages";
import { getResidentSession } from "@/lib/auth";
import { Package as PackageIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PortalEncomendasPage() {
    const user = await getResidentSession();
    const packages = await getMyPackages(user!.id);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Minhas Encomendas</h1>
                <p className="text-slate-500">Encomendas recebidas na portaria em seu nome.</p>
            </div>

            <div className="space-y-3">
                {packages.map((pkg) => (
                    <div key={pkg.id} className="bg-white border border-slate-200/60 rounded-2xl p-5 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                <PackageIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">{pkg.description}</h3>
                                <p className="text-sm text-slate-500">
                                    Recebida em {new Date(pkg.receivedAt).toLocaleString("pt-BR", { dateStyle: "long", timeStyle: "short" })}
                                </p>
                            </div>
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full ${pkg.pickedUpAt ? "bg-primary/10 text-primary" : "bg-amber-50 text-amber-600"}`}>
                            {pkg.pickedUpAt ? "Retirada" : "Aguardando retirada"}
                        </span>
                    </div>
                ))}
                {packages.length === 0 && (
                    <div className="text-center py-8 text-slate-400">Nenhuma encomenda registrada em seu nome.</div>
                )}
            </div>
        </div>
    );
}
