"use client";

import React, { useTransition, useState } from "react";
import { markAsRead, deleteMessage } from "@/app/actions/messages";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Trash2, 
  CheckCircle, 
  Clock, 
  User, 
  Inbox,
  Search,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  name: string;
  email: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
};

export default function MessagesClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarkAsRead = (id: string) => {
    startTransition(async () => {
      try {
        await markAsRead(id);
        setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
        toast.success("Mensagem marcada como lida.");
      } catch (error) {
        toast.error("Erro ao atualizar status.");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta mensagem?")) return;
    
    startTransition(async () => {
      try {
        await deleteMessage(id);
        setMessages(prev => prev.filter(m => m.id !== id));
        toast.success("Mensagem excluída.");
      } catch (error) {
        toast.error("Erro ao excluir mensagem.");
      }
    });
  };

  return (
    <div className="space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Mensagens dos Moradores</h1>
            <p className="text-muted-foreground mt-1 text-sm">Gerencie os contatos recebidos através do formulário do site.</p>
          </div>
        </div>

        <div className="relative group max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Pesquisar mensagens..."
            className="w-full h-12 pl-12 pr-6 bg-white/50 backdrop-blur-xl border border-border/60 rounded-2xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  "group bg-white border rounded-3xl p-6 transition-all hover:shadow-xl hover:shadow-black/[0.02]",
                  msg.isRead ? "border-border/40 opacity-80" : "border-primary/20 bg-white shadow-lg shadow-primary/[0.02]"
                )}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* User Info Column */}
                  <div className="lg:w-64 shrink-0 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-bold uppercase">
                        {msg.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{msg.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{msg.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-zinc-50 p-2 rounded-xl">
                      <Clock className="w-3 h-3" />
                      {new Date(msg.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>

                    {!msg.isRead && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Nova
                      </div>
                    )}
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 space-y-4">
                    <div className="bg-zinc-50/50 rounded-2xl p-5 border border-zinc-100 min-h-[100px] relative transition-colors group-hover:bg-zinc-50">
                      <MessageSquare className="absolute top-4 right-4 w-4 h-4 text-zinc-200" />
                      <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                        {msg.content}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                      {!msg.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(msg.id)}
                          className="text-xs bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-xl h-10 px-4"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Marcar como lida
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(msg.id)}
                        className="text-xs bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl h-10 px-4"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 flex flex-col items-center justify-center text-center space-y-4 bg-zinc-50 rounded-[3rem] border border-dashed border-zinc-200"
            >
              <div className="w-16 h-16 rounded-3xl bg-white border border-border flex items-center justify-center text-zinc-300 shadow-sm mb-2">
                <Mail className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-zinc-900">Nenhuma mensagem encontrada</h3>
                <p className="text-sm text-muted-foreground">Tudo limpo por aqui! Ninguém enviou mensagens recentemente.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
