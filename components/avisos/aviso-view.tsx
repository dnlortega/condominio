'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, AlertTriangle, Megaphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import {
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} from '@/app/actions/announcements'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Announcement = {
    id: string
    title: string
    content: string
    isUrgent: boolean
    createdAt: Date
}

export function AvisoView({ initialAnnouncements }: { initialAnnouncements: Announcement[] }) {
    const [announcements, setAnnouncements] = useState(initialAnnouncements)
    const [searchTerm, setSearchTerm] = useState('')
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [current, setCurrent] = useState<Announcement | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const [formData, setFormData] = useState({ title: '', content: '', isUrgent: false })

    const filtered = announcements.filter((a) =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleOpenCreate = () => {
        setCurrent(null)
        setFormData({ title: '', content: '', isUrgent: false })
        setIsSheetOpen(true)
    }

    const handleOpenEdit = (announcement: Announcement) => {
        setCurrent(announcement)
        setFormData({
            title: announcement.title,
            content: announcement.content,
            isUrgent: announcement.isUrgent,
        })
        setIsSheetOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (current) {
                await updateAnnouncement(current.id, formData)
                toast.success('Aviso atualizado com sucesso!')
            } else {
                await createAnnouncement(formData)
                toast.success('Aviso publicado com sucesso!')
            }
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to save', error)
            toast.error('Erro ao salvar aviso. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este aviso?')) return
        setIsLoading(true)
        try {
            await deleteAnnouncement(id)
            toast.success('Aviso excluído com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete', error)
            toast.error('Erro ao excluir aviso. Tente novamente.')
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
                        placeholder="Buscar avisos..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={handleOpenCreate} className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Aviso
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((announcement) => (
                    <Card key={announcement.id} className="p-5 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2 gap-2">
                            <div className="flex items-center gap-2">
                                {announcement.isUrgent ? (
                                    <Badge variant="destructive" className="gap-1">
                                        <AlertTriangle className="w-3 h-3" /> Urgente
                                    </Badge>
                                ) : (
                                    <Badge variant="secondary" className="gap-1">
                                        <Megaphone className="w-3 h-3" /> Aviso
                                    </Badge>
                                )}
                            </div>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(announcement)} disabled={isLoading}>
                                    <Pencil className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(announcement.id)} disabled={isLoading}>
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{announcement.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{announcement.content}</p>
                        <p className="text-xs text-muted-foreground mt-3">
                            {new Date(announcement.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </p>
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        Nenhum aviso encontrado.
                    </div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>{current ? 'Editar Aviso' : 'Novo Aviso'}</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Título</Label>
                            <Input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ex: Manutenção do elevador"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Conteúdo</Label>
                            <Textarea
                                required
                                rows={5}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Descreva o aviso para os moradores..."
                                disabled={isLoading}
                            />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                                <Label htmlFor="isUrgent" className="cursor-pointer">Marcar como urgente</Label>
                                <p className="text-xs text-muted-foreground">Avisos urgentes aparecem em destaque no portal.</p>
                            </div>
                            <Switch
                                id="isUrgent"
                                checked={formData.isUrgent}
                                onCheckedChange={(checked) => setFormData({ ...formData, isUrgent: checked })}
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
