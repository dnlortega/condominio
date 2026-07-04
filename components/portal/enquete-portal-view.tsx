'use client'

import { useState } from 'react'
import { Vote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { voteOnPoll } from '@/app/actions/polls'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Option = { id: string; text: string; _count: { votes: number } }
type Poll = {
    id: string
    question: string
    isOpen: boolean
    options: Option[]
    myVoteOptionId: string | null
}

export function EnquetePortalView({ initialPolls, userId }: { initialPolls: Poll[]; userId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleVote = async (pollId: string, optionId: string) => {
        setIsLoading(true)
        try {
            await voteOnPoll(pollId, optionId, userId)
            toast.success('Voto registrado! Obrigado por participar.')
            router.refresh()
        } catch (error: any) {
            console.error('Failed to vote', error)
            toast.error(error?.message || 'Erro ao registrar voto.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-4">
            {initialPolls.map((poll) => {
                const total = poll.options.reduce((sum, o) => sum + o._count.votes, 0)
                const hasVoted = !!poll.myVoteOptionId
                const showResults = hasVoted || !poll.isOpen

                return (
                    <Card key={poll.id} className="p-5">
                        <div className="flex justify-between items-start mb-4 gap-2">
                            <div className="flex items-center gap-2">
                                <Vote className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold text-slate-900">{poll.question}</h3>
                            </div>
                            <Badge variant={poll.isOpen ? 'default' : 'secondary'}>{poll.isOpen ? 'Aberta' : 'Encerrada'}</Badge>
                        </div>

                        {showResults ? (
                            <div className="space-y-2">
                                {poll.options.map((opt) => {
                                    const pct = total > 0 ? Math.round((opt._count.votes / total) * 100) : 0
                                    const isMine = poll.myVoteOptionId === opt.id
                                    return (
                                        <div key={opt.id}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className={isMine ? 'font-semibold text-primary' : ''}>{opt.text}{isMine ? ' (seu voto)' : ''}</span>
                                                <span className="text-slate-400">{pct}%</span>
                                            </div>
                                            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                {poll.options.map((opt) => (
                                    <Button key={opt.id} variant="outline" className="justify-start" disabled={isLoading} onClick={() => handleVote(poll.id, opt.id)}>
                                        {opt.text}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </Card>
                )
            })}
            {initialPolls.length === 0 && (
                <div className="text-center py-8 text-slate-400">Nenhuma enquete disponível no momento.</div>
            )}
        </div>
    )
}
