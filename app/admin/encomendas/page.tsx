import { getPackages } from '@/app/actions/packages'
import { getUsers } from '@/app/actions/users'
import { EncomendaView } from '@/components/encomendas/encomenda-view'

export const dynamic = 'force-dynamic'

export default async function EncomendasPage() {
    const [packages, users] = await Promise.all([getPackages(), getUsers()])

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Encomendas</h1>
                <p className="text-muted-foreground">
                    Registre encomendas recebidas na portaria e acompanhe a retirada.
                </p>
            </div>

            <EncomendaView initialPackages={packages} residents={users.filter((u) => u.role === 'RESIDENT')} />
        </div>
    )
}
