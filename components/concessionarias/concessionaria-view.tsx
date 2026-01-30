'use client'

import { useState } from 'react'
import {
    Plus, Pencil, Trash2, Phone, Search,
    Zap, Droplet, Wifi, Flame, Shield,
    Hammer, Truck, Stethoscope, Briefcase,
    Smartphone, Lightbulb, Thermometer, Lock, Camera,
    Flower, PaintBucket, Plug, Tv, Utensils,
    Car, Bus, ShoppingBag, PawPrint
} from 'lucide-react'
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
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import {
    createConcessionaria,
    updateConcessionaria,
    deleteConcessionaria,
    createCategory,
    updateCategory,
    deleteCategory
} from '@/app/actions/concessionarias'
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

const AVAILABLE_ICONS = [
    { name: 'Zap', icon: Zap, label: 'Energia' },
    { name: 'Droplet', icon: Droplet, label: 'Água' },
    { name: 'Wifi', icon: Wifi, label: 'Internet' },
    { name: 'Flame', icon: Flame, label: 'Gás' },
    { name: 'Smartphone', icon: Smartphone, label: 'Telefonia' },
    { name: 'Shield', icon: Shield, label: 'Segurança' },
    { name: 'Hammer', icon: Hammer, label: 'Manutenção' },
    { name: 'Truck', icon: Truck, label: 'Mudança' },
    { name: 'Stethoscope', icon: Stethoscope, label: 'Saúde' },
    { name: 'Briefcase', icon: Briefcase, label: 'Serviços' },
    { name: 'Lightbulb', icon: Lightbulb, label: 'Iluminação' },
    { name: 'Thermometer', icon: Thermometer, label: 'Climatização' },
    { name: 'Lock', icon: Lock, label: 'Chaveiro' },
    { name: 'Camera', icon: Camera, label: 'Monitoramento' },
    { name: 'Flower', icon: Flower, label: 'Jardinagem' },
    { name: 'PaintBucket', icon: PaintBucket, label: 'Pintura' },
    { name: 'Plug', icon: Plug, label: 'Elétrica' },
    { name: 'Tv', icon: Tv, label: 'TV' },
    { name: 'Utensils', icon: Utensils, label: 'Alimentação' },
    { name: 'Car', icon: Car, label: 'Transporte/Carro' },
    { name: 'Bus', icon: Bus, label: 'Ônibus' },
    { name: 'ShoppingBag', icon: ShoppingBag, label: 'Entregas' },
    { name: 'PawPrint', icon: PawPrint, label: 'Pets' },
]

const validatePhone = (phone: string) => {
    // Basic regex for Brazilian phones: (XX) XXXX-XXXX or (XX) XXXXX-XXXX
    const phoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5}[-\s]?\d{4})$/
    const cleanPhone = phone.replace(/[^0-9]/g, '')
    return cleanPhone.length >= 10 && cleanPhone.length <= 11
}

