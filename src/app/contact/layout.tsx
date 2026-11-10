import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Direct Founder Technical Consultation',
  description:
    'Connect directly with founder Panduka Wijekoon at Zora Solutions. Submit your project requirements, receive architecture blueprints, or message directly on WhatsApp (+94 777 321 165).',
  keywords: [
    'Zora contact',
    'contact Zora Solutions',
    'Panduka Wijekoon contact',
    'hire developers sri lanka',
    'software consultation sri lanka',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Connect with Zora Solutions | Founder Technical Consultation',
    description:
      'Direct WhatsApp and phone access to lead engineers. Fast, transparent proposals for web and software projects.',
    url: 'https://solutions.zoragroup.lk/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
