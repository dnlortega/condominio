'use client'

import { useState } from 'react'
import {
    Plus, Pencil, Trash2,
    Zap, Droplet, Wifi, Flame, Shield,
    Hammer, Truck, Stethoscope, Briefcase,
    Smartphone, Lightbulb, Thermometer, Lock, Camera,
    Flower, PaintBucket, Plug, Tv, Utensils,
    Car, Bus, ShoppingBag, PawPrint
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { createCategory, updateCategory, deleteCategory } from '@/app/actions/concessionarias'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Category = {
    id: string
    name: string
    icon: string | null
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

const IconDisplay = ({ name, className }: { name: string, className?: string }) => {
    const iconDef = AVAILABLE_ICONS.find(i => i.name === name)
    const Icon = iconDef ? iconDef.icon : Briefcase
    return <Icon className={className} />
}

export function CategoriaView({ categories }: { categories: Category[] }) {
    const [categoryName, setCategoryName] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('Briefcase')
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleCreateOrUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!categoryName) return

        setIsLoading(true)
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, categoryName, selectedIcon)
                toast.success('Categoria atualizada com sucesso!')
            } else {
                await createCategory(categoryName, selectedIcon)
                toast.success('Categoria criada com sucesso!')
            }

            setCategoryName('')
            setSelectedIcon('Briefcase')
            setEditingCategory(null)
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error('Erro ao salvar categoria. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleEdit = (cat: Category) => {
        setEditingCategory(cat)
        setCategoryName(cat.name)
        setSelectedIcon(cat.icon || 'Briefcase')
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Excluir esta categoria? Se houver serviços vinculados, pode haver erro.')) return

        setIsLoading(true)
        try {
            await deleteCategory(id)
            toast.success('Categoria excluída com sucesso!')
            router.refresh()
            if (editingCategory?.id === id) {
                setEditingCategory(null)
                setCategoryName('')
                setSelectedIcon('Briefcase')
            }
        } catch (error) {
            toast.error('Não foi possível excluir. Verifique se há serviços usando esta categoria.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancelEdit = () => {
        setEditingCategory(null)
        setCategoryName('')
        setSelectedIcon('Briefcase')
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <Card className="p-6 lg:col-span-1">
                <h2 className="text-xl font-semibold mb-4">
                    {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
                </h2>
                <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Nome da Categoria</Label>
                        <Input
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Ex: Manutenção"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Ícone</Label>
                        <div className="grid grid-cols-4 gap-2 max-h-80 overflow-y-auto p-2 border rounded-md">
                            {AVAILABLE_ICONS.map((item) => {
                                const Icon = item.icon
                                return (
                                    <button
                                        key={item.name}
                                        type="button"
                                        onClick={() => setSelectedIcon(item.name)}
                                        className={`p-3 rounded-md flex flex-col items-center gap-1 hover:bg-accent transition-colors ${selectedIcon === item.name
                                            ? 'bg-primary text-primary-foreground ring-2 ring-primary'
                                            : 'text-muted-foreground'
                                            }`}
                                        title={item.label}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </button>
                                )
                            })}
                        </div>
                        <p className="text-xs text-muted-foreground text-right">
                            {AVAILABLE_ICONS.find(i => i.name === selectedIcon)?.label}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" className="flex-1" disabled={isLoading}>
                            {isLoading ? 'Salvando...' : editingCategory ? 'Atualizar' : 'Criar'}
                        </Button>
                        {editingCategory && (
                            <Button type="button" variant="outline" onClick={handleCancelEdit}>
                                Cancelar
                            </Button>
                        )}
                    </div>
                </form>
            </Card>

            {/* List Section */}
            <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Categorias Cadastradas</h2>
                    <span className="text-sm text-muted-foreground">
                        {categories.length} {categories.length === 1 ? 'categoria' : 'categorias'}
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map(cat => (
                        <Card key={cat.id} className="p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <IconDisplay name={cat.icon || 'Briefcase'} className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium">{cat.name}</span>
                                </div>
                                <div className="flex gap-1">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8"
                                        onClick={() => handleEdit(cat)}
                                        disabled={isLoading}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-destructive hover:text-destructive"
                                        onClick={() => handleDelete(cat.id)}
                                        disabled={isLoading}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                    {categories.length === 0 && (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            Nenhuma categoria cadastrada ainda.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
