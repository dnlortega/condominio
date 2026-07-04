'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, Mail, Home, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { createUser, updateUser, deleteUser } from '@/app/actions/users'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Role } from '@prisma/client'

type UserRow = {
    id: string
    name: string
    email: string
    role: Role
    apartment: string | null
    phone: string | null
}

export function MoradorView({ initialUsers }: { initialUsers: UserRow[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [current, setCurrent] = useState<UserRow | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [formError, setFormError] = useState('')
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        apartment: '',
        phone: '',
        role: 'RESIDENT' as Role,
    })

    const filtered = initialUsers.filter(
        (u) =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.apartment?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleOpenCreate = () => {
        setCurrent(null)
        setFormData({ name: '', email: '', password: '', apartment: '', phone: '', role: 'RESIDENT' })
        setFormError('')
        setIsSheetOpen(true)
    }

    const handleOpenEdit = (user: UserRow) => {
        setCurrent(user)
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            apartment: user.apartment || '',
            phone: user.phone || '',
            role: user.role,
        })
        setFormError('')
        setIsSheetOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError('')

        if (!current && formData.password.length < 6) {
            setFormError('A senha deve ter pelo menos 6 caracteres.')
            return
        }

        setIsLoading(true)
        try {
            if (current) {
                await updateUser(current.id, {
                    name: formData.name,
                    email: formData.email,
                    apartment: formData.apartment,
                    phone: formData.phone,
                    role: formData.role,
                    password: formData.password || undefined,
                })
                toast.success('Morador atualizado com sucesso!')
            } else {
                await createUser(formData)
                toast.success('Morador cadastrado com sucesso!')
            }
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to save', error)
            toast.error('Erro ao salvar morador. Verifique se o e-mail já está em uso.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este morador?')) return
        setIsLoading(true)
        try {
            await deleteUser(id)
            toast.success('Morador excluído com sucesso!')
            router.refresh()
        } catch (error: any) {
            console.error('Failed to delete', error)
            toast.error(error?.message || 'Erro ao excluir morador.')
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
                        placeholder="Buscar por nome, e-mail ou apartamento..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={handleOpenCreate} className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Morador
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((user) => (
                    <Card key={user.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'} className="gap-1">
                                <ShieldCheck className="w-3 h-3" /> {user.role === 'ADMIN' ? 'Admin' : 'Morador'}
                            </Badge>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(user)} disabled={isLoading}>
                                    <Pencil className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(user.id)} disabled={isLoading}>
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                        <div className="flex items-center text-muted-foreground gap-2 text-sm">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                        </div>
                        {user.apartment && (
                            <div className="flex items-center text-muted-foreground gap-2 text-sm mt-1">
                                <Home className="w-4 h-4" />
                                <span>Apto {user.apartment}</span>
                            </div>
                        )}
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        Nenhum morador cadastrado.
                    </div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>{current ? 'Editar Morador' : 'Novo Morador'}</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Nome</Label>
                            <Input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Nome completo"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>E-mail</Label>
                            <Input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="morador@exemplo.com"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{current ? 'Nova senha (opcional)' : 'Senha'}</Label>
                            <Input
                                type="password"
                                required={!current}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Mínimo 6 caracteres"
                                disabled={isLoading}
                            />
                            {formError && <span className="text-xs text-destructive">{formError}</span>}
                        </div>
                        <div className="space-y-2">
                            <Label>Apartamento</Label>
                            <Input
                                value={formData.apartment}
                                onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                                placeholder="Ex: A-42"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Telefone</Label>
                            <Input
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Ex: (14) 99999-9999"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Perfil</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                                disabled={isLoading}
                            >
                                <option value="RESIDENT">Morador</option>
                                <option value="ADMIN">Admin</option>
                            </select>
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
