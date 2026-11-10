'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import PageHeader from '@/components/PageHeader';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import { INITIAL_PROJECTS, type SeedProjectItem } from '@/lib/seedData';
import {
  ExternalLink,
  X,
  CheckCircle2,
  ArrowRight,
  Calculator,
  MessageCircle,
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

      {/* 3D Scroll Portal & Client Projects Showcase Component */}
      <section className="relative z-10 -mt-6">
        <PortfolioShowcase initialProjects={INITIAL_PROJECTS} />
      </section>

      {/* Archive & Detailed Case Study Index */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
            <div>
              <span className="font-mono text-xs font-semibold tracking-wider text-sky-600 dark:text-sky-400 uppercase">
                Filter Production Archive
              </span>
              <h3 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
                All Delivered Systems
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                onClick={() => setActiveProject(project)}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-matte-sm transition-all hover:border-slate-300 hover:shadow-matte-md dark:border-slate-800 dark:bg-[#0B101B] dark:hover:border-slate-700 dark:shadow-matte-dark cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-md bg-white/95 px-2.5 py-1 font-mono text-[10px] font-bold text-slate-900 shadow-sm backdrop-blur-sm dark:bg-slate-900/95 dark:text-slate-100">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                      {project.clientName}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-bold text-slate-900 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 p-5 pt-3 dark:border-slate-800/80">
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
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
                  <div className="flex items-center justify-between font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>{project.completionDate}</span>
                    <span className="inline-flex items-center gap-1 text-sky-600 group-hover:underline dark:text-sky-400">
                      Inspect Specs <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Case Study Detail Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#0B101B] sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                  {activeProject.clientName} • {activeProject.category}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white">
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

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase text-slate-900 dark:text-slate-200">
                  Project Overview
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {activeProject.summary}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase text-slate-900 dark:text-slate-200">
                  Key Deliverables &amp; Outcomes
                </h4>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {activeProject.impactMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-600 dark:text-sky-400" />
                      <span>
                        <strong>{metric.label}:</strong> {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase text-slate-900 dark:text-slate-200">
                  Technical Architecture
                </h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {activeProject.techStack.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 font-display text-xs font-semibold text-slate-800 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
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
                  <span>Build Similar System</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <FloatingWhatsAppButton />
    </main>
  );
}
