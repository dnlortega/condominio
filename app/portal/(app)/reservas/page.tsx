import { getAmenities } from "@/app/actions/amenities";
import { getMyReservations } from "@/app/actions/reservations";
import { getResidentSession } from "@/lib/auth";
import { ReservaPortalView } from "@/components/portal/reserva-portal-view";

export const dynamic = "force-dynamic";

export default async function PortalReservasPage() {
    const user = await getResidentSession();
    const [amenities, reservations] = await Promise.all([
        getAmenities(),
        getMyReservations(user!.id),
    ]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Reservas de Áreas Comuns</h1>
                <p className="text-slate-500">Solicite a reserva de uma área comum e acompanhe o status.</p>
            </div>

            <ReservaPortalView amenities={amenities} initialReservations={reservations} userId={user!.id} />
        </div>
    );
}
