'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import PageHeader from '@/components/PageHeader';
import ProjectConfigurator from '@/components/ProjectConfigurator';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] transition-colors dark:bg-[#090D16]">
      <Navbar />

      <PageHeader
        badge="Direct Founder Communication"
        title="Start Your Project With Us"
        titleHighlight="Fast & Transparent"
        description="Connect directly with Panduka and Dilum. Share your requirements to receive a comprehensive technical proposal, milestone breakdown, and instant WhatsApp consultation."
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <ProjectConfigurator />

      <Footer />
      <FloatingWhatsAppButton />
    </main>
  );
}
