'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Phone, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { createConcessionaria, updateConcessionaria, deleteConcessionaria, createCategory } from '@/app/actions/concessionarias'
import { useRouter } from 'next/navigation'

type Category = {
    id: string
    name: string
    icon: string | null
}

type Provider = {
    id: string
    name: string
    contact: string
    categoryId: string
    category?: Category
}

export function ConcessionariaView({
    initialProviders,
    categories,
}: {
    initialProviders: Provider[]
    categories: Category[]
}) {
    const [providers, setProviders] = useState(initialProviders)
    const [searchTerm, setSearchTerm] = useState('')
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false)
    const [currentProvider, setCurrentProvider] = useState<Provider | null>(null)
    const router = useRouter()

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        categoryId: '',
    })
    const [categoryName, setCategoryName] = useState('')

    const filteredProviders = providers.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleOpenCreate = () => {
        setCurrentProvider(null)
        setFormData({ name: '', contact: '', categoryId: categories[0]?.id || '' })
        setIsSheetOpen(true)
    }

    const handleOpenEdit = (provider: Provider) => {
        setCurrentProvider(provider)
        setFormData({
            name: provider.name,
            contact: provider.contact,
            categoryId: provider.categoryId,
        })
        setIsSheetOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            if (currentProvider) {
                await updateConcessionaria(currentProvider.id, formData)
            } else {
                await createConcessionaria(formData)
            }
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to save', error)
            alert('Erro ao salvar')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir?')) return
        try {
            await deleteConcessionaria(id)
            router.refresh()
        } catch (error) {
            console.error('Failed to delete', error)
        }
    }

    const handleCreateCategory = async () => {
        if (!categoryName) return;
        await createCategory(categoryName)
        setCategoryName('')
        setIsCategorySheetOpen(false)
        router.refresh()
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar serviços..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsCategorySheetOpen(true)}>
                        Categorias
                    </Button>
                    <Button onClick={handleOpenCreate}>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Serviço
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProviders.map((provider) => (
                    <Card key={provider.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                                {provider.category?.name || 'Sem categoria'}
                            </span>
                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleOpenEdit(provider)}
                                >
                                    <Pencil className="w-3 h-3" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    onClick={() => handleDelete(provider.id)}
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{provider.name}</h3>
                        <div className="flex items-center text-muted-foreground gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{provider.contact}</span>
                        </div>
                    </Card>
                ))}
                {filteredProviders.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        Nenhum serviço encontrado.
                    </div>
                )}
            </div>

            {/* Sheet for Service */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            {currentProvider ? 'Editar Serviço' : 'Novo Serviço'}
                        </SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Nome</Label>
                            <Input
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                placeholder="Ex: CPFL"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Contato</Label>
                            <Input
                                required
                                value={formData.contact}
                                onChange={(e) =>
                                    setFormData({ ...formData, contact: e.target.value })
                                }
                                placeholder="Ex: 0800..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Categoria</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.categoryId}
                                onChange={(e) =>
                                    setFormData({ ...formData, categoryId: e.target.value })
                                }
                                required
                            >
                                <option value="" disabled>Selecione uma categoria</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <SheetFooter>
                            <Button type="submit">Salvar</Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>

            {/* Sheet for Category */}
            <Sheet open={isCategorySheetOpen} onOpenChange={setIsCategorySheetOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Nova Categoria</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Nome da Categoria</Label>
                            <Input
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Ex: Manutenção"
                            />
                        </div>
                        <Button onClick={handleCreateCategory} className="w-full">Criar Categoria</Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
