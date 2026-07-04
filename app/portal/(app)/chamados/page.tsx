import { getMyTickets } from "@/app/actions/tickets";
import { getResidentSession } from "@/lib/auth";
import { ChamadoPortalView } from "@/components/portal/chamado-portal-view";

export const dynamic = "force-dynamic";

export default async function PortalChamadosPage() {
    const user = await getResidentSession();
    const tickets = await getMyTickets(user!.id);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Chamados de Manutenção</h1>
                <p className="text-slate-500">Abra um chamado e acompanhe o andamento do atendimento.</p>
            </div>

            <ChamadoPortalView initialTickets={tickets} userId={user!.id} />
        </div>
    );
}
