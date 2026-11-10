'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import PageHeader from '@/components/PageHeader';
import { INITIAL_SERVICES } from '@/lib/seedData';
import {
  Globe,
  ShoppingBag,
  Cpu,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Calculator,
  MessageCircle,
  Clock,
  Layers,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  ShoppingBag,
  Cpu,
  TrendingUp,
  Sparkles: Layers,
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices =
    activeCategory === 'all'
      ? INITIAL_SERVICES
      : INITIAL_SERVICES.filter((s) => s.slug === activeCategory);

  return (
    <main className="min-h-screen bg-[#F8FAFC] transition-colors dark:bg-[#090D16]">
      <Navbar />

      <PageHeader
        badge="Enterprise Capabilities"
        title="Comprehensive Digital Solutions"
        titleHighlight="Tailored for Scale"
        description="We architect, design, and engineer robust digital systems that automate operations, expand market reach, and deliver tangible commercial outcomes."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Services Divisions */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Division Filter Bar */}
          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-5 dark:border-slate-800">
            <span className="mr-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Filter by Service:
            </span>
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === 'all'
                  ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800'
              }`}
            >
              All Services ({INITIAL_SERVICES.length})
            </button>
            {INITIAL_SERVICES.map((srv) => (
              <button
                key={srv.slug}
                type="button"
                onClick={() => setActiveCategory(srv.slug)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === srv.slug
                    ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800'
                }`}
              >
                {srv.title}
              </button>
            ))}
          </div>

          {/* Service Cards Grid (Matte Finish) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {filteredServices.map((service, idx) => {
              const Icon = ICON_MAP[service.iconName] || Globe;
              return (
                <div
                  key={service._id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-matte-sm transition-all hover:border-slate-300 hover:shadow-matte-md dark:border-slate-800 dark:bg-[#0F172A] dark:hover:border-slate-700 dark:shadow-matte-dark"
                >
                  <div>
                    {/* Header: Icon & Timeline Pill */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sky-600 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                        <Clock className="h-3 w-3 text-amber-500" />
                        <span>Est: {service.startingTimeline}</span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="mt-5 font-display text-2xl font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm font-semibold text-sky-600 dark:text-sky-400">
                      {service.tagline}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist Division */}
                    <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800/80">
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
                        Key Deliverables Included:
                      </h4>
                      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {service.deliverables.map((item, dIdx) => (
                          <li
                            key={dIdx}
                            className="flex items-start gap-2 text-xs leading-snug text-slate-700 dark:text-slate-300"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Division */}
                    <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800/80">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400 mr-1">
                          Stack:
                        </span>
                        {service.techStackUsed.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Division */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                    <Link
                      href={`/estimate`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 transition-colors hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
                    >
                      <Calculator className="h-3.5 w-3.5" />
                      <span>Estimate Cost for {service.title}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 font-display text-xs font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action Division */}
          <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-100/70 p-8 text-center sm:p-12 dark:border-slate-800 dark:bg-[#0C121E]">
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Need a Custom Solution tailored specifically to your workflow?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Speak directly with our technical founders. We analyze your requirements and provide an
              unbiased technical architectural proposal with a transparent timeline.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 font-display text-xs font-bold text-white shadow-sm hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                <Calculator className="h-4 w-4" />
                <span>Open Quotation Calculator</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-display text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                <span>Contact via WhatsApp</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsAppButton />
    </main>
  );
}
