import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { AIVisibilityHero } from "@/components/ai-visibility/AIVisibilityHero";
import { AIBuyerJourneySection } from "@/components/ai-visibility/AIBuyerJourneySection";
import { AIEvolutionSection } from "@/components/ai-visibility/AIEvolutionSection";
import { AIOptimizationConsolidationSection } from "@/components/ai-visibility/AIOptimizationConsolidationSection";
import { AIEntityOptimizationSection } from "@/components/ai-visibility/AIEntityOptimizationSection";
import { AIRecommendationMechanicsSection } from "@/components/ai-visibility/AIRecommendationMechanicsSection";
import { AITechnicalFoundationSection } from "@/components/ai-visibility/AITechnicalFoundationSection";
import { AIServiceBusinessRelevanceSection } from "@/components/ai-visibility/AIServiceBusinessRelevanceSection";
import { AIEvaluationSection } from "@/components/ai-visibility/AIEvaluationSection";
import { AIVScorePlaceholderSection } from "@/components/ai-visibility/AIVScorePlaceholderSection";
import { AILifecyclePlaceholderSection } from "@/components/ai-visibility/AILifecyclePlaceholderSection";
import { AIMaturityProgressionSection } from "@/components/ai-visibility/AIMaturityProgressionSection";
import { AIBusinessOutcomesSection } from "@/components/ai-visibility/AIBusinessOutcomesSection";
import { AIRoadmapPlaceholderSection } from "@/components/ai-visibility/AIRoadmapPlaceholderSection";
import { AIFrameworksResourcesSection } from "@/components/ai-visibility/AIFrameworksResourcesSection";
import { AIFrequentlyAskedQuestionsSection } from "@/components/ai-visibility/AIFrequentlyAskedQuestionsSection";
import { AICClosingCTABand } from "@/components/ai-visibility/AICClosingCTABand";

export default function AIVisibility() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        {/* Section 01 — Hero */}
        <AIVisibilityHero />
        {/* Section 02 — Buyer Journey */}
        <AIBuyerJourneySection />
        {/* Section 03 — AI Search Evolution */}
        <AIEvolutionSection />
        {/* Section 04 — Consolidated Optimization */}
        <AIOptimizationConsolidationSection />
        {/* Section 05 — Entity Optimization */}
        <AIEntityOptimizationSection />
        {/* Section 06 — Recommendation Mechanics */}
        <AIRecommendationMechanicsSection />
        {/* Section 07 — Technical Foundation */}
        <AITechnicalFoundationSection />
        {/* Section 08 — Service-Business Relevance */}
        <AIServiceBusinessRelevanceSection />
        {/* Section 09 — Evaluation */}
        <AIEvaluationSection />
        {/* Section 10 — Visibility Score */}
        <AIVScorePlaceholderSection />
        {/* Section 11 — Operating Lifecycle */}
        <AILifecyclePlaceholderSection />
        {/* Section 12 — Maturity Progression */}
        <AIMaturityProgressionSection />
        {/* Section 13 — Business Outcomes */}
        <AIBusinessOutcomesSection />
        {/* Section 14 — Improvement Path */}
        <AIRoadmapPlaceholderSection />
        {/* Section 15 — Frameworks & Resources */}
        <AIFrameworksResourcesSection />
        {/* Section 16 — FAQ */}
        <AIFrequentlyAskedQuestionsSection />
        {/* Section 17 — Closing CTA */}
        <AICClosingCTABand />
      </main>
      <SiteFooter />
    </>
  );
}
