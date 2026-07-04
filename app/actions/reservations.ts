'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { ReservationStatus } from '@prisma/client'

export async function getReservations() {
    return await prisma.reservation.findMany({
        include: { user: true, amenity: true },
        orderBy: { date: 'desc' },
    })
}

export async function getMyReservations(userId: string) {
    return await prisma.reservation.findMany({
        where: { userId },
        include: { amenity: true },
        orderBy: { date: 'desc' },
    })
}

export async function createReservation(userId: string, amenityId: string, date: string) {
    const reservation = await prisma.reservation.create({
        data: {
            userId,
            amenityId,
            date: new Date(date),
            status: ReservationStatus.PENDING,
        },
    })
    revalidatePath('/admin/reservas')
    revalidatePath('/portal/reservas')
    return reservation
}

export async function updateReservationStatus(id: string, status: ReservationStatus) {
    const reservation = await prisma.reservation.update({
        where: { id },
        data: { status },
    })
    revalidatePath('/admin/reservas')
    revalidatePath('/portal/reservas')
    return reservation
}

export async function cancelMyReservation(id: string, userId: string) {
    const reservation = await prisma.reservation.findUnique({ where: { id } })
    if (!reservation || reservation.userId !== userId) {
        throw new Error('Reserva não encontrada.')
    }
    await prisma.reservation.update({
        where: { id },
        data: { status: ReservationStatus.CANCELLED },
    })
    revalidatePath('/admin/reservas')
    revalidatePath('/portal/reservas')
}

export async function deleteReservation(id: string) {
    await prisma.reservation.delete({ where: { id } })
    revalidatePath('/admin/reservas')
    revalidatePath('/portal/reservas')
}
