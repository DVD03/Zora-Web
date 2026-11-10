'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/projects' },
    { label: 'How We Work', href: '/process' },
    { label: 'Quotation Calculator', href: '/estimate' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const serviceLinks = [
    { label: 'Web Development', href: '/services' },
    { label: 'E-commerce Platforms', href: '/services' },
    { label: 'Custom Software Solutions', href: '/services' },
    { label: 'Digital Marketing & Branding', href: '/services' },
    { label: 'UI/UX Design', href: '/services' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-[#060A14] pt-16 pb-12 text-white">
      {/* Background Graphic Image (fotter background.jpg) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
        style={{ backgroundImage: "url('/assets/fotter%20background.jpg')" }}
      />
      {/* Soft Dark Overlay to ensure all footer text and links remain 100% crystal clear */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060A14]/90 via-[#060A14]/80 to-[#060A14]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Brand Identity */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <img
                src="/assets/logo.png"
                alt="Zora Solutions Logo"
                className="h-12 w-12 object-contain shrink-0"
              />
              <div>
                <span className="font-display text-2xl font-bold text-white">
                  Zora Solutions
                </span>
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Crafting Digital Solutions
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Turn Your Ideas into Digital Reality. We build modern, reliable, and high-performance
              digital products to help businesses and founders scale online.
            </p>

            <div className="mt-5">
              <a
                href="mailto:zorasolution.official@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2 font-mono text-xs font-semibold text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-850 hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 text-sky-400" />
                <span>zorasolution.official@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation & Services */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="mt-3.5 space-y-2 text-sm text-slate-400">
              {navigationLinks.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-sky-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Founder Channels */}
          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
              Direct Founder Channels
            </h4>

            <div className="mt-3.5 space-y-3">
              {/* Panduka Card */}
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                <div>
                  <div className="font-display text-sm font-bold text-white">
                    Panduka
                  </div>
                  <div className="font-mono text-xs font-medium text-sky-400">
                    +94 777 321 165
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <a
                    href="tel:+94777321165"
                    className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-300 transition-colors hover:bg-slate-750 hover:text-white"
                    title="Call Panduka"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://wa.me/94777321165"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-emerald-600 p-2 text-white transition-opacity hover:opacity-90"
                    title="WhatsApp Panduka"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row">
          <div>
            © {currentYear} <strong className="text-slate-300">Zora Solutions</strong>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
