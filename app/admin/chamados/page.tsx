import { getTickets } from '@/app/actions/tickets'
import { ChamadoView } from '@/components/chamados/chamado-view'

export const dynamic = 'force-dynamic'

export default async function ChamadosPage() {
    const tickets = await getTickets()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Chamados de Manutenção</h1>
                <p className="text-muted-foreground">
                    Acompanhe e atualize o status dos chamados abertos pelos moradores.
                </p>
            </div>

            <ChamadoView initialTickets={tickets} />
        </div>
    )
}
