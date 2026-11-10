import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Specialized Engineering Services | Web, Mobile & Software',
  description:
    'Explore Zora Solutions comprehensive services: Custom Web Applications, Luxury E-Commerce Platforms, Bespoke Software Solutions, Digital Marketing & Branding, and UI/UX Systems.',
  keywords: [
    'Zora services',
    'Zora solutions services',
    'web development services sri lanka',
    'ecommerce development colombo',
    'custom software solutions',
    'digital marketing agency',
    'UI UX design agency',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Specialized Engineering Services | Zora Solutions',
    description:
      'Custom Web Applications, Scalable E-Commerce Storefronts, Enterprise Software, and Performance Marketing.',
    url: 'https://solutions.zoragroup.lk/services',
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
