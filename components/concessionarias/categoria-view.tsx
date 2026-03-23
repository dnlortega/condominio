'use client'

import { useState, useMemo } from 'react'
import {
    Plus, Pencil, Trash2, Search,
    // Utilities
    Zap, Droplet, Wifi, Flame, Plug, Lightbulb, Tv, Smartphone, Thermometer,
    // Maintenance
    Hammer, Wrench, PaintBucket, Pipette, Cog, Construction, HardHat,
    // Living
    Utensils, Bed, Bath, Sofa, Lamp, DoorOpen, Armchair,
    // Transportation
    Car, Bus, Truck, Bike, Plane, Ship,
    // Health & Wellness
    Stethoscope, HeartPulse, Dumbbell, Activity, Cross,
    // Security
    Shield, Lock, Camera, Eye, KeyRound, Siren,
    // Business
    Briefcase, Building2, Store, Wallet, CreditCard, Receipt, Banknote,
    // Nature
    Flower, Trees, Sun, CloudRain, Leaf, Sprout,
    // People & Social
    Users, Baby, PawPrint, Accessibility, UserCog,
    // Communication
    Phone, Mail, MessageSquare, Bell, Megaphone,
    // Shopping
    ShoppingBag, ShoppingCart, Package, Gift, Tag,
    // General
    Star, Heart, BookOpen, GraduationCap, Music, Palette, Scissors, Trash, Recycle, MapPin, Clock, Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createCategory, updateCategory, deleteCategory } from '@/app/actions/concessionarias'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Category = {
    id: string
    name: string
    icon: string | null
}

