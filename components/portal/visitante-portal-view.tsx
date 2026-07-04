'use client'

import { useState } from 'react'
import { Users, Plus, Trash2, Copy, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet'
import { createVisitor, deleteVisitor } from '@/app/actions/visitors'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Visitor = {
    id: string
    name: string
    rg: string | null
    visitDate: Date
    token: string
    isUsed: boolean
}

export function VisitantePortalView({ initialVisitors, userId }: { initialVisitors: Visitor[]; userId: string }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ name: '', rg: '', visitDate: '' })
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await createVisitor(userId, formData)
            toast.success('Convite de visitante criado!')
            setFormData({ name: '', rg: '', visitDate: '' })
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to create visitor', error)
            toast.error('Erro ao criar convite. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja cancelar este convite?')) return
        setIsLoading(true)
        try {
            await deleteVisitor(id, userId)
            toast.success('Convite cancelado.')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete visitor', error)
            toast.error('Erro ao cancelar convite.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCopyCode = (token: string) => {
        navigator.clipboard.writeText(token.slice(0, 8).toUpperCase())
        toast.success('Código copiado!')
    }

    const whatsappLink = (visitor: Visitor) => {
        const message = `Olá ${visitor.name}! Seu código de acesso para a visita em ${new Date(visitor.visitDate).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })} é: ${visitor.token.slice(0, 8).toUpperCase()}`
        return `https://wa.me/?text=${encodeURIComponent(message)}`
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => setIsSheetOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Convidar Visitante
                </Button>
            </div>

            <div className="space-y-3">
                {initialVisitors.map((v) => (
                    <Card key={v.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">{v.name}</h3>
                                <p className="text-sm text-slate-500">
                                    {new Date(v.visitDate).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}
                                </p>
                                <button
                                    onClick={() => handleCopyCode(v.token)}
                                    className="text-xs font-mono text-primary mt-1 flex items-center gap-1 hover:underline"
                                >
                                    Código: {v.token.slice(0, 8).toUpperCase()} <Copy className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Badge variant={v.isUsed ? 'default' : 'secondary'}>
                                {v.isUsed ? 'Entrada liberada' : 'Aguardando'}
                            </Badge>
                            {!v.isUsed && (
                                <>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700" asChild>
                                        <a href={whatsappLink(v)} target="_blank" rel="noopener noreferrer">
                                            <MessageCircle className="w-4 h-4" />
                                        </a>
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isLoading} onClick={() => handleDelete(v.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </>
                            )}
                        </div>
                    </Card>
                ))}
                {initialVisitors.length === 0 && (
                    <div className="text-center py-8 text-slate-400">Nenhum convite de visitante criado ainda.</div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Convidar Visitante</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Nome do visitante</Label>
                            <Input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Nome completo"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>RG (opcional)</Label>
                            <Input
                                value={formData.rg}
                                onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                                placeholder="00.000.000-0"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Data e horário da visita</Label>
                            <Input
                                type="datetime-local"
                                required
                                value={formData.visitDate}
                                onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                                disabled={isLoading}
                            />
                        </div>
                        <SheetFooter className="gap-2 sm:gap-0">
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                {isLoading ? 'Gerando...' : 'Gerar Código de Acesso'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
