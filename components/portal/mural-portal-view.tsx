'use client'

import { useState } from 'react'
import { Plus, Tag, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet'
import { createPost, deletePost } from '@/app/actions/posts'
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
    userId: string
    user: { name: string; apartment: string | null }
}

export function MuralPortalView({ initialPosts, userId }: { initialPosts: Post[]; userId: string }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({ title: '', description: '', price: '', category: 'VENDA' as PostCategory })
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await createPost(userId, formData)
            toast.success('Anúncio publicado com sucesso!')
            setFormData({ title: '', description: '', price: '', category: 'VENDA' })
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to create post', error)
            toast.error('Erro ao publicar anúncio.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este anúncio?')) return
        setIsLoading(true)
        try {
            await deletePost(id, userId)
            toast.success('Anúncio excluído.')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete post', error)
            toast.error('Erro ao excluir anúncio.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button onClick={() => setIsSheetOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Novo Anúncio
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {initialPosts.map((post) => (
                    <Card key={post.id} className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="secondary" className="gap-1"><Tag className="w-3 h-3" /> {CATEGORY_LABEL[post.category]}</Badge>
                            {post.userId === userId && (
                                <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" disabled={isLoading} onClick={() => handleDelete(post.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                        <h3 className="font-semibold text-slate-900">{post.title}</h3>
                        {post.price && <p className="text-sm font-medium text-primary">{post.price}</p>}
                        <p className="text-sm text-slate-500 mt-1">{post.description}</p>
                        <p className="text-xs text-slate-400 mt-3">
                            {post.user.name} {post.user.apartment ? `· Apto ${post.user.apartment}` : ''}
                        </p>
                    </Card>
                ))}
                {initialPosts.length === 0 && (
                    <div className="col-span-full text-center py-8 text-slate-400">Nenhum anúncio publicado ainda.</div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Novo Anúncio</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Categoria</Label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as PostCategory })}
                                disabled={isLoading}
                            >
                                <option value="VENDA">Venda</option>
                                <option value="DOACAO">Doação</option>
                                <option value="PERDIDO_ACHADO">Perdi e Achei</option>
                                <option value="SERVICO">Serviço</option>
                                <option value="OUTRO">Outro</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Título</Label>
                            <Input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ex: Bicicleta infantil"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Preço (opcional)</Label>
                            <Input
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                placeholder="Ex: R$ 150 ou Grátis"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Descrição</Label>
                            <Textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Detalhes do anúncio..."
                                disabled={isLoading}
                            />
                        </div>
                        <SheetFooter className="gap-2 sm:gap-0">
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                {isLoading ? 'Publicando...' : 'Publicar'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