const ICON_GROUPS = [
    {
        group: 'Utilidades',
        icons: [
            { name: 'Zap', icon: Zap, label: 'Energia' },
            { name: 'Droplet', icon: Droplet, label: 'Água' },
            { name: 'Wifi', icon: Wifi, label: 'Internet' },
            { name: 'Flame', icon: Flame, label: 'Gás' },
            { name: 'Plug', icon: Plug, label: 'Elétrica' },
            { name: 'Lightbulb', icon: Lightbulb, label: 'Iluminação' },
            { name: 'Tv', icon: Tv, label: 'TV / Cabo' },
            { name: 'Smartphone', icon: Smartphone, label: 'Telefonia' },
            { name: 'Thermometer', icon: Thermometer, label: 'Climatização' },
        ]
    },
    {
        group: 'Manutenção',
        icons: [
            { name: 'Hammer', icon: Hammer, label: 'Construção' },
            { name: 'Wrench', icon: Wrench, label: 'Reparos' },
            { name: 'PaintBucket', icon: PaintBucket, label: 'Pintura' },
            { name: 'Pipette', icon: Pipette, label: 'Hidráulica' },
            { name: 'Cog', icon: Cog, label: 'Engrenagem' },
            { name: 'Construction', icon: Construction, label: 'Obras' },
            { name: 'HardHat', icon: HardHat, label: 'Capacete' },
            { name: 'Scissors', icon: Scissors, label: 'Costura' },
        ]
    },
    {
        group: 'Moradia',
        icons: [
            { name: 'Utensils', icon: Utensils, label: 'Alimentação' },
            { name: 'Bed', icon: Bed, label: 'Quarto' },
            { name: 'Bath', icon: Bath, label: 'Banheiro' },
            { name: 'Sofa', icon: Sofa, label: 'Sala' },
            { name: 'Lamp', icon: Lamp, label: 'Lâmpada' },
            { name: 'DoorOpen', icon: DoorOpen, label: 'Porta' },
            { name: 'Armchair', icon: Armchair, label: 'Poltrona' },
        ]
    },
    {
        group: 'Transporte',
        icons: [
            { name: 'Car', icon: Car, label: 'Carro' },
            { name: 'Bus', icon: Bus, label: 'Ônibus' },
            { name: 'Truck', icon: Truck, label: 'Caminhão' },
            { name: 'Bike', icon: Bike, label: 'Bicicleta' },
            { name: 'Plane', icon: Plane, label: 'Avião' },
            { name: 'Ship', icon: Ship, label: 'Navio' },
        ]
    },
    {
        group: 'Saúde',
        icons: [
            { name: 'Stethoscope', icon: Stethoscope, label: 'Médico' },
            { name: 'HeartPulse', icon: HeartPulse, label: 'Cardiologia' },
            { name: 'Dumbbell', icon: Dumbbell, label: 'Academia' },
            { name: 'Activity', icon: Activity, label: 'Atividades' },
            { name: 'Cross', icon: Cross, label: 'Farmácia' },
        ]
    },
    {
        group: 'Segurança',
        icons: [
            { name: 'Shield', icon: Shield, label: 'Escudo' },
            { name: 'Lock', icon: Lock, label: 'Cadeado' },
            { name: 'Camera', icon: Camera, label: 'Câmera' },
            { name: 'Eye', icon: Eye, label: 'Vigilância' },
            { name: 'KeyRound', icon: KeyRound, label: 'Chaveiro' },
            { name: 'Siren', icon: Siren, label: 'Sirene' },
        ]
    },
    {
        group: 'Negócios',
        icons: [
            { name: 'Briefcase', icon: Briefcase, label: 'Negócios' },
            { name: 'Building2', icon: Building2, label: 'Prédio' },
            { name: 'Store', icon: Store, label: 'Loja' },
            { name: 'Wallet', icon: Wallet, label: 'Carteira' },
            { name: 'CreditCard', icon: CreditCard, label: 'Cartão' },
            { name: 'Receipt', icon: Receipt, label: 'Recibo' },
            { name: 'Banknote', icon: Banknote, label: 'Dinheiro' },
        ]
    },
    {
        group: 'Natureza',
        icons: [
            { name: 'Flower', icon: Flower, label: 'Flor' },
            { name: 'Trees', icon: Trees, label: 'Árvores' },
            { name: 'Sun', icon: Sun, label: 'Sol' },
            { name: 'CloudRain', icon: CloudRain, label: 'Chuva' },
            { name: 'Leaf', icon: Leaf, label: 'Folha' },
            { name: 'Sprout', icon: Sprout, label: 'Broto' },
        ]
    },
    {
        group: 'Pessoas',
        icons: [
            { name: 'Users', icon: Users, label: 'Grupo' },
            { name: 'Baby', icon: Baby, label: 'Bebê' },
            { name: 'PawPrint', icon: PawPrint, label: 'Pets' },
            { name: 'Accessibility', icon: Accessibility, label: 'Acessibilidade' },
            { name: 'UserCog', icon: UserCog, label: 'Admin' },
        ]
    },
    {
        group: 'Comunicação',
        icons: [
            { name: 'Phone', icon: Phone, label: 'Telefone' },
            { name: 'Mail', icon: Mail, label: 'E-mail' },
            { name: 'MessageSquare', icon: MessageSquare, label: 'Mensagem' },
            { name: 'Bell', icon: Bell, label: 'Notificação' },
            { name: 'Megaphone', icon: Megaphone, label: 'Aviso' },
        ]
    },
    {
        group: 'Compras',
        icons: [
            { name: 'ShoppingBag', icon: ShoppingBag, label: 'Sacola' },
            { name: 'ShoppingCart', icon: ShoppingCart, label: 'Carrinho' },
            { name: 'Package', icon: Package, label: 'Encomenda' },
            { name: 'Gift', icon: Gift, label: 'Presente' },
            { name: 'Tag', icon: Tag, label: 'Etiqueta' },
        ]
    },
    {
        group: 'Geral',
        icons: [
            { name: 'Star', icon: Star, label: 'Estrela' },
            { name: 'Heart', icon: Heart, label: 'Coração' },
            { name: 'BookOpen', icon: BookOpen, label: 'Livro' },
            { name: 'GraduationCap', icon: GraduationCap, label: 'Educação' },
            { name: 'Music', icon: Music, label: 'Música' },
            { name: 'Palette', icon: Palette, label: 'Artes' },
            { name: 'Trash', icon: Trash, label: 'Lixo' },
            { name: 'Recycle', icon: Recycle, label: 'Reciclagem' },
            { name: 'MapPin', icon: MapPin, label: 'Local' },
            { name: 'Clock', icon: Clock, label: 'Relógio' },
            { name: 'Calendar', icon: Calendar, label: 'Agenda' },
        ]
    }
]

const ALL_ICONS = ICON_GROUPS.flatMap(g => g.icons)

const IconDisplay = ({ name, className }: { name: string, className?: string }) => {
    const iconDef = ALL_ICONS.find(i => i.name === name)
    const Icon = iconDef ? iconDef.icon : Briefcase
    return <Icon className={className} />
}

