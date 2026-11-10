'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, ArrowUpRight } from 'lucide-react';

const PANDUKA_WA_NUMBER = '94777321165';

const QUICK_TOPICS = [
  'Hi Panduka, I need a Website / Web System for my business.',
  'Hi Panduka, I would like to ask about your Social Media Monthly Packages.',
  'Hi Panduka, I would like a custom quotation for an E-Commerce / Software project.',
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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-7 sm:right-7">
      {/* Live Quick-Chat Popover to Panduka */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="mb-3 w-[calc(100vw-2.5rem)] max-w-[350px] overflow-hidden rounded-3xl border border-[#25D366]/50 bg-[#040914] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/15 bg-[#071327] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#25D366] text-[#030712]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m5.81 13.97c-.24.68-1.41 1.3-1.95 1.38-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5.01-4.36-5.16-4.56-.15-.2-1.23-1.64-1.23-3.13s.78-2.22 1.06-2.52c.28-.3.6-.38.8-.38h.58c.18 0 .44-.07.68.52.25.6.84 2.06.92 2.21.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.31.31-.13.62.18.3.78 1.29 1.68 2.09 1.15 1.03 2.13 1.35 2.43 1.5.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.22.58.35.07.13.07.75-.17 1.43Z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-sm font-extrabold text-white">
                    Panduka • Zora Solutions
                  </div>
                  <div className="font-mono text-[11px] font-semibold text-[#25D366]">
                    +94 777 321 165 • Direct WhatsApp
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white"
                aria-label="Close WhatsApp Quick Chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Presets + Custom Message Input */}
            <form onSubmit={handleSend} className="p-4 space-y-3">
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Quick Message Templates:
              </div>
              <div className="flex flex-col gap-1.5">
                {QUICK_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setMessage(topic)}
                    className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors ${
                      message === topic
                        ? 'border-[#25D366] bg-[#25D366]/15 font-semibold text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              <div>
                <label className="block font-mono text-[10px] font-bold uppercase tracking-wider text-slate-300">
                  Your Message to Panduka:
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#02050D] p-3 text-xs text-white placeholder-slate-400 focus:border-[#25D366] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 font-display text-xs font-extrabold uppercase tracking-wider text-[#030712] transition-colors hover:bg-[#34E576]"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Start Real-Time WhatsApp Chat</span>
                </button>

                <a
                  href={`https://wa.me/${PANDUKA_WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-2 font-mono text-[11px] font-semibold text-slate-200 hover:border-white/35 hover:text-white"
                >
                  <span>Open WhatsApp App Directly</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bottom-Right Floating Trigger Button (Clean, no circular glowing dots) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-2.5 rounded-2xl border border-[#25D366] bg-[#040914] px-4 py-3 text-white shadow-2xl transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#25D366] hover:text-[#030712]"
        aria-label="WhatsApp Panduka"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#25D366] text-[#030712] transition-colors group-hover:bg-[#040914] group-hover:text-[#25D366]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m5.81 13.97c-.24.68-1.41 1.3-1.95 1.38-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5.01-4.36-5.16-4.56-.15-.2-1.23-1.64-1.23-3.13s.78-2.22 1.06-2.52c.28-.3.6-.38.8-.38h.58c.18 0 .44-.07.68.52.25.6.84 2.06.92 2.21.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.31.31-.13.62.18.3.78 1.29 1.68 2.09 1.15 1.03 2.13 1.35 2.43 1.5.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.22.58.35.07.13.07.75-.17 1.43Z"
            />
          </svg>
        </span>
        <div className="hidden text-left sm:block">
          <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#25D366] group-hover:text-[#030712]">
            WhatsApp Now
          </div>
          <div className="font-display text-xs font-extrabold">Chat with Panduka</div>
        </div>
      </button>
    </div>
  );
}

