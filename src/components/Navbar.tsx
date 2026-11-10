'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { Menu, X, ShieldCheck, Calculator } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);

  // Lightweight passive scroll listener (Zero per-frame style interpolation overhead!)
  useEffect(() => {
    const handleScroll = () => {
      const scrolledNow = window.scrollY > 40;
      setIsScrolled((prev) => (prev !== scrolledNow ? scrolledNow : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D Magnetic Hover Physics on Logo
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sheenX = useMotionValue(-100);

  const springRotateX = useSpring(rotateX, { stiffness: 260, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 260, damping: 20 });
  const springSheenX = useSpring(sheenX, { stiffness: 180, damping: 22 });

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    rotateX.set(-deltaY * 16);
    rotateY.set(deltaX * 16);
    sheenX.set(((e.clientX - rect.left) / rect.width) * 200 - 50);
  };

  const handleLogoMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    sheenX.set(-100);
  };

  const navLinks = [
    { label: 'Our Services', href: '#services' },
    { label: 'Our Work', href: '#portfolio' },
    { label: 'How We Work', href: '#workflow' },
    { label: 'Contact Us', href: '#configurator' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 sm:px-8">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-colors duration-200 sm:px-6 ${
          isScrolled
            ? 'border-white/25 bg-[#050B1A]/95 shadow-[0_12px_40px_rgba(0,0,0,0.7)]'
            : 'border-white/15 bg-[#060D1F]/90'
        }`}
      >
        {/* 3D Magnetic Brand Logo with Specular Light Sweep */}
        <motion.a
          ref={logoRef}
          href="#hero"
          onMouseMove={handleLogoMouseMove}
          onMouseLeave={handleLogoMouseLeave}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: 'preserve-3d',
          }}
          className="group relative flex items-center gap-3.5 rounded-xl px-2 py-1 perspective-1000"
        >
          {/* Specular Light Sweep Overlay */}
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
            <motion.span
              style={{ x: springSheenX }}
              className="absolute inset-y-0 w-12 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            />
          </span>

          <div
            className={`relative flex h-11 w-11 items-center justify-center rounded-xl border p-1.5 transition-all duration-300 ${
              isScrolled
                ? 'border-white/40 bg-white/10 shadow-[0_0_20px_rgba(0,240,255,0.35)]'
                : 'border-[#00F0FF]/40 bg-[#02050D]/90'
            }`}
          >
            <img
              src="/assets/logo.png"
              alt="Zora Solutions Logo"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                Zora <span className="text-[#00F0FF]">Solutions</span>
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300/90">
              Crafting Digital Solutions
            </span>
          </div>
        </motion.a>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative rounded-xl px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:text-white"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-1 left-4 right-4 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#FFFFFF] via-[#00F0FF] to-[#FFB800] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        {/* Right Action Hub — Highlighted "Build Estimate" + CMS Access */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#quote-builder"
            className="inline-flex items-center gap-2 rounded-xl border border-[#00F0FF]/80 bg-[#00F0FF]/10 px-4 py-2 font-display text-xs font-extrabold tracking-wide text-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-colors hover:bg-[#00F0FF] hover:text-[#040914]"
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>Build Estimate</span>
          </a>

          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 font-mono text-xs text-white transition-all hover:border-amber-400/60 hover:bg-amber-400/10 hover:text-amber-300"
            title="Admin CMS Portal"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
            <span>CMS</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5 text-[#00F0FF]" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/25 bg-[#060D1F]/95 p-5 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-display text-sm font-medium text-white hover:border-[#00F0FF]/50 hover:text-[#00F0FF]"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#quote-builder"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#00F0FF] bg-[#00F0FF]/15 py-3 font-display text-sm font-extrabold text-[#00F0FF]"
              >
                <Calculator className="h-4 w-4" />
                <span>Build Estimate</span>
              </a>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 py-2.5 font-mono text-xs text-slate-300"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                Admin CMS Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
