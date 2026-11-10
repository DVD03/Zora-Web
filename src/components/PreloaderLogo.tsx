'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PreloaderLogo() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only run on the very first visit in a session so subsequent visits are instant and zero-lag
    if (typeof window !== 'undefined' && sessionStorage.getItem('zora-visited')) {
      return;
    }
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
      try {
        sessionStorage.setItem('zora-visited', '1');
      } catch {}
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="zora-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
          className="gpu-accelerated fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02050D] select-none overflow-hidden"
        >
          {/* Subtle Cyber Grid Backdrop */}
          <div className="absolute inset-0 bg-cyber-grid bg-[size:48px_48px] opacity-25" />

          {/* Pre-composited Ambient Radial Core (Zero CSS blur filter lag) */}
          <div
            className="pointer-events-none absolute h-[520px] w-[520px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(0,240,255,0.22) 0%, rgba(0,81,255,0.12) 45%, transparent 72%)',
            }}
          />

          {/* Central Holographic Orbital Assembly */}
          <div className="relative flex h-60 w-60 items-center justify-center">
            {/* Outer Rotating Holographic Orbital Ring */}
            <svg
              className="absolute inset-0 h-full w-full animate-orbit-spin"
              viewBox="0 0 240 240"
              fill="none"
            >
              <defs>
                <linearGradient id="zoraOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#0051FF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#7000FF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <circle
                cx="120"
                cy="120"
                r="110"
                stroke="url(#zoraOrbitGrad)"
                strokeWidth="1.5"
                strokeDasharray="120 60 40 60"
              />
            </svg>

            {/* Inner Counter-Rotating Circuit Ring */}
            <svg
              className="absolute inset-5 h-[calc(100%-40px)] w-[calc(100%-40px)] animate-orbit-reverse"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="rgba(0, 240, 255, 0.25)"
                strokeWidth="1"
                strokeDasharray="8 12"
              />
            </svg>

            {/* Zora 'Z' Emblem (/assets/logo.png) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative z-10 flex h-32 w-32 items-center justify-center"
            >
              <img
                src="/assets/logo.png"
                alt="Zora Solutions 3D Z Emblem"
                className="h-28 w-28 object-contain"
              />
            </motion.div>
          </div>

          {/* Brand Lockup & Pure-GPU Loading Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-5 flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                Zora Solutions
              </span>
            </div>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.28em] text-[#94A3B8]">
              Crafting Digital Solutions
            </p>

            {/* GPU-composited Loading Bar (Zero React state intervals!) */}
            <div className="mt-6 h-1.5 w-56 overflow-hidden rounded-full border border-white/15 bg-[#060D1F]">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="gpu-accelerated h-full w-full bg-sky-400"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
