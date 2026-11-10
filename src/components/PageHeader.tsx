import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function PageHeader({
  badge,
  title,
  titleHighlight,
  description,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <div className="relative border-b border-sky-100/90 bg-white pt-24 pb-10 transition-colors dark:border-slate-800 dark:bg-[#0B101B] sm:pt-28 sm:pb-14">
      {/* Subtle Sky Accent Glow in Light Mode */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/70 via-transparent to-transparent opacity-80 dark:opacity-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-3.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 sm:gap-2 dark:text-slate-400">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-sky-600 dark:hover:text-sky-400"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label + idx}>
              <ChevronRight className="h-3 w-3 text-slate-400 dark:text-slate-600" />
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-sky-600 dark:hover:text-sky-400"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-slate-800 dark:text-slate-200">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Clean Category Label */}
        {badge && (
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            {badge}
          </div>
        )}

        {/* Title */}
        <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:mt-4 sm:text-4xl lg:text-5xl dark:text-white">
          {title}{' '}
          {titleHighlight && (
            <span className="text-sky-600 dark:text-sky-400">{titleHighlight}</span>
          )}
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base lg:text-lg dark:text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
}
