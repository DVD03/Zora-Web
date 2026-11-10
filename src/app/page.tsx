'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Hero3DShowcase from '@/components/Hero3DShowcase';
import ServicesBentoGrid from '@/components/ServicesBentoGrid';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import WorkflowLaserTimeline from '@/components/WorkflowLaserTimeline';
import QuotationBuilder from '@/components/QuotationBuilder';
import ProjectConfigurator from '@/components/ProjectConfigurator';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import {
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  type SeedProjectItem,
  type SeedServiceItem,
} from '@/lib/seedData';
import {
  Globe,
  Layers,
  Clock,
  Calculator,
  PhoneCall,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const [projects, setProjects] = useState<SeedProjectItem[]>(INITIAL_PROJECTS);
  const [services, setServices] = useState<SeedServiceItem[]>(INITIAL_SERVICES);
  const [preselectedService, setPreselectedService] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLiveContent() {
      try {
        const [projRes, srvRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/services'),
        ]);
        if (projRes.ok) {
          const projData = await projRes.json();
          if (projData.success && Array.isArray(projData.projects) && projData.projects.length > 0) {
            setProjects(projData.projects);
          }
        }
        if (srvRes.ok) {
          const srvData = await srvRes.json();
          if (srvData.success && Array.isArray(srvData.services) && srvData.services.length > 0) {
            setServices(srvData.services);
          }
        }
      } catch {
        // Fallback to initial seeded data seamlessly
      }
    }
    fetchLiveContent();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#060913] text-white">
      {/* Sticky Glassmorphic Navbar with Standalone Prominent Transparent Logo */}
      <Navbar />

      {/* =========================================================================
          DIVISION 01: HERO & 3D MAGNETIC EMBLEM
          Charming Theme: Deep Ocean Sky (#00B4D8 / Sky)
         ========================================================================= */}
      <section className="relative overflow-hidden border-b border-sky-500/20 bg-gradient-to-b from-[#060913] via-[#091224] to-[#070C1A]">
        {/* Subtle charming sky accent ambient glow */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.25) 0%, rgba(2, 132, 199, 0.1) 40%, transparent 70%)',
          }}
        />

        <Hero3DShowcase />
      </section>

      {/* =========================================================================
          DIVISION DECISIONS BAR: TOPIC JUMP NAV
          Charming Theme: Refined Slate & Steel Blue
         ========================================================================= */}
      <section className="relative z-20 border-b border-slate-800 bg-[#0B101E] py-4 sm:py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400"></span>
              <span className="font-mono text-xs font-semibold tracking-wider text-slate-300 uppercase">
                Explore Dedicated Divisions
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: '01. Services', href: '/services', color: 'hover:border-indigo-500 hover:text-indigo-300' },
                { label: '02. Case Studies', href: '/projects', color: 'hover:border-teal-500 hover:text-teal-300' },
                { label: '03. Delivery Process', href: '/process', color: 'hover:border-amber-500 hover:text-amber-300' },
                { label: '04. Instant Quote', href: '/estimate', color: 'hover:border-purple-500 hover:text-purple-300' },
                { label: '05. WhatsApp Founders', href: '/contact', color: 'hover:border-emerald-500 hover:text-emerald-300' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-1.5 font-display text-xs font-semibold text-slate-300 transition-all ${item.color}`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-3 w-3 opacity-60" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DIVISION 02: 5 CORE SERVICES BENTO GRID
          Charming Theme: Royal Indigo & Blue (#6366F1 / Indigo)
         ========================================================================= */}
      <section className="relative overflow-hidden border-b border-indigo-500/25 bg-gradient-to-b from-[#080D1D] via-[#0A122B] to-[#070B18]">
        {/* Subtle charming indigo ambient glow */}
        <div
          className="pointer-events-none absolute top-12 left-1/4 h-[420px] w-[500px] rounded-full opacity-30 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, transparent 70%)',
          }}
        />

        {/* Division Indicator Banner */}
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
            <span>DIVISION 02 • CORE SERVICES &amp; SOLUTIONS</span>
          </div>
        </div>

        <ServicesBentoGrid
          services={services}
          onSelectService={(srv) => setPreselectedService(srv)}
        />

        <div className="relative z-10 -mt-6 pb-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/15 px-6 py-3 font-display text-xs font-bold text-indigo-200 transition-all hover:border-indigo-400 hover:bg-indigo-500 hover:text-white"
          >
            <span>Open Dedicated Services Page &amp; Architecture Details</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          DIVISION 03: 3D SCROLL PORTAL & PORTFOLIO
          Charming Theme: Seafoam Teal & Emerald (#14B8A6 / Teal)
         ========================================================================= */}
      <section className="relative overflow-hidden border-b border-teal-500/25 bg-gradient-to-b from-[#051118] via-[#071924] to-[#051017]">
        {/* Subtle charming teal ambient glow */}
        <div
          className="pointer-events-none absolute top-16 right-1/4 h-[460px] w-[540px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.22) 0%, transparent 70%)',
          }}
        />

        {/* Division Indicator Banner */}
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-teal-300">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400"></span>
            <span>DIVISION 03 • PRODUCTION CASE STUDIES &amp; PORTAL</span>
          </div>
        </div>

        <PortfolioShowcase
          initialProjects={projects}
          onStartSimilarProject={(category) => setPreselectedService(category)}
        />

        <div className="relative z-10 -mt-6 pb-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-teal-500/40 bg-teal-500/15 px-6 py-3 font-display text-xs font-bold text-teal-200 transition-all hover:border-teal-400 hover:bg-teal-500 hover:text-slate-950"
          >
            <span>Browse Complete Portfolio &amp; Client Projects Archive</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          DIVISION 04: HOW WE WORK (3D LASER TIMELINE)
          Charming Theme: Warm Amber & Bronze Gold (#F59E0B / Amber)
         ========================================================================= */}
      <section className="relative overflow-hidden border-b border-amber-500/25 bg-gradient-to-b from-[#100C06] via-[#171109] to-[#0E0B06]">
        {/* Subtle charming amber ambient glow */}
        <div
          className="pointer-events-none absolute top-12 left-1/3 h-[420px] w-[520px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%)',
          }}
        />

        {/* Division Indicator Banner */}
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
            <span>DIVISION 04 • 3-PHASE EXECUTION &amp; SLA COMMITMENTS</span>
          </div>
        </div>

        <WorkflowLaserTimeline />

        <div className="relative z-10 -mt-6 pb-16 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/15 px-6 py-3 font-display text-xs font-bold text-amber-200 transition-all hover:border-amber-400 hover:bg-amber-500 hover:text-slate-950"
          >
            <span>Review Full Delivery Process &amp; Contractual Guarantees</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          DIVISION 05: INSTANT QUOTATION CALCULATOR
          Charming Theme: Modern Violet & Purple (#A855F7 / Purple)
         ========================================================================= */}
      <section className="relative overflow-hidden border-b border-purple-500/25 bg-gradient-to-b from-[#0E081C] via-[#140C29] to-[#0C0719]">
        {/* Subtle charming purple ambient glow */}
        <div
          className="pointer-events-none absolute top-14 right-1/3 h-[440px] w-[500px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
          }}
        />

        {/* Division Indicator Banner */}
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-purple-300">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>
            <span>DIVISION 05 • INSTANT QUOTATION &amp; PDF EXPORT</span>
          </div>
        </div>

        <QuotationBuilder />

        <div className="relative z-10 -mt-4 pb-16 text-center">
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/15 px-5 py-2.5 font-display text-xs font-semibold text-purple-200 transition-colors hover:border-purple-400 hover:text-white"
          >
            <span>Open Fullscreen Dedicated Quotation Builder</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          DIVISION 06: DIRECT WHATSAPP & PROJECT CONFIGURATOR
          Charming Theme: Fresh Mint & WhatsApp Green (#10B981 / Emerald)
         ========================================================================= */}
      <section className="relative overflow-hidden border-b border-emerald-500/25 bg-gradient-to-b from-[#061410] via-[#091E18] to-[#05110E]">
        {/* Subtle charming emerald ambient glow */}
        <div
          className="pointer-events-none absolute top-12 left-1/4 h-[440px] w-[520px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
          }}
        />

        {/* Division Indicator Banner */}
        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span>DIVISION 06 • DIRECT FOUNDER CONSULTATION HUB</span>
          </div>
        </div>

        <ProjectConfigurator preselectedService={preselectedService} />
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsAppButton />
    </main>
  );
}
