import { getAnnouncements } from '@/app/actions/announcements'
import { AvisoView } from '@/components/avisos/aviso-view'

export const dynamic = 'force-dynamic'

export default async function AvisosPage() {
    const announcements = await getAnnouncements()

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Avisos e Comunicados</h1>
                <p className="text-muted-foreground">
                    Publique avisos que aparecem para todos os moradores no Portal do Morador.
                </p>
            </div>

            <AvisoView initialAnnouncements={announcements} />
        </div>
    )
}
