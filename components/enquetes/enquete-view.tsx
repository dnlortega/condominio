'use client'

import { useState } from 'react'
import { Plus, Trash2, Lock, Vote, X } from 'lucide-react'
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
import { createPoll, closePoll, deletePoll } from '@/app/actions/polls'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Option = { id: string; text: string; _count: { votes: number } }
type Poll = {
    id: string
    question: string
    isOpen: boolean
    options: Option[]
    _count: { votes: number }
}

export function EnqueteView({ initialPolls }: { initialPolls: Poll[] }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState(['', ''])
    const router = useRouter()

    const handleAddOption = () => setOptions([...options, ''])
    const handleRemoveOption = (idx: number) => setOptions(options.filter((_, i) => i !== idx))
    const handleOptionChange = (idx: number, value: string) => {
        const next = [...options]
        next[idx] = value
        setOptions(next)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const validOptions = options.filter((o) => o.trim())
        if (validOptions.length < 2) {
            toast.error('Adicione pelo menos duas opções.')
            return
        }
        setIsLoading(true)
        try {
            await createPoll(question, validOptions)
            toast.success('Enquete criada com sucesso!')
            setQuestion('')
            setOptions(['', ''])
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to create poll', error)
            toast.error('Erro ao criar enquete.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = async (id: string) => {
        setIsLoading(true)
        try {
            await closePoll(id)
            toast.success('Enquete encerrada.')
            router.refresh()
        } catch (error) {
            console.error('Failed to close poll', error)
            toast.error('Erro ao encerrar enquete.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta enquete?')) return
        setIsLoading(true)
        try {
            await deletePoll(id)
            toast.success('Enquete excluída.')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete poll', error)
            toast.error('Erro ao excluir enquete.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => setIsSheetOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Nova Enquete
                </Button>
            </div>

            <div className="space-y-4">
                {initialPolls.map((poll) => {
                    const total = poll._count.votes
                    return (
                        <Card key={poll.id} className="p-5">
                            <div className="flex justify-between items-start mb-4 gap-2">
                                <div className="flex items-center gap-2">
                                    <Vote className="w-4 h-4 text-primary" />
                                    <h3 className="font-semibold">{poll.question}</h3>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Badge variant={poll.isOpen ? 'default' : 'secondary'}>{poll.isOpen ? 'Aberta' : 'Encerrada'}</Badge>
                                    {poll.isOpen && (
                                        <Button size="icon" variant="ghost" className="h-8 w-8" disabled={isLoading} onClick={() => handleClose(poll.id)}>
                                            <Lock className="w-4 h-4" />
                                        </Button>
                                    )}
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isLoading} onClick={() => handleDelete(poll.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {poll.options.map((opt) => {
                                    const pct = total > 0 ? Math.round((opt._count.votes / total) * 100) : 0
                                    return (
                                        <div key={opt.id}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{opt.text}</span>
                                                <span className="text-muted-foreground">{opt._count.votes} ({pct}%)</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-secondary overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">{total} voto(s) no total</p>
                        </Card>
                    )
                })}
                {initialPolls.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">Nenhuma enquete criada ainda.</div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Nova Enquete</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Pergunta</Label>
                            <Input
                                required
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Ex: Qual cor para a nova pintura do salão?"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Opções</Label>
                            {options.map((opt, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <Input
                                        value={opt}
                                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                                        placeholder={`Opção ${idx + 1}`}
                                        disabled={isLoading}
                                    />
                                    {options.length > 2 && (
                                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveOption(idx)} disabled={isLoading}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={handleAddOption} disabled={isLoading}>
                                <Plus className="w-3 h-3 mr-1" /> Adicionar opção
                            </Button>
                        </div>
                        <SheetFooter className="gap-2 sm:gap-0">
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                {isLoading ? 'Criando...' : 'Criar Enquete'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
