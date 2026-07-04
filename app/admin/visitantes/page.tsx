import { getVisitors } from '@/app/actions/visitors'
import { VisitanteView } from '@/components/visitantes/visitante-view'

export const dynamic = 'force-dynamic'

export default async function VisitantesPage() {
    const visitors = await getVisitors()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Portaria Virtual</h1>
                <p className="text-muted-foreground">
                    Acompanhe os convites de visitantes gerados pelos moradores.
                </p>
            </div>

            <VisitanteView initialVisitors={visitors} />
        </div>
    )
}
