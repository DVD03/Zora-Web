# Zora Solutions — Digital Agency, Interactive Quotation Builder & Portfolio

**Taglines:** *"Crafting Digital Solutions"* | *"Your Vision. Our Innovation."*  
**Hero Headline:** *"Turn Your Ideas into Digital Reality"*

A production-ready Digital Agency, Interactive Portfolio, and Official A4 PDF Quotation Platform built with **Next.js 15 (App Router, TypeScript)**, **Tailwind CSS**, **Framer Motion**, **jsPDF**, **MongoDB Atlas (Mongoose)**, and **Defense-in-Depth Security**.

---

## Quick Start & Hosting Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` (for local runs) or configure these exact keys in your hosting provider's Environment Variables (Vercel / Railway / Render / VPS):

```bash
cp .env.example .env.local
```

Required / Recommended production keys:
- `MONGODB_URI`: Your MongoDB Atlas connection string (app includes resilient memory fallback if omitted).
- `JWT_SECRET`: Strong random secret (32+ characters).
- `ADMIN_INITIAL_EMAIL`: Founder login email (`zorasolution.official@gmail.com`).
- `ADMIN_INITIAL_PASSWORD`: Strong private password for `/admin`.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NOTIFICATION_EMAIL`: Gmail SMTP App Password credentials for automated inquiry & quotation alerts.
- `NEXT_PUBLIC_SITE_URL`: Deployed site URL (e.g., `https://zorasolutions.lk`).

### 3. Build & Start Production Server
```bash
npm run build
npm run start
```

### 4. Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Protected Admin CMS (`/admin`)
- **Login URL:** `/admin/login`
- Sign in using the `ADMIN_INITIAL_EMAIL` and `ADMIN_INITIAL_PASSWORD` configured in your environment variables.
- Manage client requirements, generated PDF quotations, portfolio projects, and services (including Social Media package pricing).

---

## Direct Founders Contact
- **Panduka (Call & WhatsApp):** `+94 777 321 165`
- **Dilum (Call & WhatsApp):** `+94 77 749 8608`
- **Official Email:** `zorasolution.official@gmail.com`
