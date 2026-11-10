'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import PageHeader from '@/components/PageHeader';
import QuotationBuilder from '@/components/QuotationBuilder';

export default function EstimatePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] transition-colors dark:bg-[#090D16]">
      <Navbar />

      <PageHeader
        badge="Real-Time Estimation"
        title="Interactive Project Price Calculator"
        titleHighlight="Instant PDF"
        description="Select your project specifications, pages, hosting infrastructure, and specialized add-ons to calculate instant, itemized costs in LKR with official PDF download."
        breadcrumbs={[{ label: 'Quotation Calculator' }]}
      />

      <QuotationBuilder />

      <Footer />
      <FloatingWhatsAppButton />
    </main>
  );
}
