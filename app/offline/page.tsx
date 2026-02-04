export default function OfflinePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Você está offline</h1>
            <p className="text-muted-foreground mb-8">Esta página foi carregada do cache. Algumas funcionalidades podem estar limitadas.</p>
            <a href="/" className="px-6 py-3 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-xs">
                Tentar Recarregar
            </a>
        </div>
    );
}
