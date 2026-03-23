"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
        <div className="space-y-4 py-8 flex flex-col h-full bg-white text-slate-600 border-r border-slate-100 relative overflow-hidden transition-all duration-500">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

            <div className="px-8 py-2 flex-1 relative z-10">
                <Link href="/admin" className="flex items-center group mb-12">
                    <div className="relative w-11 h-11 mr-4 transition-transform duration-500 group-hover:scale-110">
                        <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-md group-hover:bg-primary/20 transition-colors" />
                        <div className="relative bg-white border border-primary/20 rounded-2xl w-full h-full flex items-center justify-center text-primary font-bold text-xl shadow-sm">R</div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold leading-none text-slate-900 tracking-tight">
                            Recanto
                        </h1>
                        <span className="text-[9px] uppercase tracking-[0.4em] text-primary/70 mt-1.5 font-bold">Workspace</span>
                    </div>
                </Link>

                <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mb-6 px-4">Menu de Gestão</p>
                    {routes.map((route) => {
                        const isActive = pathname === route.href;
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm group flex p-4 w-full justify-start font-semibold cursor-pointer rounded-2xl transition-all duration-300 relative overflow-hidden mb-1",
                                    isActive 
                                        ? "text-primary bg-primary/5 shadow-[0_4px_12px_rgba(var(--primary-rgb),0.1)]" 
                                        : "text-slate-500 hover:text-primary hover:bg-slate-50"
                                )}
                            >
                                <div className="flex items-center flex-1 z-10">
                                    <route.icon className={cn("h-4.5 w-4.5 mr-4 transition-colors", isActive ? "text-primary stroke-[2.5px]" : "text-slate-400 group-hover:text-primary")} />
                                    <span className="tracking-wide text-sm">{route.label}</span>
                                </div>
                                {isActive && (
                                    <motion.div 
                                        layoutId="sidebar-active"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-1 bg-primary rounded-full"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className="px-8 py-8 border-t border-slate-50 relative z-10 space-y-3">
                <Link href="/" className="flex items-center p-4 w-full justify-start rounded-2xl text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                    <Home className="h-4 w-4 mr-4 text-slate-400" />
                    Visualizar Site
                </Link>
                <form action={handleLogout}>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl h-auto p-4 font-semibold transition-all group border border-transparent hover:border-red-100"
                        type="submit"
                    >
                        <LogOut className="h-4 w-4 mr-4 text-red-400/80 group-hover:text-red-500 transition-colors" />
                        Encerrar Sessão
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
