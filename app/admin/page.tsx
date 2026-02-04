
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, List } from "lucide-react";
import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
    const [providerCount, categoryCount] = await Promise.all([
        prisma.serviceProvider.count(),
        prisma.category.count(),
    ]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Bem-vindo ao painel administrativo.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/admin/concessionarias">
                    <Card className="hover:bg-accent/50 transition cursor-pointer h-full border-primary/10 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Concessionárias
                            </CardTitle>
                            <Zap className="h-4 w-4 text-violet-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{providerCount}</div>
                            <p className="text-xs text-muted-foreground">
                                Prestadores de serviço cadastrados
                            </p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/categorias">
                    <Card className="hover:bg-accent/50 transition cursor-pointer h-full border-primary/10 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Categorias
                            </CardTitle>
                            <List className="h-4 w-4 text-sky-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{categoryCount}</div>
                            <p className="text-xs text-muted-foreground">
                                Categorias organizadas
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
