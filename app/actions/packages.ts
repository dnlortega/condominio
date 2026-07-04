'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getPackages() {
    return await prisma.package.findMany({
        include: { user: { select: { name: true, apartment: true } } },
        orderBy: { receivedAt: 'desc' },
    })
}

export async function getMyPackages(userId: string) {
    return await prisma.package.findMany({
        where: { userId },
        orderBy: { receivedAt: 'desc' },
    })
}

export async function createPackage(userId: string, description: string) {
    const pkg = await prisma.package.create({
        data: { userId, description },
    })
    revalidatePath('/admin/encomendas')
    revalidatePath('/portal/encomendas')
    return pkg
}

export async function markPackagePickedUp(id: string) {
    const pkg = await prisma.package.update({
        where: { id },
        data: { pickedUpAt: new Date() },
    })
    revalidatePath('/admin/encomendas')
    revalidatePath('/portal/encomendas')
    return pkg
}

export async function deletePackage(id: string) {
    await prisma.package.delete({ where: { id } })
    revalidatePath('/admin/encomendas')
    revalidatePath('/portal/encomendas')
}
