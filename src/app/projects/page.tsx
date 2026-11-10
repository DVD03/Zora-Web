'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  TrendingUp,
  Cpu,
  Layers,
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
        description="Explore our track record of high-performance digital systems, enterprise dashboards, luxury e-commerce platforms, and user-centric software."
        breadcrumbs={[{ label: 'Portfolio' }]}
      />

      {/* Projects Showcase */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-5 dark:border-slate-800">
            <span className="mr-2 font-mono text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Filter by Category:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid (Matte Finish) */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                onClick={() => setActiveProject(project)}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-matte-sm transition-all hover:border-slate-300 hover:shadow-matte-md dark:border-slate-800 dark:bg-[#0F172A] dark:hover:border-slate-700 dark:shadow-matte-dark cursor-pointer"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 rounded-lg border border-slate-200/80 bg-white/90 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-800 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-200">
                      {project.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
                      Client: {project.clientName}
                    </div>
                    <h3 className="mt-1 font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {project.summary}
                    </p>

                    {/* Impact Metrics Pills */}
                    {project.impactMetrics && project.impactMetrics.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                        {project.impactMetrics.slice(0, 2).map((metric, mIdx) => (
                          <div
                            key={mIdx}
                            className="rounded-lg bg-slate-50 p-2 dark:bg-slate-900/60"
                          >
                            <div className="font-display text-xs font-bold text-slate-900 dark:text-white">
                              {metric.value}
                            </div>
                            <div className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with Tech Stack & View */}
                <div className="border-t border-slate-100 p-6 pt-4 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="font-mono text-[10px] text-slate-400">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400">
                    <span>Inspect Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA */}
          <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-100/70 p-8 text-center sm:p-12 dark:border-slate-800 dark:bg-[#0C121E]">
            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Have an ambitious vision ready to build?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              We guide you from initial architecture blueprint to production launch with fixed timelines
              and transparent milestone deliverables.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 font-display text-xs font-bold text-white shadow-sm hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                <span>Start Your Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/estimate"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-display text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <span>Calculate Project Cost</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Detail Modal (Matte Finish) */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-matte-lg dark:border-slate-800 dark:bg-[#0F172A]">
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="inline-block rounded-md bg-sky-100 px-2.5 py-1 font-mono text-xs font-semibold text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
              {activeProject.category}
            </div>

            <h2 className="mt-3 font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              {activeProject.title}
            </h2>
            <div className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
              Client: {activeProject.clientName} • Delivered: {activeProject.completionDate}
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  The Challenge
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {activeProject.challenge}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                  Our Engineering Solution
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {activeProject.solution}
                </p>
              </div>

              {activeProject.impactMetrics && activeProject.impactMetrics.length > 0 && (
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-2">
                    Verified Commercial Impact
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {activeProject.impactMetrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/60"
                      >
                        <div className="font-display text-lg font-bold text-sky-600 dark:text-sky-400">
                          {m.value}
                        </div>
                        <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-2">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.techStack.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
              <Link
                href="/contact"
                onClick={() => setActiveProject(null)}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 font-display text-xs font-bold text-white hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                <span>Request Similar Solution</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 font-mono text-xs text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <FloatingWhatsAppButton />
    </main>
  );
}
