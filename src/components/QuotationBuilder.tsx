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
  User,
  ArrowUpRight,
  Layers,
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
    name: 'Admin Dashboard / CMS (Edit Content & Media Independently)',
    price: 15000,
    category: 'System / Web Development',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Cart + Payment Gateway (PayHere / WebXPay / IPG)',
    price: 20000,
    category: 'System / Web Development',
  },
  {
    id: 'enterpriseAuth',
    name: 'Role-Based Authentication, Audit Logs & Multi-User Permissions',
    price: 18000,
    category: 'Custom Software Solutions',
  },
  {
    id: 'customApi',
    name: 'Custom REST API / Webhooks & Third-Party ERP/CRM Sync',
    price: 18000,
    category: 'Custom Software Solutions',
  },
  {
    id: 'figma',
    name: 'Interactive High-Fidelity Figma Prototype System (30% Milestone)',
    price: 12000,
    category: 'UI/UX Design',
  },
  {
    id: 'multiLanguage',
    name: 'Sinhala / Tamil / English Multi-Language Localization System',
    price: 10000,
    category: 'System / Web Development',
  },
] as const;

const HOSTING_OPTIONS = [
  {
    id: 'primary-subdomain',
    name: 'Option A — Subdomain Hosting (yourname.zorasolution.com)',
    label: 'Ideal for fast testing & launch without purchasing a separate domain',
    detail: 'Lifetime Free Hosting on our dedicated high-speed edge cloud',
    price: 0,
    usdSubject: false,
    badge: '100% FREE',
  },
  {
    id: 'custom-domain-cloud',
    name: 'Option B — Custom Domain (.com / .lk) + Dedicated Cloud Hosting',
    label: 'Annual Cloud Provisioning + Automated SSL & Security Updates',
    detail: 'Approx. Rs. 25,000 / year (Subject to prevailing USD exchange rate)',
    price: 25000,
    pricePrefix: '+',
    usdSubject: true,
    badge: 'USD ($) Market Rate',
  },
  {
    id: 'client-owned',
    name: 'Option C — Client Already Has Hosting / Domain',
    label: 'Existing Client Infrastructure (Deployment Support Included)',
    detail: 'We configure and deploy directly onto your own cloud environment',
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

  // Real-time calculation
  const { itemizedLines, oneTimeTotal, monthlyTotal, estimatedWeeks, selectedHosting } = useMemo(() => {
    const items: QuotationLineItem[] = [
      {
        name: 'Starter System / Corporate Web App (Responsive UI, up to 5 core pages, contact integration, basic SEO)',
        category: 'System / Web Development',
        price: 35000,
        billingType: 'One-Time',
      },
    ];

    let oneTimeSum = 35000;
    const monthlySum = 0;
    let weeks = 2;

    if (extraPages > 0) {
      const extraCost = extraPages * 4500;
      items.push({
        name: `Additional Dynamic Pages (${extraPages} pages @ Rs. 4,500/page)`,
        category: 'System / Web Development',
        price: extraCost,
        billingType: 'One-Time',
      });
      oneTimeSum += extraCost;
      weeks += Math.ceil(extraPages / 4);
    }

    selectedSystemAddons.forEach((addonId) => {
      const found = SYSTEM_ADDONS.find((a) => a.id === addonId);
      if (found) {
        items.push({
          name: found.name,
          category: found.category,
          price: found.price,
          billingType: 'One-Time',
        });
        oneTimeSum += found.price;
        weeks += 0.5;
      }
    });

    const host = HOSTING_OPTIONS.find((h) => h.id === hostingTierId) || HOSTING_OPTIONS[0];
    if (host.price > 0) {
      items.push({
        name: `Dedicated Cloud Hosting & Domain Tier: ${host.name}`,
        category: 'Cloud Hosting & Domain',
        price: host.price,
        billingType: 'One-Time',
      });
      oneTimeSum += host.price;
    } else {
      items.push({
        name: `Cloud Deployment Tier: ${host.name}`,
        category: 'Cloud Hosting & Domain',
        price: 0,
        billingType: 'One-Time',
      });
    }

    return {
      itemizedLines: items,
      oneTimeTotal: oneTimeSum,
      monthlyTotal: monthlySum,
      estimatedWeeks: Math.ceil(weeks),
      selectedHosting: host,
    };
  }, [extraPages, selectedSystemAddons, hostingTierId]);

  const saveQuotationToDatabase = async (): Promise<{ quoteNumber: string } | null> => {
    if (!clientName.trim() || !phone.trim() || !email.trim()) {
      setFeedbackError('Please enter your Name, Phone Number, and Email before proceeding.');
      return null;
    }

    try {
      const payload = {
        clientName: clientName.trim(),
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        notes: notes.trim(),
        primaryService,
        selectedItems: itemizedLines,
        hostingTier: selectedHosting.name,
        oneTimeTotal,
        monthlyTotal,
        estimatedWeeks,
        usdRateNoteAccepted: true,
      };

      const res = await fetch('/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to save quotation.');
      }

      setFeedbackError(null);
      setLastQuoteNumber(data.quotation.quoteNumber);
      return { quoteNumber: data.quotation.quoteNumber };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error.';
      setFeedbackError(`Could not record quotation: ${msg}. Downloading local PDF copy anyway.`);
      return { quoteNumber: `ZORA-OFFLINE-${Date.now().toString().slice(-4)}` };
    }
  };

  const handleSaveAndDownloadPdf = async () => {
    setBusyAction('pdf');
    try {
      const record = await saveQuotationToDatabase();
      if (!record) {
        setBusyAction(null);
        return;
      }

      await generateOfficialQuotationPdf({
        quoteNumber: record.quoteNumber,
        clientName: clientName.trim(),
        companyName: companyName.trim() || undefined,
        email: email.trim(),
        phone: phone.trim(),
        notes: notes.trim() || undefined,
        hostingTier: selectedHosting.name,
        selectedItems: itemizedLines,
        oneTimeTotal,
        monthlyTotal,
        estimatedWeeks,
      });
    } catch {
      setFeedbackError('Failed to generate PDF. Please ensure all popups are enabled.');
    } finally {
      setBusyAction(null);
    }
  };

  const handleSendWhatsApp = async (founder: string = 'Panduka') => {
    if (!clientName.trim() || !phone.trim()) {
      setFeedbackError('Please enter at least your Name and Phone Number before contacting on WhatsApp.');
      return;
    }

    const digits = '94777321165';
    const itemSummary = itemizedLines
      .slice(0, 4)
      .map((it) => `• ${it.name} (${formatLkr(it.price)})`)
      .join('\n');

    const waLines = [
      `*Hello ${founder} (Zora Solutions)*,`,
      `I have built an instant project quotation on your website:`,
      ``,
      `• *Client:* ${clientName}${companyName ? ` (${companyName})` : ''}`,
      `• *Phone:* ${phone} | *Email:* ${email || 'N/A'}`,
      `• *Primary Focus:* ${primaryService}`,
      ``,
      `*Selected Breakdown:*`,
      itemSummary,
      ``,
      `• *Estimated Base Total:* ${formatLkr(oneTimeTotal)}${hostingTierId === 'custom-domain-cloud' ? '+' : ''}`,
      notes ? `• *Notes:* ${notes}` : null,
      ``,
      `Please confirm the final timeline and next steps!`,
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
    <section id="quote-builder" className="relative border-b border-sky-100 bg-[#F0F7FF] py-12 transition-colors sm:py-16 dark:border-slate-800 dark:bg-[#070B14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Currency & Market Rate Notice Banner */}
        <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-5 shadow-matte-sm dark:border-amber-900/60 dark:bg-amber-950/30">
          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-200 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="text-xs leading-relaxed text-amber-900 sm:text-sm dark:text-amber-200">
              <strong className="font-semibold text-amber-950 dark:text-amber-100">
                Transparent Pricing &amp; Currency Policy:
              </strong>{' '}
              All base development and engineering fees are quoted in Sri Lankan Rupees (LKR). Third-party
              cloud servers, custom domain registrations (.com/.net), and specialized API services are tied
              to USD ($) and subject to the prevailing commercial bank exchange rate at invoice issue.
            </div>
          </div>
        </div>

        {/* Split-Screen 2-Column Layout */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* LEFT COLUMN (7 Cols): Multi-Step Configurator */}
          <div className="space-y-6 sm:space-y-8 lg:col-span-7">
            {/* STEP 1: Select Primary Service Type */}
            <div className="rounded-2xl border border-sky-100 bg-white p-4 sm:p-7 lg:p-8 shadow-matte-sm dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                <Layers className="h-4 w-4" />
                <span>Step 01 • Select Primary System Scope</span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PRIMARY_SERVICES.map((srv) => {
                  const active = primaryService === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => handleSelectPrimaryService(srv.id)}
                      className={`rounded-xl border p-4 text-left transition-all ${
                        active
                          ? 'border-sky-600 bg-sky-50 text-slate-900 dark:border-sky-500 dark:bg-sky-950/40 dark:text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {srv.label}
                      </div>
                      <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{srv.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: System Development, Pages Slider, Add-ons & Hosting */}
            <div className="rounded-2xl border border-sky-100 bg-white p-4 sm:p-7 lg:p-8 shadow-matte-sm dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  <Sliders className="h-4 w-4" />
                  <span>Step 02 • System Modules, Pages &amp; Cloud Tier</span>
                </div>

                <span className="rounded-lg bg-sky-100 px-3 py-1 font-mono text-xs font-bold text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
                  Base System: Rs. 35,000
                </span>
              </div>

              {/* Base Starter Card */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      Starter System / Corporate Web App
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Responsive UI, up to 5 core views, contact forms, SEO basics &amp; fast caching
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-sky-600 dark:text-sky-400">
                    Rs. 35,000
                  </span>
                </div>
              </div>

              {/* Extra Dynamic Pages Slider */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-display text-xs font-bold text-slate-900 dark:text-white">
                    Extra Dynamic Pages (+Rs. 4,500 each)
                  </label>
                  <span className="rounded-md bg-slate-900 px-2.5 py-1 font-mono text-xs font-bold text-white dark:bg-slate-100 dark:text-slate-950">
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
                  className="mt-3.5 h-2 w-full cursor-pointer accent-sky-600 dark:accent-sky-400"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-500 dark:text-slate-400">
                  <span>0 Extra (5 Base Pages)</span>
                  <span>10 Extra Pages</span>
                  <span>20 Extra Pages</span>
                </div>
              </div>

              {/* Optional Development Add-ons */}
              <div className="space-y-2">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Optional Architecture Modules:
                </div>
                {SYSTEM_ADDONS.map((addon) => {
                  const checked = selectedSystemAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleSystemAddon(addon.id)}
                      className={`flex w-full items-center justify-between gap-4 rounded-xl border p-3.5 text-left transition-all ${
                        checked
                          ? 'border-sky-600 bg-sky-50 dark:border-sky-500 dark:bg-sky-950/40'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] font-bold ${
                            checked
                              ? 'border-sky-600 bg-sky-600 text-white dark:border-sky-400 dark:bg-sky-400 dark:text-slate-950'
                              : 'border-slate-300 dark:border-slate-600'
                          }`}
                        >
                          {checked ? '✓' : ''}
                        </span>
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {addon.name}
                        </span>
                      </div>
                      <span className="shrink-0 font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                        +{formatLkr(addon.price)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Hosting & Domain Options */}
              <div className="space-y-2.5 border-t border-slate-100 pt-5 dark:border-slate-800">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <Server className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                  <span>Cloud Hosting &amp; Domain Options:</span>
                </div>

                {HOSTING_OPTIONS.map((opt) => {
                  const active = hostingTierId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setHostingTierId(opt.id)}
                      className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                        active
                          ? 'border-sky-600 bg-sky-50 dark:border-sky-500 dark:bg-sky-950/40'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-display text-xs font-bold text-slate-900 dark:text-white">
                          {opt.name}
                        </span>
                        <span
                          className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                            opt.usdSubject
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                              : opt.id === 'primary-subdomain'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {opt.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] font-medium text-sky-600 dark:text-sky-400">
                        {opt.label}
                      </p>
                      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span>{opt.detail}</span>
                        <strong className="font-mono text-slate-900 dark:text-white">
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

            {/* STEP 3: Client Details Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-7 lg:p-8 shadow-matte-sm dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                <User className="h-4 w-4" />
                <span>Step 03 • Contact Details for Official Quotation PDF</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Kasun Silva"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Ceylon Logistics"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="kasun@example.com"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +94 77 123 4567"
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Project Notes / Requirements (Optional)
                </label>
                <textarea
                  rows={3}
                  maxLength={1500}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific integrations, third-party APIs, or deadlines..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5 Cols): Sticky Receipt Summary */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="rounded-2xl border border-sky-100 bg-white p-4 sm:p-6 lg:p-7 shadow-matte-md dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                    ESTIMATE SUMMARY
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    Zora Solutions Quotation
                  </h3>
                </div>
                {lastQuoteNumber && (
                  <span className="rounded-md bg-amber-100 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    {lastQuoteNumber}
                  </span>
                )}
              </div>

              {/* Itemized List */}
              <div className="mt-4 max-h-[260px] space-y-2 overflow-y-auto pr-1">
                {itemizedLines.map((item) => (
                  <div
                    key={`${item.category}-${item.name}`}
                    className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{item.name}</div>
                      <div className="mt-0.5 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        {item.category}
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-xs font-bold text-slate-900 dark:text-white">
                      {formatLkr(item.price)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Real-Time Total Box */}
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Estimated Base Total
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${oneTimeTotal}-${hostingTierId}`}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="font-display text-xl font-bold text-slate-900 dark:text-white"
                    >
                      {formatLkr(oneTimeTotal)}
                      {hostingTierId === 'custom-domain-cloud' ? '+' : ''}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  Estimated Timeline: ~{estimatedWeeks} weeks
                </div>
              </div>

              {/* Validation / Feedback Message */}
              {feedbackError && (
                <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
                  {feedbackError}
                </div>
              )}

              {lastQuoteNumber && !feedbackError && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-xs font-medium text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Quotation saved as {lastQuoteNumber}. Ready for review.</span>
                </div>
              )}

              {/* Actions */}
              <div className="mt-5 space-y-2.5">
                <button
                  type="button"
                  disabled={busyAction !== null}
                  onClick={handleSaveAndDownloadPdf}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 font-display text-xs font-bold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 disabled:opacity-60"
                >
                  {busyAction === 'pdf' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Generating Official PDF...</span>
                    </>
                  ) : (
                    <>
                      <FileDown className="h-4 w-4" />
                      <span>Download Official PDF Quotation</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleSendWhatsApp('Panduka')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 font-mono text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-500 hover:text-white dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500 dark:hover:text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Panduka (+94 777 321 165)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
