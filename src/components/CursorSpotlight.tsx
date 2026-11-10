'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * High-Performance Hardware-Accelerated Ambient Cursor Spotlight
 * Follows mouse pointer with smooth spring physics to create an attractive radiant glow behind dark surfaces.
 */
export default function CursorSpotlight() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);

  const springX = useSpring(mouseX, { stiffness: 140, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 22 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      className="pointer-events-none fixed top-0 left-0 z-30 hidden h-[500px] w-[500px] rounded-full opacity-40 md:block select-none"
      aria-hidden="true"
    >
      <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18)_0%,rgba(14,165,233,0.06)_45%,transparent_70%)] blur-2xl" />
    </motion.div>
  );
}
