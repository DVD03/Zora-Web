import type { CORE_SERVICES_ENUM } from './security';

export interface SeedServiceItem {
  _id: string;
  title: (typeof CORE_SERVICES_ENUM)[number];
  slug: string;
  iconName: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStackUsed: string[];
  startingTimeline: string;
  packagePrice?: string;
  glowColor: string;
  displayOrder: number;
}

export interface SeedProjectItem {
  _id: string;
  title: string;
  slug: string;
  category: (typeof CORE_SERVICES_ENUM)[number];
  clientName: string;
  completionDate: string;
  summary: string;
  challenge: string;
  solution: string;
  impactMetrics: { label: string; value: string }[];
  techStack: string[];
  thumbnailUrl: string;
  galleryImages: string[];
  liveUrl: string;
  figmaUrl: string;
  isFeatured: boolean;
  displayOrder: number;
  architectureNodes?: string[];
}

export const INITIAL_SERVICES: SeedServiceItem[] = [
  {
    _id: 'srv-web-development',
    title: 'Web Development',
    slug: 'web-development',
    iconName: 'Globe',
    tagline: 'Fast, modern, mobile-friendly websites that turn visitors into customers.',
    description:
      'We design and build professional websites for businesses, clinics, hotels, agencies, and startups—optimized to look great on every phone and rank high on Google.',
    deliverables: [
      'Custom Mobile & Desktop Responsive Design',
      'Easy Admin Panel to Edit Text & Photos Yourself',
      'Google SEO Setup so Customers Find You Online',
      'Instant WhatsApp Chat & Contact Lead Forms',
      'Ultra-Fast Loading Speed & SSL Security',
    ],
    techStackUsed: ['Next.js 15', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    startingTimeline: '2 – 4 Weeks',
    glowColor: '#00F0FF',
    displayOrder: 1,
  },
  {
    _id: 'srv-ecommerce-platforms',
    title: 'E-commerce Platforms',
    slug: 'ecommerce-platforms',
    iconName: 'ShoppingBag',
    tagline: 'Complete online stores to sell your products 24/7 with easy checkout.',
    description:
      'Launch your own online store with smooth product browsing, shopping cart, local & international card payments, delivery tracking, and automatic stock updates.',
    deliverables: [
      'Easy Product, Price & Stock Management Dashboard',
      'PayHere, Visa/Mastercard & Cash-on-Delivery Support',
      'Automatic WhatsApp & Email Order Notifications',
      'Discount Codes, Promotions & Customer Accounts',
      'Mobile-First Shopping & Fast 1-Page Checkout',
    ],
    techStackUsed: ['Next.js Commerce', 'PayHere / Stripe', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    startingTimeline: '3 – 6 Weeks',
    glowColor: '#0051FF',
    displayOrder: 2,
  },
  {
    _id: 'srv-custom-software',
    title: 'Custom Software Solutions',
    slug: 'custom-software-solutions',
    iconName: 'Cpu',
    tagline: 'Tailor-made business systems, booking portals, and HR/payroll software.',
    description:
      'Save hours of manual paperwork with custom software built around how your company works—from staff attendance and payroll portals to appointment booking and invoicing systems.',
    deliverables: [
      'Custom Admin, Staff & Customer Login Portals',
      'Automated Invoicing, Payroll & Report Generation',
      'Appointment, Shift & Resource Booking Engines',
      'Real-Time Business Sales & Activity Dashboards',
      'Secure Cloud Backup & Staff Permission Controls',
    ],
    techStackUsed: ['Node.js', 'TypeScript', 'React', 'MongoDB / PostgreSQL', 'Cloud Hosting'],
    startingTimeline: '4 – 10 Weeks',
    glowColor: '#00F0FF',
    displayOrder: 3,
  },
  {
    _id: 'srv-digital-marketing',
    title: 'Digital Marketing & Branding',
    slug: 'digital-marketing-branding',
    iconName: 'TrendingUp',
    tagline: 'Stand out from competitors and attract more customers every month.',
    description:
      'We create memorable brand identities and run targeted social media and Google campaigns that bring real inquiries, calls, and sales to your business.',
    deliverables: [
      'Professional Logo & Complete Brand Style Guide',
      'Facebook, Instagram & TikTok Ad Campaigns',
      'Google Search Ranking (SEO) & Business Profile Setup',
      'Social Media Post Designs & Content Strategy',
      'Monthly Sales & Lead Growth Reports',
    ],
    techStackUsed: ['Meta Ads Suite', 'Google Analytics', 'SEO Tools', 'Brand Identity', 'Copywriting'],
    startingTimeline: 'Monthly Package',
    packagePrice: 'Rs. 10,000 / month',
    glowColor: '#7000FF',
    displayOrder: 4,
  },
  {
    _id: 'srv-ui-ux-design',
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    iconName: 'Sparkles',
    tagline: 'Clean, modern, user-friendly designs for websites and mobile apps.',
    description:
      'Before writing a single line of code, we design interactive visual previews of your website or app so you can see and test exactly how your customers will experience it.',
    deliverables: [
      'Interactive Clickable Website & App Previews',
      'Modern, Easy-to-Navigate Customer Journeys',
      'Redesign of Old or Confusing Websites',
      'Consistent Colors, Fonts & Visual Buttons',
      'Complete Design Files Ready for Development',
    ],
    techStackUsed: ['Figma', 'Interactive Prototypes', 'Design Systems', 'Mobile & Web UI', 'User Testing'],
    startingTimeline: '1 – 3 Weeks',
    glowColor: '#00F0FF',
    displayOrder: 5,
  },
];

export const INITIAL_PROJECTS: SeedProjectItem[] = [
  {
    _id: 'proj-manpower-portal',
    title: 'Apex Manpower & Staff Management Portal',
    slug: 'manpower-management-portal',
    category: 'Custom Software Solutions',
    clientName: 'Apex Agencies — Global Manpower',
    completionDate: 'Ongoing Project',
    summary:
      'All-in-one global manpower recruitment, candidate tracking, staff scheduling, and automated management portal built for Apex Agencies.',
    challenge:
      'Apex Agencies needed a centralized digital portal to manage overseas candidate pipelines, client staffing requests, documentation tracking, and daily operations without manual spreadsheets.',
    solution:
      'Zora Solutions is building a secure, easy-to-use management portal where staff track candidate placements, client placements, approvals, and automated reports in real time.',
    impactMetrics: [
      { label: 'Project Status', value: 'Ongoing' },
      { label: 'Candidate Records', value: '4,500+' },
      { label: 'Workflow Speed', value: '8x Faster' },
      { label: 'Paperwork Saved', value: '90% Less' },
    ],
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Candidate Portal', 'Auto Reporting'],
    thumbnailUrl: '/assets/projects/apex-agencies.jpg',
    galleryImages: ['/assets/projects/apex-agencies.jpg'],
    liveUrl: '',
    figmaUrl: '',
    isFeatured: true,
    displayOrder: 1,
    architectureNodes: ['Candidate Registration', 'Agency Operations Hub', 'Overseas Placement Sync', 'Automated Client Reports'],
  },
  {
    _id: 'proj-psychology-platform',
    title: 'MindBridge Online Doctor & Therapy Booking Platform',
    slug: 'psychology-consultation-platform',
    category: 'Web Development',
    clientName: 'M.D. Lakshman Gunathilaka',
    completionDate: 'Ongoing Project',
    summary:
      'Interactive consultation, leadership training, and psychological counseling platform featuring instant session booking, custom cost quotation, and official counselor credentials.',
    challenge:
      'Patients, corporate teams, and schools needed a clear way to explore training & therapy programs, review counselor qualifications, get instant session cost quotations, and book confidential appointments online.',
    solution:
      'Zora Solutions is building a modern high-trust platform featuring a 1-click Session/Workshop booking flow, instant cost quotation calculator, and clear showcase of confidential therapy and leadership programs.',
    impactMetrics: [
      { label: 'Project Status', value: 'Ongoing' },
      { label: 'Schools Served', value: '120+' },
      { label: 'Corporate Partners', value: '350+' },
      { label: 'Experience', value: '28+ Yrs' },
    ],
    techStack: ['Next.js', 'Session Booking', 'Instant Quotation', 'Therapy & Counseling UI', 'Netlify Edge'],
    thumbnailUrl: '/assets/projects/mindbridge-lakshman.jpg',
    galleryImages: ['/assets/projects/mindbridge-lakshman.jpg'],
    liveUrl: 'https://laxman-gunathilaka.netlify.app/',
    figmaUrl: '',
    isFeatured: true,
    displayOrder: 2,
    architectureNodes: ['Counselor & Programs Hero', 'Book a Session / Workshop', 'Instant Cost Quotation', 'Confidential Client Care'],
  },
  {
    _id: 'proj-alueco-aluminium',
    title: 'PREMIUM ALUMINIUM SOLUTIONS — ALUECO',
    slug: 'alueco-premium-aluminium-solutions',
    category: 'Web Development',
    clientName: 'ALUECO Architectural Aluminium',
    completionDate: 'Live Project',
    summary:
      'Modern architectural website and product showcase for precision-engineered aluminium doors, windows, showroom discovery, and instant free quote requests across Sri Lanka.',
    challenge:
      'Homeowners, architects, and commercial builders needed a modern digital platform to explore aluminium door & window collections, inspect completed projects, find the showroom, and request instant quotations.',
    solution:
      'Zora Solutions built a sleek architectural website featuring interactive product categories, completed project galleries, showroom details, light/dark viewing modes, and 1-click "Get a Free Quote" lead capture.',
    impactMetrics: [
      { label: 'Live Status', value: 'Online' },
      { label: 'Product Catalog', value: 'Full Suite' },
      { label: 'Page Speed', value: '0.4 Secs' },
      { label: 'Quote Flow', value: '1-Click' },
    ],
    techStack: ['Next.js', 'Tailwind CSS', 'Product Showcase', 'Free Quote Flow', 'Vercel Edge'],
    thumbnailUrl: '/assets/projects/alueco-aluminium.jpg',
    galleryImages: ['/assets/projects/alueco-aluminium.jpg'],
    liveUrl: 'https://alueco-web.vercel.app/',
    figmaUrl: '',
    isFeatured: true,
    displayOrder: 3,
    architectureNodes: ['Architectural Hero UI', 'Products & Projects Catalog', 'Showroom Showcase', 'Request a Free Quote Flow'],
  },
  {
    _id: 'proj-zage-salon',
    title: 'ZAGE',
    slug: 'zage-salon-booking-platform',
    category: 'UI/UX Design',
    clientName: 'ZAGE Salon • Weliweriya & Miriswatta',
    completionDate: 'Live Project',
    summary:
      'Modern hair, beauty, wedding, and grooming website with 60+ categorized beauty services, gallery, reviews, promotions, and instant Book Appointment experience.',
    challenge:
      'Clients in Weliweriya and Miriswatta needed an easy, welcoming way to explore 60+ salon, bridal, and grooming services, browse promotions and reviews, and book appointments effortlessly.',
    solution:
      'Zora Solutions designed and delivered ZAGE.lk with high-impact photography, clear service & wedding navigation, client reviews, and a seamless 1-click Book Appointment journey.',
    impactMetrics: [
      { label: 'Live Website', value: 'zage.lk' },
      { label: 'Beauty Services', value: '60+' },
      { label: 'Branches', value: '2 Locations' },
      { label: 'Booking Flow', value: '1-Click' },
    ],
    techStack: ['Next.js', 'UI/UX Design', 'Online Booking', '60+ Services Catalog', 'Mobile-First'],
    thumbnailUrl: '/assets/projects/zage-salon.jpg',
    galleryImages: ['/assets/projects/zage-salon.jpg'],
    liveUrl: 'https://zage.lk/',
    figmaUrl: '',
    isFeatured: true,
    displayOrder: 4,
    architectureNodes: ['Hair & Beauty Showcase', 'Wedding & Services Filter', 'Gallery & Reviews', 'Book Appointment Flow'],
  },
];
