'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getAnnouncements() {
    return await prisma.announcement.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

export async function createAnnouncement(data: {
    title: string
    content: string
    isUrgent?: boolean
}) {
    const announcement = await prisma.announcement.create({ data })
    revalidatePath('/admin/avisos')
    revalidatePath('/portal/avisos')
    revalidatePath('/portal')
    return announcement
}

export async function updateAnnouncement(
    id: string,
    data: { title?: string; content?: string; isUrgent?: boolean }
) {
    const announcement = await prisma.announcement.update({ where: { id }, data })
    revalidatePath('/admin/avisos')
    revalidatePath('/portal/avisos')
    revalidatePath('/portal')
    return announcement
}

export async function deleteAnnouncement(id: string) {
    await prisma.announcement.delete({ where: { id } })
    revalidatePath('/admin/avisos')
    revalidatePath('/portal/avisos')
    revalidatePath('/portal')
}
