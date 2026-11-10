'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
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
      className="relative w-full overflow-hidden pt-28 pb-24 sm:pt-36"
    >
      {/* Multi-Spectrum Ambient Horizon */}
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid bg-[size:56px_56px] opacity-30" />
      <div
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[560px] w-[1100px] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,255,255,0.10) 0%, rgba(0,240,255,0.14) 32%, rgba(255,184,0,0.08) 58%, transparent 80%)',
        }}
      />

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
          {/* Interactive Magnetic Hero Logo Emblem */}
          <motion.div
            ref={emblemRef}
            onMouseMove={handleEmblemMove}
            onMouseLeave={handleEmblemLeave}
            style={{
              rotateX: springTiltX,
              rotateY: springTiltY,
              transformStyle: 'preserve-3d',
            }}
            className="group relative mb-7 flex h-28 w-28 cursor-pointer items-center justify-center rounded-3xl border border-white/35 bg-gradient-to-b from-white/15 to-[#060D1F]/90 p-4 shadow-[0_0_50px_rgba(0,240,255,0.3)] sm:h-32 sm:w-32"
          >
            <span className="pointer-events-none absolute -inset-2 rounded-[26px] border border-dashed border-amber-300/35" />
            <span className="pointer-events-none absolute -inset-1 rounded-[24px] border border-white/25" />

            <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
              <motion.span
                style={{ x: springSheen }}
                className="absolute inset-y-0 w-16 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
            </span>

            <img
              src="/assets/logo.png"
              alt="Zora Solutions 3D Z Emblem"
              className="h-full w-full object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.65)]"
            />
          </motion.div>

          {/* Tagline Pill — "Crafting Digital Solutions" */}
          <div className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-r from-[#FFB800] via-white to-[#00F0FF] p-[1.5px] shadow-[0_0_30px_rgba(255,255,255,0.18)] transition-transform duration-200 hover:scale-[1.03]">
            <div className="relative flex items-center justify-center rounded-full bg-[#050C1E] px-6 py-2">
              <span className="bg-gradient-to-r from-white via-[#00F0FF] to-amber-300 bg-clip-text font-mono text-xs font-bold uppercase tracking-[0.22em] text-transparent">
                Crafting Digital Solutions
              </span>
            </div>
          </div>

          {/* Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 max-w-5xl font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl lg:leading-[1.08]"
          >
            Turn Your Ideas into{' '}
            <span className="bg-gradient-to-r from-white via-[#00F0FF] to-amber-300 bg-clip-text text-transparent">
              Digital Reality
            </span>
          </motion.h1>

          {/* Hero Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-slate-200 sm:text-xl"
          >
            We build modern, reliable, and creative digital solutions to help you and your business
            grow online.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#configurator"
              className="group relative inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-display text-base font-extrabold text-[#030712] shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.02] hover:bg-[#00F0FF]"
            >
              <Sparkles className="h-5 w-5 text-amber-500 transition-colors group-hover:text-[#030712]" />
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
              className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/50 bg-amber-400/15 px-5 py-4 font-mono text-xs font-bold text-amber-200 transition-all hover:border-amber-300 hover:bg-amber-400 hover:text-[#030712]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>

          {/* Simple, Easy-to-Understand Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-200 sm:gap-6"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
              <ShieldCheck className="h-4 w-4 text-amber-400" />
              <span>100% Custom & Mobile-Friendly</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
              <Zap className="h-4 w-4 text-[#00F0FF]" />
              <span>Fast, Reliable & On-Time Delivery</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Direct Support from Panduka & Dilum</span>
            </div>
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
                          <Sparkles className="h-5 w-5" />
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
