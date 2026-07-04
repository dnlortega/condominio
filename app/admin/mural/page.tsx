import { getPosts } from '@/app/actions/posts'
import { MuralView } from '@/components/mural/mural-view'

export const dynamic = 'force-dynamic'

export default async function MuralPage() {
    const posts = await getPosts()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Mural Social e Classificados</h1>
                <p className="text-muted-foreground">
                    Modere os anúncios publicados pelos moradores.
                </p>
            </div>

            <MuralView initialPosts={posts} />
        </div>
    )
}
