import { MobileSidebar, Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative bg-[#F8FAFC] text-slate-900 overflow-hidden selection:bg-primary/10">
            {/* Soft Ambient Glow for Light Mode */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none opacity-50" />

            <div className="hidden h-full md:flex md:w- gap-0 md:flex-col md:fixed md:inset-y-0 z-[80] border-r border-slate-200">
                <Sidebar />
            </div>

            <main className="md:pl-80 h-full relative z-10 flex flex-col font-sans">
                <div className="flex items-center p-6 md:hidden border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm mb-4">
                    <MobileSidebar />
                    <span className="ml-4 font-bold text-lg tracking-tight text-slate-800">Administração</span>
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
