'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lightbulb, Code2, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

interface WorkflowStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  deliverables: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: '01',
    title: 'Share Your Idea',
    subtitle: 'Tell us what you need',
    description:
      'Connect directly with Panduka & Dilum for a quick discovery conversation. We understand your business goals, target customers, and requirements.',
    badge: '30%',
    deliverables: [
      'Direct Founder Discovery Call',
      'Clear System & Feature Plan',
      'Transparent Timeline & Custom Quote',
    ],
    icon: Lightbulb,
  },
  {
    number: '02',
    title: 'We Build It',
    subtitle: 'Design, develop and deliver',
    description:
      'We design modern interactive previews and engineer your website, online store, or custom software—keeping you updated at every step.',
    badge: '60%',
    deliverables: [
      'Modern Mobile & Desktop Design',
      'Clean Full-Stack Development',
      'Speed, Security & Quality Testing',
    ],
    icon: Code2,
  },
  {
    number: '03',
    title: 'Grow Online',
    subtitle: 'Take your brand to the next level',
    description:
      'We launch your platform smoothly, configure Google SEO & analytics, and support you long-term to attract more customers.',
    badge: '100%',
    deliverables: [
      'Fast, Reliable Cloud Launch',
      'Google SEO & Analytics Setup',
      'Direct 24/7 WhatsApp & Call Support',
    ],
    icon: Rocket,
  },
];

export default function WorkflowLaserTimeline() {
  const containerRef = useRef<HTMLElement>(null);

  // Pure GPU transform (Zero React state updates during scroll!)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 40%'],
  });

  const laserScaleY = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const laserScaleX = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

  return (
    <section
      id="workflow"
      ref={containerRef}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            From Concept to{' '}
            <span className="text-sky-400">
              Market Leadership
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
            A clear, transparent 3-step process designed to turn your business idea into a finished,
            high-performing digital product.
          </p>
        </div>

        {/* Horizontal & Vertical Laser Circuit Path */}
        <div className="relative mt-16">
          {/* Desktop Horizontal Laser Beam Track */}
          <div className="pointer-events-none absolute top-10 left-[12%] right-[12%] hidden h-[3px] bg-white/15 lg:block">
            <motion.div
              style={{
                scaleX: laserScaleX,
                transformOrigin: 'left center',
              }}
              className="gpu-accelerated h-full w-full bg-sky-400"
            />
          </div>

          {/* Mobile/Tablet Vertical Laser Beam Track */}
          <div className="pointer-events-none absolute top-8 bottom-8 left-8 w-[3px] bg-white/15 lg:hidden">
            <motion.div
              style={{
                scaleY: laserScaleY,
                transformOrigin: 'top center',
              }}
              className="gpu-accelerated h-full w-full bg-gradient-to-b from-white via-[#00F0FF] to-amber-400"
            />
          </div>

          {/* 3 Workflow Step Cards (Always visible, zero hidden intersection stall!) */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {WORKFLOW_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isCenterWhiteCard = index === 1;

              return (
                <div
                  key={step.number}
                  className="relative pl-20 lg:flex lg:flex-col lg:items-center lg:pl-0"
                >
                  {/* Circuit Node Icon */}
                  <div className="absolute left-0 top-0 lg:static lg:mb-8">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white bg-white text-[#030712] shadow-lg sm:h-20 sm:w-20">
                      <Icon className="h-8 w-8" />
                      <span className="absolute -top-2.5 -right-2.5 rounded-full bg-amber-400 px-2 py-0.5 font-mono text-[10px] font-extrabold text-[#030712]">
                        {step.badge}
                      </span>
                    </div>
                  </div>

                  {/* Step Card */}
                  <div
                    className={`w-full rounded-3xl border p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-8 ${
                      isCenterWhiteCard
                        ? 'border-white bg-gradient-to-br from-white via-[#F8FAFC] to-[#E2E8F0] text-[#0F172A] shadow-xl'
                        : 'border-white/25 bg-gradient-to-b from-[#091428] to-[#030712] text-white shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-xs font-extrabold uppercase tracking-widest ${
                          isCenterWhiteCard ? 'text-[#0051FF]' : 'text-amber-300'
                        }`}
                      >
                        STEP {step.number}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase ${
                          isCenterWhiteCard
                            ? 'bg-[#040B1A] text-white'
                            : 'bg-white text-[#030712]'
                        }`}
                      >
                        STAGE {step.badge}
                      </span>
                    </div>

                    <h3
                      className={`mt-3 font-display text-2xl font-extrabold ${
                        isCenterWhiteCard ? 'text-[#040B1A]' : 'text-white'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-1 font-mono text-xs font-bold uppercase tracking-wider ${
                        isCenterWhiteCard ? 'text-[#0051FF]' : 'text-[#00F0FF]'
                      }`}
                    >
                      “{step.subtitle}”
                    </p>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        isCenterWhiteCard ? 'text-slate-700' : 'text-slate-200'
                      }`}
                    >
                      {step.description}
                    </p>

                    <div
                      className={`mt-6 space-y-2 border-t pt-4 ${
                        isCenterWhiteCard ? 'border-slate-300' : 'border-white/15'
                      }`}
                    >
                      {step.deliverables.map((deliv) => (
                        <div
                          key={deliv}
                          className={`flex items-center gap-2 text-xs font-medium ${
                            isCenterWhiteCard ? 'text-slate-800' : 'text-slate-100'
                          }`}
                        >
                          <CheckCircle2
                            className={`h-3.5 w-3.5 shrink-0 ${
                              isCenterWhiteCard ? 'text-[#0051FF]' : 'text-amber-400'
                            }`}
                          />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Direct Action Bar */}
          <div className="mt-14 flex justify-center">
            <a
              href="#configurator"
              className="group inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-display text-sm font-extrabold text-[#030712] shadow-lg transition-colors hover:bg-[#00F0FF]"
            >
              <span>Step 01: Share Your Idea With Us</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
