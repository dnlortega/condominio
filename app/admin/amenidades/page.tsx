import { getAmenities } from '@/app/actions/amenities'
import { AmenidadeView } from '@/components/amenidades/amenidade-view'

export const dynamic = 'force-dynamic'

export default async function AmenidadesPage() {
    const amenities = await getAmenities()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Áreas Comuns</h1>
                <p className="text-muted-foreground">
                    Cadastre as áreas comuns disponíveis para reserva pelos moradores.
                </p>
            </div>

            <AmenidadeView initialAmenities={amenities} />
        </div>
    )
}
