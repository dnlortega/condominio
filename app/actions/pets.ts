'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getPets() {
    return await prisma.pet.findMany({
        include: { user: { select: { name: true, apartment: true } } },
        orderBy: { createdAt: 'desc' },
    })
}

export async function getMyPets(userId: string) {
    return await prisma.pet.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    })
}

export async function createPet(userId: string, data: { name: string; species: string; breed?: string; notes?: string }) {
    const pet = await prisma.pet.create({
        data: { userId, name: data.name, species: data.species, breed: data.breed || undefined, notes: data.notes || undefined },
    })
    revalidatePath('/admin/pets')
    revalidatePath('/portal/pets')
    return pet
}

export async function updatePet(id: string, userId: string, data: { name?: string; species?: string; breed?: string; notes?: string }) {
    const pet = await prisma.pet.findUnique({ where: { id } })
    if (!pet || pet.userId !== userId) {
        throw new Error('Pet não encontrado.')
    }
    const updated = await prisma.pet.update({ where: { id }, data })
    revalidatePath('/admin/pets')
    revalidatePath('/portal/pets')
    return updated
}

export async function deletePet(id: string, userId?: string) {
    if (userId) {
        const pet = await prisma.pet.findUnique({ where: { id } })
        if (!pet || pet.userId !== userId) {
            throw new Error('Pet não encontrado.')
        }
    }
    await prisma.pet.delete({ where: { id } })
    revalidatePath('/admin/pets')
    revalidatePath('/portal/pets')
}
