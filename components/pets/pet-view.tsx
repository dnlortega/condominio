'use client'

import { useState } from 'react'
import { Search, Trash2, PawPrint } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { deletePet } from '@/app/actions/pets'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Pet = {
    id: string
    name: string
    species: string
    breed: string | null
    notes: string | null
    user: { name: string; apartment: string | null }
}

export function PetView({ pets }: { pets: Pet[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const filtered = pets.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este pet?')) return
        setIsLoading(true)
        try {
            await deletePet(id)
            toast.success('Pet excluído com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete', error)
            toast.error('Erro ao excluir pet.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por nome do pet ou morador..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((pet) => (
                    <Card key={pet.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full flex items-center gap-1">
                                <PawPrint className="w-3 h-3" /> {pet.species}
                            </span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(pet.id)} disabled={isLoading}>
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{pet.name}</h3>
                        {pet.breed && <p className="text-sm text-muted-foreground">{pet.breed}</p>}
                        <p className="text-xs text-muted-foreground mt-2">
                            {pet.user.name} {pet.user.apartment ? `· Apto ${pet.user.apartment}` : ''}
                        </p>
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        Nenhum pet cadastrado.
                    </div>
                )}
            </div>
        </div>
    )
}
