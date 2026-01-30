import { getConcessionarias, getCategories } from '@/app/actions/concessionarias'
import { ConcessionariaView } from '@/components/concessionarias/concessionaria-view'

export const dynamic = 'force-dynamic'

export default async function ConcessionariasPage() {
    const [providers, categories] = await Promise.all([
        getConcessionarias(),
        getCategories(),
    ])

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Gerenciar Concessionárias</h1>
                <p className="text-muted-foreground">
                    Cadastre e gerencie os prestadores de serviços e utilidades do condomínio.
                </p>
            </div>

            <ConcessionariaView
                initialProviders={providers}
                categories={categories}
            />
        </div>
    )
}
