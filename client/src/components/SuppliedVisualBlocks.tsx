/**
 * Source package integration: these are complete, live visual blocks adapted from the user-supplied ZIP components.
 * They keep the package architecture while removing unsupported metrics, fabricated reviews/ratings, vendor examples,
 * legacy terminology, external providers, and animation loops that conflict with the approved homepage materials.
 */
import { useId, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Filter,
  Globe,
  Link2,
  MessageSquare,
  Search,
  Sparkles,
  Unlink,
} from "lucide-react";

const comparisonCapabilities = [
  {
    title: "Digital Presence",
    icon: Globe,
    fragmented: "Buyer signals stay isolated across channels.",
    connected: "Buyer signals flow into one coordinated system.",
    fragmentedOutcome: "Untracked signals",
    connectedOutcome: "Signals captured",
  },
  {
    title: "Lead Response",
    icon: MessageSquare,
    fragmented: "Intent expires in delayed or inconsistent response.",
    connected: "Response preserves context while buyer intent is active.",
    fragmentedOutcome: "Delayed response",
    connectedOutcome: "Response coordinated",
  },
  {
    title: "Sales Operations",
    icon: Filter,
    fragmented: "Context can break between discovery, handoff, and decision.",
    connected: "Pipeline context is maintained through the next decision.",
    fragmentedOutcome: "Lost context",
    connectedOutcome: "Context preserved",
  },
  {
    title: "Revenue Intelligence",
    icon: BarChart3,
    fragmented: "Activity is visible without a clear feedback loop to revenue.",
    connected: "Business outcomes inform what the system improves next.",
    fragmentedOutcome: "Incomplete attribution",
    connectedOutcome: "Outcomes measured",
  },
];

export const REVENUE_INFRASTRUCTURE_TOOLS = [
  {
    label: "Website",
    detail: "The capability exists, but its connection to discovery, response, sales, and measurement is weak.",
  },
  {
    label: "Agentic Search",
    detail: "Buyers may not find, understand, or consider the business when the decision is forming.",
  },
  {
    label: "CRM",
    detail: "Important opportunity context can remain disconnected from action.",
  },
  {
    label: "Lead Response",
    detail: "High-intent inquiries can wait too long or move on without follow-through.",
  },
  {
    label: "Automation",
    detail: "Activity can happen without protecting the moments that matter most.",
  },
  {
    label: "Analytics",
    detail: "It becomes harder to see where opportunity is created, lost, or worth improving next.",
  },
];

export const REVENUE_INFRASTRUCTURE_CAPABILITIES = [
  {
    label: "Digital Presence",
    detail: "Search, AI discoverability, and website conversion work as one coordinated presence rather than isolated activities.",
  },
  {
    label: "Lead Response",
    detail: "Inquiry context moves into timely, consistent follow-through so high-intent opportunities have a clear next step.",
  },
  {
    label: "Sales Operations",
    detail: "Handoffs, CRM context, and pipeline progression stay connected so conversion relies less on manual recovery.",
  },
  {
    label: "Revenue Intelligence",
    detail: "Outcome signals connect activity to revenue performance, making the next constraint easier to identify and improve.",
  },
];

export const REVENUE_INFRASTRUCTURE_OUTCOMES = [
  {
    phase: "ATTRACT",
    title: "Qualified inbound demand",
    detail: "Digital presence makes it easier for the right buyers to find and understand the business.",
  },
  {
    phase: "CONVERT",
    title: "Faster pipeline velocity",
    detail: "Coordinated response and clear handoffs protect the moments where buyer intent is highest.",
  },
  {
    phase: "RETAIN",
    title: "Reduced churn and risk",
    detail: "Operating context creates a clearer path for follow-through beyond the initial sale.",
  },
  {
    phase: "GROW",
    title: "Net revenue expansion",
    detail: "The system learns from outcomes and improves the next highest-value constraint.",
  },
];

function FullDisclosure({
  label,
  detail,
  isOpen,
  onToggle,
  className = "",
}: {
  label: string;
  detail: string;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}) {
  const panelId = useId();
  return (
    <div className={`full-disclosure ${className} ${isOpen ? "is-open" : ""}`}>
      <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={onToggle}>
        <span>{label}</span>
        <ChevronDown size={15} aria-hidden="true" />
      </button>
      <div className="full-disclosure-detail" id={panelId}><p>{detail}</p></div>
    </div>
  );
}

