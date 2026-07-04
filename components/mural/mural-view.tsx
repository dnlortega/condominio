'use client'

import { useState } from 'react'
import { Search, Trash2, Tag, EyeOff, Eye } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { togglePostActive, deletePost } from '@/app/actions/posts'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { PostCategory } from '@prisma/client'

const CATEGORY_LABEL: Record<PostCategory, string> = {
    VENDA: 'Venda',
    DOACAO: 'Doação',
    PERDIDO_ACHADO: 'Perdi e Achei',
    SERVICO: 'Serviço',
    OUTRO: 'Outro',
}

type Post = {
    id: string
    title: string
    description: string
    price: string | null
    category: PostCategory
    isActive: boolean
    user: { name: string; apartment: string | null }
}

export function MuralView({ initialPosts }: { initialPosts: Post[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const filtered = initialPosts.filter(
        (p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleToggle = async (id: string, isActive: boolean) => {
        setIsLoading(true)
        try {
            await togglePostActive(id, !isActive)
            toast.success(!isActive ? 'Anúncio reativado.' : 'Anúncio ocultado.')
            router.refresh()
        } catch (error) {
            console.error('Failed to toggle', error)
            toast.error('Erro ao atualizar anúncio.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este anúncio?')) return
        setIsLoading(true)
        try {
            await deletePost(id)
            toast.success('Anúncio excluído.')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete', error)
            toast.error('Erro ao excluir anúncio.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar por título ou morador..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((post) => (
                    <Card key={post.id} className={`p-4 ${!post.isActive ? 'opacity-60' : ''}`}>
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="secondary" className="gap-1"><Tag className="w-3 h-3" /> {CATEGORY_LABEL[post.category]}</Badge>
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToggle(post.id, post.isActive)} disabled={isLoading}>
                                    {post.isActive ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(post.id)} disabled={isLoading}>
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                        {post.price && <p className="text-sm font-medium text-primary mb-1">{post.price}</p>}
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                            {post.user.name} {post.user.apartment ? `· Apto ${post.user.apartment}` : ''}
                        </p>
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">Nenhum anúncio publicado.</div>
                )}
            </div>
        </div>
    )
}
