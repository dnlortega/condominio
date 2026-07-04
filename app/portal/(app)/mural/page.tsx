import { getActivePosts } from "@/app/actions/posts";
import { getResidentSession } from "@/lib/auth";
import { MuralPortalView } from "@/components/portal/mural-portal-view";

export const dynamic = "force-dynamic";

export default async function PortalMuralPage() {
    const user = await getResidentSession();
    const posts = await getActivePosts();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-slate-900">Mural Social</h1>
                <p className="text-slate-500">Vendas, doações, perdi e achei e serviços entre vizinhos.</p>
            </div>

            <MuralPortalView initialPosts={posts} userId={user!.id} />
        </div>
    );
}