export function FragmentedConnectedFull() {
  const [active, setActive] = useState(0);
  return (
    <section className="full-fragmented" aria-labelledby="fragmented-title">
      <header className="full-fragmented-head">
        <p className="full-visual-kicker">GrowthWorks architecture comparison</p>
        <h3 id="fragmented-title">Growth compounds when the system connects.</h3>
        <p>The same capabilities produce very different results when they work as one connected system.</p>
      </header>
      <div className="comparison-capability-nav" role="tablist" aria-label="Revenue capabilities">
        {comparisonCapabilities.map((capability, index) => {
          const Icon = capability.icon;
          return (
            <button
              type="button"
              key={capability.title}
              role="tab"
              aria-selected={active === index}
              className={active === index ? "is-active" : ""}
              onClick={() => setActive(index)}
            >
              <Icon size={15} aria-hidden="true" />
              <span>{capability.title}</span>
            </button>
          );
        })}
      </div>
      <div className="full-comparison-stage">
        <article className="comparison-column comparison-column--fragmented">
          <div className="comparison-title"><Unlink size={16} aria-hidden="true" /><span>Fragmented</span></div>
          <h4>Siloed operations</h4>
          <p>Activity everywhere. Momentum nowhere.</p>
          <div className="comparison-stack">
            {comparisonCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <button type="button" aria-pressed={active === index} className={active === index ? "is-active" : ""} key={capability.title} onClick={() => setActive(index)}>
                  <span className="comparison-stage-icon"><Icon size={16} aria-hidden="true" /></span>
                  <span><b>{capability.title}</b><small>{capability.fragmented}</small></span>
                  {index < comparisonCapabilities.length - 1 && <i aria-hidden="true">×</i>}
                </button>
              );
            })}
          </div>
          <div className="comparison-detail comparison-detail--fragmented"><span>Current consequence</span><strong>{comparisonCapabilities[active].fragmentedOutcome}</strong></div>
        </article>
        <div className="comparison-divider" aria-hidden="true"><span>vs</span></div>
        <article className="comparison-column comparison-column--connected">
          <div className="comparison-title"><Link2 size={16} aria-hidden="true" /><span>Connected system</span></div>
          <h4>Connected growth</h4>
          <p>Each signal strengthens the next.</p>
          <div className="comparison-stack">
            {comparisonCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <button type="button" aria-pressed={active === index} className={active === index ? "is-active" : ""} key={capability.title} onClick={() => setActive(index)}>
                  <span className="comparison-stage-icon"><Icon size={16} aria-hidden="true" /></span>
                  <span><b>{capability.title}</b><small>{capability.connected}</small></span>
                  {index < comparisonCapabilities.length - 1 && <i aria-hidden="true">↓</i>}
                </button>
              );
            })}
          </div>
          <div className="comparison-detail comparison-detail--connected"><span>Connected outcome</span><strong>{comparisonCapabilities[active].connectedOutcome}</strong></div>
        </article>
      </div>
      <footer className="full-comparison-footer"><span>Fragmented system: revenue leakage</span><ArrowRight size={16} aria-hidden="true" /><strong>Connected system: compounding improvement</strong></footer>
    </section>
  );
}

