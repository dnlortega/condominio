'use client'

import { useState } from 'react'
import { Search, Trash2, AlertOctagon, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { updateIncidentStatus, deleteIncident } from '@/app/actions/incidents'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { IncidentStatus } from '@prisma/client'

type Incident = {
    id: string
    title: string
    description: string
    category: string
    status: IncidentStatus
    isAnonymous: boolean
    createdAt: Date
    user: { name: string; apartment: string | null }
}

const STATUS_LABEL: Record<IncidentStatus, string> = {
    OPEN: 'Aberta',
    IN_REVIEW: 'Em Análise',
    RESOLVED: 'Resolvida',
}

const STATUS_VARIANT: Record<IncidentStatus, 'destructive' | 'secondary' | 'default'> = {
    OPEN: 'destructive',
    IN_REVIEW: 'secondary',
    RESOLVED: 'default',
}

export function OcorrenciaView({ initialIncidents }: { initialIncidents: Incident[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const filtered = initialIncidents.filter(
        (i) =>
            i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            i.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleStatusChange = async (id: string, status: IncidentStatus) => {
        setIsLoading(true)
        try {
            await updateIncidentStatus(id, status)
            toast.success('Ocorrência atualizada com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to update', error)
            toast.error('Erro ao atualizar ocorrência.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta ocorrência?')) return
        setIsLoading(true)
        try {
            await deleteIncident(id)
            toast.success('Ocorrência excluída com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete', error)
            toast.error('Erro ao excluir ocorrência.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por título ou categoria..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-3">
                {filtered.map((incident) => (
                    <Card key={incident.id} className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                    <AlertOctagon className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold">{incident.title}</h3>
                                        <Badge variant="outline" className="text-xs">{incident.category}</Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                        {incident.isAnonymous ? (
                                            <><EyeOff className="w-3 h-3" /> Denúncia anônima</>
                                        ) : (
                                            <>{incident.user.name} {incident.user.apartment ? `· Apto ${incident.user.apartment}` : ''}</>
                                        )}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-2 max-w-xl">{incident.description}</p>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {new Date(incident.createdAt).toLocaleDateString('pt-BR', { dateStyle: 'long' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <select
                                    className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                                    value={incident.status}
                                    disabled={isLoading}
                                    onChange={(e) => handleStatusChange(incident.id, e.target.value as IncidentStatus)}
                                >
                                    <option value="OPEN">Aberta</option>
                                    <option value="IN_REVIEW">Em Análise</option>
                                    <option value="RESOLVED">Resolvida</option>
                                </select>
                                <Badge variant={STATUS_VARIANT[incident.status]}>{STATUS_LABEL[incident.status]}</Badge>
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isLoading} onClick={() => handleDelete(incident.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">Nenhuma ocorrência registrada.</div>
                )}
            </div>
        </div>
    )
}
