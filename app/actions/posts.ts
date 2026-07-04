'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { PostCategory } from '@prisma/client'

export async function getPosts() {
    return await prisma.post.findMany({
        include: { user: { select: { name: true, apartment: true } } },
        orderBy: { createdAt: 'desc' },
    })
}

export async function getActivePosts() {
    return await prisma.post.findMany({
        where: { isActive: true },
        include: { user: { select: { name: true, apartment: true } } },
        orderBy: { createdAt: 'desc' },
    })
}

export async function createPost(userId: string, data: { title: string; description: string; price?: string; category: PostCategory }) {
    const post = await prisma.post.create({
        data: { userId, title: data.title, description: data.description, price: data.price || undefined, category: data.category },
    })
    revalidatePath('/admin/mural')
    revalidatePath('/portal/mural')
    return post
}

export async function togglePostActive(id: string, isActive: boolean) {
    const post = await prisma.post.update({ where: { id }, data: { isActive } })
    revalidatePath('/admin/mural')
    revalidatePath('/portal/mural')
    return post
}

export async function deletePost(id: string, userId?: string) {
    if (userId) {
        const post = await prisma.post.findUnique({ where: { id } })
        if (!post || post.userId !== userId) {
            throw new Error('Anúncio não encontrado.')
        }
    }
    await prisma.post.delete({ where: { id } })
    revalidatePath('/admin/mural')
    revalidatePath('/portal/mural')
}
