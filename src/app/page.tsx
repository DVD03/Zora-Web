'use client';

import React, { useEffect, useState } from 'react';
import PreloaderLogo from '@/components/PreloaderLogo';
import Navbar from '@/components/Navbar';
import Hero3DShowcase from '@/components/Hero3DShowcase';
import ServicesBentoGrid from '@/components/ServicesBentoGrid';
import PortfolioShowcase from '@/components/PortfolioShowcase';
import WorkflowLaserTimeline from '@/components/WorkflowLaserTimeline';
import QuotationBuilder from '@/components/QuotationBuilder';
import ProjectConfigurator from '@/components/ProjectConfigurator';
import Footer from '@/components/Footer';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import { INITIAL_PROJECTS, INITIAL_SERVICES, type SeedProjectItem, type SeedServiceItem } from '@/lib/seedData';

export default function HomePage() {
  const [projects, setProjects] = useState<SeedProjectItem[]>(INITIAL_PROJECTS);
  const [services, setServices] = useState<SeedServiceItem[]>(INITIAL_SERVICES);
  const [preselectedService, setPreselectedService] = useState<string | null>(null);

  useEffect(() => {
    // Hydrate dynamic projects & services from API (/api/projects & /api/services)
    async function fetchLiveContent() {
      try {
        const [projRes, srvRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/services'),
        ]);
        if (projRes.ok) {
          const projData = await projRes.json();
          if (projData.success && Array.isArray(projData.projects) && projData.projects.length > 0) {
            setProjects(projData.projects);
          }
        }
        if (srvRes.ok) {
          const srvData = await srvRes.json();
          if (srvData.success && Array.isArray(srvData.services) && srvData.services.length > 0) {
            setServices(srvData.services);
          }
        }
      } catch {
        // Fallback to initial seeded data seamlessly
      }
    }
    fetchLiveContent();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#02050D] text-white">
      {/* Initial Cyber-Luxury Preloader with /assets/logo.png */}
      <PreloaderLogo />

      {/* Sticky Glassmorphic Navbar with Scroll-Linked 3D Logo Morph */}
      <Navbar />

      {/* Hero Section with 3D Perspective Unfold & Holographic Background 'Z' */}
      <Hero3DShowcase />

      {/* 5 Core Services Bento Grid with Interactive "Inspect Tech Stack" Flip */}
      <ServicesBentoGrid
        services={services}
        onSelectService={(srv) => setPreselectedService(srv)}
      />

      {/* Interactive Case Studies Showcase with Category Filters & Glassmorphic Modal */}
      <PortfolioShowcase
        initialProjects={projects}
        onStartSimilarProject={(category) => setPreselectedService(category)}
      />

      {/* 3-Step Scroll-Drawn Neon Laser Workflow Timeline (30% / 60% / 100%) */}
      <WorkflowLaserTimeline />

      {/* Real-Time Interactive Quotation Calculator & Instant Official A4 PDF Generator */}
      <QuotationBuilder />

      {/* Direct WhatsApp Consultation & Project Requirements Hub */}
      <ProjectConfigurator preselectedService={preselectedService} />

      {/* Cyber-Luxury Footer */}
      <Footer />

      {/* Bottom-Right Floating Direct WhatsApp to Panduka */}
      <FloatingWhatsAppButton />
    </main>
  );
}

