'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { TicketStatus } from '@prisma/client'

export async function getTickets() {
    return await prisma.ticket.findMany({
        include: { user: { select: { name: true, apartment: true } } },
        orderBy: { createdAt: 'desc' },
    })
}

export async function getMyTickets(userId: string) {
    return await prisma.ticket.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    })
}

export async function createTicket(userId: string, title: string, description: string) {
    const ticket = await prisma.ticket.create({
        data: { userId, title, description, status: TicketStatus.OPEN },
    })
    revalidatePath('/admin/chamados')
    revalidatePath('/portal/chamados')
    return ticket
}

export async function updateTicketStatus(id: string, status: TicketStatus) {
    const ticket = await prisma.ticket.update({ where: { id }, data: { status } })
    revalidatePath('/admin/chamados')
    revalidatePath('/portal/chamados')
    return ticket
}

export async function deleteTicket(id: string) {
    await prisma.ticket.delete({ where: { id } })
    revalidatePath('/admin/chamados')
    revalidatePath('/portal/chamados')
}
