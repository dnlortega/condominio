'use client'

import { useState } from 'react'
import { Search, Trash2, UserCheck, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { markVisitorUsed, deleteVisitor } from '@/app/actions/visitors'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Visitor = {
    id: string
    name: string
    rg: string | null
    visitDate: Date
    token: string
    isUsed: boolean
    user: { name: string; apartment: string | null }
}

export function VisitanteView({ initialVisitors }: { initialVisitors: Visitor[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const filtered = initialVisitors.filter(
        (v) =>
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleCheckIn = async (id: string) => {
        setIsLoading(true)
        try {
            await markVisitorUsed(id)
            toast.success('Entrada liberada com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to update', error)
            toast.error('Erro ao liberar entrada.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este convite?')) return
        setIsLoading(true)
        try {
            await deleteVisitor(id)
            toast.success('Convite excluído com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete', error)
            toast.error('Erro ao excluir convite.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por visitante ou morador..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-3">
                {filtered.map((visitor) => (
                    <Card key={visitor.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{visitor.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Convidado por {visitor.user.name} {visitor.user.apartment ? `· Apto ${visitor.user.apartment}` : ''}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(visitor.visitDate).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}
                                </p>
                                <p className="text-xs font-mono text-muted-foreground mt-1">Código: {visitor.token.slice(0, 8)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Badge variant={visitor.isUsed ? 'default' : 'secondary'}>
                                {visitor.isUsed ? 'Entrada liberada' : 'Aguardando'}
                            </Badge>
                            {!visitor.isUsed && (
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700" disabled={isLoading} onClick={() => handleCheckIn(visitor.id)}>
                                    <UserCheck className="w-4 h-4" />
                                </Button>
                            )}
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isLoading} onClick={() => handleDelete(visitor.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        Nenhum convite de visitante encontrado.
                    </div>
                )}
            </div>
        </div>
    )
}
