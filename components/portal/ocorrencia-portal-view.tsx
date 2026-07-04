'use client'

import { useState } from 'react'
import { AlertOctagon, Plus, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet'
import { createIncident } from '@/app/actions/incidents'
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

export function OcorrenciaPortalView({ initialIncidents, userId }: { initialIncidents: Incident[]; userId: string }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ title: '', description: '', category: 'Convivência', isAnonymous: false })
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await createIncident(userId, formData)
            toast.success('Ocorrência registrada com sucesso!')
            setFormData({ title: '', description: '', category: 'Convivência', isAnonymous: false })
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to create incident', error)
            toast.error('Erro ao registrar ocorrência.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => setIsSheetOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Registrar Ocorrência
                </Button>
            </div>

            <div className="space-y-3">
                {initialIncidents.map((i) => (
                    <Card key={i.id} className="p-5 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                <AlertOctagon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-slate-900">{i.title}</h3>
                                    {i.isAnonymous && (
                                        <span className="text-xs text-slate-400 flex items-center gap-1"><EyeOff className="w-3 h-3" /> anônima</span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500 mt-1 max-w-xl">{i.description}</p>
                                <p className="text-xs text-slate-400 mt-2">
                                    {i.category} · {new Date(i.createdAt).toLocaleDateString('pt-BR', { dateStyle: 'long' })}
                                </p>
                            </div>
                        </div>
                        <Badge variant={STATUS_VARIANT[i.status]}>{STATUS_LABEL[i.status]}</Badge>
                    </Card>
                ))}
                {initialIncidents.length === 0 && (
                    <div className="text-center py-8 text-slate-400">Você ainda não registrou nenhuma ocorrência.</div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Registrar Ocorrência</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Categoria</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                disabled={isLoading}
                            >
                                <option value="Convivência">Convivência</option>
                                <option value="Barulho">Barulho</option>
                                <option value="Animais">Animais</option>
                                <option value="Obras">Obras</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Título</Label>
                            <Input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Resumo da ocorrência"
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
                                placeholder="Descreva o que aconteceu, data e local..."
                                disabled={isLoading}
                            />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                            <div>
                                <Label htmlFor="isAnonymous" className="cursor-pointer">Manter em sigilo</Label>
                                <p className="text-xs text-muted-foreground">A síndica não verá seu nome nesta ocorrência.</p>
                            </div>
                            <Switch
                                id="isAnonymous"
                                checked={formData.isAnonymous}
                                onCheckedChange={(checked) => setFormData({ ...formData, isAnonymous: checked })}
                                disabled={isLoading}
                            />
                        </div>
                        <SheetFooter className="gap-2 sm:gap-0">
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                {isLoading ? 'Enviando...' : 'Registrar'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
