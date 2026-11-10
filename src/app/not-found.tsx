'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 transition-colors dark:bg-[#090D16] dark:text-white">
      <Navbar />

      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Error 404
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold sm:text-5xl">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-md text-sm text-slate-600 dark:text-slate-300">
          The requested page could not be located. Explore our core services or return to the main portal.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 font-display text-xs font-bold text-white transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 font-display text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <span>Explore Services</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
