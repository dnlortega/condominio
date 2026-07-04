import { getPolls } from '@/app/actions/polls'
import { EnqueteView } from '@/components/enquetes/enquete-view'

export const dynamic = 'force-dynamic'

export default async function EnquetesPage() {
    const polls = await getPolls()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Enquetes</h1>
                <p className="text-muted-foreground">
                    Crie enquetes rápidas e acompanhe os resultados em tempo real.
                </p>
            </div>

            <EnqueteView initialPolls={polls} />
        </div>
    )
}
