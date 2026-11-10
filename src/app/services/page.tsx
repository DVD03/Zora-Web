'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

      {/* Main Service Specifications View - Soft Light Blue Alternating Section */}
      <section className="border-b border-sky-100 bg-[#F0F7FF] py-12 transition-colors sm:py-16 lg:py-20 dark:border-slate-800 dark:bg-[#070B14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-sky-200/60 pb-5 md:flex-row md:items-end dark:border-slate-800">
            <div>
              <span className="font-mono text-xs font-semibold tracking-wider text-sky-600 dark:text-sky-400 uppercase">
                Technical Specifications &amp; Deliverables
              </span>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Detailed Scope of Delivery
              </h2>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800'
                }`}
              >
                All Services
              </button>
              {INITIAL_SERVICES.map((s) => (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setActiveCategory(s.slug)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activeCategory === s.slug
                      ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800'
                  }`}
                >
                  {s.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {filteredServices.map((service, index) => {
              const Icon = ICON_MAP[service.iconName] || Globe;
              return (
                <motion.div
                  key={service._id}
                  id={service.slug}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  className="group relative overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 shadow-matte-sm transition-all hover:border-sky-400 hover:shadow-matte-lg dark:border-slate-800 dark:bg-[#0B101B] dark:hover:border-slate-700 dark:shadow-matte-dark sm:p-8 lg:p-10"
                >
                  {/* Subtle Top Border Glow on Hover */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                            SPEC 0{index + 1}
                          </span>
                          <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-4 font-sans text-sm font-semibold text-sky-600 dark:text-sky-400">
                        {service.tagline}
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {service.description}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-bold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                          <Clock className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                          <span>{service.startingTimeline}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs font-bold text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                          <span>Starting: {service.packagePrice}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 lg:col-span-7 lg:border-l lg:border-slate-200 lg:pl-8 dark:lg:border-slate-800">
                      <div>
                        <h4 className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-slate-200">
                          Production Deliverables
                        </h4>
                        <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                          {service.deliverables.map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs text-slate-700 dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-300"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-slate-200">
                          Supported Technology Stack
                        </h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {service.techStackUsed.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Link
                          href="/estimate"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 font-display text-xs font-bold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
                        >
                          <Calculator className="h-3.5 w-3.5" />
                          <span>Estimate {service.title} Cost</span>
                        </Link>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Inquire via WhatsApp</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Strip */}
      <section className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-[#0B101B]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              Need a Custom Cross-Functional Architecture?
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Combine web development, custom software, and marketing into a single managed package.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 font-display text-xs font-bold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            <span>Book Founder Architecture Call</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingWhatsAppButton />
    </main>
  );
}
