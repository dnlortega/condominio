"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Zap,
    LogOut,
    Settings,
    Menu,
    ChevronRight,
    Home,
    Wand2,
    Phone,
    Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { handleLogout } from "@/app/actions/auth";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin",
        color: "text-zinc-100",
    },
    {
        label: "Mensagens",
        icon: Mail,
        href: "/admin/mensagens",
        color: "text-zinc-100",
    },
    {
        label: "Concessionárias",
        icon: Zap,
        href: "/admin/concessionarias",
        color: "text-zinc-100",
    },
    {
        label: "Categorias",
        icon: Settings,
        href: "/admin/categorias",
        color: "text-zinc-100",
    },
    {
        label: "Animações",
        icon: Wand2,
        href: "/admin/animacoes",
        color: "text-zinc-100",
    },
    {
        label: "Contato",
        icon: Phone,
        href: "/admin/contato",
        color: "text-zinc-100",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-8 flex flex-col h-full bg-[#0a0a0a] text-zinc-300 selection:bg-primary/20 border-r border-white/5 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

            <div className="px-6 py-2 flex-1 relative z-10">
                <Link href="/admin" className="flex items-center group mb-12">
                    <div className="relative w-10 h-10 mr-4 transition-transform duration-500 group-hover:scale-110">
                        <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:bg-primary/40 transition-colors" />
                        <div className="relative bg-[#1c1c1c] border border-white/10 rounded-xl w-full h-full flex items-center justify-center text-white font-bold text-xl shadow-lg">R</div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold leading-none text-white tracking-tight">
                            Recanto
                        </h1>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-primary mt-1 font-semibold">Workspace</span>
                    </div>
                </Link>

                <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-zinc-600 mb-4 px-3">Menu Principal</p>
                    {routes.map((route) => {
                        const isActive = pathname === route.href;
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-xl transition-all duration-300 relative overflow-hidden",
                                    isActive ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                                )}
                                <div className="flex items-center flex-1 z-10">
                                    <route.icon className={cn("h-4 w-4 mr-3 transition-colors", isActive ? "text-primary" : "text-zinc-500 group-hover:text-zinc-300")} />
                                    <span className="tracking-wide text-sm">{route.label}</span>
                                </div>
                                {isActive && (
                                    <ChevronRight className="w-4 h-4 text-white/50" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="px-6 py-6 pb-4 border-t border-white/5 relative z-10 space-y-2">
                <Link href="/" className="flex items-center p-3 w-full justify-start rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                    <Home className="h-4 w-4 mr-3 text-zinc-500" />
                    Voltar ao Site
                </Link>
                <form action={handleLogout}>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-zinc-400 hover:text-white hover:bg-red-500/10 rounded-xl h-auto p-3 font-medium transition-all group"
                        type="submit"
                    >
                        <LogOut className="h-4 w-4 mr-3 text-red-500/70 group-hover:text-red-400 transition-colors" />
                        Desconectar
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
                <Button variant="ghost" size="icon" className="md:hidden text-zinc-400 hover:text-zinc-200">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-[#0a0a0a] border-r-white/10 w-80">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}
