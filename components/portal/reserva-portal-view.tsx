'use client'

import { useState } from 'react'
import { CalendarDays, X, Plus } from 'lucide-react'
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
import { createReservation, cancelMyReservation } from '@/app/actions/reservations'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ReservationStatus } from '@prisma/client'

type Amenity = { id: string; name: string; description: string | null; capacity: number }
type Reservation = {
    id: string
    date: Date
    status: ReservationStatus
    amenity: { name: string }
}

const STATUS_LABEL: Record<ReservationStatus, string> = {
    PENDING: 'Aguardando aprovação',
    CONFIRMED: 'Confirmada',
    CANCELLED: 'Cancelada',
}

const STATUS_VARIANT: Record<ReservationStatus, 'secondary' | 'default' | 'destructive'> = {
    PENDING: 'secondary',
    CONFIRMED: 'default',
    CANCELLED: 'destructive',
}

export function ReservaPortalView({
    amenities,
    initialReservations,
    userId,
}: {
    amenities: Amenity[]
    initialReservations: Reservation[]
    userId: string
}) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ amenityId: amenities[0]?.id || '', date: '' })
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await createReservation(userId, formData.amenityId, formData.date)
            toast.success('Reserva solicitada! Aguarde a aprovação da síndica.')
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to reserve', error)
            toast.error('Erro ao solicitar reserva. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = async (id: string) => {
        if (!confirm('Tem certeza que deseja cancelar esta reserva?')) return
        setIsLoading(true)
        try {
            await cancelMyReservation(id, userId)
            toast.success('Reserva cancelada.')
            router.refresh()
        } catch (error) {
            console.error('Failed to cancel', error)
            toast.error('Erro ao cancelar reserva.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Áreas disponíveis</h2>
                    <Button onClick={() => setIsSheetOpen(true)} disabled={amenities.length === 0}>
                        <Plus className="w-4 h-4 mr-2" /> Nova Reserva
                    </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {amenities.map((a) => (
                        <Card key={a.id} className="p-5">
                            <h3 className="font-semibold text-slate-900">{a.name}</h3>
                            {a.description && <p className="text-sm text-slate-500 mt-1">{a.description}</p>}
                            <p className="text-xs text-slate-400 mt-3">Até {a.capacity} pessoas</p>
                        </Card>
                    ))}
                    {amenities.length === 0 && (
                        <div className="col-span-full text-center py-8 text-slate-400">
                            Nenhuma área comum cadastrada ainda.
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">Minhas reservas</h2>
                <div className="space-y-3">
                    {initialReservations.map((r) => (
                        <Card key={r.id} className="p-5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                    <CalendarDays className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">{r.amenity.name}</h3>
                                    <p className="text-sm text-slate-500">
                                        {new Date(r.date).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge variant={STATUS_VARIANT[r.status]}>{STATUS_LABEL[r.status]}</Badge>
                                {r.status !== 'CANCELLED' && (
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isLoading} onClick={() => handleCancel(r.id)}>
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </Card>
                    ))}
                    {initialReservations.length === 0 && (
                        <div className="text-center py-8 text-slate-400">Você ainda não fez nenhuma reserva.</div>
                    )}
                </div>
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Nova Reserva</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Área comum</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.amenityId}
                                onChange={(e) => setFormData({ ...formData, amenityId: e.target.value })}
                                required
                                disabled={isLoading}
                            >
                                {amenities.map((a) => (
                                    <option key={a.id} value={a.id}>{a.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Data e horário</Label>
                            <Input
                                type="datetime-local"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                disabled={isLoading}
                            />
                        </div>
                        <SheetFooter className="gap-2 sm:gap-0">
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                {isLoading ? 'Enviando...' : 'Solicitar Reserva'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
