'use client'

import { useState } from 'react'
import { Search, Trash2, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { updateTicketStatus, deleteTicket } from '@/app/actions/tickets'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { TicketStatus } from '@prisma/client'

type Ticket = {
    id: string
    title: string
    description: string
    status: TicketStatus
    createdAt: Date
    user: { name: string; apartment: string | null }
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

export function ChamadoView({ initialTickets }: { initialTickets: Ticket[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const filtered = initialTickets.filter(
        (t) =>
            t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleStatusChange = async (id: string, status: TicketStatus) => {
        setIsLoading(true)
        try {
            await updateTicketStatus(id, status)
            toast.success('Chamado atualizado com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to update', error)
            toast.error('Erro ao atualizar chamado.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este chamado?')) return
        setIsLoading(true)
        try {
            await deleteTicket(id)
            toast.success('Chamado excluído com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete', error)
            toast.error('Erro ao excluir chamado.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por título ou morador..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-3">
                {filtered.map((ticket) => (
                    <Card key={ticket.id} className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                    <Wrench className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{ticket.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {ticket.user.name} {ticket.user.apartment ? `· Apto ${ticket.user.apartment}` : ''}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2 max-w-xl">{ticket.description}</p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {new Date(ticket.createdAt).toLocaleDateString('pt-BR', { dateStyle: 'long' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <select
                                    className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                                    value={ticket.status}
                                    disabled={isLoading}
                                    onChange={(e) => handleStatusChange(ticket.id, e.target.value as TicketStatus)}
                                >
                                    <option value="OPEN">Aberto</option>
                                    <option value="IN_PROGRESS">Em Andamento</option>
                                    <option value="RESOLVED">Resolvido</option>
                                </select>
                                <Badge variant={STATUS_VARIANT[ticket.status]}>{STATUS_LABEL[ticket.status]}</Badge>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isLoading} onClick={() => handleDelete(ticket.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        Nenhum chamado encontrado.
                    </div>
                )}
            </div>
        </div>
    )
}
