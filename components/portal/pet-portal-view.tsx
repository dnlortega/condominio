'use client'

import { useState } from 'react'
import { PawPrint, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet'
import { createPet, deletePet } from '@/app/actions/pets'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Pet = { id: string; name: string; species: string; breed: string | null; notes: string | null }

export function PetPortalView({ initialPets, userId }: { initialPets: Pet[]; userId: string }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ name: '', species: '', breed: '', notes: '' })
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await createPet(userId, formData)
            toast.success('Pet cadastrado com sucesso!')
            setFormData({ name: '', species: '', breed: '', notes: '' })
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to create pet', error)
            toast.error('Erro ao cadastrar pet.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este pet?')) return
        setIsLoading(true)
        try {
            await deletePet(id, userId)
            toast.success('Pet excluído.')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete pet', error)
            toast.error('Erro ao excluir pet.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => setIsSheetOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Cadastrar Pet
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {initialPets.map((p) => (
                    <Card key={p.id} className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded-full flex items-center gap-1 text-slate-600">
                                <PawPrint className="w-3 h-3" /> {p.species}
                            </span>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isLoading} onClick={() => handleDelete(p.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <h3 className="font-semibold text-lg">{p.name}</h3>
                        {p.breed && <p className="text-sm text-slate-500">{p.breed}</p>}
                        {p.notes && <p className="text-xs text-slate-400 mt-2">{p.notes}</p>}
                    </Card>
                ))}
                {initialPets.length === 0 && (
                    <div className="col-span-full text-center py-8 text-slate-400">Nenhum pet cadastrado ainda.</div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Cadastrar Pet</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Nome</Label>
                            <Input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ex: Bidu"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Espécie</Label>
                            <Input
                                required
                                value={formData.species}
                                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                                placeholder="Ex: Cachorro, Gato"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Raça (opcional)</Label>
                            <Input
                                value={formData.breed}
                                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                                placeholder="Ex: Vira-lata"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Observações (opcional)</Label>
                            <Textarea
                                rows={3}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                placeholder="Temperamento, cuidados especiais..."
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
