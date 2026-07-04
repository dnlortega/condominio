'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, FileText, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { createDocument, updateDocument, deleteDocument } from '@/app/actions/documents'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Document = {
    id: string
    title: string
    description: string | null
    category: string | null
    url: string
}

export function DocumentoView({ initialDocuments }: { initialDocuments: Document[] }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [current, setCurrent] = useState<Document | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const [formData, setFormData] = useState({ title: '', description: '', category: '', url: '' })

    const filtered = initialDocuments.filter(
        (d) =>
            d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleOpenCreate = () => {
        setCurrent(null)
        setFormData({ title: '', description: '', category: '', url: '' })
        setIsSheetOpen(true)
    }

    const handleOpenEdit = (document: Document) => {
        setCurrent(document)
        setFormData({
            title: document.title,
            description: document.description || '',
            category: document.category || '',
            url: document.url,
        })
        setIsSheetOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            if (current) {
                await updateDocument(current.id, formData)
                toast.success('Documento atualizado com sucesso!')
            } else {
                await createDocument(formData)
                toast.success('Documento publicado com sucesso!')
            }
            setIsSheetOpen(false)
            router.refresh()
        } catch (error) {
            console.error('Failed to save', error)
            toast.error('Erro ao salvar documento.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este documento?')) return
        setIsLoading(true)
        try {
            await deleteDocument(id)
            toast.success('Documento excluído com sucesso!')
            router.refresh()
        } catch (error) {
            console.error('Failed to delete', error)
            toast.error('Erro ao excluir documento.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar documentos..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={handleOpenCreate} className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" /> Novo Documento
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((document) => (
                    <Card key={document.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            {document.category ? <Badge variant="secondary">{document.category}</Badge> : <span />}
                            <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEdit(document)} disabled={isLoading}>
                                    <Pencil className="w-3 h-3" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(document.id)} disabled={isLoading}>
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <h3 className="font-semibold">{document.title}</h3>
                        </div>
                        {document.description && <p className="text-sm text-muted-foreground mb-2">{document.description}</p>}
                        <a href={document.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                            Abrir link <ExternalLink className="w-3 h-3" />
                        </a>
                    </Card>
                ))}
                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">Nenhum documento publicado.</div>
                )}
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>{current ? 'Editar Documento' : 'Novo Documento'}</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Título</Label>
                            <Input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ex: Regimento Interno"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Categoria</Label>
                            <Input
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="Ex: Jurídico, Financeiro, Atas"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Descrição</Label>
                            <Textarea
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Breve descrição do conteúdo"
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Link do documento</Label>
                            <Input
                                required
                                type="url"
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                placeholder="https://drive.google.com/..."
                                disabled={isLoading}
                            />
                        </div>
                        <SheetFooter className="gap-2 sm:gap-0">
                            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                {isLoading ? 'Salvando...' : 'Salvar'}
                            </Button>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        </div>
    )
}