export function CategoriaView({ categories }: { categories: Category[] }) {
    const [categoryName, setCategoryName] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('Briefcase')
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [iconSearch, setIconSearch] = useState('')
    const [activeGroup, setActiveGroup] = useState<string | null>(null)
    const router = useRouter()

    const filteredGroups = useMemo(() => {
        if (!iconSearch && !activeGroup) return ICON_GROUPS
        return ICON_GROUPS
            .filter(g => !activeGroup || g.group === activeGroup)
            .map(g => ({
                ...g,
                icons: g.icons.filter(i =>
                    i.label.toLowerCase().includes(iconSearch.toLowerCase()) ||
                    i.name.toLowerCase().includes(iconSearch.toLowerCase())
                )
            }))
            .filter(g => g.icons.length > 0)
    }, [iconSearch, activeGroup])

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white border border-slate-200/60 rounded-[2rem] p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">
                        {editingCategory ? '✏️ Editar Categoria' : '➕ Nova Categoria'}
                    </h2>
                    <form onSubmit={handleCreateOrUpdate} className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Nome da Categoria</Label>
                            <Input
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                placeholder="Ex: Manutenção"
                                required
                                className="h-12 rounded-xl border-slate-200 focus:border-primary focus:ring-primary/20"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Ícone <span className="text-primary font-black">({ALL_ICONS.length} disponíveis)</span>
                            </Label>

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar ícone..."
                                    value={iconSearch}
                                    onChange={(e) => setIconSearch(e.target.value)}
                                    className="w-full h-10 pl-10 pr-4 text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            {/* Group Tabs */}
                            <div className="flex flex-wrap gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => setActiveGroup(null)}
                                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                                        !activeGroup
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    Todos
                                </button>
                                {ICON_GROUPS.map(g => (
                                    <button
                                        key={g.group}
                                        type="button"
                                        onClick={() => setActiveGroup(activeGroup === g.group ? null : g.group)}
                                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                                            activeGroup === g.group
                                                ? 'bg-primary text-white shadow-sm'
                                                : 'bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        {g.group}
                                    </button>
                                ))}
                            </div>

                            {/* Icons Grid */}
                            <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-100 p-3 space-y-4 scrollbar-thin">
                                {filteredGroups.map(group => (
                                    <div key={group.group}>
                                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-2 px-1">{group.group}</p>
                                        <div className="grid grid-cols-5 gap-1.5">
                                            {group.icons.map((item) => {
                                                const Icon = item.icon
                                                const isSelected = selectedIcon === item.name
                                                return (
                                                    <button
                                                        key={item.name}
                                                        type="button"
                                                        onClick={() => setSelectedIcon(item.name)}
                                                        className={`p-2.5 rounded-xl flex flex-col items-center gap-1 transition-all duration-200 ${
                                                            isSelected
                                                                ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110 ring-2 ring-primary ring-offset-1'
                                                                : 'text-slate-400 hover:text-primary hover:bg-primary/5 hover:scale-105'
                                                        }`}
                                                        title={item.label}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                        <span className={`text-[8px] font-bold truncate w-full text-center ${isSelected ? 'text-white/80' : 'text-slate-300'}`}>
                                                            {item.label}
                                                        </span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                                {filteredGroups.length === 0 && (
                                    <p className="text-center text-sm text-slate-400 py-6">Nenhum ícone encontrado.</p>
                                )}
                            </div>

                            {/* Selected indicator */}
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <IconDisplay name={selectedIcon} className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-700">Selecionado</p>
                                    <p className="text-[10px] text-slate-400">{ALL_ICONS.find(i => i.name === selectedIcon)?.label || selectedIcon}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="submit" className="flex-1 h-12 rounded-xl font-bold" disabled={isLoading}>
                                {isLoading ? 'Salvando...' : editingCategory ? 'Atualizar' : 'Criar Categoria'}
                            </Button>
                            {editingCategory && (
                                <Button type="button" variant="outline" onClick={handleCancelEdit} className="h-12 rounded-xl">
                                    Cancelar
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* List Section */}
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">Categorias Cadastradas</h2>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                        {categories.length} {categories.length === 1 ? 'categoria' : 'categorias'}
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map(cat => (
                        <div key={cat.id} className="group bg-white border border-slate-200/60 rounded-2xl p-5 hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                                        <IconDisplay name={cat.icon || 'Briefcase'} className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-800">{cat.name}</span>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-9 w-9 rounded-xl hover:bg-primary/5 hover:text-primary"
                                        onClick={() => handleEdit(cat)}
                                        disabled={isLoading}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-9 w-9 rounded-xl text-red-400 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => handleDelete(cat.id)}
                                        disabled={isLoading}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {categories.length === 0 && (
                        <div className="col-span-full text-center py-16 text-slate-400 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                            <Plus className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                            <p className="font-bold">Nenhuma categoria cadastrada</p>
                            <p className="text-sm mt-1">Crie a primeira usando o formulário ao lado.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
