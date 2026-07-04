'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getPolls() {
    return await prisma.poll.findMany({
        include: { options: { include: { _count: { select: { votes: true } } } }, _count: { select: { votes: true } } },
        orderBy: { createdAt: 'desc' },
    })
}

export async function getPollsForResident(userId: string) {
    const polls = await prisma.poll.findMany({
        include: {
            options: { include: { _count: { select: { votes: true } } } },
            votes: { where: { userId } },
        },
        orderBy: { createdAt: 'desc' },
    })
    return polls.map((poll) => ({
        ...poll,
        myVoteOptionId: poll.votes[0]?.pollOptionId || null,
    }))
}

export async function createPoll(question: string, options: string[], closesAt?: string) {
    const poll = await prisma.poll.create({
        data: {
            question,
            closesAt: closesAt ? new Date(closesAt) : undefined,
            options: { create: options.filter((o) => o.trim()).map((text) => ({ text })) },
        },
    })
    revalidatePath('/admin/enquetes')
    revalidatePath('/portal/enquetes')
    return poll
}

export async function closePoll(id: string) {
    const poll = await prisma.poll.update({ where: { id }, data: { isOpen: false } })
    revalidatePath('/admin/enquetes')
    revalidatePath('/portal/enquetes')
    return poll
}

export async function deletePoll(id: string) {
    await prisma.poll.delete({ where: { id } })
    revalidatePath('/admin/enquetes')
    revalidatePath('/portal/enquetes')
}

export async function voteOnPoll(pollId: string, pollOptionId: string, userId: string) {
    const poll = await prisma.poll.findUnique({ where: { id: pollId } })
    if (!poll || !poll.isOpen) {
        throw new Error('Esta enquete não está mais aberta para votação.')
    }
    const existing = await prisma.pollVote.findUnique({ where: { pollId_userId: { pollId, userId } } })
    if (existing) {
        throw new Error('Você já votou nesta enquete.')
    }
    const vote = await prisma.pollVote.create({ data: { pollId, pollOptionId, userId } })
    revalidatePath('/admin/enquetes')
    revalidatePath('/portal/enquetes')
    return vote
}