// Helper component to render dynamic icon
const IconDisplay = ({ name, className }: { name: string, className?: string }) => {
    const iconDef = AVAILABLE_ICONS.find(i => i.name === name)
    const Icon = iconDef ? iconDef.icon : Briefcase
    return <Icon className={className} />
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
    const [formErrors, setFormErrors] = useState({
        contact: '',
    })
    const [categoryName, setCategoryName] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('Briefcase')
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)

    const filteredProviders = providers.filter(
        (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleOpenCreate = () => {
        setCurrentProvider(null)
        setFormData({ name: '', contact: '', categoryId: categories[0]?.id || '' })
        setFormErrors({ contact: '' })
        setIsSheetOpen(true)
    }

    const handleOpenEdit = (provider: Provider) => {
        setCurrentProvider(provider)
        setFormData({
            name: provider.name,
            contact: provider.contact,
            categoryId: provider.categoryId,
        })
        setFormErrors({ contact: '' })
        setIsSheetOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validatePhone(formData.contact)) {
            setFormErrors({ contact: 'Telefone inválido. Use o formato (DD) 99999-9999' })
            return
        }

        try {
            if (currentProvider) {
                // Remove id from formData if it accidentally got in there, though our state doesn't have it
                const { name, contact, categoryId } = formData
                await updateConcessionaria(currentProvider.id, { name, contact, categoryId })
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

    const handleCreateOrUpdateCategory = async () => {
        if (!categoryName) return;

        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, categoryName, selectedIcon)
            } else {
                await createCategory(categoryName, selectedIcon)
            }

            setCategoryName('')
            setSelectedIcon('Briefcase')
            setEditingCategory(null)
            router.refresh()
        } catch (error) {
            console.error(error)
            alert('Erro ao salvar categoria')
        }
    }

    const handleEditCategory = (cat: Category) => {
        setEditingCategory(cat)
        setCategoryName(cat.name)
        setSelectedIcon(cat.icon || 'Briefcase')
    }

    const handleDeleteCategory = async (id: string) => {
        if (!confirm('Excluir esta categoria? Se houver serviços vinculados, pode haver erro.')) return
        try {
            await deleteCategory(id)
            router.refresh()
            if (editingCategory?.id === id) {
                setEditingCategory(null)
                setCategoryName('')
                setSelectedIcon('Briefcase')
            }
        } catch (error) {
            alert('Não foi possível excluir. Verifique se há serviços usando esta categoria.')
        }
    }

    const handleNewCategoryReset = () => {
        setEditingCategory(null)
        setCategoryName('')
        setSelectedIcon('Briefcase')
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
                            <span className="text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full flex items-center gap-1">
                                {provider.category?.icon ? (
                                    <IconDisplay name={provider.category.icon} className="w-3 h-3" />
                                ) : null}
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
                                onChange={(e) => {
                                    setFormData({ ...formData, contact: e.target.value })
                                    if (formErrors.contact) setFormErrors({ contact: '' })
                                }}
                                placeholder="Ex: (14) 99999-9999"
                            />
                            {formErrors.contact && (
                                <span className="text-xs text-destructive">{formErrors.contact}</span>
                            )}
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
                <SheetContent className="overflow-y-auto sm:max-w-md">
                    <SheetHeader>
                        <SheetTitle>Gerenciar Categorias</SheetTitle>
                    </SheetHeader>

                    {/* List of existing categories */}
                    <div className="py-4 space-y-2 border-b mb-4 max-h-60 overflow-y-auto">
                        <Label className="text-muted-foreground text-xs uppercase tracking-wider mb-2 block">Categorias Existentes</Label>
                        {categories.map(cat => (
                            <div key={cat.id} className="flex items-center justify-between p-2 rounded-md hover:bg-accent group">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-secondary rounded-md text-secondary-foreground">
                                        <IconDisplay name={cat.icon || 'Briefcase'} className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium text-sm">{cat.name}</span>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleEditCategory(cat)}>
                                        <Pencil className="w-3 h-3" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => handleDeleteCategory(cat.id)}>
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4 pb-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-semibold">
                                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
                            </Label>
                            {editingCategory && (
                                <Button size="sm" variant="ghost" onClick={handleNewCategoryReset} className="h-6 text-xs">
                                    Cancelar Edição
                                </Button>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Nome da Categoria</Label>
                            <Input
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Ex: Manutenção"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Ícone</Label>
                            <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto p-1 border rounded-md">
                                {AVAILABLE_ICONS.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <button
                                            key={item.name}
                                            type="button"
                                            onClick={() => setSelectedIcon(item.name)}
                                            className={`p-2 rounded-md flex flex-col items-center gap-1 hover:bg-accent transition-colors ${selectedIcon === item.name
                                                ? 'bg-primary text-primary-foreground ring-1 ring-primary'
                                                : 'text-muted-foreground'
                                                }`}
                                            title={item.label}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </button>
                                    )
                                })}
                            </div>
                            <p className="text-[10px] text-muted-foreground text-right">{AVAILABLE_ICONS.find(i => i.name === selectedIcon)?.label}</p>
                        </div>
                        <Button onClick={handleCreateOrUpdateCategory} className="w-full">
                            {editingCategory ? 'Atualizar Categoria' : 'Criar Categoria'}
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
