'use client'

import { useState } from 'react'
import { Search, Trash2, Car, Bike } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { deleteVehicle } from '@/app/actions/vehicles'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { VehicleType } from '@prisma/client'

type Vehicle = {
    id: string
    plate: string
    model: string
    color: string | null
    type: VehicleType
    user: { name: string; apartment: string | null }
}

export function VeiculoView({ vehicles }: { vehicles: Vehicle[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const filtered = vehicles.filter(
        (v) =>
            v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este veículo?')) return
        setIsLoading(true)
        try {
            await deleteVehicle(id)
            toast.success('Veículo excluído com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete', error)
            toast.error('Erro ao excluir veículo.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por placa, modelo ou morador..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((vehicle) => (
                    <Card key={vehicle.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full flex items-center gap-1">
                                {vehicle.type === 'CAR' ? <Car className="w-3 h-3" /> : <Bike className="w-3 h-3" />}
                                {vehicle.type === 'CAR' ? 'Carro' : 'Moto'}
                            </span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(vehicle.id)} disabled={isLoading}>
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                        <h3 className="font-semibold text-lg mb-1 font-mono">{vehicle.plate}</h3>
                        <p className="text-sm text-muted-foreground">{vehicle.model} {vehicle.color ? `· ${vehicle.color}` : ''}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                            {vehicle.user.name} {vehicle.user.apartment ? `· Apto ${vehicle.user.apartment}` : ''}
                        </p>
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        Nenhum veículo cadastrado.
                    </div>
                )}
            </div>
        </div>
    )
}
