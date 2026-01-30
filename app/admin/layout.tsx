
import { MobileSidebar, Sidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative bg-gray-50/50 dark:bg-slate-950">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar />
            </div>
            <main className="md:pl-72 h-full">
                <div className="flex items-center p-4 md:hidden border-b bg-white dark:bg-slate-900 shadow-sm mb-4">
                    <MobileSidebar />
                    <span className="ml-4 font-bold text-lg">Menu</span>
                </div>
                <div className="p-4 md:p-8 h-full overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
