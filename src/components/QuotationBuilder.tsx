'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  FileDown,
  MessageCircle,
  Server,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Sparkles,
  User,
  ArrowUpRight,
} from 'lucide-react';
import { generateOfficialQuotationPdf } from '@/lib/generateQuotationPdf';
import type { QuotationLineItem } from '@/models/Quotation';

const PRIMARY_SERVICES = [
  {
    id: 'System / Corporate Web App',
    label: 'System / Web App',
    desc: 'Includes Base Rs. 35,000 Starter System',
    includesBaseSystem: true,
  },
  {
    id: 'E-Commerce Storefront',
    label: 'E-Commerce Store',
    desc: 'Base System + Online Cart & PayHere/WebXPay',
    includesBaseSystem: true,
    presetAddons: ['ecommerce'],
  },
  {
    id: 'Custom Enterprise Software',
    label: 'Custom Software',
    desc: 'Base System + CMS DB + Role-Based Auth',
    includesBaseSystem: true,
    presetAddons: ['cms', 'enterpriseAuth'],
  },
  {
    id: 'UI/UX Design & Prototype',
    label: 'UI/UX Design',
    desc: 'Base System + Figma Prototype System',
    includesBaseSystem: true,
    presetAddons: ['figma'],
  },
  {
    id: 'Full Business Launch Suite',
    label: 'Complete Launch Package',
    desc: 'Web App + Admin CMS + Custom UI/UX Design',
    includesBaseSystem: true,
    presetAddons: ['cms', 'figma'],
  },
] as const;

const SYSTEM_ADDONS = [
  {
    id: 'cms',
    name: 'Full Admin CMS Dashboard & Database Integration',
    price: 15000,
    weeks: 1,
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Cart & Local Payment Gateway Integration (PayHere / WebXPay)',
    price: 25000,
    weeks: 2,
  },
  {
    id: 'enterpriseAuth',
    name: 'Custom Enterprise Role-Based Auth & Reporting Engine',
    price: 20000,
    weeks: 2,
  },
  {
    id: 'figma',
    name: 'Custom UI/UX Figma Prototype & Design System',
    price: 12000,
    weeks: 1,
  },
] as const;

const HOSTING_OPTIONS = [
  {
    id: 'primary-subdomain',
    name: 'Option A — Primary Hosting (Standard Tier)',
    label: 'Primary Hosting with Subdomain (e.g., yourcompanyname.netlify.app)',
    detail: 'Fast global CDN deployment, SSL included',
    price: 8000,
    usdSubject: false,
    badge: 'RECOMMENDED STARTER',
  },
  {
    id: 'custom-domain-cloud',
    name: 'Option B — Custom Domain (.com / .lk) + Dedicated Cloud Hosting',
    label: 'Custom Domain (.com / .lk) + Dedicated Cloud Hosting (Rs. 25,000+ Yearly)',
    detail: 'Full custom domain registration & dedicated high-speed cloud server',
    price: 25000,
    pricePrefix: '+',
    usdSubject: true,
    badge: 'Subject to USD ($) Exchange Rate',
  },
  {
    id: 'client-owned',
    name: 'Option C — Client Already Has Hosting / Domain',
    label: 'Existing Client Hosting / Domain (Deployment Support Only)',
    detail: 'We deploy directly onto your existing hosting account',
    price: 0,
    usdSubject: false,
    badge: 'NO HOSTING FEE',
  },
] as const;

function formatLkr(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-LK')}`;
}

