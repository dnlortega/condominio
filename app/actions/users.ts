'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { hashPassword } from '@/lib/auth'
import { Role } from '@prisma/client'

export async function getUsers() {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            apartment: true,
            phone: true,
            createdAt: true,
        },
        orderBy: { name: 'asc' },
    })
}

export async function createUser(data: {
    name: string
    email: string
    password: string
    apartment?: string
    phone?: string
    role?: Role
}) {
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email.trim().toLowerCase(),
            password: await hashPassword(data.password),
            apartment: data.apartment || undefined,
            phone: data.phone || undefined,
            role: data.role || Role.RESIDENT,
        },
    })
    revalidatePath('/admin/moradores')
    return user
}

export async function updateUser(
    id: string,
    data: { name?: string; email?: string; apartment?: string; phone?: string; role?: Role; password?: string }
) {
    const updateData: Record<string, unknown> = {
        name: data.name,
        email: data.email ? data.email.trim().toLowerCase() : undefined,
        apartment: data.apartment,
        phone: data.phone,
        role: data.role,
    }
    if (data.password) {
        updateData.password = await hashPassword(data.password)
    }
    const user = await prisma.user.update({ where: { id }, data: updateData })
    revalidatePath('/admin/moradores')
    return user
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({ where: { id } })
        revalidatePath('/admin/moradores')
    } catch (e) {
        throw new Error('Não é possível excluir um morador com reservas, chamados ou visitantes vinculados.')
    }
}
