<div align="center">

# ✦ Lumière Studio

**A premium, full-stack architectural portfolio — built to impress.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Sanity](https://img.shields.io/badge/Sanity_CMS-5-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)](https://sanity.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EE4B96?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Live Demo](https://img.shields.io/badge/Live_Demo-▶_Visit_Site-C5A17A?style=for-the-badge&logo=vercel&logoColor=white)](https://interior-design-ahmed.vercel.app)

> *Where architecture meets artistry — a curated approach to luxury interior design*

</div>

---

## 🌟 Overview

**Lumière Studio** is a fully-featured, production-ready portfolio website for a luxury interior design studio. It combines a stunning visual experience with a powerful headless CMS backend — giving the studio complete control over every piece of content without touching a single line of code.

Every section — from the hero background, to project galleries, to design packages — is fully editable through a beautiful Sanity Studio admin panel.

---

## ✨ Features

### 🎨 Design & UX
- **Luxury aesthetic** — warm earth-tone palette (cream, beige, mocha) crafted for premium brand feel
- **Cinematic hero section** with full-screen background imagery managed from the CMS
- **Grain overlay texture** for a sophisticated, editorial quality
- **Smooth Framer Motion animations** throughout — fade-ins, staggered reveals, scroll-triggered effects
- **Rolling / infinite gallery** carousel for showcasing project imagery
- **Interactive project grid** with category filtering and hover effects
- **Video modal** with custom media-chrome player for project walkthroughs
- **Project stack viewer** — an immersive full-screen project detail experience

### 🌍 Bilingual (EN / AR)
- Full **English & Arabic** support with RTL layout switching
- Custom `LanguageContext` for seamless language toggling without page reloads
- All UI strings centralized in a single `translations.json` file
- SEO metadata dynamically served in both languages with `hreflang` alternates

### ⚙️ Content Management (Sanity CMS)
- **Embedded Sanity Studio** at `/studio` — manage everything from one place
- Editable content types: `hero`, `project`, `service`, `about`, `package`, `settings`, `footer`, `legal`
- **Global site settings** — brand colors, logo, contact info, social links, SEO fields — all CMS-driven
- **Dynamic color theming** — primary, accent, background colors injected as CSS custom properties from Sanity
- **OG image management** for social sharing, also from CMS

### 📦 Packages & Reservations
- Dedicated **Packages page** with filterable design packages
- **Package reservation modal** — collects client name, phone, city, and package preference
- **Project consultation modal** — "Start Your Project" CTA with category selection
- Form submissions go directly to the studio inbox or configured integrations

### 📬 Contact & Communication
- Full **Contact form** with validation (name, email, phone, message)
- **Floating WhatsApp button** — phone number pulled from CMS
- All contact info (email, phone, address) is CMS-driven

### 🔍 SEO & Performance
- **Dynamic metadata** generation per page (`generateMetadata`) — title, description, keywords
- **Open Graph & Twitter Card** tags with CMS-managed OG images
- **XML Sitemap** auto-generated at `/sitemap.xml`
- **Robots.txt** configured at `/robots.ts`
- **Vercel Analytics** integrated for real-time traffic insights
- Next.js **Image optimization** with Sanity CDN as remote pattern
- **Google Fonts** (Inter + Playfair Display) loaded via `next/font` for zero layout shift

### 🔒 Legal Pages
- **/privacy** — Privacy Policy (bilingual)
- **/terms** — Terms of Use (bilingual)

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + Vanilla CSS |
| Animations | Framer Motion 12 |
| CMS | Sanity v5 (Headless) |
| React | React 19 |
| Icons | Lucide React + React Icons |
| Video | React Player + Media Chrome |
| Analytics | Vercel Analytics |
| Font | Inter + Playfair Display (Google Fonts) |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (website)/          # Public-facing pages (App Router group)
│   │   ├── page.tsx        # Home page
│   │   ├── projects/       # Projects listing & detail pages
│   │   ├── packages/       # Design packages page
│   │   ├── contact/        # Contact page
│   │   ├── privacy/        # Privacy policy
│   │   └── terms/          # Terms of use
│   ├── studio/             # Embedded Sanity Studio
│   ├── layout.tsx          # Root layout (metadata, fonts, providers)
│   ├── robots.ts           # Dynamic robots.txt
│   └── sitemap.ts          # Dynamic XML sitemap
│
├── components/             # All UI components (22 components)
│   ├── Hero.tsx            # Cinematic hero section
│   ├── ProjectsGrid.tsx    # Filterable project grid
│   ├── ProjectStack.tsx    # Immersive project viewer
│   ├── VideoModal.tsx      # Custom video modal player
│   ├── PackagesSection.tsx # Packages overview
│   ├── ReservationModal.tsx          # Project booking modal
│   ├── PackageReservationModal.tsx   # Package booking modal
│   ├── ContactForm.tsx     # Full contact form with validation
│   ├── RollingGallery.tsx  # Infinite scroll gallery
│   ├── Navbar.tsx          # Responsive navigation
│   ├── Footer.tsx          # Rich footer with links & socials
│   ├── FloatingWhatsApp.tsx # Floating WhatsApp CTA
│   └── LanguageSwitcher.tsx # EN/AR toggle
│
├── context/
│   └── LanguageContext.tsx # Global i18n state
│
├── sanity/
│   ├── lib/client.ts       # Sanity client config
│   ├── queries.ts          # All GROQ queries
│   └── schemas/            # Content type schemas
│
├── locales/
│   └── translations.json   # All UI strings (EN + AR)
│
└── utils/
    └── i18n.ts             # Localization helpers
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Sanity](https://sanity.io) account and project

### 1. Clone the repository
```bash
git clone https://github.com/your-username/interior-design.git
cd interior-design
```

> 🌐 **Live site:** [interior-design-ahmed.vercel.app](https://interior-design-ahmed.vercel.app)

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file at the root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.  
Open [http://localhost:3000/studio](http://localhost:3000/studio) to access the CMS.

---

## 🎛️ CMS Content Types

| Type | Description |
|---|---|
| `settings` | Global: brand colors, logo, contact, SEO, WhatsApp, social links |
| `hero` | Hero section: headline, subheadline, background image |
| `project` | Portfolio projects: title, slug, category, gallery, video |
| `service` | Service offerings |
| `about` | Studio story and philosophy |
| `package` | Design packages with features list (EN + AR) |
| `footer` | Footer links, services, social, copyright |
| `legal` | Privacy policy and terms of use content |

---

## 🌐 Pages

| Route | Description |
|---|---|
| `/` | Home — Hero, Projects, Services, About, CTA |
| `/projects` | All portfolio projects with category filter |
| `/projects/[slug]` | Individual project detail with gallery & video |
| `/packages` | Design packages with reservation modal |
| `/contact` | Contact form |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |
| `/studio` | Sanity CMS admin panel |
| `/sitemap.xml` | Auto-generated XML sitemap |
| `/robots.txt` | Search engine directives |

---

## 🧩 Key Design Decisions

- **App Router** — Uses Next.js 16 App Router with React Server Components for fast, SEO-friendly pages
- **CMS-driven theming** — Brand colors are fetched from Sanity and applied as CSS custom properties on `<body>`, so the entire visual identity can be changed from the studio without a redeploy
- **No page reload language switching** — Language state lives in React context, toggling between EN and AR is instant
- **GROQ queries** — All data fetching is centralized in `sanity/queries.ts` for clean separation of concerns

---

<div align="center">

*Built with precision. Designed with soul.*

</div>
