import { Linkedin, Mail, Phone } from "lucide-react";
import { GWS_NAV_GROUPS, GWS_NAV_LINKS } from "@/lib/gwsNavigation";
import { Link } from "wouter";

const OFFICIAL_LOGO_WHITE = "/assets/images/branding/growthworks-official-logo-white.png";

const footerGroups = [
  { title: "Revenue Infrastructure", links: ["What Is Revenue Infrastructure?", "The Nine Domains", "Maturity Model", "Why GWS Is Different"] },
  { title: "Solutions", links: ["AI Visibility", "AI-Ready Website", "CRM & Automation", "Conversion Systems", "All Solutions"] },
  { title: "Industries", links: ["Home Services", "Financial Advisors & RIAs", "Insurance Agencies"] },
  { title: "Company", links: ["About GWS", "Resources", "Contact", "Book a Revenue Diagnostic"] },
] as const;

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const text = typeof children === "string" ? children : ""
  const path =
    text === "Book a Revenue Diagnostic" ? "/revenue-diagnostic" :
    text === "Contact" ? "#" :
    text === "The Nine Domains" ? "/framework#nine-domain-framework" :
    text === "What Is Revenue Infrastructure?" ? "/framework#canonical-definition" :
    text === "Maturity Model" ? "/framework#revenue-maturity" :
    text === "Why GWS Is Different" ? "/framework#why-revenue-matters" :
    text === "AI Visibility" ? "/ai-visibility" :
    text === "AI-Ready Website" ? "/ai-ready-website" :
    text === "CRM & Automation" ? "/crm-automation" :
    text === "Conversion Systems" ? "/conversion-systems" :
    text === "All Solutions" ? "/solutions" :
    text === "Home Services" ? "/home-services" :
    text === "Financial Advisors & RIAs" ? "/financial-advisors" :
    text === "Insurance Agencies" ? "/insurance-agencies" :
    text === "About GWS" ? "/about" :
    text === "Resources" ? "/resources" :
    "/"
  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return <Link href={path} onClick={handleClick}>{children}</Link>;
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-main">
        <div className="footer-brand-column">
          <img className="footer-logo" src={OFFICIAL_LOGO_WHITE} alt="GrowthWorks Systems" />
          <p className="footer-tagline">Build. Automate. Grow.</p>
          <p className="footer-description">Revenue Infrastructure for founder-led service businesses.</p>
          <address className="footer-contact-list">
            <a href="mailto:clayton@growthworks-systems.com"><Mail size={14} aria-hidden="true" />clayton@growthworks-systems.com</a>
            <a href="tel:+12143027720"><Phone size={14} aria-hidden="true" />214–302–7720</a>
            <a href="/about"><Linkedin size={14} aria-hidden="true" />LinkedIn</a>
          </address>
        </div>
        {footerGroups.map((group) => <nav className="footer-link-group" aria-label={group.title} key={group.title}><h2>{group.title}</h2>{group.links.map((link) => <FooterLink key={link}>{link}</FooterLink>)}</nav>)}
      </div>
      <div className="footer-bottom"><div className="site-shell"><small>© 2026 GrowthWorks Systems LLC. All rights reserved.</small><em>One System. Every Touchpoint. Predictable Revenue.</em></div></div>
    </footer>
  );
}
