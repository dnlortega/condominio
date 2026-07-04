'use client'

import { useState } from 'react'
import { Plus, Package as PackageIcon, Check, Search, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet'
import { createPackage, markPackagePickedUp, deletePackage } from '@/app/actions/packages'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Resident = { id: string; name: string; apartment: string | null }
type Package = {
    id: string
    description: string
    receivedAt: Date
    pickedUpAt: Date | null
    user: { name: string; apartment: string | null }
}

export function EncomendaView({ initialPackages, residents }: { initialPackages: Package[]; residents: Resident[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ userId: residents[0]?.id || '', description: '' })
    const router = useRouter()

    const filtered = initialPackages.filter(
        (p) =>
            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await createPackage(formData.userId, formData.description)
            toast.success('Encomenda registrada com sucesso!')
            setFormData({ userId: residents[0]?.id || '', description: '' })
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to register package', error)
            toast.error('Erro ao registrar encomenda.')
        } finally {
            setIsLoading(false)
        }
    }

    const handlePickup = async (id: string) => {
        setIsLoading(true)
        try {
            await markPackagePickedUp(id)
            toast.success('Retirada confirmada!')
            router.refresh()
        } catch (error) {
            console.error('Failed to update', error)
            toast.error('Erro ao confirmar retirada.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este registro?')) return
        setIsLoading(true)
        try {
            await deletePackage(id)
            toast.success('Registro excluído.')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete', error)
            toast.error('Erro ao excluir registro.')
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
                        placeholder="Buscar por descrição ou morador..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={() => setIsSheetOpen(true)} disabled={residents.length === 0} className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" /> Registrar Encomenda
                </Button>
            </div>

            <div className="space-y-3">
                {filtered.map((pkg) => (
                    <Card key={pkg.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                <PackageIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{pkg.description}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {pkg.user.name} {pkg.user.apartment ? `· Apto ${pkg.user.apartment}` : ''}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Recebida em {new Date(pkg.receivedAt).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant={pkg.pickedUpAt ? 'default' : 'secondary'}>
                                {pkg.pickedUpAt ? 'Retirada' : 'Aguardando retirada'}
                            </Badge>
                            {!pkg.pickedUpAt && (
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700" disabled={isLoading} onClick={() => handlePickup(pkg.id)}>
                                    <Check className="w-4 h-4" />
                                </Button>
                            )}
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isLoading} onClick={() => handleDelete(pkg.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">Nenhuma encomenda registrada.</div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Registrar Encomenda</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Morador</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.userId}
                                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                                required
                                disabled={isLoading}
                            >
                                {residents.map((r) => (
                                    <option key={r.id} value={r.id}>{r.name} {r.apartment ? `(Apto ${r.apartment})` : ''}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Descrição</Label>
                            <Input
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Ex: Caixa média - Correios"
                                disabled={isLoading}
                            />
                        </div>
                        <SheetFooter className="gap-2 sm:gap-0">
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                {isLoading ? 'Salvando...' : 'Registrar'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
