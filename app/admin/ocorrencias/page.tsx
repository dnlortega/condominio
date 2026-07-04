import { getIncidents } from '@/app/actions/incidents'
import { OcorrenciaView } from '@/components/ocorrencias/ocorrencia-view'

export const dynamic = 'force-dynamic'

export default async function OcorrenciasPage() {
    const incidents = await getIncidents()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Ocorrências e Denúncias</h1>
                <p className="text-muted-foreground">
                    Acompanhe as ocorrências registradas pelos moradores. Denúncias anônimas ocultam a identidade do autor.
                </p>
            </div>

            <OcorrenciaView initialIncidents={incidents} />
        </div>
    )
}
