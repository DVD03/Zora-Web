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
  ShieldCheck,
  CheckCircle2,
  Cpu,
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
    <main className="relative min-h-screen bg-[#070B14] text-white">
      {/* Sticky Glassmorphic Navbar with Dynamic Scroll-Filling Transparent Logo */}
      <Navbar />

      {/* Hero Section with 3D Magnetic Emblem, 3D Tilt Perspective & Interactive Tab Showcase */}
      <Hero3DShowcase />

      {/* Dedicated Page Divisions Bar (One-Click Deep Navigation) */}
      <section className="relative z-20 border-y border-slate-800 bg-[#0C121E]/95 py-6 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <span className="font-mono text-xs font-semibold tracking-wider text-sky-400 uppercase">
                Dedicated Sections
              </span>
              <h2 className="font-display text-base font-bold text-white sm:text-lg">
                Explore Zora Solutions by Topic
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {[
                { label: 'Services', href: '/services', icon: Globe },
                { label: 'Portfolio', href: '/projects', icon: Layers },
                { label: 'Process', href: '/process', icon: Clock },
                { label: 'Cost Calculator', href: '/estimate', icon: Calculator },
                { label: 'Contact', href: '/contact', icon: PhoneCall },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/60 px-3.5 py-2 font-display text-xs font-semibold text-slate-200 transition-all hover:border-sky-500 hover:bg-slate-700 hover:text-white"
                  >
                    <Icon className="h-3.5 w-3.5 text-sky-400" />
                    <span>{item.label}</span>
                    <ArrowRight className="h-3 w-3 text-slate-400" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Services Bento Grid with Interactive Tech Stack Card Flip */}
      <div className="relative">
        <ServicesBentoGrid
          services={services}
          onSelectService={(srv) => setPreselectedService(srv)}
        />
        <div className="relative z-10 -mt-8 pb-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-6 py-3 font-display text-xs font-bold text-sky-300 transition-all hover:border-sky-400 hover:bg-sky-500 hover:text-slate-950"
          >
            <span>View All 5 Services in Full Page Detail</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 3D Scroll Portal & Client Projects Showcase with Interactive Modal */}
      <div className="relative">
        <PortfolioShowcase
          initialProjects={projects}
          onStartSimilarProject={(category) => setPreselectedService(category)}
        />
        <div className="relative z-10 -mt-6 pb-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-6 py-3 font-display text-xs font-bold text-sky-300 transition-all hover:border-sky-400 hover:bg-sky-500 hover:text-slate-950"
          >
            <span>Explore Complete Production Portfolio & Case Studies</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* 3-Step Scroll-Drawn Laser Workflow Timeline (30% / 60% / 100%) */}
      <div className="relative">
        <WorkflowLaserTimeline />
        <div className="relative z-10 -mt-6 pb-16 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-6 py-3 font-display text-xs font-bold text-sky-300 transition-all hover:border-sky-400 hover:bg-sky-500 hover:text-slate-950"
          >
            <span>Review Full Delivery Milestones & SLA Guarantees</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Interactive Quotation Calculator & Official Instant PDF Generator */}
      <div className="relative">
        <QuotationBuilder />
        <div className="relative z-10 -mt-4 pb-16 text-center">
          <Link
            href="/estimate"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 font-display text-xs font-semibold text-slate-200 transition-colors hover:border-sky-500 hover:text-white"
          >
            <span>Open Dedicated Standalone Quotation Page</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Direct WhatsApp Consultation & Requirement Brief Configurator */}
      <ProjectConfigurator preselectedService={preselectedService} />

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsAppButton />
    </main>
  );
}
