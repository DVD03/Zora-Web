'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
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
    sub: 'Fastest reply — direct message with founders',
  },
  {
    id: 'WhatsApp Voice / Audio Call',
    label: 'WhatsApp Voice Call',
    sub: 'Quick voice consultation to discuss requirements',
  },
  {
    id: 'Direct Phone Call',
    label: 'Direct Mobile Call',
    sub: 'We will call your direct mobile number',
  },
  {
    id: 'Online Video Meeting (Zoom / Meet)',
    label: 'Video Screen-Share',
    sub: 'Architectural walkthrough & live discussion',
  },
];

export default function ProjectConfigurator({ preselectedService }: ProjectConfiguratorProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(['Web Development']);
  const [connectionMethod, setConnectionMethod] = useState<string>(CONNECTION_METHODS[0].id);

  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredContact, setPreferredContact] = useState<'Panduka' | 'Any'>('Panduka');
  const [projectBrief, setProjectBrief] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService && CORE_SERVICES_ENUM.includes(preselectedService as any)) {
      setSelectedServices([preselectedService]);
    }
  }, [preselectedService]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        if (prev.length === 1) return prev;
        return prev.filter((s) => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleSubmitAndOpenWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (honeypot) return;

    if (!clientName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Please enter your phone or WhatsApp number.');
      return;
    }
    if (!projectBrief.trim()) {
      setErrorMsg('Please write a brief description of what you need.');
      return;
    }

    const payload = {
      clientName: clientName.trim(),
      companyName: companyName.trim() || undefined,
      email: `${phone.replace(/\D/g, '') || 'client'}@whatsapp.client`,
      phone: phone.trim(),
      whatsappNumber: phone.trim(),
      selectedServices,
      estimatedBudget: `Custom Quote (${connectionMethod})`,
      projectBrief: `[Preferred Contact: ${connectionMethod}]\n${projectBrief.trim()}`,
      preferredContact,
    };

    const parsed = InquiryValidationSchema.safeParse(payload);
    if (!parsed.success) {
      setErrorMsg(parsed.error.errors[0]?.message || 'Please check your inputs.');
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      setSubmittedSuccess(true);

      const targetFounder = 'Panduka';
      const targetNumber = '94777321165';

      const waText = [
        `*Hello ${targetFounder} (Zora Solutions)*,`,
        `I would like to discuss a project with you:`,
        ``,
        `• *Client Name:* ${clientName.trim()}${companyName.trim() ? ` (${companyName.trim()})` : ''}`,
        `• *Phone/WhatsApp:* ${phone.trim()}`,
        `• *Services Needed:* ${selectedServices.join(', ')}`,
        `• *Preferred Contact:* ${connectionMethod}`,
        ``,
        `*Project Brief:*`,
        projectBrief.trim(),
        ``,
        `Looking forward to hearing from you!`,
      ].join('\n');

      setTimeout(() => {
        window.open(
          `https://wa.me/${targetNumber}?text=${encodeURIComponent(waText)}`,
          '_blank',
          'noopener,noreferrer'
        );
      }, 400);
    } catch {
      setErrorMsg('Could not record your inquiry online, but opening WhatsApp directly...');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="configurator" className="relative border-b border-sky-100 bg-[#F0F7FF] py-12 transition-colors sm:py-16 dark:border-slate-800 dark:bg-[#070B14]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Direct Founder Contact Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <a
            href="https://wa.me/94777321165"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border border-sky-100 bg-white p-4 shadow-matte-sm transition-all hover:border-sky-300 hover:shadow-matte-md dark:border-slate-800 dark:bg-[#0F172A] dark:hover:border-slate-700 dark:shadow-matte-dark"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                PANDUKA • FOUNDER
              </div>
              <div className="font-display text-sm font-bold text-slate-900 dark:text-white">
                Chat With Panduka
              </div>
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                +94 777 321 165
              </div>
            </div>
          </a>

          <a
            href="tel:+94777321165"
            className="flex items-center gap-4 rounded-2xl border border-sky-100 bg-white p-4 shadow-matte-sm transition-all hover:border-sky-300 hover:shadow-matte-md dark:border-slate-800 dark:bg-[#0F172A] dark:hover:border-slate-700 dark:shadow-matte-dark"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                DIRECT VOICE LINE
              </div>
              <div className="font-display text-sm font-bold text-slate-900 dark:text-white">
                Call Founder Directly
              </div>
              <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                +94 777 321 165
              </div>
            </div>
          </a>
        </div>

        {/* Main Grid: Form + Founders Overview */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Form */}
          <div className="rounded-2xl border border-sky-100 bg-white p-6 sm:p-8 shadow-matte-sm dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark lg:col-span-8">
            <AnimatePresence mode="wait">
              {!submittedSuccess ? (
                <form onSubmit={handleSubmitAndOpenWhatsApp} className="space-y-6">
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="url_honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {errorMsg && (
                    <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300">
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* 1. Services */}
                  <div>
                    <label className="font-display text-base font-bold text-slate-900 dark:text-white">
                      1. Select the service(s) you require:
                    </label>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {CORE_SERVICES_ENUM.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => toggleService(service)}
                            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                              isSelected
                                ? 'border-sky-600 bg-sky-50 text-sky-800 dark:border-sky-500 dark:bg-sky-950/40 dark:text-sky-300'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            <span
                              className={`flex h-3.5 w-3.5 items-center justify-center rounded border text-[9px] font-bold ${
                                isSelected
                                  ? 'border-sky-600 bg-sky-600 text-white dark:border-sky-400 dark:bg-sky-400 dark:text-slate-950'
                                  : 'border-slate-300 dark:border-slate-600'
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

                  {/* 2. Connection Method */}
                  <div>
                    <label className="block font-display text-base font-bold text-slate-900 dark:text-white">
                      2. Preferred communication channel:
                    </label>

                    <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {CONNECTION_METHODS.map((method) => {
                        const active = connectionMethod === method.id;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => setConnectionMethod(method.id)}
                            className={`rounded-xl border p-3 text-left transition-all ${
                              active
                                ? 'border-sky-600 bg-sky-50 dark:border-sky-500 dark:bg-sky-950/40'
                                : 'border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-slate-700'
                            }`}
                          >
                            <div className="font-display text-xs font-bold text-slate-900 dark:text-white">
                              {method.label}
                            </div>
                            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                              {method.sub}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Inputs */}
                  <div className="space-y-4 border-t border-slate-100 pt-5 dark:border-slate-800">
                    <label className="block font-display text-base font-bold text-slate-900 dark:text-white">
                      3. Your details &amp; project brief:
                    </label>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="e.g. Kasun Perera"
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
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
                          placeholder="e.g. 077 123 4567"
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Company / Brand (Optional)
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Ceylon Logistics"
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Direct Contact
                        </label>
                        <select
                          value={preferredContact}
                          onChange={(e) =>
                            setPreferredContact(e.target.value as 'Panduka' | 'Any')
                          }
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
                        >
                          <option value="Panduka">Panduka (+94 777 321 165)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Project Brief / Idea Description *
                      </label>
                      <textarea
                        required
                        rows={4}
                        maxLength={3000}
                        value={projectBrief}
                        onChange={(e) => setProjectBrief(e.target.value)}
                        placeholder="Briefly describe what kind of website, application, or custom software you are looking to build..."
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-sky-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3.5 font-display text-xs font-bold text-white shadow-sm transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-4 w-4" />
                        <span>Submit &amp; Open WhatsApp Conversation</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-slate-900 dark:text-white">
                    Inquiry Received!
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
                    We have logged your project brief in our system. A WhatsApp window was opened so you can
                    speak directly with our founders.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedSuccess(false)}
                    className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 font-mono text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Right 4 Cols: Trust & SLA Sidebar */}
          <div className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-matte-sm dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Response Guarantee
              </h4>
              <div className="mt-4 space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Under 2 Hours SLA</strong>
                    <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                      We respond to all WhatsApp inquiries within 2 hours during active business hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Direct Founder Consultation</strong>
                    <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                      Your brief is reviewed directly by Panduka, not external sales representatives.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">Free Architecture Blueprint</strong>
                    <p className="mt-0.5 text-slate-500 dark:text-slate-400">
                      We provide initial stack recommendations and high-level milestones at zero commitment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-matte-sm dark:border-slate-800 dark:bg-[#0F172A] dark:shadow-matte-dark">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Official Channels
              </h4>
              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Mail className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                  <a href="mailto:zorasolution.official@gmail.com" className="hover:underline">
                    zorasolution.official@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <PhoneCall className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
                  <span>+94 777 321 165</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
