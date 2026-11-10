import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How We Work | 3-Phase Delivery Framework & SLA',
  description:
    'Our predictable milestone-driven software engineering framework. Fixed scopes of work, transparent staging demos, 100% code ownership, and 30-day hypercare SLA guarantee.',
  keywords: [
    'Zora process',
    'Zora solutions how we work',
    'software development process',
    'agile delivery framework',
    'software SLA guarantee',
  ],
  alternates: {
    canonical: '/process',
  },
  openGraph: {
    title: 'Execution Framework & Predictable Delivery | Zora Solutions',
    description:
      'Rigid 3-phase delivery process with structured client reviews, live staging demos, and fixed SLA commitments.',
    url: 'https://solutions.zoragroup.lk/process',
  },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
