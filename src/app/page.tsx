'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PreloaderLogo from '@/components/PreloaderLogo';
import Navbar from '@/components/Navbar';
import Hero3DShowcase from '@/components/Hero3DShowcase';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import CursorSpotlight from '@/components/CursorSpotlight';
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
  Rocket,
  Code2,
  FileText,
  MessageCircle,
} from 'lucide-react';

export default function HomePage() {
  const divisions = [
    {
      title: 'Core Capabilities',
      subtitle: '05 Specialized Engineering Services',
      description:
        'Custom web applications, scalable e-commerce storefronts, bespoke software architectures, UI/UX systems, and high-impact digital marketing.',
      href: '/services',
      icon: Globe,
      badge: '05 Services',
      accent: 'border-sky-500/30 text-sky-400 group-hover:border-sky-400',
      tagColor: 'bg-sky-500/10 text-sky-400',
      highlights: [
        'Web Applications & Portals',
        'E-Commerce & Payment Gateways',
        'Custom Business Dashboards',
        'UI/UX & Brand Design',
      ],
    },
    {
      title: 'Production Portfolio',
      subtitle: 'Verified Client Case Studies',
      description:
        'Explore our delivered production systems, commercial web platforms, and mobile-optimized solutions built for clients across Sri Lanka & globally.',
      href: '/projects',
      icon: Layers,
      badge: 'Live Case Studies',
      accent: 'border-emerald-500/30 text-emerald-400 group-hover:border-emerald-400',
      tagColor: 'bg-emerald-500/10 text-emerald-400',
      highlights: [
        'Enterprise Resource Portals',
        'Healthcare & Booking Systems',
        'Luxury Brand Storefronts',
        'High-Conversion Web Apps',
      ],
    },
    {
      title: 'How We Work',
      subtitle: 'Predictable 3-Phase Framework',
      description:
        'Structured roadmap with 30% interactive clickable prototype, 60% live alpha staging preview, and 100% security-hardened production launch.',
      href: '/process',
      icon: Clock,
      badge: '3-Step Delivery',
      accent: 'border-amber-500/30 text-amber-400 group-hover:border-amber-400',
      tagColor: 'bg-amber-500/10 text-amber-400',
      highlights: [
        'Phase 01: Prototype & UX (30%)',
        'Phase 02: Alpha Staging (60%)',
        'Phase 03: Cloud Handover (100%)',
        'Fixed Timeline Guarantee',
      ],
    },
    {
      title: 'Instant Cost Estimator',
      subtitle: 'Real-Time Dynamic Pricing Engine',
      description:
        'Configure your specific tech stack, feature scope, and hosting tier to generate an immediate estimated budget and download an official PDF quotation.',
      href: '/estimate',
      icon: Calculator,
      badge: 'Interactive Calculator',
      accent: 'border-purple-500/30 text-purple-400 group-hover:border-purple-400',
      tagColor: 'bg-purple-500/10 text-purple-400',
      highlights: [
        'Transparent Line-Item Costs',
        'Multi-Currency (LKR / USD)',
        'Cloud Tier Recommendations',
        'Instant Official PDF Download',
      ],
    },
    {
      title: 'Direct Consultation Hub',
      subtitle: 'Connect with Founder',
      description:
        'No intermediate sales reps. Communicate directly with founder Panduka via WhatsApp or direct phone call to architect your solution today.',
      href: '/contact',
      icon: PhoneCall,
      badge: 'Direct Founder',
      accent: 'border-rose-500/30 text-rose-400 group-hover:border-rose-400',
      tagColor: 'bg-rose-500/10 text-rose-400',
      highlights: [
        'Direct WhatsApp Channel',
        'Requirement Brief Builder',
        '< 2-Hour Response Time',
        'Free Technical Discovery Call',
      ],
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#F8FAFC] text-slate-900 transition-colors duration-200 dark:bg-[#070B14] dark:text-white">
      {/* Initial Cyber-Luxury Cinematic Preloader */}
      <PreloaderLogo />

      {/* Interactive Ambient Cursor Spotlight (Zero Lag) */}
      <CursorSpotlight />

      {/* Sticky Glassmorphic Navbar with Crisp, Full-Color Logo */}
      <Navbar />

      {/* Hero Section with 3D Rotating Orbital Rings, 3D Tilt Emblem, & Interactive Tab Showcase */}
      <Hero3DShowcase />

      {/* SEPARATE PAGE DIVISIONS (Dedicated Architectural Decisions) - Soft Light Blue Background */}
      <section className="relative z-20 border-t border-sky-100 bg-[#F0F7FF] py-16 transition-colors dark:border-slate-800 dark:bg-[#0A0F1D] sm:py-24">
        {/* Subtle Perspective Grid in Background */}
        <div className="pointer-events-none absolute inset-0 bg-cyber-grid bg-[size:48px_48px] opacity-25" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-lg bg-sky-500/10 px-3 py-1 font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
              <span className="h-2 w-2 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse" />
              <span>DEDICATED EXPLORATION PATHS</span>
            </div>

            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Explore Zora Solutions by Division
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              Each division provides deep-dive specifications, verified production case studies, transparent
              pricing calculators, and direct consultation channels.
            </p>
          </motion.div>

          {/* Interactive 3D Division Cards Grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {divisions.map((division, idx) => {
              const Icon = division.icon;
              const isWide = idx === 3 || idx === 4;

              return (
                <motion.div
                  key={division.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, scale: 1.018, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 shadow-matte-sm backdrop-blur-sm transition-all duration-300 hover:border-sky-400 hover:shadow-matte-lg dark:border-slate-800 dark:bg-[#0E1526]/90 dark:hover:border-slate-700 dark:hover:bg-[#121B30] dark:shadow-matte-dark sm:p-8 ${
                    isWide && idx === 3 ? 'md:col-span-1 lg:col-span-2' : ''
                  }`}
                >
                  {/* Modern Ambient Glow Layer on Hover */}
                  <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-sky-500/10 via-cyan-400/5 to-indigo-500/10" />

                  {/* Top Edge Cyan Laser Shimmer */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10">
                    {/* Header Row: Icon + Badge */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sky-600 transition-colors duration-300 group-hover:border-sky-500/50 group-hover:bg-sky-500/15 group-hover:text-sky-500 dark:border-slate-700 dark:bg-slate-800/80 dark:text-sky-400">
                        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-115 group-hover:-rotate-6" />
                      </div>

                      <span className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold transition-transform duration-200 group-hover:scale-105 ${division.tagColor}`}>
                        {division.badge}
                      </span>
                    </div>

                    {/* Titles */}
                    <div className="mt-5">
                      <h3 className="font-display text-xl font-bold text-slate-900 transition-colors duration-200 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-300 sm:text-2xl">
                        {division.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
                        {division.subtitle}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
                        {division.description}
                      </p>
                    </div>

                    {/* Highlights List */}
                    <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800/80">
                      {division.highlights.map((h) => (
                        <div key={h} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-sky-600 dark:text-sky-400" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation CTA */}
                  <div className="relative z-10 mt-6 pt-2">
                    <Link
                      href={division.href}
                      className="inline-flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 font-display text-xs font-semibold text-slate-800 transition-all duration-300 group-hover:border-sky-600 group-hover:bg-sky-600 group-hover:text-white dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-white dark:group-hover:border-sky-500 dark:group-hover:bg-sky-500 dark:group-hover:text-slate-950"
                    >
                      <span>Explore Dedicated Page</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Trust Guarantees Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-14 rounded-3xl border border-sky-100 bg-white p-6 shadow-matte-sm dark:border-slate-800 dark:bg-[#0C1222] sm:p-8"
          >
            <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              <div className="p-2">
                <div className="font-display text-2xl font-bold text-sky-600 dark:text-sky-400 sm:text-3xl">100%</div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">Full Code Ownership</div>
              </div>
              <div className="p-2">
                <div className="font-display text-2xl font-bold text-sky-600 dark:text-sky-400 sm:text-3xl">&lt; 2 Hrs</div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">Direct Founder Response</div>
              </div>
              <div className="p-2">
                <div className="font-display text-2xl font-bold text-sky-600 dark:text-sky-400 sm:text-3xl">Fixed Fee</div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">Clear Scope of Work</div>
              </div>
              <div className="p-2">
                <div className="font-display text-2xl font-bold text-sky-600 dark:text-sky-400 sm:text-3xl">30 Days</div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">Free Hypercare SLA</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alternating Crisp White Section: Direct Founder Engineering */}
      <section className="border-t border-sky-100 bg-white py-14 transition-colors dark:border-slate-800 dark:bg-[#070B14] sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Direct Founder Engineering
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Ready to Turn Your Idea into Production?
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Get an instant itemized cost estimate or speak directly with founder Panduka.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/estimate"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 font-display text-xs font-bold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
            >
              <Calculator className="h-4 w-4" />
              <span>Calculate Project Cost</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-display text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp Founder</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsAppButton />
    </main>
  );
}
