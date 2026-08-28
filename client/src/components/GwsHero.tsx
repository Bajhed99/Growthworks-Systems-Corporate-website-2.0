/**
 * GWS hero: prompt-informed asymmetric editorial composition.
 * Uses Warm Cream, Charcoal, and Growth Crimson with restrained animated wave accents.
 */
import { ArrowRight, ChartNoAxesCombined, Check, Route, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const systemLayers = [
  ["Digital Presence", "Be found", Search],
  ["Lead Response", "Capture & respond", ArrowRight],
  ["Sales Operations", "Convert consistently", Route],
  ["Revenue Intelligence", "Improve & scale", ChartNoAxesCombined],
];

export function GwsHero() {
  return (
    <section className="gws-hero" aria-labelledby="hero-title">
      <div className="gws-hero-waves" aria-hidden="true">
        <span className="gws-hero-wave gws-hero-wave--one" />
        <span className="gws-hero-wave gws-hero-wave--two" />
        <span className="gws-hero-wave gws-hero-wave--three" />
      </div>

      <div className="site-shell gws-hero-inner">
        <div className="gws-hero-copy">
          <p className="gws-hero-kicker"><span aria-hidden="true" />Revenue Infrastructure</p>
          <h1 id="hero-title">Turn more of your existing opportunity into revenue.</h1>
          <p className="gws-hero-description">GrowthWorks Systems helps founder-led service businesses identify and repair the gaps that prevent demand, leads, and customers from producing their full value.</p>
          <div className="gws-hero-actions">
            <Button asChild className="gws-hero-primary">
              <a href="#revenue-diagnostic">Book a Revenue Diagnostic <ArrowRight aria-hidden="true" /></a>
            </Button>
            <Button asChild variant="outline" className="gws-hero-secondary">
              <a href="#revenue-infrastructure">Explore the Framework</a>
            </Button>
          </div>
          <p className="gws-hero-note">Diagnose first. Build the system that removes the constraint.</p>
        </div>

        <div className="gws-system-preview" role="img" aria-label="Revenue Infrastructure preview showing four connected capability layers: Digital Presence, Lead Response, Sales Operations, and Revenue Intelligence.">
          <div className="gws-preview-topline"><span>GrowthWorks Systems</span><b>Revenue system preview</b></div>
          <div className="gws-preview-heading"><p>One coordinated system</p><span>Opportunity <i>→</i> Revenue</span></div>
          <div className="gws-preview-grid">
            {systemLayers.map(([title, outcome, Icon], index) => {
              const LayerIcon = Icon as typeof Search;
              return <div className="gws-preview-layer" key={title as string}><span>0{index + 1}</span><LayerIcon aria-hidden="true" /><p><strong>{title as string}</strong><small>{outcome as string}</small></p></div>;
            })}
          </div>
          <div className="gws-preview-footer"><Check aria-hidden="true" /><span>Signals carry forward. Outcomes improve the next decision.</span></div>
        </div>
      </div>
    </section>
  );
}
