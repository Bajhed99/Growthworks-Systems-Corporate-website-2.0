import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { SolutionsSystemInteractive } from "@/components/solutions/SolutionsSystemInteractive";
import { SolutionsDigitalPresenceSection } from "@/components/solutions/SolutionsDigitalPresenceSection";
import { SolutionsLeadResponseSection } from "@/components/solutions/SolutionsLeadResponseSection";
import { SolutionsSalesOperationsSection } from "@/components/solutions/SolutionsSalesOperationsSection";
import { SolutionsRevenueIntelligenceSection } from "@/components/solutions/SolutionsRevenueIntelligenceSection";
import { SolutionsConnectedSystemSection } from "@/components/solutions/SolutionsConnectedSystemSection";
import { SolutionsConstraintFirstSection } from "@/components/solutions/SolutionsConstraintFirstSection";
import { SolutionsBusinessOutcomesSection } from "@/components/solutions/SolutionsBusinessOutcomesSection";
import { SolutionsClosingCTASection } from "@/components/solutions/SolutionsClosingCTASection";

export default function Solutions() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        {/* Section 01 — Hero */}
        <SolutionsHero />
        {/* Section 02 — The Solution System (interactive) */}
        <SolutionsSystemInteractive />
        {/* Section 03 — Digital Presence */}
        <SolutionsDigitalPresenceSection />
        {/* Section 04 — Lead Response */}
        <SolutionsLeadResponseSection />
        {/* Section 05 — Sales Operations */}
        <SolutionsSalesOperationsSection />
        {/* Section 06 — Revenue Intelligence */}
        <SolutionsRevenueIntelligenceSection />
        {/* Section 07 — How the Four Areas Work Together */}
        <SolutionsConnectedSystemSection />
        {/* Section 08 — Diagnose Before Prescribing */}
        <SolutionsConstraintFirstSection />
        {/* Section 09 — Business Outcomes */}
        <SolutionsBusinessOutcomesSection />
        {/* Section 10 — Closing CTA */}
        <SolutionsClosingCTASection />
      </main>
      <SiteFooter />
    </>
  );
}
