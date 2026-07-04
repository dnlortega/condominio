import { getDocuments } from '@/app/actions/documents'
import { DocumentoView } from '@/components/documentos/documento-view'

export const dynamic = 'force-dynamic'

export default async function DocumentosPage() {
    const documents = await getDocuments()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
                <p className="text-muted-foreground">
                    Publique links de documentos importantes (regimento, atas, balancetes) para os moradores.
                </p>
            </div>

            <DocumentoView initialDocuments={documents} />
        </div>
    )
}
