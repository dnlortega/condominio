import { getMyVisitors } from "@/app/actions/visitors";
import { getResidentSession } from "@/lib/auth";
import { VisitantePortalView } from "@/components/portal/visitante-portal-view";

export const dynamic = "force-dynamic";

export default async function PortalVisitantesPage() {
    const user = await getResidentSession();
    const visitors = await getMyVisitors(user!.id);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Portaria Virtual</h1>
                <p className="text-slate-500">Convide visitantes e compartilhe o código de acesso com eles.</p>
            </div>

            <VisitantePortalView initialVisitors={visitors} userId={user!.id} />
        </div>
    );
}
