import { getMyPets } from "@/app/actions/pets";
import { getResidentSession } from "@/lib/auth";
import { PetPortalView } from "@/components/portal/pet-portal-view";

export const dynamic = "force-dynamic";

export default async function PortalPetsPage() {
    const user = await getResidentSession();
    const pets = await getMyPets(user!.id);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Meus Pets</h1>
                <p className="text-slate-500">Cadastre os pets que moram com você.</p>
            </div>

            <PetPortalView initialPets={pets} userId={user!.id} />
        </div>
    );
}
