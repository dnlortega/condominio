'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getDocuments() {
    return await prisma.document.findMany({
        orderBy: { createdAt: 'desc' },
    })
}

export async function createDocument(data: { title: string; description?: string; category?: string; url: string }) {
    const document = await prisma.document.create({ data })
    revalidatePath('/admin/documentos')
    revalidatePath('/portal/documentos')
    return document
}

export async function updateDocument(id: string, data: { title?: string; description?: string; category?: string; url?: string }) {
    const document = await prisma.document.update({ where: { id }, data })
    revalidatePath('/admin/documentos')
    revalidatePath('/portal/documentos')
    return document
}

export async function deleteDocument(id: string) {
    await prisma.document.delete({ where: { id } })
    revalidatePath('/admin/documentos')
    revalidatePath('/portal/documentos')
}
