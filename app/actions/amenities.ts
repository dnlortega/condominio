'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getAmenities() {
    return await prisma.amenity.findMany({
        orderBy: { name: 'asc' },
    })
}

export async function createAmenity(data: {
    name: string
    description?: string
    capacity?: number
}) {
    const amenity = await prisma.amenity.create({ data })
    revalidatePath('/admin/amenidades')
    revalidatePath('/portal/reservas')
    return amenity
}

export async function updateAmenity(
    id: string,
    data: { name?: string; description?: string; capacity?: number }
) {
    const amenity = await prisma.amenity.update({ where: { id }, data })
    revalidatePath('/admin/amenidades')
    revalidatePath('/portal/reservas')
    return amenity
}

export async function deleteAmenity(id: string) {
    try {
        await prisma.amenity.delete({ where: { id } })
        revalidatePath('/admin/amenidades')
        revalidatePath('/portal/reservas')
    } catch (e) {
        throw new Error('Não é possível excluir uma área com reservas vinculadas.')
    }
}
