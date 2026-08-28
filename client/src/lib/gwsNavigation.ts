export type NavigationMenuItem = {
  label: string;
  description: string;
  href: string;
};

export type NavigationGroup = {
  label: string;
  href: string;
  items: readonly NavigationMenuItem[];
};

export const GWS_NAV_GROUPS: readonly NavigationGroup[] = [
  {
    label: "Revenue Infrastructure",
    href: "#revenue-infrastructure",
    items: [
      { label: "The Framework", description: "Nine domains. One operating system.", href: "#revenue-infrastructure" },
      { label: "Diagnostic Platform", description: "Methodology, scorecard, and roadmap.", href: "#revenue-diagnostic" },
    ],
  },
  {
    label: "Solutions",
    href: "#solutions",
    items: [
      { label: "AI Visibility", description: "Be found by AI-powered search", href: "#ai-visibility" },
      { label: "AI-Ready Website", description: "Convert attention into trust", href: "#solutions" },
      { label: "CRM & Automation", description: "Eliminate revenue leakage", href: "#solutions" },
      { label: "Conversion Systems", description: "Turn interest into pipeline", href: "#solutions" },
    ],
  },
  {
    label: "Industries",
    href: "#fit",
    items: [
      { label: "Home Services", description: "Built for home service businesses", href: "#fit" },
      { label: "Financial Advisors & RIAs", description: "Retirement planners & wealth advisors", href: "#fit" },
      { label: "Insurance Agencies", description: "Independent agencies & brokerages", href: "#fit" },
    ],
  },
] as const;

export const GWS_NAV_LINKS = [
  { label: "Resources", href: "#ai-visibility" },
  { label: "About", href: "#founder" },
] as const;
