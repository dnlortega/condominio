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
    return category
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
    categoryId: string
}) {
    const provider = await prisma.serviceProvider.create({
        data,
    })
    revalidatePath('/concessionarias')
    return provider
}

export async function updateConcessionaria(
    id: string,
    data: {
        name?: string
        contact?: string
        categoryId?: string
    }
) {
    const provider = await prisma.serviceProvider.update({
        where: { id },
        data,
    })
    revalidatePath('/concessionarias')
    return provider
}

export async function deleteConcessionaria(id: string) {
    await prisma.serviceProvider.delete({
        where: { id },
    })
    revalidatePath('/concessionarias')
}
