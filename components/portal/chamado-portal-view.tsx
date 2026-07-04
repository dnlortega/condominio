'use client'

import { useState } from 'react'
import { Wrench, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
import { createTicket } from '@/app/actions/tickets'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { TicketStatus } from '@prisma/client'

type Ticket = {
    id: string
    title: string
    description: string
    status: TicketStatus
    createdAt: Date
}

const STATUS_LABEL: Record<TicketStatus, string> = {
    OPEN: 'Aberto',
    IN_PROGRESS: 'Em Andamento',
    RESOLVED: 'Resolvido',
}

const STATUS_VARIANT: Record<TicketStatus, 'destructive' | 'secondary' | 'default'> = {
    OPEN: 'destructive',
    IN_PROGRESS: 'secondary',
    RESOLVED: 'default',
}

export function ChamadoPortalView({ initialTickets, userId }: { initialTickets: Ticket[]; userId: string }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ title: '', description: '' })
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await createTicket(userId, formData.title, formData.description)
            toast.success('Chamado aberto com sucesso!')
            setFormData({ title: '', description: '' })
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to create ticket', error)
            toast.error('Erro ao abrir chamado. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => setIsSheetOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Abrir Chamado
                </Button>
            </div>

            <div className="space-y-3">
                {initialTickets.map((t) => (
                    <Card key={t.id} className="p-5 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                <Wrench className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">{t.title}</h3>
                                <p className="text-sm text-slate-500 mt-1 max-w-xl">{t.description}</p>
                                <p className="text-xs text-slate-400 mt-2">
                                    {new Date(t.createdAt).toLocaleDateString('pt-BR', { dateStyle: 'long' })}
                                </p>
                            </div>
                        </div>
                        <Badge variant={STATUS_VARIANT[t.status]}>{STATUS_LABEL[t.status]}</Badge>
                    </Card>
                ))}
                {initialTickets.length === 0 && (
                    <div className="text-center py-8 text-slate-400">Você ainda não abriu nenhum chamado.</div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Abrir Chamado</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Título</Label>
                            <Input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ex: Vazamento na garagem"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Descrição</Label>
                            <Textarea
                                required
                                rows={5}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Descreva o problema com detalhes..."
                                disabled={isLoading}
                            />
                        </div>
                        <SheetFooter className="gap-2 sm:gap-0">
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                {isLoading ? 'Enviando...' : 'Abrir Chamado'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
