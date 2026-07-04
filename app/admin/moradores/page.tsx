import { getUsers } from '@/app/actions/users'
import { MoradorView } from '@/components/moradores/morador-view'

export const dynamic = 'force-dynamic'

export default async function MoradoresPage() {
    const users = await getUsers()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Moradores</h1>
                <p className="text-muted-foreground">
                    Cadastre os moradores que terão acesso ao Portal do Morador.
                </p>
            </div>

            <MoradorView initialUsers={users} />
        </div>
    )
}
