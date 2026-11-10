'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, ArrowUpRight, MessageCircle } from 'lucide-react';

const PANDUKA_WA_NUMBER = '94777321165';

const QUICK_TOPICS = [
  'Hi Panduka, I need a modern website / web system for my business.',
  'Hi Panduka, I would like to ask about your social media monthly packages.',
  'Hi Panduka, I need a custom quotation for an e-commerce / software project.',
];

export default function FloatingWhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(
    'Hi Panduka at Zora Solutions! I would like to discuss a project.'
  );

  const buildDirectUrl = (text: string) =>
    `https://wa.me/${PANDUKA_WA_NUMBER}?text=${encodeURIComponent(text.trim() || 'Hi Panduka at Zora Solutions!')}`;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(buildDirectUrl(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      {/* Quick-Chat Popover to Panduka */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="mb-3 w-[310px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-matte-lg dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark sm:w-[350px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3.5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-xs font-bold text-slate-900 dark:text-white">
                    Panduka • Zora Solutions
                  </div>
                  <div className="font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    +94 777 321 165 • Direct WhatsApp
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Close WhatsApp chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Starter Pills */}
            <div className="p-4">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Quick Inquiries:
              </div>
              <div className="mt-2 space-y-1.5">
                {QUICK_TOPICS.map((topic, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(topic)}
                    className="w-full rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-left text-xs text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700"
                  >
                    {topic}
                  </button>
                ))}
              </div>

              {/* Message Input & Send */}
              <form onSubmit={handleSend} className="mt-3">
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
                />
                <button
                  type="submit"
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 font-display text-xs font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Start WhatsApp Conversation</span>
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Floating Action Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 rounded-full bg-emerald-600 px-4 py-3 text-white shadow-matte-md transition-all hover:bg-emerald-700 hover:shadow-matte-lg"
        aria-label="Direct WhatsApp Contact"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden font-display text-xs font-bold sm:inline">
          {isOpen ? 'Close WhatsApp' : 'Chat With Us'}
        </span>
      </button>
    </div>
  );
}
