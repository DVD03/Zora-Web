'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Layers,
  CheckCircle2,
  MessageCircle,
  Zap,
  Award,
  Globe,
  ShoppingBag,
  Cpu,
  TrendingUp,
  PhoneCall,
  HeartHandshake,
  Rocket,
} from 'lucide-react';

export default function Hero3DShowcase() {
  const emblemRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'services' | 'why-us' | 'how-it-works'>('services');
  const [cockpitView, setCockpitView] = useState<'architecture' | 'capabilities' | 'deliverables'>('architecture');

  // 3D Magnetic Hover on Hero Logo Emblem (only active on direct pointer hover — zero scroll overhead!)
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const sheenPos = useMotionValue(-120);

  const springTiltX = useSpring(tiltX, { stiffness: 220, damping: 18 });
  const springTiltY = useSpring(tiltY, { stiffness: 220, damping: 18 });
  const springSheen = useSpring(sheenPos, { stiffness: 160, damping: 20 });

  const handleEmblemMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!emblemRef.current) return;
    const rect = emblemRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    tiltX.set(-dy * 18);
    tiltY.set(dx * 18);
    sheenPos.set(((e.clientX - rect.left) / rect.width) * 240 - 60);
  };

  const handleEmblemLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    sheenPos.set(-120);
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-24"
    >
      {/* Dynamic Layered Cyber-Horizon Backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid bg-[size:48px_48px] opacity-25" />
      
      {/* Ambient Radial Color Spotlights */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[560px] w-[1100px] rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(14,165,233,0.18) 0%, rgba(99,102,241,0.12) 35%, rgba(16,185,129,0.06) 65%, transparent 80%)',
        }}
      />

      {/* Decorative Cyber Accent Lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 200 H 420 L 480 260 H 1440"
          stroke="#38BDF8"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        <path
          d="M 0 680 H 960 L 1020 620 H 1440"
          stroke="#6366F1"
          strokeWidth="1"
          strokeDasharray="8 8"
        />
      </svg>

      {/* Subtle Holographic 'Z' Watermark in Background */}
      <div className="pointer-events-none absolute top-28 right-[-5%] z-0 select-none opacity-[0.05] sm:right-[4%]">
        <img
          src="/assets/logo.png"
          alt=""
          aria-hidden="true"
          className="h-[460px] w-[460px] object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Top Status & Booking Availability Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs font-semibold text-sky-200">
              High-Performance Digital Studio • 2026/2027 Booking Open
            </span>
          </motion.div>

          {/* 3D Magnetic Logo Emblem with Rotating Orbital Tech Rings */}
          <div className="relative mb-6 flex items-center justify-center">
            {/* Outer Slow Rotating Orbital Ring */}
            <svg
              className="pointer-events-none absolute h-44 w-44 sm:h-52 sm:w-52 animate-orbit-spin select-none opacity-40"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle
                cx="100"
                cy="100"
                r="92"
                stroke="url(#heroOrbitGrad)"
                strokeWidth="1.5"
                strokeDasharray="16 12 40 12"
              />
              <defs>
                <linearGradient id="heroOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Counter-Rotating Ring */}
            <svg
              className="pointer-events-none absolute h-36 w-36 sm:h-44 sm:w-44 animate-orbit-reverse select-none opacity-30"
              viewBox="0 0 160 160"
              fill="none"
            >
              <circle
                cx="80"
                cy="80"
                r="72"
                stroke="#38BDF8"
                strokeWidth="1"
                strokeDasharray="8 8"
              />
            </svg>

            {/* 3D Magnetic Emblem */}
            <motion.div
              ref={emblemRef}
              onMouseMove={handleEmblemMove}
              onMouseLeave={handleEmblemLeave}
              style={{
                rotateX: springTiltX,
                rotateY: springTiltY,
                transformStyle: 'preserve-3d',
              }}
              className="relative z-10 flex h-28 w-28 cursor-pointer items-center justify-center sm:h-36 sm:w-36 transition-transform hover:scale-105"
            >
              <img
                src="/assets/logo.png"
                alt="Zora Solutions Emblem"
                className="h-full w-full object-contain filter drop-shadow-[0_10px_25px_rgba(14,165,233,0.35)]"
              />
            </motion.div>
          </div>

          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-3 max-w-5xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[1.08]"
          >
            Turn Your Ideas into{' '}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              Digital Reality
            </span>
          </motion.h1>

          {/* Hero Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-slate-200 sm:text-xl"
          >
            We engineer custom web applications, e-commerce storefronts, and bespoke software systems
            with structured milestones, fixed timelines, and full source code ownership.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#configurator"
              className="group relative inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-display text-base font-extrabold text-[#030712] shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100"
            >
              <Rocket className="h-5 w-5 text-sky-600 transition-colors group-hover:text-[#030712]" />
              <span>Start Your Project</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center gap-2.5 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-display text-base font-semibold text-white transition-all hover:border-white hover:bg-white hover:text-[#030712]"
            >
              <Layers className="h-5 w-5 text-[#00F0FF] group-hover:text-[#030712]" />
              <span>See Our Work</span>
            </a>

            <a
              href="https://wa.me/94777321165?text=Hi%20Zora%20Solutions!%20I%20would%20like%20to%20discuss%20a%20digital%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/50 bg-emerald-400/15 px-5 py-4 font-mono text-xs font-bold text-emerald-200 transition-all hover:border-emerald-300 hover:bg-emerald-400 hover:text-[#030712]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>

          {/* Simple Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-200 sm:gap-6"
          >
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>100% Custom &amp; Mobile-Friendly</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
              <Zap className="h-4 w-4 text-sky-400" />
              <span>Sub-40ms TTFB &amp; Fast Launch</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Direct Support from Panduka &amp; Dilum</span>
            </div>
          </motion.div>

          {/* =========================================================================
              FUTURISTIC 3D SYSTEM COCKPIT (INTERACTIVE LIVE PREVIEW CENTERPIECE)
              Completely eliminates "blankness" with rich interactive engineering UI
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 w-full max-w-5xl rounded-3xl border border-sky-500/30 bg-[#081024]/90 p-4 sm:p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden"
          >
            {/* Top Browser Window Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-2 font-mono text-xs text-slate-300 hidden sm:inline-block">
                  zorasolutions.com/live-architecture
                </span>
              </div>

              {/* View Switcher Pills */}
              <div className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/90 p-1">
                {[
                  { id: 'architecture', label: 'Architecture Nodes', icon: Cpu },
                  { id: 'capabilities', label: 'Live Telemetry', icon: TrendingUp },
                  { id: 'deliverables', label: 'Production SLA', icon: Layers },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = cockpitView === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setCockpitView(item.id as typeof cockpitView)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1 font-mono text-[11px] font-semibold transition-all ${
                        active
                          ? 'bg-sky-500 text-slate-950 font-bold shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4 Quick Telemetry Cards */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-sky-500/20 bg-sky-950/20 p-3.5 text-left">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">System Uptime</span>
                </div>
                <div className="mt-1 font-display text-lg font-bold text-white sm:text-xl">99.99%</div>
                <div className="text-[11px] text-sky-400">Global Edge SLA</div>
              </div>

              <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-3.5 text-left">
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Average Launch</div>
                <div className="mt-1 font-display text-lg font-bold text-white sm:text-xl">14–21 Days</div>
                <div className="text-[11px] text-indigo-400">Milestone Driven</div>
              </div>

              <div className="rounded-2xl border border-teal-500/20 bg-teal-950/20 p-3.5 text-left">
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Code Quality</div>
                <div className="mt-1 font-display text-lg font-bold text-white sm:text-xl">100% Owned</div>
                <div className="text-[11px] text-teal-400">Zero Lock-In</div>
              </div>

              <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-3.5 text-left">
                <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Direct Founders</div>
                <div className="mt-1 font-display text-lg font-bold text-white sm:text-xl">24/7 Access</div>
                <div className="text-[11px] text-amber-400">Panduka &amp; Dilum</div>
              </div>
            </div>

            {/* Dynamic Cockpit View */}
            {cockpitView === 'architecture' && (
              <div className="mt-5 rounded-2xl border border-slate-700/60 bg-[#060D1E] p-4 sm:p-5 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-mono text-xs text-sky-400 font-semibold uppercase">
                    Core Technical Architecture Pipeline
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">Live Blueprint View</span>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3.5 hover:border-sky-500 transition-colors">
                    <div className="font-mono text-xs font-bold text-sky-400">01. Frontend Tier</div>
                    <div className="mt-1 text-sm font-bold text-white">Next.js 15 &amp; React 19</div>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      Server Components, sub-second route transitions, and responsive mobile-first UI.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3.5 hover:border-indigo-500 transition-colors">
                    <div className="font-mono text-xs font-bold text-indigo-400">02. Backend &amp; DB</div>
                    <div className="mt-1 text-sm font-bold text-white">MongoDB Atlas &amp; REST APIs</div>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      Secure JWT authentication, high-throughput database queries, and automatic backups.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3.5 hover:border-teal-500 transition-colors">
                    <div className="font-mono text-xs font-bold text-teal-400">03. Production Edge</div>
                    <div className="mt-1 text-sm font-bold text-white">Unified Vercel Host</div>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                      Same-host deployment with sub-40ms TTFB worldwide, automatic SSL, and zero CORS overhead.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {cockpitView === 'capabilities' && (
              <div className="mt-5 rounded-2xl border border-slate-700/60 bg-[#060D1E] p-4 sm:p-5 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-mono text-xs text-indigo-400 font-semibold uppercase">
                    Live Performance Benchmarks
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">Audited Specifications</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3">
                    <div className="font-mono text-[10px] text-slate-400 uppercase">Lighthouse Performance</div>
                    <div className="mt-1 font-display text-xl font-bold text-emerald-400">99 / 100</div>
                    <div className="text-[10px] text-slate-500">Google Verified</div>
                  </div>
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3">
                    <div className="font-mono text-[10px] text-slate-400 uppercase">First Contentful Paint</div>
                    <div className="mt-1 font-display text-xl font-bold text-sky-400">&lt; 0.6s</div>
                    <div className="text-[10px] text-slate-500">Instant Loading</div>
                  </div>
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3">
                    <div className="font-mono text-[10px] text-slate-400 uppercase">Mobile Optimization</div>
                    <div className="mt-1 font-display text-xl font-bold text-teal-400">100% Score</div>
                    <div className="text-[10px] text-slate-500">All Viewports</div>
                  </div>
                  <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3">
                    <div className="font-mono text-[10px] text-slate-400 uppercase">Security Rating</div>
                    <div className="mt-1 font-display text-xl font-bold text-amber-400">Grade A+</div>
                    <div className="text-[10px] text-slate-500">Encrypted Endpoints</div>
                  </div>
                </div>
              </div>
            )}

            {cockpitView === 'deliverables' && (
              <div className="mt-5 rounded-2xl border border-slate-700/60 bg-[#060D1E] p-4 sm:p-5 text-left">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-mono text-xs text-teal-400 font-semibold uppercase">
                    Production SLA &amp; Guarantees
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">Contractual Terms</span>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-xs text-slate-200">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Fixed-price Statement of Work with zero hidden cost surges</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-xs text-slate-200">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Full Git repository access and copyright transfer upon go-live</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-xs text-slate-200">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>Dedicated WhatsApp channel with &lt; 2-hour response time</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-xs text-slate-200">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>30-Day post-launch warranty and bug-fix support included</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* USER-FRIENDLY INTERACTIVE COMPANY AT-A-GLANCE SHOWCASE */}
        <div className="mt-14 sm:mt-16">
          <div className="relative mx-auto max-w-6xl rounded-3xl border border-white/25 bg-gradient-to-b from-[#0A1428] to-[#040914] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.75)] sm:p-8">
            {/* Top Edge Highlight */}
            <div className="pointer-events-none absolute -top-px left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />

            {/* Friendly Top Bar: Clear Company Introduction & Simple 3-Tab Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300">
                  WELCOME TO ZORA SOLUTIONS
                </span>
                <h2 className="mt-0.5 font-display text-xl font-bold text-white sm:text-2xl">
                  Everything Your Business Needs to Succeed Online
                </h2>
              </div>

              {/* Simple, Everyday Visitor Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-white/15 bg-[#030712] p-1.5">
                {[
                  { id: 'services', label: 'What We Build', icon: Layers },
                  { id: 'why-us', label: 'Why Choose Us', icon: HeartHandshake },
                  { id: 'how-it-works', label: '3 Simple Steps', icon: Rocket },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2 font-display text-xs font-bold transition-all sm:text-sm ${
                        active
                          ? 'bg-white text-[#030712] shadow-[0_0_20px_rgba(255,255,255,0.4)]'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Body: Left Friendly Company Summary Card + Right Interactive Tab Content */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left Column: Crisp Pearl-White "About Zora Solutions" Card */}
              <div className="flex flex-col justify-between rounded-2xl border border-white bg-gradient-to-br from-white via-[#F8FAFC] to-[#E2E8F0] p-6 text-[#0F172A] shadow-lg lg:col-span-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#0051FF]">
                      ABOUT OUR COMPANY
                    </span>
                    <span className="rounded-full bg-amber-400 px-3 py-0.5 font-mono text-[11px] font-extrabold text-[#030712]">
                      SRI LANKA & GLOBAL
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#040B1A] p-4 text-white shadow-md">
                    <img
                      src="/assets/logo.png"
                      alt="Zora Solutions Logo"
                      className="h-14 w-14 object-contain"
                    />
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        Zora Solutions
                      </h3>
                      <p className="text-xs text-amber-300">
                        Your Trusted Digital Partner
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-700">
                    Whether you are starting a new brand, opening an online store, or upgrading your
                    company software, we handle everything from design to launch.
                  </p>

                  <div className="mt-5 space-y-2.5 border-t border-slate-200 pt-4">
                    {[
                      'Easy-to-use websites & mobile apps',
                      'Tailor-made for your budget & goals',
                      'Friendly, direct support whenever you need',
                    ].map((point) => (
                      <div key={point} className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0051FF]" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Quick Call / WhatsApp Box inside Left Card */}
                <div className="mt-6 rounded-xl bg-[#040B1A] p-4 text-white">
                  <div className="font-mono text-[11px] font-bold uppercase text-amber-300">
                    Talk Directly With Us:
                  </div>
                  <div className="mt-2 flex flex-col gap-1.5 font-mono text-xs">
                    <a href="tel:+94777321165" className="hover:text-[#00F0FF]">
                      Panduka: <strong>+94 777 321 165</strong>
                    </a>
                    <a href="tel:+94777498608" className="hover:text-amber-300">
                      Dilum: <strong>+94 77 749 8608</strong>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Easy-to-Understand Content for Visitors */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/15 bg-[#040915] p-6 lg:col-span-8">
                {/* TAB 1: WHAT WE BUILD (5 Core Services in Plain Language) */}
                {activeTab === 'services' && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        5 Ways We Help Your Business Grow
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">
                        Choose a single service or a complete digital package tailored to your business:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      {[
                        {
                          title: '1. Modern Websites',
                          desc: 'Fast, mobile-friendly business websites that attract customers and build trust.',
                          icon: Globe,
                          white: true,
                        },
                        {
                          title: '2. E-Commerce Online Stores',
                          desc: 'Sell your products online 24/7 with easy card payments & order management.',
                          icon: ShoppingBag,
                          white: false,
                        },
                        {
                          title: '3. Custom Business Software',
                          desc: 'Booking systems, HR/payroll portals, and dashboards built for your workflow.',
                          icon: Cpu,
                          white: false,
                        },
                        {
                          title: '4. Digital Marketing & Branding',
                          desc: 'Logos, social media campaigns, and Google SEO to bring more sales.',
                          icon: TrendingUp,
                          white: true,
                        },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={item.title}
                            href="#services"
                            className={`group flex items-start gap-3.5 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${
                              item.white
                                ? 'border-white bg-white text-[#0F172A] shadow-md'
                                : 'border-white/15 bg-white/5 text-white hover:border-[#00F0FF]'
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                item.white
                                  ? 'bg-[#040B1A] text-[#00F0FF]'
                                  : 'bg-amber-400 text-[#030712]'
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4
                                className={`font-display text-base font-bold ${
                                  item.white ? 'text-[#040B1A]' : 'text-white'
                                }`}
                              >
                                {item.title}
                              </h4>
                              <p
                                className={`mt-1 text-xs leading-relaxed ${
                                  item.white ? 'text-slate-600' : 'text-slate-300'
                                }`}
                              >
                                {item.desc}
                              </p>
                            </div>
                          </a>
                        );
                      })}
                    </div>

                    {/* 5th Service Banner: UI/UX Design + CTA */}
                    <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-500/15 via-[#060D1F] to-[#060D1F] p-4 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-[#030712]">
                          <Layers className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-display text-sm font-bold text-white">
                            5. UI/UX Design & Brand Redesign
                          </h4>
                          <p className="text-xs text-slate-300">
                            Beautiful, easy-to-use designs so your customers love using your website or app.
                          </p>
                        </div>
                      </div>
                      <a
                        href="#configurator"
                        className="shrink-0 rounded-xl bg-white px-4 py-2.5 font-display text-xs font-extrabold text-[#030712] hover:bg-[#00F0FF]"
                      >
                        Get a Free Quote →
                      </a>
                    </div>
                  </div>
                )}

                {/* TAB 2: WHY CHOOSE US (Simple, Clear Numbers & Benefits) */}
                {activeTab === 'why-us' && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        Why Business Owners Choose Zora Solutions
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">
                        We focus on real results, clear communication, and stress-free delivery:
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      {[
                        {
                          number: '45+',
                          label: 'Projects Delivered',
                          sub: 'Websites, Stores & Apps',
                          white: true,
                        },
                        {
                          number: '100%',
                          label: 'On-Time Delivery',
                          sub: 'Clear Milestones',
                          white: false,
                        },
                        {
                          number: '24/7',
                          label: 'Direct Support',
                          sub: 'Call or WhatsApp Us',
                          white: true,
                        },
                        {
                          number: '5-Star',
                          label: 'Client Satisfaction',
                          sub: 'Long-Term Partners',
                          white: false,
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className={`rounded-2xl border p-4 ${
                            stat.white
                              ? 'border-white bg-white text-[#0F172A]'
                              : 'border-white/15 bg-white/5 text-white'
                          }`}
                        >
                          <div
                            className={`font-display text-2xl font-extrabold sm:text-3xl ${
                              stat.white ? 'text-[#0051FF]' : 'text-amber-300'
                            }`}
                          >
                            {stat.number}
                          </div>
                          <div
                            className={`mt-1 font-display text-xs font-bold ${
                              stat.white ? 'text-[#040B1A]' : 'text-white'
                            }`}
                          >
                            {stat.label}
                          </div>
                          <div
                            className={`mt-0.5 text-[11px] ${
                              stat.white ? 'text-slate-600' : 'text-slate-300'
                            }`}
                          >
                            {stat.sub}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                        <h4 className="font-display text-sm font-bold text-amber-300">
                          No Confusing Tech Jargon
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-slate-200">
                          We explain everything in simple language, guide you step by step, and show you
                          live previews as we build.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
                        <h4 className="font-display text-sm font-bold text-[#00F0FF]">
                          Easy to Manage Yourself
                        </h4>
                        <p className="mt-1 text-xs leading-relaxed text-slate-200">
                          Every website and system comes with a simple dashboard so you can easily update
                          products, photos, or bookings.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: 3 SIMPLE STEPS (How Easy It Is to Start) */}
                {activeTab === 'how-it-works' && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white">
                        How We Turn Your Idea into Reality in 3 Easy Steps
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">
                        Starting your project with Zora Solutions is simple and transparent:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {[
                        {
                          step: 'Step 01',
                          title: 'Share Your Idea',
                          desc: 'Tell us what you need via WhatsApp, phone call, or our simple project form below.',
                          white: false,
                        },
                        {
                          step: 'Step 02',
                          title: 'We Build It',
                          desc: 'We design, develop, and show you progress until everything looks and works great.',
                          white: true,
                        },
                        {
                          step: 'Step 03',
                          title: 'Grow Online',
                          desc: 'We launch your website or software and help you attract more customers online.',
                          white: false,
                        },
                      ].map((s) => (
                        <div
                          key={s.step}
                          className={`rounded-2xl border p-5 ${
                            s.white
                              ? 'border-white bg-white text-[#0F172A] shadow-lg'
                              : 'border-white/15 bg-white/5 text-white'
                          }`}
                        >
                          <span
                            className={`font-mono text-xs font-extrabold uppercase ${
                              s.white ? 'text-[#0051FF]' : 'text-amber-300'
                            }`}
                          >
                            {s.step}
                          </span>
                          <h4
                            className={`mt-2 font-display text-lg font-extrabold ${
                              s.white ? 'text-[#040B1A]' : 'text-white'
                            }`}
                          >
                            {s.title}
                          </h4>
                          <p
                            className={`mt-2 text-xs leading-relaxed ${
                              s.white ? 'text-slate-700' : 'text-slate-300'
                            }`}
                          >
                            {s.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/5 p-4">
                      <span className="text-xs font-medium text-slate-200">
                        Ready to discuss your idea? Reach our founders directly right now:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href="tel:+94777321165"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 font-mono text-xs font-extrabold text-[#030712] hover:bg-[#00F0FF]"
                        >
                          <PhoneCall className="h-3.5 w-3.5" />
                          <span>Call Panduka</span>
                        </a>
                        <a
                          href="tel:+94777498608"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 font-mono text-xs font-extrabold text-[#030712] hover:bg-amber-300"
                        >
                          <PhoneCall className="h-3.5 w-3.5" />
                          <span>Call Dilum</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
