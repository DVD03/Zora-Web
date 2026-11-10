'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, MessageCircle, Mail, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/15 bg-[#02050D] pt-20 pb-12 overflow-hidden">
      {/* Top Tri-Tone Laser Highlight (White + Cyan + Solar Gold) */}
      <div className="pointer-events-none absolute top-0 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Brand Identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/10 p-2 shadow-lg">
                <img
                  src="/assets/logo.png"
                  alt="Zora Solutions Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="font-display text-2xl font-extrabold text-white">
                  Zora <span className="text-[#00F0FF]">Solutions</span>
                </span>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
                  Crafting Digital Solutions
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-200">
              Turn Your Ideas into Digital Reality. We build modern, reliable, and creative digital
              solutions to help you and your business grow online.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:zorasolution.official@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-4 py-2.5 font-mono text-xs font-extrabold text-[#030712] transition-colors hover:bg-[#00F0FF]"
              >
                <Mail className="h-3.5 w-3.5 text-[#0051FF]" />
                <span>zorasolution.official@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-amber-300">
              Core Services (05)
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm font-medium text-slate-200">
              {[
                'Web Development',
                'E-commerce Platforms',
                'Custom Software Solutions',
                'Digital Marketing & Branding',
                'UI/UX Design',
              ].map((s) => (
                <li key={s}>
                  <a href="#services" className="transition-colors hover:text-white">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Founder Contact Hub */}
          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-white">
              Direct Founder Channels
            </h4>

            <div className="mt-4 space-y-3">
              {/* Panduka Footer Card in Crisp Pearl White */}
              <div className="flex items-center justify-between rounded-2xl border border-white bg-white p-3.5 text-[#0F172A]">
                <div>
                  <div className="font-display text-sm font-extrabold text-[#040B1A]">Panduka</div>
                  <div className="font-mono text-xs font-bold text-[#0051FF]">+94 777 321 165</div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+94777321165"
                    className="rounded-lg border border-slate-300 bg-slate-100 p-2 text-[#040B1A] hover:bg-slate-200"
                    title="Call Panduka"
                  >
                    <PhoneCall className="h-4 w-4" />
                  </a>
                  <a
                    href="https://wa.me/94777321165"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[#040B1A] p-2 text-white hover:opacity-90"
                    title="WhatsApp Panduka"
                  >
                    <MessageCircle className="h-4 w-4 text-[#00F0FF]" />
                  </a>
                </div>
              </div>

              {/* Dilum Footer Card in Solar Gold & Obsidian */}
              <div className="flex items-center justify-between rounded-2xl border border-amber-400/50 bg-[#060D1F] p-3.5 text-white">
                <div>
                  <div className="font-display text-sm font-bold text-white">Dilum</div>
                  <div className="font-mono text-xs font-bold text-amber-300">+94 77 749 8608</div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+94777498608"
                    className="rounded-lg border border-white/20 bg-white/10 p-2 text-white hover:bg-white hover:text-[#030712]"
                    title="Call Dilum"
                  >
                    <PhoneCall className="h-4 w-4" />
                  </a>
                  <a
                    href="https://wa.me/94777498608"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-amber-400 p-2 text-[#030712] hover:opacity-90"
                    title="WhatsApp Dilum"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Security Status */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 text-xs text-slate-300 sm:flex-row">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">Zora Solutions</strong>. All
            rights reserved. Crafting Digital Solutions.
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-xs font-semibold text-white hover:bg-white hover:text-[#030712]"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
              <span>Admin CMS</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
