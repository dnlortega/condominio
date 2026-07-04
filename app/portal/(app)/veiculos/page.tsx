import { getMyVehicles } from "@/app/actions/vehicles";
import { getResidentSession } from "@/lib/auth";
import { VeiculoPortalView } from "@/components/portal/veiculo-portal-view";

export const dynamic = "force-dynamic";

export default async function PortalVeiculosPage() {
    const user = await getResidentSession();
    const vehicles = await getMyVehicles(user!.id);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Meus Veículos</h1>
                <p className="text-slate-500">Cadastre os veículos vinculados à sua unidade.</p>
            </div>

            <VeiculoPortalView initialVehicles={vehicles} userId={user!.id} />
        </div>
    );
}
