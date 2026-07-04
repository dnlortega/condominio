import { getPets } from '@/app/actions/pets'
import { PetView } from '@/components/pets/pet-view'

export const dynamic = 'force-dynamic'

export default async function PetsPage() {
    const pets = await getPets()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Pets</h1>
                <p className="text-muted-foreground">
                    Pets cadastrados pelos moradores.
                </p>
            </div>

            <PetView pets={pets} />
        </div>
    )
}
