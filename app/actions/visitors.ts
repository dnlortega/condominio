'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getVisitors() {
    return await prisma.visitor.findMany({
        include: { user: { select: { name: true, apartment: true } } },
        orderBy: { visitDate: 'desc' },
    })
}

export async function getMyVisitors(userId: string) {
    return await prisma.visitor.findMany({
        where: { userId },
        orderBy: { visitDate: 'desc' },
    })
}

export async function createVisitor(userId: string, data: { name: string; rg?: string; visitDate: string }) {
    const visitor = await prisma.visitor.create({
        data: {
            userId,
            name: data.name,
            rg: data.rg || undefined,
            visitDate: new Date(data.visitDate),
        },
    })
    revalidatePath('/admin/visitantes')
    revalidatePath('/portal/visitantes')
    return visitor
}

export async function markVisitorUsed(id: string) {
    const visitor = await prisma.visitor.update({ where: { id }, data: { isUsed: true } })
    revalidatePath('/admin/visitantes')
    revalidatePath('/portal/visitantes')
    return visitor
}

export async function deleteVisitor(id: string, userId?: string) {
    if (userId) {
        const visitor = await prisma.visitor.findUnique({ where: { id } })
        if (!visitor || visitor.userId !== userId) {
            throw new Error('Convite não encontrado.')
        }
    }
    await prisma.visitor.delete({ where: { id } })
    revalidatePath('/admin/visitantes')
    revalidatePath('/portal/visitantes')
}
