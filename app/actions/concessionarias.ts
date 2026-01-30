'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Categories
export async function getCategories() {
    return await prisma.category.findMany({
        orderBy: { name: 'asc' },
    })
}

export async function createCategory(name: string, icon?: string) {
    const category = await prisma.category.create({
        data: { name, icon },
    })
    revalidatePath('/concessionarias')
    revalidatePath('/')
    return category
}

export async function updateCategory(id: string, name: string, icon?: string) {
    const category = await prisma.category.update({
        where: { id },
        data: { name, icon },
    })
    revalidatePath('/concessionarias')
    revalidatePath('/')
    return category
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({
            where: { id },
        })
        revalidatePath('/concessionarias')
        revalidatePath('/')
    } catch (e) {
        throw new Error('Não é possível excluir categoria em uso.')
    }
}

// Concessionarias (Service Providers)
export async function getConcessionarias() {
    return await prisma.serviceProvider.findMany({
        include: { category: true },
        orderBy: { name: 'asc' },
    })
}

export async function createConcessionaria(data: {
    name: string
    contact: string
    hasWhatsApp?: boolean
    categoryId: string
}) {
    const provider = await prisma.serviceProvider.create({
        data,
    })
    revalidatePath('/concessionarias')
    revalidatePath('/')
    return provider
}

export async function updateConcessionaria(
    id: string,
    data: {
        name?: string
        contact?: string
        hasWhatsApp?: boolean
        categoryId?: string
    }
) {
    const provider = await prisma.serviceProvider.update({
        where: { id },
        data,
    })
    revalidatePath('/concessionarias')
    revalidatePath('/')
    return provider
}

export async function deleteConcessionaria(id: string) {
    await prisma.serviceProvider.delete({
        where: { id },
    })
    revalidatePath('/concessionarias')
    revalidatePath('/')
}
