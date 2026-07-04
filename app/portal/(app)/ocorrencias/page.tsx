import { getMyIncidents } from "@/app/actions/incidents";
import { getResidentSession } from "@/lib/auth";
import { OcorrenciaPortalView } from "@/components/portal/ocorrencia-portal-view";

export const dynamic = "force-dynamic";

export default async function PortalOcorrenciasPage() {
    const user = await getResidentSession();
    const incidents = await getMyIncidents(user!.id);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Ocorrências e Denúncias</h1>
                <p className="text-slate-500">Relate um problema de convivência. Você pode optar por manter sua identidade em sigilo.</p>
            </div>

            <OcorrenciaPortalView initialIncidents={incidents} userId={user!.id} />
        </div>
    );
}
