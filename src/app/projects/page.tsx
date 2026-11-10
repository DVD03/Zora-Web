'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import PageHeader from '@/components/PageHeader';
import { INITIAL_PROJECTS, type SeedProjectItem } from '@/lib/seedData';
import {
  ExternalLink,
  X,
  CheckCircle2,
  ArrowRight,
  Calculator,
  MessageCircle,
  Clock,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Custom Software Solutions',
  'Web Development',
  'E-commerce Platforms',
  'UI/UX Design',
  'Digital Marketing & Branding',
] as const;

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<SeedProjectItem | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? INITIAL_PROJECTS
      : INITIAL_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#F8FAFC] transition-colors dark:bg-[#090D16]">
      <Navbar />

      <PageHeader
        badge="Verified Production Case Studies"
        title="Engineered Solutions in Production"
        titleHighlight="Measurable Impact"
        description="Explore our track record of high-performance digital systems, enterprise dashboards, luxury e-commerce platforms, and user-centric software delivered for clients."
        breadcrumbs={[{ label: 'Portfolio' }]}
      />

      {/* Main Production Portfolio Section - Soft Light Blue Alternating Section */}
      <section className="border-b border-sky-100 bg-[#F0F7FF] py-10 transition-colors sm:py-16 lg:py-20 dark:border-slate-800 dark:bg-[#070B14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills Bar */}
          <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-sky-200/60 pb-5 md:flex-row md:items-center dark:border-slate-800">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Filter by Capability
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing {filteredProjects.length} delivered systems
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-sm dark:bg-sky-500 dark:text-slate-950'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* High-End Project Showcase Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.015, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
                onClick={() => setActiveProject(project)}
                className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-matte-sm transition-all duration-300 hover:border-sky-400 hover:shadow-matte-lg dark:border-slate-800 dark:bg-[#0C1222] dark:hover:border-sky-500/50 dark:shadow-matte-dark"
              >
                <div>
                  {/* Project Screenshot Cover */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Category Tag Overlay */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="rounded-lg bg-white/95 px-2.5 py-1 font-mono text-[10px] font-bold text-slate-900 shadow-sm backdrop-blur-md dark:bg-slate-900/95 dark:text-slate-100">
                        {project.category}
                      </span>
                    </div>

                    {project.completionDate.toLowerCase().includes('ongoing') && (
                      <div className="absolute top-3.5 right-3.5">
                        <span className="rounded-lg bg-amber-400 px-2 py-0.5 font-mono text-[10px] font-bold text-slate-950 shadow-sm">
                          Active Project
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                      {project.clientName}
                    </div>

                    <h3 className="mt-1 font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-sky-600 sm:text-xl dark:text-white dark:group-hover:text-sky-400">
                      {project.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
                      {project.summary}
                    </p>

                    {/* Key Impact Metric Badge */}
                    {project.impactMetrics && project.impactMetrics.length > 0 && (
                      <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">
                          <strong>{project.impactMetrics[0].label}:</strong> {project.impactMetrics[0].value}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Tech Stack & CTA */}
                <div className="border-t border-slate-100 p-6 pt-4 dark:border-slate-800/80">
                  <div className="mb-3.5 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      {project.completionDate}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sky-600 transition-colors group-hover:text-sky-700 dark:text-sky-400 dark:group-hover:text-sky-300">
                      <span>View Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Conversion Banner - Crisp White Alternating Section */}
      <section className="border-t border-sky-100 bg-white py-14 transition-colors dark:border-slate-800 dark:bg-[#080D1A] sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-sky-100/90 bg-[#F0F7FF]/50 p-8 shadow-matte-sm dark:border-slate-800 dark:bg-[#0C1222] sm:p-10">
            <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Custom Software &amp; Web Systems
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                  Have a Similar Project in Mind?
                </h3>
                <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-slate-300">
                  We engineer modern, high-performance systems with clear milestones and fixed timelines.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/estimate"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-display text-xs font-bold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Calculate Project Cost</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-display text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Consult with Founders</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Case Study Detail Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-md"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 340 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-sky-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#0B101B] sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    {activeProject.clientName} • {activeProject.category}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="rounded-full border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900">
                <img
                  src={activeProject.thumbnailUrl}
                  alt={activeProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                    Project Overview
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {activeProject.summary}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                    Key Outcomes &amp; Impact
                  </h4>
                  <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {activeProject.impactMetrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
                        <span>
                          <strong>{metric.label}:</strong> {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                    Production Tech Stack
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {activeProject.techStack.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  Delivered: {activeProject.completionDate}
                </span>

                <div className="flex gap-2">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 font-display text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <span>Visit Live Site</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2 font-display text-xs font-bold text-white hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Inquire Similar Project</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingWhatsAppButton />
    </main>
  );
}
