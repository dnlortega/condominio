'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { VehicleType } from '@prisma/client'

export async function getVehicles() {
    return await prisma.vehicle.findMany({
        include: { user: { select: { name: true, apartment: true } } },
        orderBy: { createdAt: 'desc' },
    })
}

export async function getMyVehicles(userId: string) {
    return await prisma.vehicle.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    })
}

export async function createVehicle(userId: string, data: { plate: string; model: string; color?: string; type?: VehicleType }) {
    const vehicle = await prisma.vehicle.create({
        data: { userId, plate: data.plate.toUpperCase(), model: data.model, color: data.color || undefined, type: data.type || VehicleType.CAR },
    })
    revalidatePath('/admin/veiculos')
    revalidatePath('/portal/veiculos')
    return vehicle
}

export async function updateVehicle(id: string, userId: string, data: { plate?: string; model?: string; color?: string; type?: VehicleType }) {
    const vehicle = await prisma.vehicle.findUnique({ where: { id } })
    if (!vehicle || vehicle.userId !== userId) {
        throw new Error('Veículo não encontrado.')
    }
    const updated = await prisma.vehicle.update({
        where: { id },
        data: { ...data, plate: data.plate ? data.plate.toUpperCase() : undefined },
    })
    revalidatePath('/admin/veiculos')
    revalidatePath('/portal/veiculos')
    return updated
}

export async function deleteVehicle(id: string, userId?: string) {
    if (userId) {
        const vehicle = await prisma.vehicle.findUnique({ where: { id } })
        if (!vehicle || vehicle.userId !== userId) {
            throw new Error('Veículo não encontrado.')
        }
    }
    await prisma.vehicle.delete({ where: { id } })
    revalidatePath('/admin/veiculos')
    revalidatePath('/portal/veiculos')
}
