import type { Metadata } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { ThemeProvider } from '@/components/ThemeProvider';

const SITE_URL = 'https://solutions.zoragroup.lk';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Zora Solutions | Software Engineering & Digital Solutions Agency',
    template: '%s | Zora Solutions',
  },
  description:
    'Zora Solutions (Zora Group) is a premier digital engineering company in Sri Lanka. We architect, design, and build custom web applications, enterprise software, scalable e-commerce storefronts, and brand growth systems. Turn Your Ideas into Digital Reality.',
  applicationName: 'Zora Solutions',
  keywords: [
    'Zora',
    'Zora Solutions',
    'Zora Group',
    'zorasolutions',
    'software company',
    'software company sri lanka',
    'best software company sri lanka',
    'top software company colombo',
    'software development company',
    'custom software company',
    'Zora Sri Lanka',
    'Zora Web',
    'Zora digital solutions',
    'solutions.zoragroup.lk',
    'software development company sri lanka',
    'web development sri lanka',
    'custom software solutions sri lanka',
    'ecommerce website development sri lanka',
    'digital marketing agency sri lanka',
    'web design colombo',
    'react nextjs developer sri lanka',
    'Panduka Wijekoon',
    'software engineering company',
    'cloud hosting sri lanka',
    'UI UX design colombo',
    'enterprise dashboards sri lanka',
    'turn ideas into digital reality',
  ],
  authors: [{ name: 'Panduka Wijekoon', url: SITE_URL }],
  creator: 'Zora Solutions',
  publisher: 'Zora Solutions',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Zora Solutions',
    title: 'Zora Solutions | Software & Digital Engineering Agency',
    description:
      'Turn Your Ideas into Digital Reality. Enterprise web applications, bespoke software, e-commerce platforms, and marketing in Sri Lanka.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        secureUrl: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Zora Solutions — Software Engineering Agency',
        type: 'image/png',
      },
      {
        url: `${SITE_URL}/assets/logo.png`,
        secureUrl: `${SITE_URL}/assets/logo.png`,
        width: 840,
        height: 840,
        alt: 'Zora Solutions Emblem',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zora Solutions | Software Engineering & Digital Solutions',
    description:
      'Turn Your Ideas into Digital Reality. Modern web apps, custom software, and digital marketing in Sri Lanka.',
    images: [`${SITE_URL}/og-image.png`],
    creator: '@ZoraSolutions',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  verification: {
    google: 'googlea60e38811e5896d7',
  },
  category: 'technology',
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Zora Solutions',
      alternateName: [
        'Zora',
        'Zora Group',
        'Zora Solutions Sri Lanka',
        'zorasolutions',
        'Zora Web',
        'Zora Technologies',
      ],
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/logo.png`,
        caption: 'Zora Solutions Official Logo',
      },
      image: `${SITE_URL}/assets/logo-full.png`,
      description:
        'Zora Solutions (part of Zora Group) is a premier digital solutions and software engineering company in Sri Lanka. Crafting modern web applications, bespoke business software, scalable e-commerce platforms, UI/UX systems, and high-impact digital marketing.',
      telephone: '+94777321165',
      email: 'zorasolution.official@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'LK',
        addressLocality: 'Colombo',
      },
      founder: {
        '@type': 'Person',
        name: 'Panduka Wijekoon',
        jobTitle: 'Founder & Technical Director',
      },
      priceRange: 'LKR 10,000 - 500,000+',
      sameAs: ['https://wa.me/94777321165'],
      knowsAbout: [
        'Web Application Development',
        'Custom Software Engineering',
        'E-Commerce Platforms',
        'Cloud Hosting & Infrastructure',
        'Digital Marketing & Social Media Growth',
        'UI/UX Design Systems',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Zora Solutions',
      alternateName: 'Zora',
      description: 'Turn Your Ideas into Digital Reality — Software Engineering & Digital Solutions',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Zora Solutions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Zora Solutions (part of Zora Group) is a leading software company and digital engineering agency in Sri Lanka specializing in bespoke software architectures, custom web applications, e-commerce storefronts, and performance marketing.',
          },
        },
        {
          '@type': 'Question',
          name: 'What services does Zora Solutions software company provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Zora Solutions provides custom software engineering, full-stack Next.js web application development, multi-currency e-commerce platforms, UI/UX systems design, dedicated cloud hosting, and monthly digital marketing packages.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I contact Zora Solutions software company in Sri Lanka?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can connect directly with founder Panduka Wijekoon via phone or WhatsApp at +94 777 321 165, email zorasolution.official@gmail.com, or build an instant official PDF quotation on https://solutions.zoragroup.lk/estimate.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
        {/* Anti-flicker inline theme initialization with default light mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('zora-theme');
                var theme = (saved === 'dark' || saved === 'light') ? saved : 'light';
                document.documentElement.classList.remove('dark', 'light');
                document.documentElement.classList.add(theme);
              } catch (e) {
                document.documentElement.classList.add('light');
              }
            `,
          }}
        />
        {/* Social Share & WhatsApp Preview OpenGraph tags */}
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:secure_url" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Zora Solutions Logo & Branding" />

        {/* Google & Search Engine Knowledge Graph Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased transition-colors duration-200 dark:bg-[#090D16] dark:text-slate-100">
        <ThemeProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
