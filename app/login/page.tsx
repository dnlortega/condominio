'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, ArrowRight } from 'lucide-react';
import { handleLogin } from '@/app/actions/auth';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(event.currentTarget);
        const success = await handleLogin(formData);

        if (success) {
            router.push('/admin');
        } else {
            setError('Senha incorreta');
            setLoading(false);
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden selection:bg-primary/30">
            {/* Animated Ambient Background */}
            <div className="absolute inset-0 z-0">
                <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-primary/20 rounded-full blur-[120px]" 
                />
                <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-accent/20 rounded-full blur-[150px]" 
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[50px] z-10" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 w-full max-w-[420px] px-6"
            >
                <div className="bg-zinc-900/50 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-black/50 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col items-center justify-center pt-4 pb-8">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                            className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner"
                        >
                            <Lock className="w-6 h-6 text-white/80" />
                        </motion.div>
                        
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 text-center">
                            Área Administrativa
                        </h1>
                        <p className="text-sm text-zinc-400 text-center uppercase tracking-[0.2em] font-medium">
                            Acesso Restrito
                        </p>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-6 relative z-10 pb-4">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs uppercase tracking-widest text-zinc-500 font-bold ml-1">Senha de Acesso</Label>
                            <div className="relative group/input">
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="h-14 bg-black/40 border-white/10 text-white placeholder:text-white/20 rounded-2xl px-5 focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/30 transition-all font-mono tracking-widest w-full"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-focus-within/input:scale-x-100 transition-transform duration-500" />
                            </div>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="text-xs text-red-400 text-center font-medium bg-red-500/10 py-3 rounded-xl border border-red-500/20"
                            >
                                {error}
                            </motion.div>
                        )}

                        <Button 
                            className="w-full h-14 bg-white text-black hover:bg-zinc-200 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] transition-all group overflow-hidden relative" 
                            type="submit" 
                            disabled={loading}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {loading ? 'Autenticando...' : 'Entrar no Sistema'}
                                {!loading && <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />}
                            </span>
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
