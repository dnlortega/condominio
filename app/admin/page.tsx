
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap } from "lucide-react";

export default function AdminPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Bem-vindo ao painel administrativo.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link href="/admin/concessionarias">
                    <Card className="hover:bg-accent/50 transition cursor-pointer h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Concessionárias
                            </CardTitle>
                            <Zap className="h-4 w-4 text-violet-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Serviços</div>
                            <p className="text-xs text-muted-foreground">
                                X cadastrados
                            </p>
                        </CardContent>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
