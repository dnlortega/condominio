import { getVehicles } from '@/app/actions/vehicles'
import { VeiculoView } from '@/components/veiculos/veiculo-view'

export const dynamic = 'force-dynamic'

export default async function VeiculosPage() {
    const vehicles = await getVehicles()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Veículos e Garagem</h1>
                <p className="text-muted-foreground">
                    Veículos cadastrados pelos moradores.
                </p>
            </div>

            <VeiculoView vehicles={vehicles} />
        </div>
    )
}
