import { getCategories } from '@/app/actions/concessionarias'
import { CategoriaView } from '@/components/concessionarias/categoria-view'

export default async function CategoriasPage() {
    const categories = await getCategories()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
                <p className="text-muted-foreground">
                    Gerencie as categorias de serviços do condomínio
                </p>
            </div>
            <CategoriaView categories={categories} />
        </div>
    )
}
