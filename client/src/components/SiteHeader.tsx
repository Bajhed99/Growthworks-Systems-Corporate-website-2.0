import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { GWS_NAV_GROUPS, GWS_NAV_LINKS } from "@/lib/gwsNavigation";
import { shouldCompactStickyHeader } from "@/lib/stickyHeader";

const OFFICIAL_LOGO = "/assets/images/branding/growthworks-official-logo.png";

function AnchorLink({ href, children, className, onClick, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children: React.ReactNode }) {
  return <a className={className} href={href} onClick={onClick} {...props}>{children}</a>;
}

export default function SiteHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
  const [isHeaderCompact, setHeaderCompact] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const updateHeaderState = () => {
      const nextCompactState = shouldCompactStickyHeader(window.scrollY);
      setHeaderCompact((currentState) => currentState === nextCompactState ? currentState : nextCompactState);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  return (
    <header
      className={`site-header ${isHeaderCompact ? "is-compact" : ""}`}
      onMouseLeave={() => setActiveDesktopMenu(null)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setActiveDesktopMenu(null);
      }}
    >
      <div className="site-shell header-shell">
        <AnchorLink href="/" className="brand" aria-label="GrowthWorks Systems home">
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
                  <button type="button" className={`nav-link nav-link--group ${isOpen ? "is-active" : ""}`} aria-expanded={isOpen} aria-controls={menuId} aria-haspopup="menu" onClick={() => { setLocation(group.href); setActiveDesktopMenu(null); }}>
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
          <AnchorLink href="/revenue-diagnostic" className="button button--dark header-cta">Book Discovery Call</AnchorLink>
          <button type="button" className="menu-button" aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen((open) => !open)}>{mobileNavOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      <div className={`mobile-nav ${mobileNavOpen ? "is-open" : ""}`}><nav className="site-shell" aria-label="Mobile primary navigation">
        {GWS_NAV_GROUPS.map((group) => <div className="mobile-nav-group" key={group.label}><button type="button" className="mobile-nav-link" onClick={() => { setLocation(group.href); setMobileNavOpen(false); }}>{group.label}</button><div className="mobile-nav-submenu">{group.items.map((item) => <AnchorLink key={item.label} href={item.href} className="mobile-nav-sublink" onClick={() => setMobileNavOpen(false)}>{item.label}</AnchorLink>)}</div></div>)}
        {GWS_NAV_LINKS.map((item) => <AnchorLink key={item.label} href={item.href} className="mobile-nav-link" onClick={() => setMobileNavOpen(false)}>{item.label}</AnchorLink>)}
      </nav></div>
    </header>
  );
}
