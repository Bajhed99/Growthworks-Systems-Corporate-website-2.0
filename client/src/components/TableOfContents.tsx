'use client';

import { useEffect, useRef, useState } from 'react';

type TocItem = {
  id: string;
  label: string;
};

type PageToc = {
  page: string;
  items: TocItem[];
};

const PAGE_TOCS: PageToc[] = [
  {
    page: '/',
    items: [
      { id: 'credibility', label: 'Experience' },
      { id: 'problem-recognition', label: 'Problems' },
      { id: 'how-gws-works', label: 'How It Works' },
      { id: 'solutions', label: 'Solutions' },
    ],
  },
  {
    page: '/about',
    items: [
      { id: 'founder-hero-h1', label: 'Founder' },
      { id: 'why-gws', label: 'Why GWS' },
      { id: 'experience', label: 'Experience' },
      { id: 'diagnostic-h2', label: 'Diagnostic' },
      { id: 'about-closing-cta', label: 'Next Step' },
    ],
  },
  {
    page: '/framework',
    items: [
      { id: 'why-revenue-matters', label: 'Why Revenue Infrastructure' },
      { id: 'nine-domains', label: 'Nine Domains' },
      { id: 'how-it-works', label: 'How It Works' },
      { id: 'maturity-model', label: 'Maturity Model' },
      { id: 'framework-closing', label: 'Next Step' },
    ],
  },
  {
    page: '/ai-ready-website',
    items: [
      { id: 'ai-ready-title', label: 'Overview' },
      { id: 'ai-ready-problem-h2', label: 'The Problem' },
      { id: 'ai-ready-approach-h2', label: 'Approach' },
      { id: 'ai-ready-outcomes-h2', label: 'Outcomes' },
      { id: 'ai-ready-closing-h2', label: 'Next Step' },
    ],
  },
  {
    page: '/ai-visibility',
    items: [
      { id: 'ai-visibility-hero-title', label: 'Overview' },
      { id: 'buyer-journey', label: 'Buyer Journey' },
      { id: 'ai-evolution-title', label: 'AI Search Evolution' },
      { id: 'entity-optimization', label: 'Entity Optimization' },
      { id: 'closing-cta-title', label: 'Next Step' },
    ],
  },
  {
    page: '/financial-advisors',
    items: [
      { id: 'financial-advisors-h1', label: 'Overview' },
      { id: 'advisory-reality-h2', label: 'The Reality' },
      { id: 'leakage-h2', label: 'Revenue Leakage' },
      { id: 'advisory-journey-h2', label: 'Journey' },
      { id: 'faq-h2', label: 'FAQ' },
      { id: 'closing-cta-h2', label: 'Next Step' },
    ],
  },
  {
    page: '/insurance-agencies',
    items: [
      { id: 'insurance-hero-h1', label: 'Overview' },
      { id: 'problem-h2', label: 'The Problem' },
      { id: 'trust-h2', label: 'Trust' },
      { id: 'ai-discovery-h2', label: 'AI Discovery' },
      { id: 'faq-h2', label: 'FAQ' },
      { id: 'insurance-closing-cta', label: 'Next Step' },
    ],
  },
  {
    page: '/home-services',
    items: [
      { id: 'home-services-h1', label: 'Overview' },
      { id: 'problem-model-h2', label: 'The Problem' },
      { id: 'journey-h2', label: 'Journey' },
      { id: 'outcomes-h2', label: 'Outcomes' },
      { id: 'closing-cta-h2', label: 'Next Step' },
    ],
  },
  {
    page: '/ai-visibility-call',
    items: [
      { id: 'ai-visibility-call-h1', label: 'Overview' },
      { id: 'booking-section-label', label: 'Schedule' },
      { id: 'what-expect-h2', label: 'What to Expect' },
      { id: 'preparation-h2', label: 'Preparation' },
    ],
  },
  {
    page: '/crm-automation',
    items: [
      { id: 'crm-hero-title', label: 'Overview' },
      { id: 'problem-section', label: 'The Problem' },
      { id: 'approach-h2', label: 'Approach' },
      { id: 'closing-h2', label: 'Next Step' },
    ],
  },
  {
    page: '/solutions',
    items: [
      { id: 'solutions-hero', label: 'Overview' },
      { id: 'solutions-problem', label: 'The Problem' },
      { id: 'solutions-approach', label: 'Approach' },
      { id: 'solutions-closing', label: 'Next Step' },
    ],
  },
  {
    page: '/conversion-systems',
    items: [
      { id: 'conversion-systems-title', label: 'Overview' },
      { id: 'business-problem-h2', label: 'The Problem' },
      { id: 'gws-approach-h2', label: 'Approach' },
      { id: 'after-hours-cta-h2', label: 'After-Hours' },
      { id: 'closing-band-h2', label: 'Next Step' },
    ],
  },
  {
    page: '/revenue-diagnostic',
    items: [
      { id: 'revenue-diagnostic-h1', label: 'Overview' },
      { id: 'booking-section-label', label: 'Schedule' },
      { id: 'what-expect-h2', label: 'What to Expect' },
      { id: 'preparation-h2', label: 'Preparation' },
    ],
  },
  {
    page: '/ai-visibility-review',
    items: [
      { id: 'ai-visibility-review-h1', label: 'Overview' },
      { id: 'booking-section-label', label: 'Schedule' },
      { id: 'what-expect-h2', label: 'What to Expect' },
      { id: 'preparation-h2', label: 'Preparation' },
    ],
  },
  {
    page: '/google-business-profile-optimization-review',
    items: [
      { id: 'gbp-review-h1', label: 'Overview' },
      { id: 'booking-section-label', label: 'Schedule' },
      { id: 'what-expect-h2', label: 'What to Expect' },
      { id: 'preparation-h2', label: 'Preparation' },
    ],
  },
  {
    page: '/diagnostic',
    items: [
      { id: 'questions', label: 'Questions' },
      { id: 'assessment-principles', label: 'Principles' },
      { id: 'methodology', label: 'Methodology' },
      { id: 'executive-scorecard', label: 'Scorecard' },
      { id: 'heat-map', label: 'Heat Map' },
      { id: 'prioritization-matrix', label: 'Prioritization' },
      { id: 'assessment-family', label: 'Assessments' },
      { id: 'improvement-roadmap', label: 'Roadmap' },
      { id: 'executive-report', label: 'Report' },
      { id: 'diagnostic-outputs', label: 'Outputs' },
      { id: 'begin-diagnostic', label: 'Get Started' },
    ],
  },
  {
    page: '/diagnostic-platform',
    items: [
      { id: 'questions', label: 'Questions' },
      { id: 'assessment-principles', label: 'Principles' },
      { id: 'methodology', label: 'Methodology' },
      { id: 'executive-scorecard', label: 'Scorecard' },
      { id: 'heat-map', label: 'Heat Map' },
      { id: 'prioritization-matrix', label: 'Prioritization' },
      { id: 'assessment-family', label: 'Assessments' },
      { id: 'improvement-roadmap', label: 'Roadmap' },
      { id: 'executive-report', label: 'Report' },
      { id: 'diagnostic-outputs', label: 'Outputs' },
      { id: 'begin-diagnostic', label: 'Get Started' },
    ],
  },
  {
    page: '/resources',
    items: [
      { id: 'platform-status', label: 'Platform Status' },
      { id: 'frameworks', label: 'Frameworks' },
      { id: 'research', label: 'Research' },
      { id: 'industry-guides', label: 'Industry Guides' },
      { id: 'case-studies', label: 'Case Studies' },
      { id: 'executive-briefs', label: 'Executive Briefs' },
      { id: 'whitepapers', label: 'Whitepapers' },
      { id: 'assessments', label: 'Assessments' },
    ],
  },
  {
    page: '/industries',
    items: [
      { id: 'industries-h1', label: 'Overview' },
      { id: 'industries-closing-cta', label: 'Next Step' },
    ],
  },
];

function getTocForPath(pathname: string): TocItem[] {
  const match = PAGE_TOCS.find((p) => pathname === p.page);
  return match?.items ?? [];
}

function TocRail({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const ids = items.map((item) => item.id);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -70% 0px',
        threshold: 0,
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [items]);

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="toc-rail" aria-label="Table of contents">
      {items.map((item, index) => {
        const isActive = activeId === item.id;
        const isLast = index === items.length - 1;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleJump(item.id)}
            className={`toc-rail-item ${isActive ? 'toc-rail-item--active' : ''}`}
          >
            <span className="toc-rail-dot" />
            <span className="toc-rail-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default function TableOfContents() {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname);
    }
  }, []);

  const items = getTocForPath(pathname);

  return <TocRail items={items} />;
}
