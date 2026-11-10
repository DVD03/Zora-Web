import type { Metadata } from 'next';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import CursorSpotlight from '@/components/CursorSpotlight';

export const metadata: Metadata = {
  title: 'Zora Solutions | Crafting Digital Solutions — Turn Your Ideas into Digital Reality',
  description:
    'We build modern, reliable, and creative digital solutions to help you and your business grow online. Web Development, E-commerce Platforms, Custom Software Solutions, Digital Marketing & Branding, and UI/UX Design.',
  keywords: [
    'Zora Solutions',
    'Crafting Digital Solutions',
    'Web Development Sri Lanka',
    'E-commerce Platforms',
    'Custom Software Solutions',
    'Digital Marketing & Branding',
    'UI/UX Design',
  ],
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#02050D] font-sans text-white antialiased">
        <SmoothScrollProvider>
          <CursorSpotlight />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
