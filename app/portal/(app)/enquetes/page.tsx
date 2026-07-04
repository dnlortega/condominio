import { getPollsForResident } from "@/app/actions/polls";
import { getResidentSession } from "@/lib/auth";
import { EnquetePortalView } from "@/components/portal/enquete-portal-view";

export const dynamic = "force-dynamic";

export default async function PortalEnquetesPage() {
    const user = await getResidentSession();
    const polls = await getPollsForResident(user!.id);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Enquetes</h1>
                <p className="text-slate-500">Participe das decisões do condomínio.</p>
            </div>

            <EnquetePortalView initialPolls={polls} userId={user!.id} />
        </div>
    );
}
