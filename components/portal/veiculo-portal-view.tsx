'use client'

import { useState } from 'react'
import { Car, Bike, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet'
import { createVehicle, deleteVehicle } from '@/app/actions/vehicles'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { VehicleType } from '@prisma/client'

type Vehicle = { id: string; plate: string; model: string; color: string | null; type: VehicleType }

export function VeiculoPortalView({ initialVehicles, userId }: { initialVehicles: Vehicle[]; userId: string }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ plate: '', model: '', color: '', type: 'CAR' as VehicleType })
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await createVehicle(userId, formData)
            toast.success('Veículo cadastrado com sucesso!')
            setFormData({ plate: '', model: '', color: '', type: 'CAR' })
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to create vehicle', error)
            toast.error('Erro ao cadastrar veículo.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este veículo?')) return
        setIsLoading(true)
        try {
            await deleteVehicle(id, userId)
            toast.success('Veículo excluído.')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete vehicle', error)
            toast.error('Erro ao excluir veículo.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => setIsSheetOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Cadastrar Veículo
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {initialVehicles.map((v) => (
                    <Card key={v.id} className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-full flex items-center gap-1 text-slate-600">
                                {v.type === 'CAR' ? <Car className="w-3 h-3" /> : <Bike className="w-3 h-3" />}
                                {v.type === 'CAR' ? 'Carro' : 'Moto'}
                            </span>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isLoading} onClick={() => handleDelete(v.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <h3 className="font-mono font-semibold text-lg">{v.plate}</h3>
                        <p className="text-sm text-slate-500">{v.model} {v.color ? `· ${v.color}` : ''}</p>
                    </Card>
                ))}
                {initialVehicles.length === 0 && (
                    <div className="col-span-full text-center py-8 text-slate-400">Nenhum veículo cadastrado ainda.</div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Cadastrar Veículo</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Tipo</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as VehicleType })}
                                disabled={isLoading}
                            >
                                <option value="CAR">Carro</option>
                                <option value="MOTORCYCLE">Moto</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Placa</Label>
                            <Input
                                required
                                value={formData.plate}
                                onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
                                placeholder="ABC1D23"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Modelo</Label>
                            <Input
                                required
                                value={formData.model}
                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                placeholder="Ex: Honda Civic"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Cor</Label>
                            <Input
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                placeholder="Ex: Prata"
                                disabled={isLoading}
                            />
                        </div>
                        <SheetFooter className="gap-2 sm:gap-0">
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                {isLoading ? 'Salvando...' : 'Cadastrar'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