export default function QuotationBuilder() {
  const [primaryService, setPrimaryService] = useState<string>('System / Corporate Web App');
  const [extraPages, setExtraPages] = useState<number>(0);
  const [selectedSystemAddons, setSelectedSystemAddons] = useState<string[]>([]);
  const [hostingTierId, setHostingTierId] = useState<string>('primary-subdomain');

  // Client Details state
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Submission & Feedback state
  const [busyAction, setBusyAction] = useState<'pdf' | 'whatsapp' | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [lastQuoteNumber, setLastQuoteNumber] = useState<string | null>(null);

  const handleSelectPrimaryService = (presetId: string) => {
    setPrimaryService(presetId);
    const found = PRIMARY_SERVICES.find((s) => s.id === presetId);
    if (!found) return;

    if ('presetAddons' in found && found.presetAddons) {
      setSelectedSystemAddons([...found.presetAddons]);
    } else {
      setSelectedSystemAddons([]);
    }
  };

  const toggleSystemAddon = (id: string) => {
    setSelectedSystemAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Real-time itemized calculation (System / Web Development + Hosting)
  const { itemizedLines, oneTimeTotal, monthlyTotal, estimatedWeeks, selectedHosting } = useMemo(() => {
    const items: QuotationLineItem[] = [
      {
        name: 'Starter System / Corporate Web App (Responsive UI, up to 5 core pages, contact integration, basic SEO)',
        category: 'System & Web Development',
        billingType: 'One-Time',
        price: 35000,
      },
    ];
    let weeks = 2;

    if (extraPages > 0) {
      items.push({
        name: `Extra Dynamic Pages / Modules (${extraPages} ${extraPages === 1 ? 'page' : 'pages'} @ Rs. 4,500)`,
        category: 'System & Web Development',
        billingType: 'One-Time',
        price: extraPages * 4500,
      });
      weeks += Math.ceil(extraPages / 4);
    }

    SYSTEM_ADDONS.forEach((addon) => {
      if (selectedSystemAddons.includes(addon.id)) {
        items.push({
          name: addon.name,
          category: 'Development Add-on',
          billingType: 'One-Time',
          price: addon.price,
        });
        weeks += addon.weeks;
      }
    });

    const hosting =
      HOSTING_OPTIONS.find((h) => h.id === hostingTierId) || HOSTING_OPTIONS[0];
    items.push({
      name: hosting.label,
      category: 'Hosting & Domain',
      billingType: 'One-Time',
      price: hosting.price,
    });

    const oneTime = items
      .filter((i) => i.billingType === 'One-Time')
      .reduce((sum, i) => sum + i.price, 0);

    return {
      itemizedLines: items,
      oneTimeTotal: oneTime,
      monthlyTotal: 0,
      estimatedWeeks: weeks,
      selectedHosting: hosting,
    };
  }, [extraPages, selectedSystemAddons, hostingTierId]);

  const validateClientDetails = (): string | null => {
    if (clientName.trim().length < 2) {
      return 'Please enter your Name in Step 3 before generating the official quotation.';
    }
    if (phone.trim().length < 7) {
      return 'Please enter a valid Phone / WhatsApp Number in Step 3.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      return 'Please enter a valid Email Address in Step 3 for your official PDF header.';
    }
    return null;
  };

  const handleSaveAndDownloadPdf = async () => {
    setFeedbackError(null);
    const validationErr = validateClientDetails();
    if (validationErr) {
      setFeedbackError(validationErr);
      return;
    }

    setBusyAction('pdf');
    try {
      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          companyName: companyName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
          primaryService,
          selectedItems: itemizedLines,
          hostingTier: selectedHosting.label,
          oneTimeTotal,
          monthlyTotal,
          estimatedWeeks,
          usdRateNoteAccepted: true,
          status: 'Generated',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success || !data.quotation) {
        setFeedbackError(data.error || 'Could not save quotation. Please check your details.');
        setBusyAction(null);
        return;
      }

      const savedQuote = data.quotation;
      setLastQuoteNumber(savedQuote.quoteNumber);

      await generateOfficialQuotationPdf({
        quoteNumber: savedQuote.quoteNumber,
        clientName: savedQuote.clientName,
        companyName: savedQuote.companyName,
        email: savedQuote.email,
        phone: savedQuote.phone,
        notes: savedQuote.notes,
        hostingTier: savedQuote.hostingTier,
        selectedItems: savedQuote.selectedItems,
        oneTimeTotal: savedQuote.oneTimeTotal,
        monthlyTotal: savedQuote.monthlyTotal,
        estimatedWeeks: savedQuote.estimatedWeeks,
      });
    } catch {
      setFeedbackError('Network error while saving quotation. Please try again.');
    } finally {
      setBusyAction(null);
    }
  };

  const handleSendWhatsApp = async (founder: 'Panduka' | 'Dilum') => {
    setFeedbackError(null);
    const validationErr = validateClientDetails();
    if (validationErr) {
      setFeedbackError(validationErr);
      return;
    }

    setBusyAction('whatsapp');
    let quoteNumber = lastQuoteNumber || `#ZS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          companyName: companyName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          notes: notes.trim(),
          primaryService,
          selectedItems: itemizedLines,
          hostingTier: selectedHosting.label,
          oneTimeTotal,
          monthlyTotal,
          estimatedWeeks,
          usdRateNoteAccepted: true,
          status: 'Sent_WhatsApp',
        }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.quotation?.quoteNumber) {
        quoteNumber = data.quotation.quoteNumber;
        setLastQuoteNumber(quoteNumber);
      }
    } catch {
      // Proceed to open WhatsApp even if save request fails
    } finally {
      setBusyAction(null);
    }

    const digits = founder === 'Dilum' ? '94777498608' : '94777321165';
    const itemSummary = itemizedLines
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.name} — ${formatLkr(i.price)}${i.billingType === 'Monthly' ? '/mo' : ''}`
      )
      .join('\n');

    const waLines = [
      `Hi ${founder} at *Zora Solutions*!`,
      `I built an instant quotation estimate (${quoteNumber}):`,
      ``,
      `• *Client:* ${clientName}${companyName ? ` (${companyName})` : ''}`,
      `• *Phone:* ${phone} | *Email:* ${email}`,
      `• *Primary Focus:* ${primaryService}`,
      ``,
      `*Selected Breakdown:*`,
      itemSummary,
      ``,
      `• *Estimated Base Total:* ${formatLkr(oneTimeTotal)}${hostingTierId === 'custom-domain-cloud' ? '+' : ''}`,
      notes ? `• *Notes:* ${notes}` : null,
      ``,
      `Please confirm the final timeline and official invoice details!`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      `https://wa.me/${digits}?text=${encodeURIComponent(waLines)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="quote-builder" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/50 bg-[#040914] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#00F0FF]">
            <Calculator className="h-3.5 w-3.5" />
            <span>Real-Time Pricing Calculator & Instant PDF</span>
          </div>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Build Your Custom{' '}
            <span className="bg-gradient-to-r from-white via-[#00F0FF] to-amber-300 bg-clip-text text-transparent">
              Instant Quotation
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
            Select your system features, hosting option, and monthly marketing scope to see exact
            transparent pricing in Sri Lankan Rupees (LKR) and download an official corporate PDF.
          </p>
        </div>

        {/* Mandatory Dynamic USD Exchange Rate Notice Banner */}
        <div className="mt-8 rounded-2xl border border-amber-400/50 bg-[#040914]/90 p-5 shadow-lg">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="text-xs leading-relaxed text-amber-100 sm:text-sm">
              <strong className="font-display text-amber-300">
                Currency &amp; Market Rate Notice:
              </strong>{' '}
              All base development prices are quoted in Sri Lankan Rupees (LKR). However, third-party
              cloud infrastructure, custom domains (.com/.net), external APIs, and paid advertising
              budgets are tied to the US Dollar (USD) and may fluctuate based on the prevailing bank
              USD exchange rate at the time of invoice.
            </div>
          </div>
        </div>

        {/* Split-Screen 2-Column Layout */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* LEFT COLUMN (7 Cols): Interactive Multi-Step Configurator */}
          <div className="space-y-8 lg:col-span-7">
            {/* STEP 1: Select Primary Service Type */}
            <div className="rounded-3xl border border-[#00F0FF]/25 bg-[#040914] p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF]">
                <Sparkles className="h-4 w-4" />
                <span>Step 01 • Select Primary Service Type</span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PRIMARY_SERVICES.map((srv) => {
                  const active = primaryService === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => handleSelectPrimaryService(srv.id)}
                      className={`rounded-2xl border p-4 text-left transition-colors ${
                        active
                          ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-white'
                          : 'border-white/15 bg-white/5 text-slate-200 hover:border-white/35'
                      }`}
                    >
                      <div className="font-display text-sm font-extrabold text-white">
                        {srv.label}
                      </div>
                      <div className="mt-1 text-xs text-slate-300">{srv.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: System Development, Pages Slider, Add-ons & Hosting Tier */}
            <div className="rounded-3xl border border-[#00F0FF]/25 bg-[#040914] p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF]">
                  <Sliders className="h-4 w-4" />
                  <span>Step 02 • System Scope, Add-Ons &amp; Hosting</span>
                </div>

                <span className="rounded-xl border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-3 py-1 font-mono text-xs font-bold text-[#00F0FF]">
                  Base Starter System: Rs. 35,000
                </span>
              </div>

              {/* Base Starter Card */}
              <div className="rounded-2xl border border-white/20 bg-white p-4 text-[#040914]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-display text-base font-extrabold">
                      Starter System / Corporate Web App
                    </div>
                    <div className="text-xs text-slate-600">
                      Responsive UI, up to 5 core pages/views, contact integration &amp; basic SEO
                    </div>
                  </div>
                  <span className="font-mono text-sm font-extrabold text-[#0051FF]">
                    Rs. 35,000
                  </span>
                </div>
              </div>

              {/* Extra Dynamic Pages Slider */}
              <div className="rounded-2xl border border-white/15 bg-[#071022] p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-display text-sm font-bold text-white">
                    Extra Dynamic Pages / Modules (+Rs. 4,500 per page)
                  </label>
                  <span className="rounded-lg bg-[#00F0FF] px-3 py-1 font-mono text-xs font-extrabold text-[#040914]">
                    {extraPages} Extra Pages (+{formatLkr(extraPages * 4500)})
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={1}
                  value={extraPages}
                  onChange={(e) => setExtraPages(Number(e.target.value))}
                  className="mt-4 h-2 w-full cursor-pointer accent-[#00F0FF]"
                />
                <div className="mt-1.5 flex justify-between font-mono text-[10px] text-slate-400">
                  <span>0 Extra (5 Base Pages)</span>
                  <span>10 Extra Pages</span>
                  <span>20 Extra Pages</span>
                </div>
              </div>

              {/* Optional Development Add-ons */}
              <div className="space-y-2.5">
                <div className="font-mono text-xs font-bold uppercase text-slate-300">
                  Optional Development Modules:
                </div>
                {SYSTEM_ADDONS.map((addon) => {
                  const checked = selectedSystemAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleSystemAddon(addon.id)}
                      className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-colors ${
                        checked
                          ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-white'
                          : 'border-white/15 bg-white/5 text-slate-200 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold ${
                            checked
                              ? 'border-[#00F0FF] bg-[#00F0FF] text-[#040914]'
                              : 'border-white/30'
                          }`}
                        >
                          {checked ? '✓' : ''}
                        </span>
                        <span className="text-xs font-semibold sm:text-sm">{addon.name}</span>
                      </div>
                      <span className="shrink-0 font-mono text-xs font-extrabold text-amber-300">
                        +{formatLkr(addon.price)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Hosting & Domain Options */}
              <div className="space-y-3 border-t border-white/15 pt-5">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-300">
                  <Server className="h-4 w-4" />
                  <span>Hosting &amp; Domain Tier:</span>
                </div>

                {HOSTING_OPTIONS.map((opt) => {
                  const active = hostingTierId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setHostingTierId(opt.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                        active
                          ? 'border-[#00F0FF] bg-[#00F0FF]/12 text-white'
                          : 'border-white/15 bg-white/5 text-slate-200 hover:border-white/30'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-display text-sm font-extrabold text-white">
                          {opt.name}
                        </span>
                        <span
                          className={`rounded-lg px-2.5 py-0.5 font-mono text-[10px] font-extrabold ${
                            opt.usdSubject
                              ? 'bg-amber-400 text-[#040914]'
                              : opt.id === 'primary-subdomain'
                              ? 'bg-[#00F0FF] text-[#040914]'
                              : 'bg-white/15 text-slate-200'
                          }`}
                        >
                          {opt.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium text-[#00F0FF]">{opt.label}</p>
                      <div className="mt-1.5 flex items-center justify-between text-xs text-slate-300">
                        <span>{opt.detail}</span>
                        <strong className="font-mono text-white">
                          {opt.price > 0
                            ? `${formatLkr(opt.price)}${'pricePrefix' in opt ? opt.pricePrefix : ''}`
                            : 'Rs. 0'}
                        </strong>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Separate Social Media Package Pointer Card */}
            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-amber-400/40 bg-[#040914] p-6 sm:flex-row sm:items-center">
              <div>
                <div className="font-mono text-xs font-bold uppercase text-amber-300">
                  Separate Monthly Package Available
                </div>
                <div className="mt-1 font-display text-base font-extrabold text-white">
                  Looking for Social Media Handling (Rs. 10,000+ / month)?
                </div>
                <p className="mt-0.5 text-xs text-slate-300">
                  Explore our dedicated Facebook, Instagram, TikTok, YouTube &amp; WhatsApp monthly growth packages inside Our Services.
                </p>
              </div>
              <a
                href="#social-packages"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2.5 font-display text-xs font-extrabold text-[#040914] hover:bg-amber-300"
              >
                <span>View Social Packages</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* STEP 3: Client Details Form */}
            <div className="rounded-3xl border border-[#00F0FF]/25 bg-[#040914] p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#00F0FF]">
                <User className="h-4 w-4" />
                <span>Step 03 • Your Details for Official Quotation PDF</span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs font-semibold uppercase text-slate-200">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Nimal Jayasinghe"
                    className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#02050D] px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-[#00F0FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase text-slate-200">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Ceylon Spice Exports"
                    className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#02050D] px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-[#00F0FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold uppercase text-slate-200">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#02050D] px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-[#00F0FF] focus:outline-none"
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
                    placeholder="e.g. +94 77 123 4567"
                    className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#02050D] px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-[#00F0FF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block font-mono text-xs font-semibold uppercase text-slate-200">
                  Special Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  maxLength={1500}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific integrations, deadlines, or extra details..."
                  className="mt-1.5 w-full rounded-xl border border-white/20 bg-[#02050D] p-3.5 text-sm text-white placeholder-slate-400 focus:border-[#00F0FF] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5 Cols): Sticky Live Quotation Receipt Preview */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="rounded-3xl border border-[#00F0FF]/50 bg-[#040914] p-6 shadow-2xl sm:p-8">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#00F0FF]">
                    LIVE ESTIMATE RECEIPT
                  </div>
                  <h3 className="font-display text-xl font-extrabold text-white">
                    Zora Solutions Quotation
                  </h3>
                </div>
                {lastQuoteNumber && (
                  <span className="rounded-lg bg-amber-400 px-3 py-1 font-mono text-xs font-extrabold text-[#040914]">
                    {lastQuoteNumber}
                  </span>
                )}
              </div>

              {/* Itemized List */}
              <div className="mt-5 max-h-[300px] space-y-2.5 overflow-y-auto pr-1">
                {itemizedLines.map((item) => (
                  <div
                    key={`${item.category}-${item.name}`}
                    className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white">{item.name}</div>
                      <div className="mt-0.5 font-mono text-[10px] text-[#00F0FF]">
                        {item.category} • {item.billingType}
                      </div>
                    </div>
                      <span className="shrink-0 font-mono text-xs font-extrabold text-amber-300">
                      {formatLkr(item.price)}
                      {item.name.includes('Dedicated Cloud Hosting') ? '+' : ''}
                      {item.billingType === 'Monthly' ? '/mo' : ''}
                    </span>
                  </div>
                ))}
              </div>

              {/* Animated Real-Time Totals */}
              <div className="mt-6 space-y-3 rounded-2xl border border-[#00F0FF]/35 bg-[#02050D] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-slate-200">
                    One-Time Development &amp; Setup
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${oneTimeTotal}-${hostingTierId}`}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="font-display text-2xl font-extrabold text-[#00F0FF]"
                    >
                      {formatLkr(oneTimeTotal)}
                      {hostingTierId === 'custom-domain-cloud' ? '+' : ''}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="border-t border-white/10 pt-3 font-mono text-[11px] text-slate-300">
                  Delivery timeline will be confirmed by <strong className="text-white">Zora Solutions</strong> upon kickoff.
                </div>
              </div>

              {/* Validation Error / Saved Success */}
              {feedbackError && (
                <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/15 p-3 text-xs font-medium text-rose-200">
                  {feedbackError}
                </div>
              )}

              {lastQuoteNumber && !feedbackError && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-xs font-semibold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    Saved quotation {lastQuoteNumber} cleanly! Ready for client review.
                  </span>
                </div>
              )}

              {/* Primary CTA: Download Official PDF Quotation */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  disabled={busyAction !== null}
                  onClick={handleSaveAndDownloadPdf}
                  className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#00F0FF] px-6 py-4 font-display text-sm font-extrabold text-[#040914] shadow-[0_0_25px_rgba(0,240,255,0.45)] transition-colors hover:bg-white disabled:opacity-60"
                >
                  {busyAction === 'pdf' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving &amp; Building Official A4 PDF...</span>
                    </>
                  ) : (
                    <>
                      <FileDown className="h-5 w-5" />
                      <span>Download Official PDF Quotation</span>
                    </>
                  )}
                </button>

                {/* Secondary CTAs: Send Quote to WhatsApp (Panduka / Dilum) */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <button
                    type="button"
                    disabled={busyAction !== null}
                    onClick={() => handleSendWhatsApp('Panduka')}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 font-mono text-xs font-bold text-white transition-colors hover:border-[#00F0FF] hover:text-[#00F0FF] disabled:opacity-60"
                  >
                    <MessageCircle className="h-4 w-4 text-[#00F0FF]" />
                    <span>WhatsApp Panduka</span>
                  </button>
                  <button
                    type="button"
                    disabled={busyAction !== null}
                    onClick={() => handleSendWhatsApp('Dilum')}
                    className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/50 bg-amber-400/15 px-4 py-3 font-mono text-xs font-bold text-amber-200 transition-colors hover:bg-amber-400 hover:text-[#040914] disabled:opacity-60"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>WhatsApp Dilum</span>
                  </button>
                </div>

                <div className="border-t border-white/10 pt-3 text-center font-mono text-[11px] text-slate-300">
                  Official Email:{' '}
                  <a
                    href="mailto:zorasolution.official@gmail.com"
                    className="font-bold text-[#00F0FF] hover:underline"
                  >
                    zorasolution.official@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

