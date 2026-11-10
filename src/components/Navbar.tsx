'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ShieldCheck,
  Calculator,
  Sun,
  Moon,
  Briefcase,
  Layers,
  Clock,
  PhoneCall,
  Home,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrolledNow = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolledNow ? scrolledNow : prev));

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Services', href: '/services', icon: Layers },
    { label: 'Portfolio', href: '/projects', icon: Briefcase },
    { label: 'How We Work', href: '/process', icon: Clock },
    { label: 'Contact Us', href: '/contact', icon: PhoneCall },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-2.5 pt-2.5 sm:px-6 sm:pt-3.5 lg:px-8">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-200 sm:px-6 sm:py-2.5 ${
          isScrolled
            ? 'border-slate-200/90 bg-white/95 shadow-matte-md dark:border-slate-800/90 dark:bg-[#0C121E]/95 dark:shadow-matte-dark backdrop-blur-md'
            : 'border-slate-200/60 bg-white/80 dark:border-slate-800/60 dark:bg-[#0B101B]/85 backdrop-blur-sm'
        }`}
      >
        {/* Brand Logo - Crisp, Clearly Visible Without Box or Fill Effect */}
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3 py-0.5 transition-transform hover:scale-[1.02]"
        >
          <img
            src="/assets/logo.png"
            alt="Zora Solutions Logo"
            className="h-9 w-9 sm:h-11 sm:w-11 shrink-0 object-contain drop-shadow-md select-none"
          />

          <div className="flex min-w-0 flex-col">
            <span className="truncate font-display text-base font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white">
              Zora Solutions
            </span>
            <span className="truncate font-mono text-[9px] uppercase tracking-wider text-slate-500 sm:text-[10px] sm:tracking-[0.16em] dark:text-slate-400 font-medium">
              Crafting Digital Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-xl px-3.5 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-100 text-sky-600 dark:bg-slate-800/80 dark:text-sky-400'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1.5 left-3.5 right-3.5 h-[2px] rounded-full bg-sky-600 dark:bg-sky-400" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Actions: Estimate, Theme Toggle & Admin */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Build Estimate Button */}
          <Link
            href="/estimate"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-sky-600/30 bg-sky-50 px-3.5 py-2 font-display text-xs font-bold text-sky-700 transition-colors hover:bg-sky-600 hover:text-white dark:border-sky-500/30 dark:bg-sky-950/40 dark:text-sky-300 dark:hover:bg-sky-500 dark:hover:text-slate-950"
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>Build Estimate</span>
          </Link>

          {/* Theme Toggle Button (Light/Dark Mode) */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700" />
              )}
            </button>
          )}

          {/* CMS Admin Link */}
          <Link
            href="/admin"
            className="hidden md:flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 font-mono text-xs font-semibold text-slate-700 transition-colors hover:border-amber-400/50 hover:bg-amber-50 hover:text-amber-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-amber-400/40 dark:hover:bg-amber-400/10 dark:hover:text-amber-300"
            title="Admin CMS Portal"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
            <span>CMS</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-matte-lg dark:border-slate-800 dark:bg-[#0B101B]/95 lg:hidden backdrop-blur-md">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-sky-50 text-sky-600 dark:bg-slate-800 dark:text-sky-400'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <Link
                href="/estimate"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 font-display text-sm font-bold text-white shadow-sm hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
              >
                <Calculator className="h-4 w-4" />
                <span>Build Estimate</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2 font-mono text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
                Admin CMS Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
