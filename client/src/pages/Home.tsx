/**
 * GWS full-component integration: approved copy governs all surrounding content.
 * Sections 04, 06, and 07 mount complete live visual blocks adapted from the supplied ZIP packages.
 * No generated image, fabricated rating/review, vendor example, or unapproved package behavior is rendered here.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChartNoAxesCombined, Check, ChevronDown, Clock3, Linkedin, Mail, Menu, Phone, Route, Search, X } from "lucide-react";
import { BuyerJourneyPlugAndPlayHost } from "@/components/BuyerJourneyPlugAndPlayHost";
import { BusinessOutcomesInteractive } from "@/components/BusinessOutcomesInteractive";
import { RevenueInfrastructurePlugAndPlayHost } from "@/components/RevenueInfrastructurePlugAndPlayHost";
import { GlowyWavesHero } from "@/components/ui/glowy-waves-hero-shadcnui";
import { getPageParallaxTravel, PAGE_PARALLAX_SCROLL_TRIGGER, PAGE_TEXT_REVEAL_TRIGGER } from "@/lib/pageParallax";
import { GWS_NAV_GROUPS, GWS_NAV_LINKS } from "@/lib/gwsNavigation";
import { shouldCompactStickyHeader } from "@/lib/stickyHeader";

const problemCards = [
  { title: "Hard to find", body: "Buyers are already looking for what you do, but competitors are getting found, considered, or recommended first.", icon: Search },
  { title: "Slow to respond", body: "Qualified inquiries come in, but delayed or inconsistent response gives high-intent prospects time to move on.", icon: Clock3 },
  { title: "Leads falling through", body: "Good opportunities enter the business, then stall or disappear because follow-up and next steps are inconsistent.", icon: Route },
  { title: "Unpredictable growth", body: "Revenue moves, but you cannot clearly see what is driving it, where opportunity is leaking, or what to improve next.", icon: ChartNoAxesCombined },
];

const processSteps = [
  { title: "Diagnose", body: "Find where opportunity is being lost and identify the constraint worth fixing first." },
  { title: "Design", body: "Define the simplest solution that removes the constraint without adding unnecessary complexity." },
  { title: "Implement", body: "Put the agreed changes into operation so the system works together as intended." },
  { title: "Optimize", body: "Measure what changed, strengthen what works, and address the next constraint when justified." },
];

const solutionModules = [
  { number: "01", title: "Digital Presence", label: "Be Found", body: "GWS strengthens search visibility, AI discoverability, and structured authority signals so qualified buyers can find the business at the moment decisions form.", mechanism: "Reach · Visibility · AI discoverability" },
  { number: "02", title: "Lead Response", label: "Capture & Respond", body: "GWS improves the speed, consistency, and capture rate of inbound response so warm opportunities do not cool before they are engaged.", mechanism: "Speed · Consistency · Capture rate" },
  { number: "03", title: "Sales Operations", label: "Convert Consistently", body: "GWS builds repeatable pipeline progression with clear handoffs and accountability so conversion stops depending on individual effort.", mechanism: "Pipeline · Handoffs · Repeatability" },
  { number: "04", title: "Revenue Intelligence", label: "Improve & Scale", body: "GWS measures what actually matters, identifies the highest-value constraint, and feeds those signals back into the system to compound improvement.", mechanism: "Measurement · Prioritisation · Learning loop" },
];

const fitSignals = [
  ["Established Demand", "You have real inbound — buyers are looking for what you offer."],
  ["Revenue Gaps", "Growth exists but revenue outcomes do not reflect it."],
  ["Growing Complexity", "More systems, people, and handoffs than your current process can handle."],
  ["Ready to Improve", "Committed to fixing the system, not just adding more activity."],
];

const industryCards = [
  { label: "Home Services", image: "/assets/images/industries/home-services.webp", alt: "Home service professional working outside a residence" },
  { label: "Financial Advisors", image: "/assets/images/industries/financial-advisors.jpg", alt: "Financial advisor in a client meeting" },
  { label: "Insurance Agencies", image: "/assets/images/industries/insurance-agencies.jpg", alt: "Insurance professionals consulting with a client" },
];

const footerGroups = [
  { title: "Revenue Infrastructure", links: ["What Is Revenue Infrastructure?", "The Nine Domains", "Maturity Model", "Why GWS Is Different"] },
  { title: "Solutions", links: ["AI Visibility", "AI-Ready Website", "CRM & Automation", "Conversion Systems", "All Solutions"] },
  { title: "Industries", links: ["Home Services", "Financial Advisors & RIAs", "Insurance Agencies"] },
  { title: "Company", links: ["About GWS", "Resources", "Contact", "Book Discovery Call"] },
] as const;

const OFFICIAL_LOGO = "/assets/images/branding/growthworks-official-logo.png";
const OFFICIAL_LOGO_WHITE = "/assets/images/branding/growthworks-official-logo-white.png";
const CLAYTON_PORTRAIT = "/assets/images/branding/clayton-tidwell.jpg";

function AnchorLink({ href, children, className, onClick, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} onClick={onClick} {...props}>{children}</a>;
}

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
  const [isHeaderCompact, setHeaderCompact] = useState(false);
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateHeaderState = () => {
      const nextCompactState = shouldCompactStickyHeader(window.scrollY);
      setHeaderCompact((currentState) => currentState === nextCompactState ? currentState : nextCompactState);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      page.querySelectorAll<HTMLElement>("[data-page-parallax]").forEach((target) => {
        const shift = Number(target.dataset.parallaxShift ?? 0);
        const { fromY, toY } = getPageParallaxTravel(shift);

        gsap.fromTo(
          target,
          { y: fromY },
          {
            y: toY,
            ease: "none",
            scrollTrigger: {
              trigger: target,
              ...PAGE_PARALLAX_SCROLL_TRIGGER,
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      page.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((target) => {
        gsap.fromTo(
          target,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: target,
              ...PAGE_TEXT_REVEAL_TRIGGER,
            },
          },
        );
      });
    }, page);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, []);

  return (
    <div ref={pageRef} className="gws-page">
      <header
        className={`site-header ${isHeaderCompact ? "is-compact" : ""}`}
        onMouseLeave={() => setActiveDesktopMenu(null)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setActiveDesktopMenu(null);
        }}
      >
        <div className="site-shell header-shell">
          <AnchorLink href="#top" className="brand" aria-label="GrowthWorks Systems home">
            <span className="brand-mark" aria-hidden="true"><img src={OFFICIAL_LOGO} alt="" /></span>
            <span className="brand-wordmark"><span>GrowthWorks</span><span className="brand-wordmark-systems">Systems</span></span>
          </AnchorLink>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <div className="desktop-nav-links">
            {GWS_NAV_GROUPS.map((group) => {
              const isOpen = activeDesktopMenu === group.label;
              const menuId = `desktop-menu-${group.label.toLowerCase().replaceAll(" ", "-")}`;
              return (
                <div key={group.label} className="nav-group" onMouseEnter={() => setActiveDesktopMenu(group.label)}>
                  <button type="button" className={`nav-link nav-link--group ${isOpen ? "is-active" : ""}`} aria-expanded={isOpen} aria-controls={menuId} aria-haspopup="menu" onClick={() => setActiveDesktopMenu(isOpen ? null : group.label)}>
                    {group.label}<ChevronDown size={13} aria-hidden="true" />
                  </button>
                  {isOpen && <div id={menuId} className="desktop-dropdown" role="menu" aria-label={`${group.label} menu`}>
                    {group.items.map((item) => <AnchorLink key={item.label} href={item.href} className="desktop-dropdown-link" onClick={() => setActiveDesktopMenu(null)} role="menuitem"><strong>{item.label}</strong><span>{item.description}</span></AnchorLink>)}
                  </div>}
                </div>
              );
            })}
            {GWS_NAV_LINKS.map((item) => <AnchorLink key={item.label} href={item.href} className="nav-link" onClick={() => setActiveDesktopMenu(null)}>{item.label}</AnchorLink>)}
            </div>
          </nav>
          <div className="header-actions">
            <AnchorLink href="#revenue-diagnostic" className="button button--dark header-cta">Book Discovery Call</AnchorLink>
            <button type="button" className="menu-button" aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)}>{mobileNavOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        <div className={`mobile-nav ${mobileNavOpen ? "is-open" : ""}`}><nav className="site-shell" aria-label="Mobile primary navigation">
          {GWS_NAV_GROUPS.map((group) => <div className="mobile-nav-group" key={group.label}><AnchorLink href={group.href} className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>{group.label}</AnchorLink><div className="mobile-nav-submenu">{group.items.map((item) => <AnchorLink key={item.label} href={item.href} className="mobile-nav-sublink" onClick={() => setMobileNavOpen(false)}>{item.label}</AnchorLink>)}</div></div>)}
          {GWS_NAV_LINKS.map((item) => <AnchorLink key={item.label} href={item.href} className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>{item.label}</AnchorLink>)}
        </nav></div>
      </header>

      <main id="top">
        <div className="scroll-story-stage">
          <div className="scroll-story-frame">
            <div className="scroll-story-hero"><GlowyWavesHero /></div>

            <section id="credibility" className="credibility-bridge scroll-story-bridge" aria-labelledby="credibility-title">
              <div className="site-shell">
                <p className="section-kicker"><span aria-hidden="true" />Experience first. Prescription second<span aria-hidden="true" /></p>
                <h2 id="credibility-title" className="sr-only">GrowthWorks credibility</h2>
                <dl className="credibility-panel">
                  <div className="credibility-proof"><dt>30+ years</dt><dd>Founder Clayton Tidwell brings 30+ years of systems-integration and operating experience.</dd></div>
                  <div className="credibility-proof"><dt>Diagnose First</dt><dd>Diagnose before prescribing.</dd></div>
                  <div className="credibility-proof"><dt>Measure Outcomes</dt><dd>Measure business outcomes, not activity.</dd></div>
                </dl>
              </div>
            </section>
          </div>
        </div>

        <section id="problem-recognition" className="section section--white problem-recognition-section" aria-labelledby="problems-title">
          <div className="site-shell">
            <div className="centered-intro" data-scroll-reveal><p className="section-kicker">Where opportunity gets lost</p><h2 id="problems-title">Where <span className="problem-heading-accent">valuable</span> opportunity gets lost.</h2></div>
            <div className="problem-panel" data-page-parallax data-parallax-shift="24">
              {problemCards.map((problem) => { const Icon = problem.icon; return <article className="problem-card" key={problem.title}><Icon size={19} strokeWidth={1.5} aria-hidden="true" /><h3>{problem.title}</h3><p>{problem.body}</p></article>; })}
            </div>
          </div>
        </section>

        <BusinessOutcomesInteractive />

        <section id="how-gws-works" className="section section--white how-gws-works-section" aria-labelledby="process-title">
          <div className="site-shell"><div className="centered-intro" data-scroll-reveal><p className="section-kicker">How GWS works</p><h2 id="process-title">Fixing the constraint that matters most.</h2></div>
            <ol className="process-route" data-page-parallax data-parallax-shift="-26">{processSteps.map((step, index) => <li key={step.title}><span className="process-step-number">0{index + 1}</span><article className="process-step-card"><h3>{step.title}</h3><p>{step.body}</p></article></li>)}</ol>
            <div className="section-route"><AnchorLink href="#revenue-infrastructure" className="text-link">Explore the Framework <ArrowRight size={17} aria-hidden="true" /></AnchorLink></div>
          </div>
        </section>

        <RevenueInfrastructurePlugAndPlayHost />

        <BuyerJourneyPlugAndPlayHost />

        <section id="solutions" className="section solutions-section" aria-labelledby="solutions-title"><div className="site-shell"><div className="centered-intro" data-scroll-reveal><p className="section-kicker">Four application areas</p><h2 id="solutions-title">Where <span className="solutions-heading-accent">GWS</span> strengthens revenue performance.</h2><p style={{color: 'gray'}}>One coordinated set of performance areas — not four separate services.</p></div>
          <div className="solution-matrix" data-page-parallax data-parallax-shift="24">{solutionModules.map((module) => <article className="solution-row" key={module.title}><div className="solution-heading"><span>{module.number}</span><h3>{module.title}</h3><b>{module.label}</b></div><div className="solution-detail"><p>{module.body}</p><small>{module.mechanism}</small></div></article>)}</div>
          <div className="section-route"><AnchorLink href="#solutions" className="text-link">Explore Solutions <ArrowRight size={17} aria-hidden="true" /></AnchorLink></div>
        </div></section>

        <section id="industries" className="section section--gray" aria-labelledby="industries-title"><div className="site-shell fit-layout"><div className="fit-copy" data-scroll-reveal><p className="section-kicker">Who GWS serves</p><h2 id="industries-title">Built for founder-led service businesses.</h2><p>GrowthWorks works with established service businesses that have real demand and real revenue — but are losing more of it than they should.</p><div className="industry-card-grid">{industryCards.map((industry) => <AnchorLink key={industry.label} href="#industries" className="industry-image-card"><img src={industry.image} alt={industry.alt} /><span>{industry.label}</span></AnchorLink>)}</div></div><div className="fit-panel" data-page-parallax data-parallax-shift="-24">{fitSignals.map(([title, body]) => <div key={title}><Check size={17} aria-hidden="true" /><p><strong>{title}</strong><span>{body}</span></p></div>)}</div></div></section>

        <section id="founder" className="section section--white" aria-labelledby="founder-title"><div className="site-shell founder-layout"><div className="portrait-frame" data-page-parallax data-parallax-shift="18"><img src={CLAYTON_PORTRAIT} alt="Clayton Tidwell" /></div><div className="founder-copy" data-scroll-reveal><p className="section-kicker">Founder credibility</p><h2 id="founder-title">Experience built in complex systems.</h2><p>Clayton Tidwell&apos;s background spans enterprise operations, technology transformation, and systems integration. That experience shapes GWS&apos;s practical, diagnostic approach to solving revenue and operating problems.</p><ul>{["30+ years of systems integration and operating experience", "Enterprise operations & technology transformation", "Systems integration at scale"].map((proof) => <li key={proof}><Check size={16} aria-hidden="true" />{proof}</li>)}</ul><AnchorLink href="#founder" className="text-link">Meet the Founder <ArrowRight size={17} aria-hidden="true" /></AnchorLink></div></div></section>

        <section id="revenue-diagnostic" className="section section--gray diagnostic-section" aria-labelledby="diagnostic-title"><div className="site-shell diagnostic-inner" data-scroll-reveal><div className="diagnostic-flow" data-page-parallax data-parallax-shift="-20" aria-hidden="true"><span>Digital Presence</span><i></i><span>Lead Response</span><i></i><span>Sales Operations</span><i></i><span>Revenue Intelligence</span><b>Revenue Infrastructure</b></div><p className="diagnostic-bridge">The connected system behind the outcomes above.</p><h2 id="diagnostic-title">Ready to find the constraint that matters most?</h2><p className="diagnostic-copy">A Revenue Diagnostic is a focused 60-minute session to identify your highest-value revenue constraint and the system fix that addresses it. No generic audit. No pressure.</p><AnchorLink href="#revenue-diagnostic" className="button button--dark">Book a Revenue Diagnostic</AnchorLink><p className="diagnostic-meta">60 minutes · No obligation · Focused on your constraint</p></div></section>
      </main>

      <footer className="site-footer">
        <div className="site-shell footer-main">
          <div className="footer-brand-column">
            <img className="footer-logo" src={OFFICIAL_LOGO_WHITE} alt="GrowthWorks Systems" />
            <p className="footer-tagline">Build. Automate. Grow.</p>
            <p className="footer-description">Revenue Infrastructure for founder-led service businesses.</p>
            <address className="footer-contact-list">
              <a href="mailto:clayton@growthworks-systems.com"><Mail size={14} aria-hidden="true" />clayton@growthworks-systems.com</a>
              <a href="tel:+12143027720"><Phone size={14} aria-hidden="true" />214–302–7720</a>
              <a href="#founder"><Linkedin size={14} aria-hidden="true" />LinkedIn</a>
            </address>
          </div>
          {footerGroups.map((group) => <nav className="footer-link-group" aria-label={group.title} key={group.title}><h2>{group.title}</h2>{group.links.map((link) => <AnchorLink href={link === "Book Discovery Call" ? "#revenue-diagnostic" : "#top"} key={link}>{link}</AnchorLink>)}</nav>)}
        </div>
        <div className="footer-bottom"><div className="site-shell"><small>© 2026 GrowthWorks Systems LLC. All rights reserved.</small><em>One System. Every Touchpoint. Predictable Revenue.</em></div></div>
      </footer>
    </div>
  );
}
