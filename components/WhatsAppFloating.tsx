"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloating = () => {
    const whatsappUrl = "https://api.whatsapp.com/send?phone=5514997696946&text=Olá,%20gostaria%20de%20falar%20com%20a%20síndica%20do%20Recanto%20dos%20Pássaros.";

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba5a] transition-colors group"
            aria-label="Falar no WhatsApp"
        >
            <MessageCircle className="w-8 h-8 fill-current" />
            <span className="absolute right-full mr-4 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-zinc-100 dark:border-zinc-700">
                Falar com a Síndica
            </span>
            <span className="absolute flex h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
            </span>
        </motion.a>
    );
};

export default WhatsAppFloating;
