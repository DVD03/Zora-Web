import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Production Portfolio & Client Case Studies',
  description:
    'Verified production case studies engineered by Zora Solutions. Inspect high-performance web systems, enterprise portals, multi-currency e-commerce storefronts, and cloud architectures.',
  keywords: [
    'Zora portfolio',
    'Zora solutions projects',
    'Zora client case studies',
    'software projects sri lanka',
    'web app portfolio',
    'ecommerce case studies',
  ],
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Production Portfolio & Case Studies | Zora Solutions',
    description:
      'Verified production systems, enterprise software, and e-commerce platforms engineered by Zora Solutions.',
    url: 'https://solutions.zoragroup.lk/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
