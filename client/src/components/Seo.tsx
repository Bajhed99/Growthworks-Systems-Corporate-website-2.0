import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const BASE_URL = "https://growthworks-systems.com";
const DEFAULT_TITLE = "GrowthWorks Systems";
const DEFAULT_DESCRIPTION = "GrowthWorks Systems helps founder-led service businesses strengthen the connected systems that turn opportunity into revenue.";

export const PAGE_SEO: Record<string, { title: string; description: string; canonical: string }> = {
  "/": {
    title: "GrowthWorks Systems — Revenue Infrastructure for Founder-Led Businesses",
    description: "GrowthWorks Systems helps founder-led service businesses strengthen the connected systems that turn opportunity into predictable revenue.",
    canonical: "/",
  },
  "/framework": {
    title: "Revenue Infrastructure Framework — GrowthWorks Systems",
    description: "The connected system of strategy, technology, data, process, and execution that turns market opportunity into measurable revenue.",
    canonical: "/framework",
  },
  "/diagnostic": {
    title: "Revenue Diagnostic Platform — GrowthWorks Systems",
    description: "Assess your revenue infrastructure across nine domains. Identify leaks, prioritize improvements, and build a roadmap to predictable revenue.",
    canonical: "/diagnostic",
  },
  "/diagnostic-platform": {
    title: "Revenue Diagnostic Platform — GrowthWorks Systems",
    description: "Comprehensive revenue diagnostic platform. Assess, prioritize, and improve your revenue infrastructure.",
    canonical: "/diagnostic-platform",
  },
  "/revenue-diagnostic": {
    title: "Book a Revenue Diagnostic — GrowthWorks Systems",
    description: "A focused 30-45 minute session to examine how the critical parts of your revenue path work together and where improvement creates impact.",
    canonical: "/revenue-diagnostic",
  },
  "/google-business-profile-optimization-review": {
    title: "Google Business Profile Optimization Review — GrowthWorks Systems",
    description: "Get a professional review of your Google Business Profile. Identify optimization opportunities to improve local visibility and attract more customers.",
    canonical: "/google-business-profile-optimization-review",
  },
  "/ai-visibility-review": {
    title: "AI Visibility Review — GrowthWorks Systems",
    description: "Understand how AI-powered search systems discover and represent your business. An AI Visibility Review identifies where you are visible, trusted, and recommended.",
    canonical: "/ai-visibility-review",
  },
  "/solutions": {
    title: "Revenue Infrastructure Solutions — GrowthWorks Systems",
    description: "AI Visibility, AI-Ready Websites, CRM &amp; Automation, and Conversion Systems. The four connected solutions that turn opportunity into predictable revenue.",
    canonical: "/solutions",
  },
  "/ai-visibility": {
    title: "AI Visibility Services — GrowthWorks Systems",
    description: "How AI-powered search systems discover, understand, and recommend your business. From buyer question through recommendation.",
    canonical: "/ai-visibility",
  },
  "/ai-visibility-call": {
    title: "AI Visibility Consultation — GrowthWorks Systems",
    description: "Schedule a consultation to understand how your business is seen by AI-powered search systems before the buyer decides.",
    canonical: "/ai-visibility-call",
  },
  "/ai-ready-website": {
    title: "AI-Ready Website — GrowthWorks Systems",
    description: "A website built to be discovered, understood, and recommended by AI-powered search systems. The front-end of your revenue infrastructure.",
    canonical: "/ai-ready-website",
  },
  "/crm-automation": {
    title: "CRM &amp; Automation — GrowthWorks Systems",
    description: "Connect your CRM, marketing, and sales tools into a unified revenue system that turns leads into predictable revenue.",
    canonical: "/crm-automation",
  },
  "/conversion-systems": {
    title: "Conversion Systems — GrowthWorks Systems",
    description: "Build conversion systems that turn website visitors into qualified leads and leads into scheduled revenue conversations.",
    canonical: "/conversion-systems",
  },
  "/industries": {
    title: "Industries We Serve — GrowthWorks Systems",
    description: "Revenue Infrastructure for Home Services, Financial Advisors &amp; RIAs, and Insurance Agencies.",
    canonical: "/industries",
  },
  "/home-services": {
    title: "Revenue Infrastructure for Home Services — GrowthWorks Systems",
    description: "Revenue Infrastructure designed for home services businesses. Stop revenue leakage and build predictable growth.",
    canonical: "/home-services",
  },
  "/financial-advisors": {
    title: "Revenue Infrastructure for Financial Advisors — GrowthWorks Systems",
    description: "Revenue Infrastructure designed for financial advisors and RIAs. Build a system that turns trust into predictable revenue.",
    canonical: "/financial-advisors",
  },
  "/insurance-agencies": {
    title: "Revenue Infrastructure for Insurance Agencies — GrowthWorks Systems",
    description: "Revenue Infrastructure designed for insurance agencies. Build a connected system that turns leads into bound policies.",
    canonical: "/insurance-agencies",
  },
  "/resources": {
    title: "Resources — GrowthWorks Systems",
    description: "Frameworks, tools, research, and guides for building revenue infrastructure. Free resources for founder-led service businesses.",
    canonical: "/resources",
  },
  "/about": {
    title: "About GrowthWorks Systems — Clayton Tidwell",
    description: "GrowthWorks Systems was founded by Clayton Tidwell to help founder-led service businesses build the connected systems that turn opportunity into predictable revenue.",
    canonical: "/about",
  },
};

export function Seo({ title, description, canonical, ogImage, noIndex }: SeoProps) {
  const [location] = useLocation();
  const route = canonical || location;

  const page =
    PAGE_SEO[route]
      ? PAGE_SEO[route]
      : { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, canonical: route };

  const fullTitle = title || page.title;
  const fullDescription = description || page.description;
  const fullCanonical = `${BASE_URL}${page.canonical}`;
  const fullOgImage = ogImage || `${BASE_URL}/assets/images/branding/growthworks-official-logo.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {noIndex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}
      <link rel="canonical" id="canonical-url" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="GrowthWorks Systems" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullOgImage} />
    </Helmet>
  );
}
