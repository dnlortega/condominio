'use client'

import { useState } from 'react'
import { Search, Check, X, Trash2, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    updateReservationStatus,
    deleteReservation,
} from '@/app/actions/reservations'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ReservationStatus } from '@prisma/client'

type Reservation = {
    id: string
    date: Date
    status: ReservationStatus
    user: { name: string; apartment: string | null }
    amenity: { name: string }
}

const STATUS_LABEL: Record<ReservationStatus, string> = {
    PENDING: 'Pendente',
    CONFIRMED: 'Confirmada',
    CANCELLED: 'Cancelada',
}

const STATUS_VARIANT: Record<ReservationStatus, 'secondary' | 'default' | 'destructive'> = {
    PENDING: 'secondary',
    CONFIRMED: 'default',
    CANCELLED: 'destructive',
}

export function ReservaView({ initialReservations }: { initialReservations: Reservation[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const filtered = initialReservations.filter(
        (r) =>
            r.amenity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.user.apartment?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleStatus = async (id: string, status: ReservationStatus) => {
        setIsLoading(true)
        try {
            await updateReservationStatus(id, status)
            toast.success('Reserva atualizada com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to update', error)
            toast.error('Erro ao atualizar reserva.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta reserva?')) return
        setIsLoading(true)
        try {
            await deleteReservation(id)
            toast.success('Reserva excluída com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete', error)
            toast.error('Erro ao excluir reserva.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por área, morador ou apartamento..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-3">
                {filtered.map((reservation) => (
                    <Card key={reservation.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                                <CalendarDays className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">{reservation.amenity.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {reservation.user.name} {reservation.user.apartment ? `· Apto ${reservation.user.apartment}` : ''}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(reservation.date).toLocaleString('pt-BR', { dateStyle: 'long', timeStyle: 'short' })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant={STATUS_VARIANT[reservation.status]}>{STATUS_LABEL[reservation.status]}</Badge>
                            {reservation.status === 'PENDING' && (
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700" disabled={isLoading} onClick={() => handleStatus(reservation.id, 'CONFIRMED')}>
                                    <Check className="w-4 h-4" />
                                </Button>
                            )}
                            {reservation.status !== 'CANCELLED' && (
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-amber-600 hover:text-amber-700" disabled={isLoading} onClick={() => handleStatus(reservation.id, 'CANCELLED')}>
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isLoading} onClick={() => handleDelete(reservation.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        Nenhuma reserva encontrada.
                    </div>
                )}
            </div>
        </div>
    )
}
