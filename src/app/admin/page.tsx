'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Trash2,
  MessageCircle,
  PhoneCall,
  Layers,
  Users,
  Briefcase,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Save,
  Edit3,
  X,
  FileText,
} from 'lucide-react';
import { CORE_SERVICES_ENUM } from '@/lib/security';
import type { InquiryStatus } from '@/models/Inquiry';
import type { QuotationStatus } from '@/models/Quotation';
import type { SeedProjectItem, SeedServiceItem } from '@/lib/seedData';
import type { MemoryInquiryRecord, MemoryQuotationRecord } from '@/lib/mongodb';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'inquiries' | 'quotations' | 'projects' | 'services'>('inquiries');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [dbMode, setDbMode] = useState('');
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string } | null>(
    null
  );
  const [stats, setStats] = useState({
    totalInquiries: 0,
    newInquiries: 0,
    wonDeals: 0,
    totalProjects: 0,
    totalServices: 0,
    totalQuotations: 0,
  });

  const [inquiries, setInquiries] = useState<MemoryInquiryRecord[]>([]);
  const [quotations, setQuotations] = useState<MemoryQuotationRecord[]>([]);
  const [projects, setProjects] = useState<SeedProjectItem[]>([]);
  const [services, setServices] = useState<SeedServiceItem[]>([]);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Edit Service Modal State
  const [editingService, setEditingService] = useState<SeedServiceItem | null>(null);
  const [srvTagline, setSrvTagline] = useState('');
  const [srvDesc, setSrvDesc] = useState('');
  const [srvTimeline, setSrvTimeline] = useState('');
  const [srvPackagePrice, setSrvPackagePrice] = useState('');
  const [srvDeliverables, setSrvDeliverables] = useState('');

  // New Case Study Modal Form State
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjSlug, setNewProjSlug] = useState('');
  const [newProjCategory, setNewProjCategory] = useState<(typeof CORE_SERVICES_ENUM)[number]>(
    'Web Development'
  );
  const [newProjClient, setNewProjClient] = useState('');
  const [newProjSummary, setNewProjSummary] = useState('');
  const [newProjChallenge, setNewProjChallenge] = useState('');
  const [newProjSolution, setNewProjSolution] = useState('');
  const [newProjTech, setNewProjTech] = useState('Next.js 15, TypeScript, MongoDB, Tailwind CSS');
  const [newProjThumb, setNewProjThumb] = useState(
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85'
  );

  const showToast = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 3000);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats', { credentials: 'include' });
      if (res.status === 401) {
        window.location.assign('/admin/login');
        return;
      }
      const data = await res.json();
      if (data.success) {
        setDbMode(data.mode);
        setAdminUser(data.admin);
        setStats(data.stats);
        setInquiries(data.inquiries || []);
        setQuotations(data.quotations || []);
        setProjects(data.projects || []);
        setServices(data.services || []);

        const initialNotes: Record<string, string> = {};
        (data.inquiries || []).forEach((inq: MemoryInquiryRecord) => {
          initialNotes[inq._id] = inq.adminNotes || '';
        });
        setNotesDraft(initialNotes);
      }
    } catch (err) {
      console.error('Failed to fetch CMS data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.assign('/admin/login');
  };

  const handleStatusChange = async (id: string, status: InquiryStatus) => {
    await fetch('/api/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    showToast(`Lead status updated to ${status}`);
    fetchDashboardData();
  };

  const handleSaveNotes = async (id: string) => {
    await fetch('/api/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, adminNotes: notesDraft[id] || '' }),
    });
    showToast('Founder notes saved');
    fetchDashboardData();
  };

  const handleDeleteInquiry = async (id: string) => {
    await fetch(`/api/inquiries?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    showToast('Inquiry removed');
    fetchDashboardData();
  };

  const handleQuotationStatusChange = async (id: string, status: QuotationStatus) => {
    await fetch('/api/quotations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    showToast(`Quotation status updated to ${status}`);
    fetchDashboardData();
  };

  const handleDeleteQuotation = async (id: string) => {
    await fetch(`/api/quotations?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    showToast('Quotation removed');
    fetchDashboardData();
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      newProjSlug ||
      newProjTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newProjTitle,
        slug,
        category: newProjCategory,
        clientName: newProjClient,
        completionDate: '2026 Q1',
        summary: newProjSummary,
        challenge: newProjChallenge,
        solution: newProjSolution,
        impactMetrics: [
          { label: 'Performance Score', value: '99/100' },
          { label: 'Client Growth', value: '+180%' },
        ],
        techStack: newProjTech
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        thumbnailUrl: newProjThumb,
        galleryImages: [newProjThumb],
        liveUrl: 'https://zorasolutions.lk',
        figmaUrl: 'https://figma.com',
        isFeatured: true,
        displayOrder: projects.length + 1,
      }),
    });

    if (res.ok) {
      setShowNewProjectModal(false);
      setNewProjTitle('');
      setNewProjSlug('');
      setNewProjClient('');
      setNewProjSummary('');
      setNewProjChallenge('');
      setNewProjSolution('');
      showToast('New portfolio project published!');
      fetchDashboardData();
    }
  };

  const handleDeleteProject = async (id: string) => {
    await fetch(`/api/projects?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    showToast('Project removed from portfolio');
    fetchDashboardData();
  };

  const openEditService = (srv: SeedServiceItem) => {
    setEditingService(srv);
    setSrvTagline(srv.tagline);
    setSrvDesc(srv.description);
    setSrvTimeline(srv.startingTimeline);
    setSrvPackagePrice(srv.packagePrice || '');
    setSrvDeliverables(srv.deliverables.join('\n'));
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    const res = await fetch('/api/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editingService._id || editingService.slug,
        tagline: srvTagline,
        description: srvDesc,
        startingTimeline: srvTimeline,
        packagePrice: srvPackagePrice,
        deliverables: srvDeliverables
          .split('\n')
          .map((d) => d.trim())
          .filter(Boolean),
      }),
    });

    if (res.ok) {
      setEditingService(null);
      showToast('Service details updated!');
      fetchDashboardData();
    }
  };

  const filteredInquiries =
    statusFilter === 'All'
      ? inquiries
      : inquiries.filter((i) => i.status === statusFilter);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      {/* Floating Toast Notification */}
      {savedNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl border border-white bg-white px-5 py-3 font-mono text-xs font-extrabold text-[#030712] shadow-2xl">
          <CheckCircle2 className="h-4 w-4 text-[#0051FF]" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* Top CMS Bar */}
      <header className="border-b border-white/15 bg-[#071022] px-4 py-4 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/10 p-1.5">
              <img src="/assets/logo.png" alt="Zora Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-extrabold text-white">
                  Zora Solutions — Founder Control Center
                </h1>
                <span className="rounded-full bg-amber-400 px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-[#030712]">
                  ADMIN ACTIVE
                </span>
              </div>
              <p className="font-mono text-xs text-slate-300">
                {adminUser ? `${adminUser.name} (${adminUser.email})` : 'Authenticated Session'} •{' '}
                <span className="text-[#00F0FF]">{dbMode}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 font-mono text-xs font-extrabold text-[#030712] hover:bg-[#00F0FF]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>View Live Website</span>
            </Link>
            <button
              type="button"
              onClick={fetchDashboardData}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 font-mono text-xs text-white hover:border-[#00F0FF]"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3.5 py-2 font-mono text-xs text-rose-300 hover:bg-rose-500/20"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        {/* KPI Summary Cards (Alternating Crisp White & Dark Cards) */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Client Inquiries', value: stats.totalInquiries, icon: Users, white: true },
            { label: 'Generated Quotations', value: stats.totalQuotations, icon: FileText, white: false },
            { label: 'Portfolio Projects', value: stats.totalProjects, icon: Briefcase, white: true },
            { label: 'Core Services', value: stats.totalServices, icon: Layers, white: false },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`rounded-2xl border p-5 ${
                  card.white
                    ? 'border-white bg-white text-[#0F172A] shadow-lg'
                    : 'border-white/15 bg-[#071022] text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold ${
                      card.white ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {card.label}
                  </span>
                  <Icon className={`h-4 w-4 ${card.white ? 'text-[#0051FF]' : 'text-amber-400'}`} />
                </div>
                <div
                  className={`mt-2 font-display text-3xl font-extrabold ${
                    card.white ? 'text-[#040B1A]' : 'text-white'
                  }`}
                >
                  {card.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'inquiries', label: `Client Requirements (${inquiries.length})` },
              { id: 'quotations', label: `Quotations (${quotations.length})` },
              { id: 'projects', label: `Portfolio Projects (${projects.length})` },
              { id: 'services', label: `Our Services (${services.length})` },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={`rounded-xl px-4 py-2.5 font-mono text-xs font-extrabold transition-all ${
                  activeTab === t.id
                    ? 'bg-white text-[#030712] shadow-lg'
                    : 'bg-[#071022] text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'inquiries' && (
            <div className="flex flex-wrap gap-1.5">
              {['All', 'New', 'Contacted', 'In-Discussion', 'Won', 'Archived'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-bold ${
                    statusFilter === st
                      ? 'bg-amber-400 text-[#030712]'
                      : 'bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <button
              type="button"
              onClick={() => setShowNewProjectModal(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 font-display text-xs font-extrabold text-[#030712] hover:bg-amber-300"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Project</span>
            </button>
          )}
        </div>

        {/* TAB 1: CLIENT INQUIRIES & REQUIREMENTS */}
        {activeTab === 'inquiries' && (
          <div className="mt-6 space-y-4">
            {filteredInquiries.length === 0 ? (
              <div className="rounded-2xl border border-white/15 bg-[#071022] p-8 text-center text-sm text-slate-300">
                No client inquiries in this status filter yet.
              </div>
            ) : (
              filteredInquiries.map((inq) => (
                <div
                  key={inq._id}
                  className="rounded-2xl border border-white/15 bg-[#071022] p-6 transition-all hover:border-white/35"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-display text-xl font-bold text-white">
                          {inq.clientName}
                        </h3>
                        {inq.companyName && (
                          <span className="font-mono text-xs text-amber-300">
                            • {inq.companyName}
                          </span>
                        )}
                        <span className="rounded-lg bg-white/10 px-2.5 py-0.5 font-mono text-xs text-white">
                          Assigned: {inq.preferredContact}
                        </span>
                      </div>
                      <div className="mt-1 font-mono text-xs text-slate-300">
                        Phone: <strong className="text-white">{inq.phone}</strong> • Email:{' '}
                        {inq.email} • Connect Via:{' '}
                        <strong className="text-amber-300">{inq.estimatedBudget}</strong>
                      </div>
                    </div>

                    {/* Status Selector & Direct Reply */}
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleStatusChange(inq._id, e.target.value as InquiryStatus)
                        }
                        className="rounded-xl border border-white/25 bg-[#02050D] px-3 py-2 font-mono text-xs font-bold text-amber-300"
                      >
                        {['New', 'Contacted', 'In-Discussion', 'Won', 'Archived'].map((st) => (
                          <option key={st} value={st}>
                            Status: {st}
                          </option>
                        ))}
                      </select>

                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hi ${inq.clientName}, this is Zora Solutions following up on your project requirements!`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 font-mono text-xs font-extrabold text-[#030712] hover:bg-[#00F0FF]"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>WhatsApp Client</span>
                      </a>

                      <a
                        href={`tel:${inq.phone}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-2 font-mono text-xs text-white hover:bg-white hover:text-[#030712]"
                      >
                        <PhoneCall className="h-3.5 w-3.5 text-amber-400" />
                        <span>Call</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDeleteInquiry(inq._id)}
                        className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Selected Services */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {inq.selectedServices.map((srv) => (
                      <span
                        key={srv}
                        className="rounded-lg bg-white px-2.5 py-1 font-mono text-xs font-bold text-[#030712]"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>

                  {/* Client Requirements Brief */}
                  <div className="mt-4 rounded-xl border border-white/10 bg-[#02050D] p-4">
                    <div className="font-mono text-[10px] font-bold uppercase text-amber-300">
                      Client Requirements & Idea:
                    </div>
                    <p className="mt-1 text-sm text-slate-100 whitespace-pre-wrap">
                      {inq.projectBrief}
                    </p>
                  </div>

                  {/* Founder Internal Notes & Price Quote Tracker */}
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      type="text"
                      value={notesDraft[inq._id] ?? ''}
                      onChange={(e) =>
                        setNotesDraft((prev) => ({ ...prev, [inq._id]: e.target.value }))
                      }
                      placeholder="Add founder notes or quoted price here (e.g. Quoted LKR 85,000 - Call scheduled)..."
                      className="flex-1 rounded-xl border border-white/15 bg-[#02050D] px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:border-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveNotes(inq._id)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-400 px-4 py-2 font-mono text-xs font-extrabold text-[#030712] hover:bg-amber-300"
                    >
                      <Save className="h-3.5 w-3.5" />
                      <span>Save Note</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: GENERATED OFFICIAL QUOTATIONS */}
        {activeTab === 'quotations' && (
          <div className="mt-6 space-y-4">
            {quotations.length === 0 ? (
              <div className="rounded-2xl border border-white/15 bg-[#071022] p-8 text-center text-sm text-slate-300">
                No PDF quotations generated yet. Any quote generated in Build Estimate will appear here automatically.
              </div>
            ) : (
              quotations.map((q) => (
                <div
                  key={q._id}
                  className="rounded-2xl border border-[#00F0FF]/25 bg-[#071022] p-6 transition-all hover:border-[#00F0FF]/60"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-lg bg-[#00F0FF] px-2.5 py-0.5 font-mono text-xs font-extrabold text-[#040914]">
                          {q.quoteNumber}
                        </span>
                        <h3 className="font-display text-xl font-bold text-white">
                          {q.clientName}
                        </h3>
                        {q.companyName && (
                          <span className="font-mono text-xs text-amber-300">• {q.companyName}</span>
                        )}
                      </div>
                      <div className="mt-1.5 font-mono text-xs text-slate-300">
                        Phone: <strong className="text-white">{q.phone}</strong> • Email: {q.email}
                      </div>
                      <div className="mt-1 font-mono text-xs text-slate-300">
                        One-Time: <strong className="text-[#00F0FF]">Rs. {q.oneTimeTotal.toLocaleString()}</strong>
                        {q.monthlyTotal > 0 && (
                          <> • Monthly Retainer: <strong className="text-amber-300">Rs. {q.monthlyTotal.toLocaleString()}/mo</strong></>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        value={q.status}
                        onChange={(e) =>
                          handleQuotationStatusChange(q._id, e.target.value as QuotationStatus)
                        }
                        className="rounded-xl border border-white/25 bg-[#02050D] px-3 py-2 font-mono text-xs font-bold text-amber-300"
                      >
                        {['Generated', 'Sent_WhatsApp', 'Converted'].map((st) => (
                          <option key={st} value={st}>
                            Status: {st}
                          </option>
                        ))}
                      </select>

                      <a
                        href={`https://wa.me/${q.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Hi ${q.clientName}, regarding your Zora Solutions quotation ${q.quoteNumber} (Rs. ${q.oneTimeTotal.toLocaleString()}), how would you like to proceed?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 font-mono text-xs font-extrabold text-[#030712] hover:bg-[#00F0FF]"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleDeleteQuotation(q._id)}
                        className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20"
                        title="Delete Quotation"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {q.selectedItems.map((item, idx) => (
                      <div
                        key={`${q._id}-${idx}`}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-[#02050D] px-3 py-2 text-xs"
                      >
                        <span className="text-slate-200">{item.name}</span>
                        <span className="ml-3 shrink-0 font-mono font-bold text-amber-300">
                          Rs. {item.price.toLocaleString()}{item.billingType === 'Monthly' ? '/mo' : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: PORTFOLIO CASE STUDIES */}
        {activeTab === 'projects' && (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((proj) => (
              <div
                key={proj._id || proj.slug}
                className="flex flex-col justify-between rounded-2xl border border-white/15 bg-[#071022] p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg bg-white px-2.5 py-1 font-mono text-xs font-extrabold text-[#030712]">
                      {proj.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(proj._id || proj.slug)}
                      className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500/20"
                      title="Delete Project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">{proj.title}</h3>
                  <p className="mt-1 font-mono text-xs text-amber-300">Client: {proj.clientName}</p>
                  <p className="mt-2 text-sm text-slate-200">{proj.summary}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                  {proj.techStack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px] text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: CORE SERVICES (With Edit Capability!) */}
        {activeTab === 'services' && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map((srv) => (
              <div
                key={srv._id || srv.slug}
                className="flex flex-col justify-between rounded-2xl border border-white/15 bg-[#071022] p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-xl font-bold text-white">{srv.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-amber-300">
                        {srv.startingTimeline}
                      </span>
                      <button
                        type="button"
                        onClick={() => openEditService(srv)}
                        className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 font-mono text-xs font-bold text-[#030712] hover:bg-[#00F0FF]"
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>Edit</span>
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-xs font-bold text-[#00F0FF]">{srv.tagline}</p>
                  <p className="mt-2 text-sm text-slate-200">{srv.description}</p>
                  <div className="mt-4 space-y-1.5">
                    {srv.deliverables.map((d) => (
                      <div key={d} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02050D]/85 p-4 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-3xl border border-white/25 bg-[#071022] p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold text-white">
                Edit Service: {editingService.title}
              </h3>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="rounded-lg bg-white/10 p-2 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSaveService} className="mt-5 space-y-4">
              <div>
                <label className="block font-mono text-xs text-slate-300">Short Tagline</label>
                <input
                  type="text"
                  required
                  value={srvTagline}
                  onChange={(e) => setSrvTagline(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] px-3.5 py-2.5 text-sm text-white"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs text-slate-300">Package Label / Timeline</label>
                  <input
                    type="text"
                    required
                    value={srvTimeline}
                    onChange={(e) => setSrvTimeline(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-slate-300">Starting Package Price (Optional)</label>
                  <input
                    type="text"
                    value={srvPackagePrice}
                    onChange={(e) => setSrvPackagePrice(e.target.value)}
                    placeholder="e.g. Rs. 10,000 / month"
                    className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-xs text-slate-300">Description</label>
                <textarea
                  rows={3}
                  required
                  value={srvDesc}
                  onChange={(e) => setSrvDesc(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] p-3 text-sm text-white"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-slate-300">
                  Deliverables (One per line)
                </label>
                <textarea
                  rows={5}
                  required
                  value={srvDeliverables}
                  onChange={(e) => setSrvDeliverables(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] p-3 text-sm text-white"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="rounded-xl border border-white/20 px-4 py-2.5 font-mono text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-white px-6 py-2.5 font-display text-xs font-extrabold text-[#030712]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Case Study Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02050D]/85 p-4 backdrop-blur-md">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/25 bg-[#071022] p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold text-white">
              Add New Portfolio Project
            </h3>
            <form onSubmit={handleCreateProject} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs text-slate-300">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={newProjTitle}
                    onChange={(e) => setNewProjTitle(e.target.value)}
                    placeholder="e.g. Modern Hotel Booking Website"
                    className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-slate-300">Service Category *</label>
                  <select
                    value={newProjCategory}
                    onChange={(e) =>
                      setNewProjCategory(e.target.value as (typeof CORE_SERVICES_ENUM)[number])
                    }
                    className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] px-3.5 py-2.5 text-sm text-white"
                  >
                    {CORE_SERVICES_ENUM.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs text-slate-300">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newProjClient}
                    onChange={(e) => setNewProjClient(e.target.value)}
                    placeholder="e.g. Ceylon Resort Group"
                    className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-slate-300">
                    Features / Tech Stack (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={newProjTech}
                    onChange={(e) => setNewProjTech(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] px-3.5 py-2.5 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-300">Short Summary *</label>
                <textarea
                  required
                  rows={2}
                  value={newProjSummary}
                  onChange={(e) => setNewProjSummary(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] p-3 text-sm text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs text-slate-300">Client Challenge *</label>
                  <textarea
                    required
                    rows={3}
                    value={newProjChallenge}
                    onChange={(e) => setNewProjChallenge(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] p-3 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-slate-300">How We Solved It *</label>
                  <textarea
                    required
                    rows={3}
                    value={newProjSolution}
                    onChange={(e) => setNewProjSolution(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] p-3 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-300">Photo URL</label>
                <input
                  type="url"
                  value={newProjThumb}
                  onChange={(e) => setNewProjThumb(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-[#02050D] px-3.5 py-2.5 text-sm text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="rounded-xl border border-white/20 px-4 py-2.5 font-mono text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-white px-6 py-2.5 font-display text-xs font-extrabold text-[#030712]"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
