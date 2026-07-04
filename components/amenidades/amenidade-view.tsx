'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import {
    createAmenity,
    updateAmenity,
    deleteAmenity,
} from '@/app/actions/amenities'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Amenity = {
    id: string
    name: string
    description: string | null
    capacity: number
}

export function AmenidadeView({ initialAmenities }: { initialAmenities: Amenity[] }) {
    const [amenities, setAmenities] = useState(initialAmenities)
    const [searchTerm, setSearchTerm] = useState('')
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [current, setCurrent] = useState<Amenity | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const [formData, setFormData] = useState({ name: '', description: '', capacity: 10 })

    const filtered = amenities.filter((a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleOpenCreate = () => {
        setCurrent(null)
        setFormData({ name: '', description: '', capacity: 10 })
        setIsSheetOpen(true)
    }

    const handleOpenEdit = (amenity: Amenity) => {
        setCurrent(amenity)
        setFormData({
            name: amenity.name,
            description: amenity.description || '',
            capacity: amenity.capacity,
        })
        setIsSheetOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (current) {
                await updateAmenity(current.id, formData)
                toast.success('Área comum atualizada com sucesso!')
            } else {
                await createAmenity(formData)
                toast.success('Área comum criada com sucesso!')
            }
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to save', error)
            toast.error('Erro ao salvar área comum. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta área comum?')) return
        setIsLoading(true)
        try {
            await deleteAmenity(id)
            toast.success('Área comum excluída com sucesso!')
            router.refresh()
        } catch (error: any) {
            console.error('Failed to delete', error)
            toast.error(error?.message || 'Erro ao excluir área comum. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar áreas comuns..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" asChild className="flex-1 sm:flex-none">
                        <a href="/admin/reservas">Ver Reservas</a>
                    </Button>
                    <Button onClick={handleOpenCreate} className="flex-1 sm:flex-none">
                        <Plus className="w-4 h-4 mr-2" />
                        Nova Área
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((amenity) => (
                    <Card key={amenity.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full flex items-center gap-1">
                                <Users className="w-3 h-3" /> Até {amenity.capacity} pessoas
                            </span>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(amenity)} disabled={isLoading}>
                                    <Pencil className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(amenity.id)} disabled={isLoading}>
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{amenity.name}</h3>
                        {amenity.description && (
                            <p className="text-sm text-muted-foreground">{amenity.description}</p>
                        )}
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        Nenhuma área comum cadastrada.
                    </div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>{current ? 'Editar Área Comum' : 'Nova Área Comum'}</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Nome</Label>
                            <Input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ex: Salão de Festas"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Descrição</Label>
                            <Textarea
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Regras de uso, horários, taxa..."
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Capacidade (pessoas)</Label>
                            <Input
                                type="number"
                                min={1}
                                required
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                                disabled={isLoading}
                            />
                        </div>
                        <SheetFooter className="gap-2 sm:gap-0">
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                {isLoading ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
