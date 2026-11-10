'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Mail,
  Send,
  AlertCircle,
  Loader2,
  UserCheck,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { CORE_SERVICES_ENUM, InquiryValidationSchema } from '@/lib/security';

interface ProjectConfiguratorProps {
  preselectedService?: string | null;
}

const CONNECTION_METHODS = [
  {
    id: 'WhatsApp Text Chat',
    label: 'WhatsApp Chat',
    sub: 'Fastest reply — instant chat with us',
  },
  {
    id: 'WhatsApp Voice / Audio Call',
    label: 'WhatsApp Call',
    sub: 'Quick voice call to explain your idea',
  },
  {
    id: 'Direct Phone Call',
    label: 'Direct Phone Call',
    sub: 'We will call your mobile number directly',
  },
  {
    id: 'Online Video Meeting (Zoom / Meet)',
    label: 'Online Video Call',
    sub: 'Screen-share & discuss requirements together',
  },
];

export default function ProjectConfigurator({ preselectedService }: ProjectConfiguratorProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Web Development']);
  const [connectionMethod, setConnectionMethod] = useState<string>(CONNECTION_METHODS[0].id);

  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<'Panduka' | 'Dilum' | 'Any'>('Any');
  const [projectBrief, setProjectBrief] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inquiryId, setInquiryId] = useState<string | null>(null);

  useEffect(() => {
    if (
      preselectedService &&
      (CORE_SERVICES_ENUM as readonly string[]).includes(preselectedService)
    ) {
      setSelectedServices((prev) =>
        prev.includes(preselectedService) ? prev : [...prev, preselectedService]
      );
      setSubmittedSuccess(false);
    }
  }, [preselectedService]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.length > 1
          ? prev.filter((s) => s !== service)
          : prev
        : [...prev, service]
    );
  };

  // Build formatted WhatsApp Deep-Link Summary Message
  const buildWhatsAppUrl = (
    founderPhoneDigits: '94777321165' | '94777498608',
    founderName: string,
    overrideRefId?: string
  ) => {
    const activeRef = overrideRefId || inquiryId;
    const lines = [
      `Hi ${founderName} at *Zora Solutions*!`,
      ``,
      `I would like to discuss my project requirements and get a custom price quotation:`,
      clientName ? `• *Name:* ${clientName}` : null,
      companyName ? `• *Business / Brand:* ${companyName}` : null,
      phone ? `• *Phone / WhatsApp:* ${phone}` : null,
      `• *Services Needed:* ${selectedServices.join(', ')}`,
      `• *Preferred Way to Connect:* ${connectionMethod}`,
      projectBrief ? `• *My Requirements:* ${projectBrief}` : null,
      activeRef ? `• *Ref ID:* ${activeRef}` : null,
      ``,
      `Please let me know the next steps and custom pricing!`,
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${founderPhoneDigits}?text=${encodeURIComponent(lines)}`;
  };

  // Determine active founder target based on client selection
  const targetFounder =
    preferredContact === 'Dilum'
      ? { digits: '94777498608' as const, name: 'Dilum' }
      : { digits: '94777321165' as const, name: 'Panduka' };

  const handleSubmitAndOpenWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const payload = {
      clientName,
      companyName,
      email: 'whatsapp-lead@zorasolutions.lk',
      phone,
      whatsappNumber: phone,
      selectedServices,
      estimatedBudget: `WhatsApp Quote (${connectionMethod})`,
      projectBrief,
      preferredContact,
      honeypot,
    };

    const parsed = InquiryValidationSchema.safeParse(payload);
    if (!parsed.success) {
      const firstErr = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      setErrorMsg(firstErr || 'Please fill in your name, phone number, and requirements.');
      return;
    }

    setIsSubmitting(true);
    let resolvedId = `ZORA-${Date.now().toString().slice(-6)}`;

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success && data.inquiryId) {
        resolvedId = data.inquiryId;
      }
    } catch {
      // Even if network is slow, still open WhatsApp with the full pre-filled requirements!
    }

    setInquiryId(resolvedId);
    setIsSubmitting(false);
    setSubmittedSuccess(true);

    const waUrl = buildWhatsAppUrl(targetFounder.digits, targetFounder.name, resolvedId);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="configurator" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Friendly, Crystal-Clear Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.22em] text-white">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Direct WhatsApp Connect • Custom Quotation</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Send Your Requirements on{' '}
            <span className="bg-gradient-to-r from-white via-[#00F0FF] to-amber-300 bg-clip-text text-transparent">
              WhatsApp Instantly
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
            We don’t use fixed price packages because every business is unique. Tell us what you
            need below and connect directly with <strong className="text-white">Panduka</strong> or{' '}
            <strong className="text-white">Dilum</strong> on WhatsApp for a fast custom quote.
          </p>
        </div>

        {/* How to Connect With Us — 3 Direct WhatsApp & Call Cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <a
            href="https://wa.me/94777321165?text=Hi%20Panduka%20at%20Zora%20Solutions!%20I%20would%20like%20to%20discuss%20my%20project%20requirements%20and%20get%20a%20custom%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-white bg-white p-4 text-[#0F172A] shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#040B1A] text-[#00F0FF]">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="font-mono text-[11px] font-extrabold uppercase text-[#0051FF]">
                WHATSAPP • PANDUKA
              </div>
              <div className="font-display text-base font-extrabold text-[#040B1A]">
                Chat With Panduka
              </div>
              <div className="font-mono text-xs font-semibold text-slate-600">
                +94 777 321 165
              </div>
            </div>
          </a>

          <a
            href="https://wa.me/94777498608?text=Hi%20Dilum%20at%20Zora%20Solutions!%20I%20would%20like%20to%20discuss%20my%20project%20requirements%20and%20get%20a%20custom%20quote."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-amber-400/50 bg-[#081226] p-4 text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:border-amber-400"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-[#030712]">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <div className="font-mono text-[11px] font-bold uppercase text-amber-300">
                WHATSAPP • DILUM
              </div>
              <div className="font-display text-base font-bold text-white">
                Chat With Dilum
              </div>
              <div className="font-mono text-xs font-semibold text-slate-300">
                +94 77 749 8608
              </div>
            </div>
          </a>

          <a
            href="tel:+94777321165"
            className="group flex items-center gap-4 rounded-2xl border border-white/20 bg-[#081226] p-4 text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:border-[#00F0FF]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#00F0FF]">
              <PhoneCall className="h-6 w-6" />
            </div>
            <div>
              <div className="font-mono text-[11px] font-bold uppercase text-[#00F0FF]">
                DIRECT PHONE CALL
              </div>
              <div className="font-display text-base font-bold text-white">
                Call Us Directly
              </div>
              <div className="text-xs text-slate-300">
                Speak with Panduka or Dilum now
              </div>
            </div>
          </a>
        </div>

        {/* Main Grid: 8-Col Simple Requirement Form + 4-Col Direct Founders Hub */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT 8 COLS: WhatsApp-First Client Requirements Form */}
          <div className="rounded-3xl border border-white/25 bg-gradient-to-b from-[#091326] to-[#030712] p-6 shadow-2xl sm:p-10 lg:col-span-8">
            <AnimatePresence mode="wait">
              {!submittedSuccess ? (
                <motion.form
                  key="requirements-form"
                  onSubmit={handleSubmitAndOpenWhatsApp}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-7"
                >
                  {/* Hidden Honeypot Trap */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_url_honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-2.5 rounded-2xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs text-rose-300">
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Part 1: Select Services Needed */}
                  <div>
                    <label className="font-display text-lg font-bold text-white">
                      1. What services do you need?{' '}
                      <span className="font-mono text-xs font-bold text-amber-300">
                        (Select one or more)
                      </span>
                    </label>

                    <div className="mt-3.5 flex flex-wrap gap-2.5">
                      {CORE_SERVICES_ENUM.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`flex items-center gap-2.5 rounded-2xl border px-4 py-3 font-display text-sm font-bold transition-colors ${
                              isSelected
                                ? 'border-white bg-white text-[#030712] shadow-md'
                                : 'border-white/15 bg-white/5 text-slate-200 hover:border-amber-400/50 hover:text-white'
                            }`}
                          >
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs ${
                                isSelected
                                  ? 'border-[#0051FF] bg-[#0051FF] text-white font-bold'
                                  : 'border-white/30 bg-transparent'
                              }`}
                            >
                              {isSelected ? '✓' : ''}
                            </span>
                            <span>{service}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Part 2: Preferred Connection Method */}
                  <div>
                    <label className="block font-display text-lg font-bold text-white">
                      2. How would you like us to discuss your quote?
                    </label>
                    <p className="mt-1 text-xs text-slate-300">
                      Pick your preferred way to talk—we reply fastest on WhatsApp:
                    </p>

                    <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {CONNECTION_METHODS.map((method) => {
                        const active = connectionMethod === method.id;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setConnectionMethod(method.id)}
                            className={`rounded-2xl border p-3.5 text-left transition-colors ${
                              active
                                ? 'border-amber-400 bg-amber-400 text-[#030712] shadow-lg'
                                : 'border-white/15 bg-white/5 text-white hover:border-white/35'
                            }`}
                          >
                            <div className="font-display text-sm font-extrabold">
                              {method.label}
                            </div>
                            <div
                              className={`mt-0.5 text-xs ${
                                active ? 'text-slate-900 font-medium' : 'text-slate-300'
                              }`}
                            >
                              {method.sub}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Part 3: Client Details & Requirement Description */}
                  <div className="space-y-4 border-t border-white/15 pt-5">
                    <label className="block font-display text-lg font-bold text-white">
                      3. Your Details & Project Requirements
                    </label>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-xs font-semibold uppercase text-slate-200">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Kasun Perera"
                          className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#02050D] px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-semibold uppercase text-slate-200">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 077 123 4567"
                          className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#02050D] px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-xs font-semibold uppercase text-slate-200">
                          Business / Shop Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Your Company or Brand"
                          className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#02050D] px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-semibold uppercase text-slate-200">
                          Who Should You Message?
                        </label>
                        <select
                          value={preferredContact}
                          onChange={(e) =>
                            setPreferredContact(e.target.value as 'Panduka' | 'Dilum' | 'Any')
                          }
                          className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#02050D] px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
                        >
                          <option value="Any">Either Founder (Fastest — Panduka)</option>
                          <option value="Panduka">Panduka (+94 777 321 165)</option>
                          <option value="Dilum">Dilum (+94 77 749 8608)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-semibold uppercase text-slate-200">
                        Tell Us About Your Idea or Requirements *
                      </label>
                      <textarea
                        required
                        rows={4}
                        maxLength={3000}
                        value={projectBrief}
                        onChange={(e) => setProjectBrief(e.target.value)}
                        placeholder="Describe what kind of website, online store, or software you need. We will review this on WhatsApp and give you a custom price..."
                        className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#02050D] p-4 text-sm text-white placeholder-slate-400 focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Direct Instant WhatsApp Action Buttons */}
                  <div className="flex flex-col gap-3 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <a
                      href={buildWhatsAppUrl(targetFounder.digits, targetFounder.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400 bg-amber-400/15 px-5 py-3.5 font-display text-xs font-extrabold uppercase tracking-wider text-amber-300 transition-colors hover:bg-amber-400 hover:text-[#030712]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Quick WhatsApp ({targetFounder.name})</span>
                    </a>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-white px-8 py-4 font-display text-sm font-extrabold text-[#030712] shadow-lg transition-colors hover:bg-[#00F0FF] disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Opening WhatsApp...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send on WhatsApp & Get Custom Price</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                /* Confirmation View + Direct Panduka / Dilum WhatsApp & Call Launchers */
                <motion.div
                  key="step-success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#030712] shadow-xl">
                    <CheckCircle2 className="h-9 w-9 text-[#0051FF]" />
                  </div>

                  <div>
                    <span className="rounded-full border border-amber-400/50 bg-amber-400/15 px-3.5 py-1 font-mono text-xs font-bold text-amber-300">
                      REQUIREMENTS SAVED • REF: {inquiryId}
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">
                      Ready to Chat on WhatsApp!
                    </h3>
                    <p className="mx-auto mt-2 max-w-xl text-sm text-slate-200">
                      Your project requirements have been saved with our team. If WhatsApp did not
                      open automatically, click below to message{' '}
                      <strong className="text-white">Panduka</strong> or{' '}
                      <strong className="text-amber-300">Dilum</strong> right now with your details
                      already filled in:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
                    {/* Panduka Card */}
                    <div className="rounded-2xl border border-white bg-white p-5 text-[#0F172A] shadow-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-extrabold text-[#040B1A]">
                          Panduka
                        </span>
                        <span className="rounded-md bg-[#040B1A] px-2.5 py-0.5 font-mono text-[11px] font-bold text-white">
                          Co-Founder
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-sm font-bold text-[#0051FF]">
                        +94 777 321 165
                      </p>
                      <div className="mt-4 flex flex-col gap-2">
                        <a
                          href={buildWhatsAppUrl('94777321165', 'Panduka')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 rounded-xl bg-[#040B1A] px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-white transition-transform hover:scale-[1.02]"
                        >
                          <MessageCircle className="h-4 w-4 text-[#00F0FF]" />
                          <span>WhatsApp Panduka Now</span>
                        </a>
                        <a
                          href="tel:+94777321165"
                          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 font-mono text-xs font-bold text-[#040B1A] hover:bg-slate-200"
                        >
                          <PhoneCall className="h-3.5 w-3.5 text-[#0051FF]" />
                          <span>Call +94 777 321 165</span>
                        </a>
                      </div>
                    </div>

                    {/* Dilum Card */}
                    <div className="rounded-2xl border border-amber-400/50 bg-[#02050D] p-5 text-white shadow-xl">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-extrabold text-white">
                          Dilum
                        </span>
                        <span className="rounded-md bg-amber-400 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#030712]">
                          Co-Founder
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-sm font-bold text-amber-300">
                        +94 77 749 8608
                      </p>
                      <div className="mt-4 flex flex-col gap-2">
                        <a
                          href={buildWhatsAppUrl('94777498608', 'Dilum')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 font-display text-xs font-extrabold uppercase tracking-wider text-[#030712] transition-transform hover:scale-[1.02]"
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>WhatsApp Dilum Now</span>
                        </a>
                        <a
                          href="tel:+94777498608"
                          className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 font-mono text-xs font-bold text-white hover:bg-white hover:text-[#030712]"
                        >
                          <PhoneCall className="h-3.5 w-3.5 text-amber-400" />
                          <span>Call +94 77 749 8608</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedSuccess(false);
                      setProjectBrief('');
                    }}
                    className="font-mono text-xs text-slate-300 underline hover:text-white"
                  >
                    Send another project requirement
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT 4 COLS: Always-Visible Direct Founder Cards + How Our Pricing Works */}
          <div className="flex flex-col justify-between gap-6 lg:col-span-4">
            {/* Reassuring "How Pricing Works" Card */}
            <div className="rounded-3xl border border-amber-400/45 bg-gradient-to-b from-amber-400/15 to-[#060D1F] p-6 text-white">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-300">
                <HelpCircle className="h-4 w-4" />
                <span>How We Give You a Price</span>
              </div>
              <h3 className="mt-2 font-display text-lg font-extrabold text-white">
                100% Custom Quotation on WhatsApp
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-200">
                You never have to guess which package fits you. Simply share your requirements or
                message us directly on WhatsApp—we will guide you and give you a fair custom price.
              </p>
              <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-amber-300">
                <Clock className="h-3.5 w-3.5" />
                <span>Fast Direct Reply</span>
              </div>
              <a
                href="mailto:zorasolution.official@gmail.com"
                className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 font-mono text-xs font-bold text-[#00F0FF] transition-colors hover:bg-white hover:text-[#030712]"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>zorasolution.official@gmail.com</span>
              </a>
            </div>

            {/* Panduka Direct Card — Crisp Pearl-White Surface */}
            <div className="rounded-3xl border border-white bg-gradient-to-br from-white via-[#F8FAFC] to-[#E2E8F0] p-6 text-[#0F172A] shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#040B1A] text-[#00F0FF]">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-[#040B1A]">Panduka</h3>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0051FF]">
                    WhatsApp or Call Anytime
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-[#040B1A] px-4 py-2.5 font-mono text-base font-bold text-white">
                +94 777 321 165
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+94777321165"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 font-mono text-xs font-extrabold text-[#040B1A] transition-colors hover:bg-slate-100"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-[#0051FF]" />
                  <span>Call Now</span>
                </a>
                <a
                  href={buildWhatsAppUrl('94777321165', 'Panduka')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0051FF] py-3 font-mono text-xs font-extrabold text-white shadow-md transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Dilum Direct Card — Solar Gold & Obsidian Surface */}
            <div className="rounded-3xl border border-amber-400/50 bg-gradient-to-b from-[#0A152C] to-[#030712] p-6 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-400/15 text-amber-300">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-white">Dilum</h3>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    WhatsApp or Call Anytime
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/15 bg-[#02050D] px-4 py-2.5 font-mono text-base font-bold text-white">
                +94 77 749 8608
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+94777498608"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 py-3 font-mono text-xs font-bold text-white transition-colors hover:bg-white hover:text-[#030712]"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-amber-400" />
                  <span>Call Now</span>
                </a>
                <a
                  href={buildWhatsAppUrl('94777498608', 'Dilum')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 font-mono text-xs font-extrabold text-[#030712] shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
