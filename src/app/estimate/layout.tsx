import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real-Time Project Cost Calculator & Instant PDF Quotation',
  description:
    'Calculate transparent, itemized web and software development costs in Sri Lankan Rupees (LKR). Customize page counts, cloud hosting, payment gateways, and download instant PDF quotations.',
  keywords: [
    'Zora estimate',
    'Zora quotation calculator',
    'website cost sri lanka',
    'software price calculator',
    'web development cost calculator lkr',
  ],
  alternates: {
    canonical: '/estimate',
  },
  openGraph: {
    title: 'Interactive Project Price Calculator | Zora Solutions',
    description:
      'Real-time cost calculator for web development, e-commerce, and software in Sri Lanka with instant PDF download.',
    url: 'https://solutions.zoragroup.lk/estimate',
  },
};

export default function EstimateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
