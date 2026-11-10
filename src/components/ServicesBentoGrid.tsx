'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  ShoppingBag,
  Cpu,
  TrendingUp,
  ListChecks,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  RotateCw,
  MessageCircle,
  Sliders,
} from 'lucide-react';
import { INITIAL_SERVICES, type SeedServiceItem } from '@/lib/seedData';

interface ServicesBentoGridProps {
  services?: SeedServiceItem[];
  onSelectService?: (serviceTitle: string) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  ShoppingBag,
  Cpu,
  TrendingUp,
  Sparkles: Layers,
};

/**
 * Clean Inline Brand Logos for Social Media Platforms (Zero external icon downloads!)
 */
function SocialPlatformBadges({ lightSurface = false }: { lightSurface?: boolean }) {
  const platforms = [
    {
      name: 'Facebook',
      color: '#1877F2',
      svg: (
        <path
          fill="currentColor"
          d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z"
        />
      ),
    },
    {
      name: 'Instagram',
      color: '#E4405F',
      svg: (
        <path
          fill="currentColor"
          d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z"
        />
      ),
    },
    {
      name: 'TikTok',
      color: '#00F0FF',
      svg: (
        <path
          fill="currentColor"
          d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z"
        />
      ),
    },
    {
      name: 'YouTube',
      color: '#FF0000',
      svg: (
        <path
          fill="currentColor"
          d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.94C17.93 4.8 12 4.8 12 4.8s-5.93 0-7.64.45a2.75 2.75 0 0 0-1.94 1.94A28.7 28.7 0 0 0 2 12a28.7 28.7 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.94c1.71.45 7.64.45 7.64.45s5.93 0 7.64-.45a2.75 2.75 0 0 0 1.94-1.94A28.7 28.7 0 0 0 22 12a28.7 28.7 0 0 0-.42-4.81ZM10 15V9l5.2 3-5.2 3Z"
        />
      ),
    },
    {
      name: 'WhatsApp',
      color: '#25D366',
      svg: (
        <path
          fill="currentColor"
          d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m5.81 13.97c-.24.68-1.41 1.3-1.95 1.38-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5.01-4.36-5.16-4.56-.15-.2-1.23-1.64-1.23-3.13s.78-2.22 1.06-2.52c.28-.3.6-.38.8-.38h.58c.18 0 .44-.07.68.52.25.6.84 2.06.92 2.21.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.31.31-.13.62.18.3.78 1.29 1.68 2.09 1.15 1.03 2.13 1.35 2.43 1.5.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.22.58.35.07.13.07.75-.17 1.43Z"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {platforms.map((p) => (
        <div
          key={p.name}
          className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-[11px] font-bold ${
            lightSurface
              ? 'border-slate-300 bg-[#040B1A] text-white'
              : 'border-white/15 bg-white/10 text-white'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 shrink-0"
            style={{ color: p.color }}
            aria-hidden="true"
          >
            {p.svg}
          </svg>
          <span>{p.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function ServicesBentoGrid({
  services = INITIAL_SERVICES,
  onSelectService,
}: ServicesBentoGridProps) {
  const [inspectedCardIds, setInspectedCardIds] = useState<Record<string, boolean>>({});
  const [selectedSocialTier, setSelectedSocialTier] = useState<
    'Starter Growth' | 'Reels & Scale' | 'Full Brand + Ads'
  >('Starter Growth');

  const toggleInspect = (id: string) => {
    setInspectedCardIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Allow Admin CMS edits to update the Digital Marketing starting price dynamically
  const digitalMarketingSrv = services.find((s) => s.slug === 'digital-marketing-branding');
  const baseSocialPriceLabel =
    digitalMarketingSrv?.packagePrice?.trim() || 'Rs. 10,000 / month';

  const SOCIAL_PACKAGES = [
    {
      id: 'Starter Growth' as const,
      badge: 'MOST POPULAR STARTER',
      title: 'Starter Social Growth Package',
      price: baseSocialPriceLabel,
      note: 'Customisable monthly rate',
      highlightWhite: false,
      features: [
        'Monthly content calendar & planning',
        'Creative post design for your brand',
        'Facebook & Instagram page optimization',
        'Monthly growth check-in via WhatsApp',
      ],
    },
    {
      id: 'Reels & Scale' as const,
      badge: 'HIGH ENGAGEMENT',
      title: 'Social Growth + AI Reels Package',
      price: 'Rs. 18,000 / month',
      note: 'Price adjusts based on video count',
      highlightWhite: true,
      features: [
        'Everything in Starter Social Growth',
        'AI-enhanced promotional Reels & Shorts',
        'TikTok, Instagram Reels & YouTube Shorts',
        'Hashtag & local trend optimization',
      ],
    },
    {
      id: 'Full Brand + Ads' as const,
      badge: 'COMPLETE MARKETING',
      title: 'Full Brand + Paid Ads & WhatsApp',
      price: 'Rs. 25,500+ / month',
      note: 'Ad spend billed separately in USD',
      highlightWhite: false,
      features: [
        'Reels + creative posts across platforms',
        'WhatsApp Channel & customer inbox setup',
        'Targeted Meta (FB/IG) & TikTok Ad Management',
        'Custom pricing scaled to your campaign goals',
      ],
    },
  ];

  const handleSocialWhatsApp = (pkgTitle: string, pkgPrice: string) => {
    const msg = `Hi Zora Solutions! I am interested in your *${pkgTitle}* (${pkgPrice}). Please share how we can customize this Social Media package for my business!`;
    window.open(
      `https://wa.me/94777321165?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle Background Accent Lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="circuitLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#FFB800" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7000FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 100 180 H 520 L 580 240 H 1340"
          stroke="url(#circuitLineGrad)"
          strokeWidth="1.5"
          strokeDasharray="8 8"
        />
        <path
          d="M 180 540 H 720 L 780 480 H 1280"
          stroke="url(#circuitLineGrad)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        {/* Friendly, Clear Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/15 pb-10 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Our Services — Built to{' '}
              <span className="bg-gradient-to-r from-white via-[#00F0FF] to-amber-300 bg-clip-text text-transparent">
                Grow Your Business
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-200 sm:text-base">
            Click{' '}
            <span className="rounded bg-white px-2 py-0.5 font-mono text-xs font-bold text-[#030712]">
              See Full Details
            </span>{' '}
            on any card below to view everything included, or explore our{' '}
            <a href="#social-packages" className="font-bold text-[#00F0FF] underline">
              Social Media Monthly Packages
            </a>{' '}
            right below.
          </p>
        </div>

        {/* High-Contrast Dual-Tone Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-6 lg:grid-cols-12">
          {services.map((service, index) => {
            const IconComponent = ICON_MAP[service.iconName] || Globe;
            const isInspected = Boolean(inspectedCardIds[service._id || service.slug]);
            const isDigitalMarketingCard = service.slug === 'digital-marketing-branding';

            // Feature Cards 0 (Web Dev) and 3 (Digital Marketing) use Crisp Pearl-White High-Contrast Surface
            const isPearlWhiteCard = (index === 0 || index === 3) && !isInspected;

            const colSpanClass =
              index < 3
                ? 'md:col-span-3 lg:col-span-4'
                : 'md:col-span-3 lg:col-span-6';

            return (
              <div
                key={service._id || service.slug}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-8 ${colSpanClass} ${
                  isPearlWhiteCard
                    ? 'border-white bg-gradient-to-br from-white via-[#F8FAFC] to-[#E2E8F0] text-[#0F172A] shadow-xl'
                    : 'border-white/20 bg-gradient-to-b from-[#091326] to-[#030712] text-white shadow-lg hover:border-[#00F0FF]/60'
                }`}
              >
                {/* Top Header Bar: Service Number + Clear Details Toggle */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-110 ${
                          isPearlWhiteCard
                            ? 'border-[#040B1A] bg-[#040B1A] text-[#00F0FF] shadow-md'
                            : 'border-white/25 bg-white/10 text-[#00F0FF]'
                        }`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span
                        className={`font-mono text-xs font-bold uppercase tracking-widest ${
                          isPearlWhiteCard ? 'text-slate-600' : 'text-amber-300'
                        }`}
                      >
                        SERVICE 0{index + 1}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleInspect(service._id || service.slug)}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs font-bold transition-colors ${
                        isInspected
                          ? 'border-amber-400 bg-amber-400 text-[#030712]'
                          : isPearlWhiteCard
                          ? 'border-[#040B1A] bg-[#040B1A] text-white hover:bg-[#0051FF] hover:border-[#0051FF]'
                          : 'border-white/25 bg-white text-[#030712] hover:bg-[#00F0FF] hover:border-[#00F0FF]'
                      }`}
                    >
                      <ListChecks className="h-3.5 w-3.5" />
                      <span>{isInspected ? 'Back to Summary' : 'See Full Details'}</span>
                      <RotateCw
                        className={`h-3 w-3 transition-transform duration-300 ${
                          isInspected ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Animated Content Switch */}
                  <AnimatePresence mode="wait">
                    {!isInspected ? (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="mt-6"
                      >
                        <h3
                          className={`font-display text-2xl font-extrabold transition-colors ${
                            isPearlWhiteCard
                              ? 'text-[#040B1A] group-hover:text-[#0051FF]'
                              : 'text-white group-hover:text-[#00F0FF]'
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p
                          className={`mt-2 font-sans text-sm font-bold ${
                            isPearlWhiteCard ? 'text-[#0051FF]' : 'text-amber-300'
                          }`}
                        >
                          {service.tagline}
                        </p>
                        <p
                          className={`mt-3 text-sm leading-relaxed ${
                            isPearlWhiteCard ? 'text-slate-700' : 'text-slate-200'
                          }`}
                        >
                          {service.description}
                        </p>

                        {/* Social Media Platform Logos on Digital Marketing Card */}
                        {isDigitalMarketingCard && (
                          <div className="mt-4">
                            <SocialPlatformBadges lightSurface={isPearlWhiteCard} />
                          </div>
                        )}

                        {/* What You Get List */}
                        <div
                          className={`mt-6 space-y-2 border-t pt-5 ${
                            isPearlWhiteCard ? 'border-slate-300' : 'border-white/15'
                          }`}
                        >
                          <div
                            className={`font-mono text-[11px] font-bold uppercase tracking-wider ${
                              isPearlWhiteCard ? 'text-slate-600' : 'text-slate-300'
                            }`}
                          >
                            What You Get:
                          </div>
                          {service.deliverables.slice(0, 4).map((item) => (
                            <div
                              key={item}
                              className={`flex items-start gap-2.5 text-xs font-medium ${
                                isPearlWhiteCard ? 'text-slate-800' : 'text-slate-100'
                              }`}
                            >
                              <CheckCircle2
                                className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                                  isPearlWhiteCard ? 'text-[#0051FF]' : 'text-[#00F0FF]'
                                }`}
                              />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="techstack"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="mt-6 rounded-2xl border border-white/25 bg-[#02050D] p-4"
                      >
                        <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                          <span className="font-mono text-xs font-bold uppercase text-[#00F0FF]">
                            {service.title}
                          </span>
                          <span className="font-mono text-[11px] font-bold text-amber-300">
                            CUSTOM BUILT
                          </span>
                        </div>

                        <div className="mt-4">
                          <p className="font-mono text-[11px] uppercase text-slate-300">
                            Tools &amp; Platforms We Use:
                          </p>
                          <div className="mt-2.5 flex flex-wrap gap-2">
                            {service.techStackUsed.map((tech) => (
                              <span
                                key={tech}
                                className="rounded-lg border border-white/20 bg-white px-2.5 py-1 font-mono text-xs font-bold text-[#030712]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 border-t border-white/15 pt-3">
                          <p className="font-mono text-[11px] uppercase text-slate-300">
                            Everything Included:
                          </p>
                          <ul className="mt-2 space-y-1.5 font-sans text-xs text-slate-200">
                            {service.deliverables.map((deliv) => (
                              <li key={deliv} className="flex items-center gap-2">
                                <span className="text-amber-400">▸</span>
                                <span>{deliv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Clean Card Footer */}
                <div
                  className={`mt-7 flex items-center justify-between gap-3 border-t pt-4 ${
                    isPearlWhiteCard ? 'border-slate-300' : 'border-white/15'
                  }`}
                >
                  <span
                    className={`font-sans text-xs font-semibold ${
                      isPearlWhiteCard ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {isDigitalMarketingCard ? `Starts from ${baseSocialPriceLabel}` : 'Tailored to your needs'}
                  </span>

                  <a
                    href={isDigitalMarketingCard ? '#social-packages' : '#configurator'}
                    onClick={() => onSelectService?.(service.title)}
                    className={`inline-flex items-center gap-1.5 font-display text-xs font-extrabold uppercase tracking-wider transition-transform group-hover:translate-x-1 ${
                      isPearlWhiteCard ? 'text-[#0051FF]' : 'text-[#00F0FF]'
                    }`}
                  >
                    <span>{isDigitalMarketingCard ? 'View Social Packages' : 'Request This Service'}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================================================
            DEDICATED SOCIAL MEDIA HANDLING & MONTHLY GROWTH PACKAGES SHOWCASE
            Separate Monthly Package Section inside Our Services with Brand Logos
            & Flexible, Customizable Pricing Starting from Rs. 10,000 / month!
           ===================================================================== */}
        <div
          id="social-packages"
          className="mt-14 rounded-3xl border border-[#00F0FF]/35 bg-gradient-to-b from-[#081329] to-[#030712] p-6 shadow-2xl sm:p-10"
        >
          <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-8 lg:flex-row lg:items-center">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-white sm:text-4xl">
                Social Media Handling &amp;{' '}
                <span className="bg-gradient-to-r from-white via-[#00F0FF] to-amber-300 bg-clip-text text-transparent">
                  Brand Growth Packages
                </span>
              </h3>
              <p className="mt-2.5 max-w-2xl text-sm text-slate-200">
                Grow your brand every month across Facebook, Instagram, TikTok, YouTube &amp; WhatsApp.
                Prices start at <strong className="text-amber-300">{baseSocialPriceLabel}</strong> and
                can be freely adjusted to fit your exact post count, Reels, and ad budget.
              </p>
            </div>

            <div className="flex flex-col items-start gap-2 lg:items-end">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Platforms We Manage For You:
              </span>
              <SocialPlatformBadges />
            </div>
          </div>

          {/* 3 User-Friendly Customizable Social Media Package Cards */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {SOCIAL_PACKAGES.map((pkg) => {
              const isSelected = selectedSocialTier === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedSocialTier(pkg.id)}
                  className={`flex cursor-pointer flex-col justify-between rounded-3xl border p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-7 ${
                    pkg.highlightWhite
                      ? 'border-white bg-gradient-to-br from-white via-[#F8FAFC] to-[#E2E8F0] text-[#0F172A] shadow-2xl'
                      : isSelected
                      ? 'border-[#00F0FF] bg-[#061024] text-white shadow-xl'
                      : 'border-white/20 bg-[#040914] text-white hover:border-[#00F0FF]/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`rounded-lg px-2.5 py-1 font-mono text-[10px] font-extrabold uppercase ${
                          pkg.highlightWhite
                            ? 'bg-[#040B1A] text-[#00F0FF]'
                            : 'bg-amber-400 text-[#040914]'
                        }`}
                      >
                        {pkg.badge}
                      </span>
                    </div>

                    <h4
                      className={`mt-4 font-display text-xl font-extrabold ${
                        pkg.highlightWhite ? 'text-[#040B1A]' : 'text-white'
                      }`}
                    >
                      {pkg.title}
                    </h4>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span
                        className={`font-display text-3xl font-extrabold ${
                          pkg.highlightWhite ? 'text-[#0051FF]' : 'text-[#00F0FF]'
                        }`}
                      >
                        {pkg.price}
                      </span>
                    </div>
                    <p
                      className={`mt-1 font-mono text-[11px] font-semibold ${
                        pkg.highlightWhite ? 'text-slate-600' : 'text-amber-300'
                      }`}
                    >
                      {pkg.note}
                    </p>

                    <div
                      className={`mt-5 space-y-2.5 border-t pt-4 ${
                        pkg.highlightWhite ? 'border-slate-300' : 'border-white/15'
                      }`}
                    >
                      {pkg.features.map((feat) => (
                        <div
                          key={feat}
                          className={`flex items-start gap-2.5 text-xs font-medium ${
                            pkg.highlightWhite ? 'text-slate-800' : 'text-slate-200'
                          }`}
                        >
                          <CheckCircle2
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                              pkg.highlightWhite ? 'text-[#0051FF]' : 'text-[#00F0FF]'
                            }`}
                          />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSocialWhatsApp(pkg.title, pkg.price);
                      }}
                      className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-display text-xs font-extrabold uppercase tracking-wider transition-colors ${
                        pkg.highlightWhite
                          ? 'bg-[#040B1A] text-white hover:bg-[#0051FF]'
                          : 'bg-[#00F0FF] text-[#040914] hover:bg-white'
                      }`}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Book / Customise on WhatsApp</span>
                    </button>

                    <a
                      href="#configurator"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService?.('Digital Marketing & Branding');
                      }}
                      className={`flex w-full items-center justify-center gap-1.5 rounded-xl border py-2.5 font-mono text-[11px] font-bold transition-colors ${
                        pkg.highlightWhite
                          ? 'border-slate-300 bg-white text-[#040B1A] hover:bg-slate-100'
                          : 'border-white/20 bg-white/5 text-slate-200 hover:border-white hover:text-white'
                      }`}
                    >
                      <span>Request Custom Monthly Price</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
