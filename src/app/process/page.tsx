'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import PageHeader from '@/components/PageHeader';
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
        'Production Cloud Deployment & SSL Setup',
        'Core Web Vitals & Speed Optimization (95+ Score)',
        'Full Source Code & Repository Handover',
        '30-Day Post-Launch Hypercare Support',
      ],
      duration: 'Final Handover',
      badge: 'Production Live',
    },
  ];

  const guarantees = [
    {
      title: 'Direct Founder Oversight',
      desc: 'No middle managers or delegated juniors. Panduka and Dilum personally oversee system design, code quality, and project milestones.',
      icon: ShieldCheck,
    },
    {
      title: 'Fixed Pricing & Zero Hidden Fees',
      desc: 'Transparent line-item quotation beforehand. The agreed milestone budget is the exact amount you pay.',
      icon: Calculator,
    },
    {
      title: '100% Code Ownership',
      desc: 'You own all intellectual property, source repositories, database backups, and design assets upon milestone completion.',
      icon: Code2,
    },
    {
      title: 'Hypercare Warranty',
      desc: 'Complimentary 30-day bug fix warranty and monitoring after your platform goes live on production.',
      icon: Zap,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] transition-colors dark:bg-[#090D16]">
      <Navbar />

      <PageHeader
        badge="Engineered Execution"
        title="Predictable Delivery Pipeline"
        titleHighlight="Zero Surprises"
        description="Our structured 3-phase delivery framework gives you total visibility over development progress, verifiable milestones, and fixed delivery timelines."
        breadcrumbs={[{ label: 'How We Work' }]}
      />

      {/* Structured Phased Milestones Division */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Phased Execution Methodology
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              3 Structured Milestones. Total Transparency.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Payments and milestones align directly with tangible project progress and signed-off deliverables.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 lg:p-10 shadow-matte-sm dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark"
              >
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                        {step.phase}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {step.badge}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 font-sans text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {step.tagline}
                    </p>
                  </div>

                  <div className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 font-mono text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span>Timeline: {step.duration}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {step.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
                    Milestone Signed-Off Deliverables:
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {step.deliverables.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantees & Commitments Division */}
          <div className="mt-20">
            <div className="mb-10 text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Core Principles
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
                Our Engineering Commitments
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {guarantees.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-matte-sm dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sky-600 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 font-display text-base font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Action Division */}
          <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-100/70 p-8 text-center sm:p-12 dark:border-slate-800 dark:bg-[#0C121E]">
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Ready to schedule your discovery kickoff?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Share your project details with our technical team. We will review your scope and provide a
              milestone breakdown within 24 hours.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 font-display text-xs font-bold text-white shadow-sm hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                <Calculator className="h-4 w-4" />
                <span>Calculate Your Milestone Budget</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-display text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <span>Initiate Consultation</span>
                <ArrowRight className="h-4 w-4" />
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
