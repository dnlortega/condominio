import { getReservations } from '@/app/actions/reservations'
import { ReservaView } from '@/components/reservas/reserva-view'

export const dynamic = 'force-dynamic'

export default async function ReservasPage() {
    const reservations = await getReservations()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Reservas de Áreas Comuns</h1>
                <p className="text-muted-foreground">
                    Aprove, recuse ou cancele as reservas solicitadas pelos moradores.
                </p>
            </div>

            <ReservaView initialReservations={reservations} />
        </div>
    )
}
