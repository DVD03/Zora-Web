'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ExternalLink,
  X,
  Cpu,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Figma,
  Activity,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { INITIAL_PROJECTS, type SeedProjectItem } from '@/lib/seedData';

interface PortfolioShowcaseProps {
  initialProjects?: SeedProjectItem[];
  onStartSimilarProject?: (category: string) => void;
}

const CATEGORIES = [
  'All',
  'Custom Software Solutions',
  'Web Development',
  'E-commerce Platforms',
  'UI/UX Design',
  'Digital Marketing & Branding',
] as const;

export default function PortfolioShowcase({
  initialProjects = INITIAL_PROJECTS,
  onStartSimilarProject,
}: PortfolioShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<SeedProjectItem | null>(null);

  // Ultra-lightweight scroll portal ref (ZERO SVG masks, capped max scale <= 7.5x so VRAM stays < 4MB!)
  const portalTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portalTrackRef,
    offset: ['start start', 'end end'],
  });

  // Tagline grows cleanly into the glowing 'O' portal and fades out before GPU tile explosion
  const vectorPortalScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.58, 0.85],
    [0.92, 1.15, 3.6, 7.2]
  );

  // Solid opaque stage keeps background 100% hidden until you zoom inside
  const portalGatewayOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.68, 0.82],
    [1, 1, 0.15, 0]
  );

  // Helper UI fades smoothly as zoom begins
  const helperBadgeOpacity = useTransform(scrollYProgress, [0, 0.18, 0.3], [1, 0.7, 0]);

  // "Projects We Made for Our Clients" appears ONLY after zooming inside (zero ghost overlap beforehand!)
  const projectsInsideOpacity = useTransform(
    scrollYProgress,
    [0, 0.44, 0.68, 0.86],
    [0, 0, 0.92, 1]
  );
  const projectsInsideScale = useTransform(
    scrollYProgress,
    [0.44, 0.74, 0.92],
    [0.9, 0.98, 1]
  );

  const filteredProjects =
    selectedCategory === 'All'
      ? initialProjects
      : initialProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="relative">
      {/* =====================================================================
          PART 1: SILKY-SMOOTH "YOUR VISION. OUR INNOVATION." PORTAL
          Zero heavy SVG masks, zero giant VRAM tiles, works equally smoothly
          scrolling down OR scrolling back up from footer to header!
         ===================================================================== */}
      <div ref={portalTrackRef} className="relative h-[175vh] w-full">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#02050D]">
          {/* LAYER A: Revealed cleanly ONLY after scrolling inside */}
          <motion.div
            style={{
              opacity: projectsInsideOpacity,
              scale: projectsInsideScale,
            }}
            className="gpu-accelerated relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center px-4 sm:px-8"
          >
            <div className="relative z-10 text-center">
              <h2 className="font-portal text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Projects We Made for{' '}
                <span className="text-sky-400">
                  Our Clients
                </span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
                Real websites, online stores, and custom business software designed and delivered by
                Zora Solutions.
              </p>
            </div>

            {/* 3 Featured Client Projects Spotlight Revealed Inside (1 featured card on mobile so nothing clips in h-screen; all 3 on desktop!) */}
            <div className="relative z-10 mt-6 grid w-full max-w-6xl grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-5">
              {initialProjects.slice(0, 3).map((proj, i) => {
                const isCenterCard = i === 1;
                return (
                  <div
                    key={proj._id || proj.slug}
                    onClick={() => setActiveProject(proj)}
                    className={`group cursor-pointer overflow-hidden rounded-2xl border p-4 transition-transform duration-200 hover:-translate-y-1 ${
                      i > 0 ? 'hidden sm:block' : ''
                    } ${
                      isCenterCard
                        ? 'border-white bg-white text-[#030712] shadow-2xl'
                        : 'border-white/25 bg-[#071022] text-white hover:border-[#00F0FF]'
                    }`}
                  >
                    <div
                      className={`relative h-36 w-full overflow-hidden rounded-xl ${
                        proj.thumbnailUrl.includes('apex-agencies') ? 'bg-[#323539]' : 'bg-[#02050D]'
                      }`}
                    >
                      <img
                        src={proj.thumbnailUrl}
                        alt={proj.title}
                        loading="eager"
                        decoding="async"
                        className={`h-full w-full ${
                          proj.thumbnailUrl.includes('apex-agencies')
                            ? 'object-contain p-2'
                            : 'object-cover object-top'
                        }`}
                      />
                      <span className="absolute top-2.5 left-2.5 rounded-lg bg-white px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-[#030712] shadow">
                        {proj.category}
                      </span>
                      {proj.completionDate.toLowerCase().includes('ongoing') && (
                        <span className="absolute top-2.5 right-2.5 rounded-lg bg-amber-400 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-[#030712] shadow">
                          Ongoing Project
                        </span>
                      )}
                    </div>
                    <div className="mt-3.5">
                      <div
                        className={`font-mono text-[11px] font-bold uppercase ${
                          isCenterCard ? 'text-[#0051FF]' : 'text-amber-300'
                        }`}
                      >
                        {proj.clientName}
                      </div>
                      <div
                        className={`mt-0.5 font-display text-base font-extrabold ${
                          isCenterCard ? 'text-[#030712]' : 'text-white'
                        }`}
                      >
                        {proj.title}
                      </div>
                      <p
                        className={`mt-1 line-clamp-2 text-xs ${
                          isCenterCard ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        {proj.summary}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* LAYER B: SOLID OPAQUE TAGLINE STAGE ("YOUR VISION. OUR INNOVATION.")
              Lightweight HTML/SVG without any massive DOM masks so GPU framerate stays locked! */}
          <motion.div
            style={{
              opacity: portalGatewayOpacity,
            }}
            className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden bg-[#02050D]"
          >
            {/* Pre-composited Radial Horizon Glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 52%, rgba(14, 42, 92, 0.85) 0%, rgba(5, 13, 33, 0.95) 45%, #02050D 78%)',
              }}
            />

            {/* Lightweight Zooming Vector Wordmark (Max scale 7.2x, tiny 1000x340 box = zero VRAM lag) */}
            <motion.div
              style={{
                scale: vectorPortalScale,
                transformOrigin: '50% 62%',
              }}
              className="gpu-accelerated relative z-10 flex w-full max-w-5xl items-center justify-center px-4 select-none"
            >
              <svg
                viewBox="0 0 1000 320"
                className="h-auto w-full overflow-visible"
                aria-label="Your Vision. Our Innovation."
              >
                <defs>
                  <linearGradient id="zoraVisionWhiteCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#E0F7FF" />
                    <stop offset="100%" stopColor="#00F0FF" />
                  </linearGradient>
                  <linearGradient id="zoraGoldCream" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFE58F" />
                    <stop offset="50%" stopColor="#FFB800" />
                    <stop offset="100%" stopColor="#FFFFFF" />
                  </linearGradient>
                  <linearGradient id="zoraPortalRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="48%" stopColor="#00F0FF" />
                    <stop offset="100%" stopColor="#FFB800" />
                  </linearGradient>
                </defs>

                {/* Subtle Luxury Ring */}
                <circle
                  cx="500"
                  cy="218"
                  r="130"
                  fill="none"
                  stroke="#00F0FF"
                  strokeOpacity="0.18"
                  strokeWidth="1"
                  strokeDasharray="6 8"
                />

                {/* LINE 1: YOUR VISION. */}
                <text
                  x="500"
                  y="108"
                  textAnchor="middle"
                  fill="url(#zoraVisionWhiteCyan)"
                  fontFamily="'Syne', 'Space Grotesk', sans-serif"
                  fontWeight="800"
                  fontSize="76"
                  letterSpacing="-1"
                >
                  YOUR VISION.
                </text>

                {/* Accent Line */}
                <line
                  x1="360"
                  y1="138"
                  x2="640"
                  y2="138"
                  stroke="url(#zoraGoldCream)"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />

                {/* LINE 2 LEFT: OUR INN */}
                <text
                  x="442"
                  y="244"
                  textAnchor="end"
                  fontFamily="'Syne', 'Space Grotesk', sans-serif"
                  fontWeight="800"
                  fontSize="70"
                  letterSpacing="-1"
                >
                  <tspan fill="url(#zoraGoldCream)">OUR </tspan>
                  <tspan fill="#FFFFFF">INN</tspan>
                </text>

                {/* THE PORTAL LETTER 'O' */}
                <circle
                  cx="500"
                  cy="218"
                  r="38"
                  fill="#040D20"
                  stroke="url(#zoraPortalRing)"
                  strokeWidth="10"
                />
                <circle
                  cx="500"
                  cy="218"
                  r="48"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeOpacity="0.25"
                  strokeWidth="1.5"
                />

                {/* LINE 2 RIGHT: VATION. */}
                <text
                  x="558"
                  y="244"
                  textAnchor="start"
                  fill="url(#zoraVisionWhiteCyan)"
                  fontFamily="'Syne', 'Space Grotesk', sans-serif"
                  fontWeight="800"
                  fontSize="70"
                  letterSpacing="-1"
                >
                  VATION.
                </text>
              </svg>
            </motion.div>

            {/* Bottom Call-to-Scroll */}
            <motion.div
              style={{ opacity: helperBadgeOpacity }}
              className="relative z-10 mt-10 flex flex-col items-center gap-2.5 px-4 text-center"
            >
              <p className="max-w-md font-sans text-xs font-medium text-slate-200 sm:text-sm">
                Scroll down to step inside our innovation and explore client projects
              </p>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <span>Scroll down</span>
                <ChevronDown className="h-4 w-4" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* =====================================================================
          PART 2: FULL INTERACTIVE CLIENT PROJECTS SHOWCASE & CASE STUDIES
         ===================================================================== */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 pt-12 pb-28 sm:px-8 sm:pb-32">
        {/* Section Header & Category Filter Bar */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <h2 className="font-portal text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Projects We Made for{' '}
              <span className="text-sky-400">
                Our Clients
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-200 sm:text-base">
              Click any project below to see how we turned our client&apos;s vision into a live,
              high-performing digital product.
            </p>
          </div>

          {/* Filter Pills — Crisp White Active Pill */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl border px-3.5 py-2 font-mono text-xs transition-colors ${
                    active
                      ? 'border-white bg-white font-extrabold text-[#030712] shadow-md'
                      : 'border-white/15 bg-white/5 text-slate-200 hover:border-amber-400/50 hover:text-white'
                  }`}
                >
                  {category === 'Custom Software Solutions'
                    ? 'Custom Software'
                    : category === 'E-commerce Platforms'
                    ? 'E-Commerce'
                    : category === 'Digital Marketing & Branding'
                    ? 'Branding'
                    : category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filterable Client Projects Grid (Balanced 6-col desktop layout so all 4 cards fill rows cleanly!) */}
        <div
          className={`mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 ${
            selectedCategory === 'All' && filteredProjects.length === 4
              ? 'lg:grid-cols-6'
              : 'lg:grid-cols-3'
          }`}
        >
          {filteredProjects.map((project, idx) => {
            const isWhiteCard = idx === 1 || idx === 3;
            const spanClass =
              selectedCategory === 'All' && filteredProjects.length === 4
                ? idx === 0
                  ? 'md:col-span-2 lg:col-span-4'
                  : idx === 1
                  ? 'lg:col-span-2'
                  : 'lg:col-span-3'
                : idx === 0 && selectedCategory === 'All'
                ? 'md:col-span-2 lg:col-span-2'
                : '';

            return (
              <div
                key={project._id || project.slug}
                onClick={() => setActiveProject(project)}
                className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border transition-transform duration-200 hover:-translate-y-1.5 ${spanClass} ${
                  isWhiteCard
                    ? 'border-white bg-white text-[#0F172A] shadow-xl'
                    : 'border-white/20 bg-[#071022] text-white hover:border-[#00F0FF]'
                }`}
              >
                {/* Instant Self-Contained Project Visual Banner */}
                <div
                  className={`relative h-64 w-full overflow-hidden sm:h-72 ${
                    project.thumbnailUrl.includes('apex-agencies') ? 'bg-[#323539]' : 'bg-[#02050D]'
                  }`}
                >
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    loading="eager"
                    decoding="async"
                    className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-105 ${
                      project.thumbnailUrl.includes('apex-agencies')
                        ? 'object-contain pt-4 pb-20'
                        : 'object-cover object-top'
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      isWhiteCard
                        ? 'from-black/75 via-black/20 to-transparent'
                        : 'from-[#071022] via-[#071022]/30 to-transparent'
                    }`}
                  />

                  {/* Top Floating Category & Completion Pill */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="rounded-xl bg-white px-3 py-1 font-mono text-xs font-extrabold text-[#030712] shadow-md">
                      {project.category}
                    </span>
                    <span className="rounded-xl border border-amber-400/50 bg-[#030712]/90 px-3 py-1 font-mono text-xs font-bold text-amber-300">
                      {project.completionDate}
                    </span>
                  </div>

                  {/* Key Metric Strip Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {project.impactMetrics.slice(0, 4).map((metric, mIdx) => (
                      <div
                        key={metric.label}
                        className={`rounded-xl border px-3 py-2 ${
                          mIdx === 0
                            ? 'border-white bg-white text-[#030712]'
                            : 'border-white/20 bg-[#030712]/90 text-white'
                        }`}
                      >
                        <div
                          className={`font-display text-sm font-extrabold sm:text-base ${
                            mIdx === 0 ? 'text-[#0051FF]' : 'text-amber-300'
                          }`}
                        >
                          {metric.value}
                        </div>
                        <div
                          className={`truncate font-mono text-[10px] ${
                            mIdx === 0 ? 'text-slate-700 font-semibold' : 'text-slate-300'
                          }`}
                        >
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Details Body */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div
                      className={`font-mono text-xs font-bold uppercase tracking-wider ${
                        isWhiteCard ? 'text-[#0051FF]' : 'text-amber-300'
                      }`}
                    >
                      {project.clientName}
                    </div>
                    <h3
                      className={`mt-1.5 font-display text-2xl font-extrabold transition-colors ${
                        isWhiteCard
                          ? 'text-[#040B1A] group-hover:text-[#0051FF]'
                          : 'text-white group-hover:text-[#00F0FF]'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`mt-2.5 line-clamp-2 text-sm leading-relaxed ${
                        isWhiteCard ? 'text-slate-700' : 'text-slate-200'
                      }`}
                    >
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech Stack Badges & Inspect Link */}
                  <div
                    className={`mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-4 ${
                      isWhiteCard ? 'border-slate-200' : 'border-white/15'
                    }`}
                  >
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className={`rounded-lg px-2.5 py-1 font-mono text-[11px] font-semibold ${
                            isWhiteCard
                              ? 'bg-slate-100 text-slate-800 border border-slate-300'
                              : 'bg-white/10 text-white border border-white/15'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="rounded-lg bg-amber-400 px-2 py-1 font-mono text-[11px] font-bold text-[#030712]">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.liveUrl && !project.liveUrl.includes('-demo.zorasolutions.lk') && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-[11px] font-extrabold transition-colors ${
                            isWhiteCard
                              ? 'bg-amber-400 text-[#030712] hover:bg-amber-300'
                              : 'border border-amber-400/50 bg-amber-400/15 text-amber-300 hover:bg-amber-400 hover:text-[#030712]'
                          }`}
                        >
                          <span>Live Preview</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}

                      <span
                        className={`inline-flex items-center gap-1 font-mono text-xs font-extrabold ${
                          isWhiteCard ? 'text-[#0051FF]' : 'text-[#00F0FF]'
                        }`}
                      >
                        <span>View Project Details</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CASE STUDY DRAWER / MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#02050D]/90 p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/30 bg-[#060D1F] p-6 shadow-2xl sm:p-10"
            >
              {/* Modal Close Button */}
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="sticky top-2 float-right z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#030712] transition-colors hover:bg-[#00F0FF]"
                aria-label="Close Case Study Modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="pr-12">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-lg bg-white px-3 py-1 font-mono text-xs font-extrabold text-[#030712]">
                    {activeProject.category}
                  </span>
                  <span className="font-mono text-xs text-slate-200">
                    Client: <strong className="text-amber-300">{activeProject.clientName}</strong>
                  </span>
                  <span className="font-mono text-xs text-slate-300">
                    •{' '}
                    {activeProject.completionDate.toLowerCase().includes('ongoing')
                      ? activeProject.completionDate
                      : `Delivered ${activeProject.completionDate}`}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-4xl">
                  {activeProject.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-200">
                  {activeProject.summary}
                </p>
              </div>

              {/* Impact Metrics Banner (Alternating White & Dark Cards) */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {activeProject.impactMetrics.map((m, idx) => (
                  <div
                    key={m.label}
                    className={`rounded-2xl border p-4 text-center ${
                      idx % 2 === 0
                        ? 'border-white bg-white text-[#030712]'
                        : 'border-amber-400/40 bg-[#02050D] text-white'
                    }`}
                  >
                    <div
                      className={`font-display text-2xl font-extrabold sm:text-3xl ${
                        idx % 2 === 0 ? 'text-[#0051FF]' : 'text-amber-300'
                      }`}
                    >
                      {m.value}
                    </div>
                    <div
                      className={`mt-1 font-mono text-xs font-semibold ${
                        idx % 2 === 0 ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Client Challenge & Zora Solution */}
              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-[#02050D] p-6">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                    <Activity className="h-4 w-4" />
                    <span>01. What The Client Needed</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">
                    {activeProject.challenge}
                  </p>
                </div>

                <div className="rounded-2xl border border-white bg-white p-6 text-[#0F172A]">
                  <div className="flex items-center gap-2 font-mono text-xs font-extrabold uppercase tracking-wider text-[#0051FF]">
                    <ShieldCheck className="h-4 w-4" />
                    <span>02. How Zora Solutions Built It</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 font-medium">
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* Interactive System Architecture Diagram */}
              <div className="mt-8 rounded-2xl border border-white/20 bg-[#02050D] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF]">
                    <Cpu className="h-4 w-4" />
                    <span>03. Key Features Delivered</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-amber-300">
                    VERIFIED DELIVERY
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-4">
                  {(
                    activeProject.architectureNodes || [
                      'Modern User Interface',
                      'Secure Login & Roles',
                      'Fast Cloud Backend',
                      'Automated Reports',
                    ]
                  ).map((node, i) => (
                    <div
                      key={node}
                      className="relative flex flex-col justify-between rounded-xl border border-white/20 bg-white/5 p-4"
                    >
                      <div className="font-mono text-[10px] font-bold text-amber-300">
                        STEP 0{i + 1}
                      </div>
                      <div className="mt-1.5 font-display text-sm font-bold text-white">{node}</div>
                      <div className="mt-2 flex items-center gap-1 font-mono text-[10px] text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Completed</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Badges & External Action Links */}
              <div className="mt-8 flex flex-col justify-between gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-center">
                <div>
                  <div className="font-mono text-xs uppercase text-slate-300">
                    Technologies Used:
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeProject.techStack.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg bg-white px-3 py-1 font-mono text-xs font-bold text-[#030712]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#030712]"
                    >
                      <ExternalLink className="h-4 w-4 text-amber-400" />
                      <span>Live Preview</span>
                    </a>
                  )}

                  {activeProject.figmaUrl && (
                    <a
                      href={activeProject.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 font-mono text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#030712]"
                    >
                      <Figma className="h-4 w-4 text-[#00F0FF]" />
                      <span>Design Spec</span>
                    </a>
                  )}

                  <a
                    href="#configurator"
                    onClick={() => {
                      const cat = activeProject.category;
                      setActiveProject(null);
                      onStartSimilarProject?.(cat);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-display text-xs font-extrabold uppercase tracking-wider text-[#030712] shadow-lg hover:bg-[#00F0FF]"
                  >
                    <Layers className="h-4 w-4" />
                    <span>Request a Similar Project</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
