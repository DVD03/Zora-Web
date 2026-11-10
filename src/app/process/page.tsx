'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import PageHeader from '@/components/PageHeader';
import WorkflowLaserTimeline from '@/components/WorkflowLaserTimeline';
import {
  Layers,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Code2,
  Rocket,
  ArrowRight,
  Calculator,
  MessageCircle,
  FileCheck,
  Zap,
} from 'lucide-react';

export default function ProcessPage() {
  const steps = [
    {
      phase: 'Phase 01 — 30% Milestone',
      title: 'Discovery, UX Prototype & Technical Architecture',
      tagline: 'Clickable high-fidelity preview before writing production code.',
      description:
        'We convert your business requirements into comprehensive interactive UI designs and scalable technical architecture schemas. You interact with every key screen and approve user journeys before development begins.',
      deliverables: [
        'Interactive Figma Design Prototype',
        'Database Schema & API Specifications',
        'Defined Milestones & Fixed Timeline Agreement',
        'Dedicated Communication Channel Setup',
      ],
      duration: 'Week 1 – 2',
      badge: 'Interactive Prototype',
    },
    {
      phase: 'Phase 02 — 60% Milestone',
      title: 'Core Development, DB Integration & Alpha Staging',
      tagline: 'Functional, live staging platform accessible for client review.',
      description:
        'Our engineers build the backend services, database schemas, frontend interfaces, and business logic. We deploy to an isolated client staging server so you can test live forms, database entries, and flows firsthand.',
      deliverables: [
        'Functional Staging Deployment Preview',
        'Database & Third-Party API Integrations',
        'Admin CMS & Content Editing Workflows',
        'Weekly Founder Progress Demos',
      ],
      duration: 'Week 3 – 5',
      badge: 'Alpha Staging',
    },
    {
      phase: 'Phase 03 — 100% Milestone',
      title: 'Security Hardening, SEO Optimization & Production Launch',
      tagline: 'Flawless zero-downtime deployment and full source code handover.',
      description:
        'We subject your application to enterprise security auditing, responsive stress testing, and Core Web Vitals optimization. Upon final review, we conduct live domain routing, SSL installation, and complete handover.',
      deliverables: [
        'Production Cloud Deployment & Domain Routing',
        'Complete Git Source Repository Ownership',
        'Google Analytics & Search Console Setup',
        '30-Day Post-Launch Hypercare Support SLA',
      ],
      duration: 'Week 6',
      badge: 'Production Launch',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] transition-colors dark:bg-[#090D16]">
      <Navbar />

      <PageHeader
        badge="Execution Framework"
        title="Predictable Milestone-Driven"
        titleHighlight="Delivery Engine"
        description="We follow a rigid 3-phase delivery process with structured client reviews, live staging demos, and fixed SLA commitments at every step."
        breadcrumbs={[{ label: 'How We Work' }]}
      />

      {/* 3D Laser Scroll-Drawn Workflow Timeline Component */}
      <section className="relative z-10 -mt-6">
        <WorkflowLaserTimeline />
      </section>

      {/* Structured Phase Roadmap Details (Matte Architectural View) */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {steps.map((step, idx) => (
              <div
                key={step.phase}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-matte-sm dark:border-slate-800 dark:bg-[#0B101B] dark:shadow-matte-dark sm:p-8 lg:p-10"
              >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                      <Clock className="h-4 w-4" />
                      <span>{step.duration}</span>
                    </div>

                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[11px] font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                      <span>{step.phase}</span>
                    </div>

                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                      {step.title}
                    </h3>

                    <p className="mt-2 font-sans text-sm font-semibold text-sky-600 dark:text-sky-400">
                      {step.tagline}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {step.description}
                    </p>
                  </div>

                  <div className="space-y-4 lg:col-span-7 lg:border-l lg:border-slate-200 lg:pl-8 dark:lg:border-slate-800">
                    <h4 className="font-mono text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-slate-200">
                      Verified Phase Deliverables
                    </h4>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {step.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs text-slate-700 dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-300"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SLA & Guarantees */}
          <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-[#0B101B] sm:p-10">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-bold tracking-wider text-sky-600 dark:text-sky-400 uppercase">
                Contractual Commitments
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                Our Guarantee to Founders &amp; Stakeholders
              </h3>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800/80 dark:bg-slate-900/50">
                <FileCheck className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                <h4 className="mt-3 font-display text-base font-bold text-slate-900 dark:text-white">
                  100% Code Ownership
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Full git repository, IP handover, and no proprietary vendor lock-ins.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800/80 dark:bg-slate-900/50">
                <Clock className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                <h4 className="mt-3 font-display text-base font-bold text-slate-900 dark:text-white">
                  Fixed Fee SOW
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Every project has an agreed scope of work with zero unexpected surprise billing.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800/80 dark:bg-slate-900/50">
                <Zap className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                <h4 className="mt-3 font-display text-base font-bold text-slate-900 dark:text-white">
                  &lt; 2-Hour Response
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Dedicated WhatsApp and phone access directly to lead engineers.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 dark:border-slate-800/80 dark:bg-slate-900/50">
                <ShieldCheck className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                <h4 className="mt-3 font-display text-base font-bold text-slate-900 dark:text-white">
                  30-Day Hypercare
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  Immediate bug resolution and performance monitoring included free after go-live.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Ready to review a structured proposal for your system?
              </span>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/estimate"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 font-display text-xs font-bold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  <span>Build Instant Estimate</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 font-display text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Schedule Consultation</span>
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
