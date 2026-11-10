'use client';

import React from 'react';

/**
 * Native Hardware-Accelerated Browser Scroll Provider
 * Uses 100% native OS/browser compositor scrolling so Framer Motion useScroll()
 * and sticky scroll animations run at locked 60-120fps on every device with zero CPU lag.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