export function RevenueInfrastructureFull() {
  const [openTool, setOpenTool] = useState<number | null>(null);
  const [activeCapability, setActiveCapability] = useState<number | null>(null);
  const [openOutcome, setOpenOutcome] = useState<number | null>(null);
  const capabilityDetailId = useId();
  return (
    <section className="full-infrastructure" aria-label="Revenue Infrastructure system diagram">
      <div className="full-infrastructure-layout">
        <article className="full-infrastructure-side">
          <p className="full-infrastructure-label">Disconnected tools</p>
          <h3>The tools work.<br /><em>They just don&apos;t</em><br />work as one system.</h3>
          <div className="full-infrastructure-list">
            {REVENUE_INFRASTRUCTURE_TOOLS.map((tool, index) => <FullDisclosure key={tool.label} label={tool.label} detail={tool.detail} isOpen={openTool === index} onToggle={() => setOpenTool((current) => current === index ? null : index)} />)}
          </div>
          <div className="full-side-note"><span>Slow response</span><span>Broken handoffs</span><span>Limited visibility</span></div>
        </article>
        <div className="full-infrastructure-connector" aria-hidden="true"><i></i><span>›</span><span>›</span><span>›</span></div>
        <article className="full-infrastructure-center">
          <span className="center-accent" aria-hidden="true"></span>
          <p className="full-infrastructure-label">One connected system</p>
          <h3>Revenue Infrastructure</h3>
          <p>Visibility, response, sales operations, and intelligence working together.</p>
          <div className="full-capability-badges" role="group" aria-label="Connected Revenue Infrastructure capabilities">
            {REVENUE_INFRASTRUCTURE_CAPABILITIES.map((capability, index) => {
              const isActive = activeCapability === index;
              return (
                <button
                  type="button"
                  key={capability.label}
                  className={isActive ? "is-active" : ""}
                  aria-pressed={isActive}
                  aria-expanded={isActive}
                  aria-controls={capabilityDetailId}
                  onClick={() => setActiveCapability((current) => current === index ? null : index)}
                >
                  {capability.label}
                </button>
              );
            })}
          </div>
          <div id={capabilityDetailId} className={`full-capability-detail ${activeCapability !== null ? "is-open" : ""}`} aria-live="polite">
            {activeCapability !== null && <p>{REVENUE_INFRASTRUCTURE_CAPABILITIES[activeCapability].detail}</p>}
          </div>
          <div className="full-method-steps"><span>Diagnose</span><i>—</i><span>Design</span><i>—</i><span>Implement</span><i>—</i><span>Optimize</span></div>
        </article>
        <div className="full-infrastructure-connector" aria-hidden="true"><i></i><span>›</span><span>›</span><span>›</span></div>
        <article className="full-infrastructure-side full-infrastructure-side--outcomes">
          <p className="full-infrastructure-label">Business outcomes</p>
          <h3>Compounding<br /><em>revenue</em><br />performance.</h3>
          <div className="full-infrastructure-list">
            {REVENUE_INFRASTRUCTURE_OUTCOMES.map((outcome, index) => <FullDisclosure key={outcome.phase} className="full-outcome-disclosure" label={`${outcome.phase} · ${outcome.title}`} detail={outcome.detail} isOpen={openOutcome === index} onToggle={() => setOpenOutcome((current) => current === index ? null : index)} />)}
          </div>
          <p className="full-side-summary">Each capability reinforces the next — creating durable, compounding revenue improvement.</p>
        </article>
      </div>
    </section>
  );
}

function JourneyFlow({ variant }: { variant: "traditional" | "ai" }) {
  const isAI = variant === "ai";
  const stages = isAI ? ["Question", "AI research", "Synthesis", "Recommendation", "Visit / decide"] : ["Search", "Results", "Websites", "Compare", "Decide"];
  return (
    <ol className={`journey-flow journey-flow--${variant}`}>
      {stages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><b>{stage}</b>{index < stages.length - 1 && <i aria-hidden="true">→</i>}</li>)}
    </ol>
  );
}

export function BuyerJourneyFull() {
  return (
    <section className="full-buyer-journey" aria-labelledby="buyer-full-title">
      <header className="full-buyer-head">
        <p className="full-visual-kicker">The buyer journey has changed</p>
        <h3 id="buyer-full-title">AI is moving the decision upstream.</h3>
        <p>Buyers can now reach a shortlist before they ever visit your website.</p>
      </header>
      <div className="full-buyer-split">
        <article className="journey-panel journey-panel--traditional">
          <div className="journey-panel-head"><span>Then</span><h4>Traditional Search</h4><p>Buyer navigates the market.</p></div>
          <div className="traditional-search-field"><Search size={15} aria-hidden="true" /><span>How do I solve this business problem?</span></div>
          <JourneyFlow variant="traditional" />
          <div className="journey-observation"><b>Buyer does the filtering</b><span>Search surfaces options. The buyer researches, compares, and decides across many sites.</span></div>
        </article>
        <div className="buyer-center-flow" aria-hidden="true"><i></i><ArrowRight size={29} /></div>
        <article className="journey-panel journey-panel--ai">
          <div className="journey-panel-head"><span>Now</span><div><Sparkles size={13} aria-hidden="true" /> AI-assisted discovery</div><h4>AI helps shape the shortlist.</h4></div>
          <div className="ai-question"><span>Question</span><b>Who is the best fit for my business?</b></div>
          <div className="ai-sources"><span>Website</span><span>Authority content</span><span>Business data</span><span>Trusted sources</span></div>
          <JourneyFlow variant="ai" />
          <div className="ai-shortlist"><span>AI visibility</span><div><b>Found</b><i>→</i><b>Understood</b><i>→</i><b>Trusted</b><i>→</i><strong>Recommended</strong></div></div>
        </article>
      </div>
      <footer className="full-buyer-conclusion">If AI cannot find, understand, or trust your business, <em>you may never enter the shortlist.</em></footer>
    </section>
  );
}
