'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import { INITIAL_SERVICES, INITIAL_PROJECTS } from '@/lib/seedData';
import {
  Globe,
  ShoppingBag,
  Cpu,
  TrendingUp,
  ArrowRight,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  MessageCircle,
  Code2,
  Rocket,
  FileDown,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  ShoppingBag,
  Cpu,
  TrendingUp,
  Sparkles: Layers,
};

export default function HomePage() {
  const featuredProjects = INITIAL_PROJECTS.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F8FAFC] transition-colors dark:bg-[#090D16]">
      <Navbar />

      {/* 1. HERO DIVISION (Clean Matte Aesthetic) */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white pt-32 pb-20 transition-colors dark:border-slate-800 dark:bg-[#0B101B] sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Headline */}
            <h1 className="max-w-4xl font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Turn Your Ideas into{' '}
              <span className="text-sky-600 dark:text-sky-400">High-Performance</span> Digital Reality
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              We design and engineer modern web applications, e-commerce storefronts, and custom
              software platforms with structured milestones, fixed timelines, and full source code ownership.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-display text-xs font-bold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                <Calculator className="h-4 w-4" />
                <span>Calculate Project Cost</span>
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-display text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-display text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Talk to Founders</span>
              </Link>
            </div>

            {/* Trust Metrics Division */}
            <div className="mt-14 grid w-full max-w-4xl grid-cols-2 gap-3 border-t border-slate-200 pt-10 sm:grid-cols-4 dark:border-slate-800">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-center dark:border-slate-800/80 dark:bg-slate-900/50">
                <div className="font-display text-xl font-bold text-slate-900 dark:text-white">05</div>
                <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">Core Capabilities</div>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-center dark:border-slate-800/80 dark:bg-slate-900/50">
                <div className="font-display text-xl font-bold text-slate-900 dark:text-white">100%</div>
                <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">Code Ownership</div>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-center dark:border-slate-800/80 dark:bg-slate-900/50">
                <div className="font-display text-xl font-bold text-slate-900 dark:text-white">&lt;2 Hours</div>
                <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">Response SLA</div>
              </div>
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3.5 text-center dark:border-slate-800/80 dark:bg-slate-900/50">
                <div className="font-display text-xl font-bold text-slate-900 dark:text-white">Fixed Fee</div>
                <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">Zero Surprises</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES DIVISION (Preview) */}
      <section className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                What We Build
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                Five Specialized Capabilities
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
                End-to-end engineering tailored for startups, retail brands, and established organizations.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 font-display text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
            >
              <span>View All Services &amp; Tech Stacks</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INITIAL_SERVICES.map((srv) => {
              const Icon = ICON_MAP[srv.iconName] || Globe;
              return (
                <div
                  key={srv._id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-matte-sm transition-all hover:border-slate-300 hover:shadow-matte-md dark:border-slate-800 dark:bg-[#0F172A] dark:hover:border-slate-700 dark:shadow-matte-dark"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sky-600 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">
                      {srv.title}
                    </h3>
                    <p className="mt-1 font-sans text-xs font-medium text-sky-600 dark:text-sky-400">
                      {srv.tagline}
                    </p>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">
                      {srv.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
                    >
                      <span>Explore deliverables</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED CASE STUDIES DIVISION */}
      <section className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Production Track Record
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                Featured Case Studies
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
                Real solutions operating in production with verified performance and business metrics.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-display text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
            >
              <span>View Full Case Study Portfolio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project._id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-matte-sm transition-all hover:border-slate-300 hover:shadow-matte-md dark:border-slate-800 dark:bg-[#0F172A] dark:hover:border-slate-700 dark:shadow-matte-dark"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2.5 right-2.5 rounded-md border border-slate-200/90 bg-white/95 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-mono text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                      Client: {project.clientName}
                    </div>
                    <h3 className="mt-1 font-display text-base font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 p-5 pt-3 dark:border-slate-800">
                  <Link
                    href="/projects"
                    className="flex items-center justify-between text-xs font-semibold text-sky-600 dark:text-sky-400"
                  >
                    <span>Inspect Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESS / WORKFLOW PREVIEW DIVISION */}
      <section className="py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Transparent Methodology
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              How We Deliver Projects
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              A 3-stage delivery pipeline ensuring transparency, prototype sign-off, and verified quality gates.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-matte-sm dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark">
              <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                Phase 01 • 30% Milestone
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-slate-900 dark:text-white">
                UX Prototype &amp; Architecture
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                Clickable high-fidelity preview and technical schema sign-off before writing production code.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-matte-sm dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark">
              <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                Phase 02 • 60% Milestone
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-slate-900 dark:text-white">
                Alpha Staging &amp; Core Logic
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                Live staging deployment for testing database integrations, workflows, and admin content controls.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-matte-sm dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark">
              <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                Phase 03 • 100% Milestone
              </span>
              <h3 className="mt-2 font-display text-lg font-bold text-slate-900 dark:text-white">
                Security Audit &amp; Handover
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                Core Web Vitals tuning, production DNS/SSL launch, source code handover, and 30-day warranty.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/process"
              className="inline-flex items-center gap-1.5 font-display text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
            >
              <span>Read Detailed Process &amp; Milestone Guarantees</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. ESTIMATION & CTA BANNER DIVISION */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-matte-md sm:p-12 dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Instant Transparent Pricing
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
                  Want an exact cost estimate with an official PDF quotation?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Use our interactive quotation builder to configure your features, pages, and cloud hosting
                  tier. Download an itemized corporate A4 PDF proposal instantly.
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                <Link
                  href="/estimate"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-display text-xs font-bold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 sm:w-auto"
                >
                  <FileDown className="h-4 w-4" />
                  <span>Open Quotation Calculator</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 font-display text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-500" />
                  <span>Direct WhatsApp Consultation</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsAppButton />
    </main>
  );
}
