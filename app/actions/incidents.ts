'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { IncidentStatus } from '@prisma/client'

export async function getIncidents() {
    const incidents = await prisma.incident.findMany({
        include: { user: { select: { name: true, apartment: true } } },
        orderBy: { createdAt: 'desc' },
    })
    // Denúncias anônimas nunca devem expor a identidade do autor ao cliente,
    // nem mesmo dentro do payload serializado para hidratação do React.
    return incidents.map((incident) =>
        incident.isAnonymous
            ? { ...incident, user: { name: '', apartment: null } }
            : incident
    )
}

export async function getMyIncidents(userId: string) {
    return await prisma.incident.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    })
}

export async function createIncident(userId: string, data: { title: string; description: string; category: string; isAnonymous?: boolean }) {
    const incident = await prisma.incident.create({
        data: { userId, title: data.title, description: data.description, category: data.category, isAnonymous: data.isAnonymous || false },
    })
    revalidatePath('/admin/ocorrencias')
    revalidatePath('/portal/ocorrencias')
    return incident
}

export async function updateIncidentStatus(id: string, status: IncidentStatus) {
    const incident = await prisma.incident.update({ where: { id }, data: { status } })
    revalidatePath('/admin/ocorrencias')
    revalidatePath('/portal/ocorrencias')
    return incident
}

export async function deleteIncident(id: string) {
    await prisma.incident.delete({ where: { id } })
    revalidatePath('/admin/ocorrencias')
    revalidatePath('/portal/ocorrencias')
}
