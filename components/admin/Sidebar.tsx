
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Zap,
    LogOut,
    Settings,
    Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { handleLogout } from "@/app/actions/auth";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin",
        color: "text-sky-500",
    },
    {
        label: "Concessionárias",
        icon: Zap,
        href: "/admin/concessionarias",
        color: "text-violet-500",
    },
    {
        label: "Categorias",
        icon: Settings,
        href: "/admin/categorias",
        color: "text-sky-500",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-6 flex flex-col h-full bg-slate-900 text-white selection:bg-primary/20">
            <div className="px-4 py-2 flex-1">
                <Link href="/admin" className="flex items-center pl-2 mb-10 group">
                    <div className="relative w-10 h-10 mr-3 transition-transform group-hover:scale-110">
                        <div className="bg-primary rounded-xl w-full h-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">R</div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold leading-none">
                            Recanto
                        </h1>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">Admin Panel</span>
                    </div>
                </Link>
                <div className="space-y-2">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-4 w-full justify-start font-semibold cursor-pointer hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-300",
                                pathname === route.href ? "text-white bg-white/10 shadow-sm" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-4 transition-colors", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2">
                <form action={handleLogout}>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10"
                        type="submit"
                    >
                        <LogOut className="h-5 w-5 mr-3 text-red-500" />
                        Sair
                    </Button>
                </form>
            </div>
        </div>
    );
}

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-slate-900 border-r-slate-800 text-white w-72">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
