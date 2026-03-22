import { MobileSidebar, Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative bg-[#050505] text-white overflow-hidden selection:bg-primary/30">
            {/* Global Ambient Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="hidden h-full md:flex md:w-80 md:flex-col md:fixed md:inset-y-0 z-[80]">
                <Sidebar />
            </div>

            <main className="md:pl-80 h-full relative z-10 flex flex-col font-sans">
                <div className="flex items-center p-4 md:hidden border-b border-white/5 bg-[#0a0a0a] shadow-sm mb-4">
                    <MobileSidebar />
                    <span className="ml-4 font-bold text-lg tracking-tight">Menu Administrativo</span>
                </div>

                <div className="flex-1 p-4 md:p-10 h-full overflow-y-auto overflow-x-hidden scrollbar-none custom-scrollbar pb-24">
                    <div className="max-w-6xl mx-auto w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
