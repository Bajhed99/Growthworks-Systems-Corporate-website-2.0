import { ArrowRight, Check, CircleAlert, Link2, Minus, Unlink } from "lucide-react";
import { useState } from "react";

const fragmented = [
  ["Visibility Gap", "Buyer signals stay isolated across tools."],
  ["Slow Response", "Intent expires in inbox queues."],
  ["Broken Handoff", "Context is lost between conversations."],
  ["Lost Attribution", "Outcomes do not feed the next decision."],
];
const connected = [
  ["Unified Buyer Signals", "First-party intent captured instantly."],
  ["Instant Context Routing", "Response coordinated while intent is active."],
  ["Seamless Deal Pipeline", "Activity and context transfer together."],
  ["Closed-Loop Engine", "Revenue intelligence feeds the front line."],
];

export function SuppliedFragmentedConnectedVisual() {
  const [active, setActive] = useState(0);
  return <div className="supplied-comparison" aria-label="Fragmented versus connected growth comparison">
    <div className="comparison-column comparison-fragmented"><div className="comparison-heading"><Unlink size={15} aria-hidden="true" /><span>Fragmented Growth</span></div><p className="comparison-subtitle">Activity everywhere. Momentum nowhere.</p>{fragmented.map(([title, body], index) => <button className={`comparison-node ${active === index ? "is-active" : ""}`} type="button" key={title} onClick={() => setActive(index)}><span className="comparison-node-icon"><CircleAlert size={14} aria-hidden="true" /></span><span><strong>{title}</strong><small>{body}</small></span></button>)}</div>
    <div className="comparison-connector" aria-hidden="true"><span><ArrowRight size={19} /></span><i /><i /><i /></div>
    <div className="comparison-column comparison-connected"><div className="comparison-heading"><Link2 size={15} aria-hidden="true" /><span>Connected Growth</span></div><p className="comparison-subtitle">The system compounds the signal.</p>{connected.map(([title, body], index) => <div className={`comparison-node connected-node ${active === index ? "is-active" : ""}`} key={title}><span className="comparison-node-icon"><Check size={14} aria-hidden="true" /></span><span><strong>{title}</strong><small>{body}</small></span></div>)}</div>
  </div>;
}

const systemLayers = ["Digital Presence", "Lead Response", "Sales Operations", "Revenue Intelligence"];
export function SuppliedRevenueInfrastructureVisual() {
  return <div className="supplied-revenue-visual" aria-label="Revenue Infrastructure system diagram">
    <div className="revenue-flow-labels"><span>Disconnected tools</span><span>One Revenue System</span><span>Business outcomes</span></div>
    <div className="revenue-flow"><div className="revenue-flow-side"><span>Website</span><span>Search & AI Visibility</span><span>CRM</span><span>Automation</span></div><div className="revenue-core"><small>GWS FRAMEWORK</small><strong>Revenue<br /><em>Infrastructure</em></strong><div className="core-layer-list">{systemLayers.map((layer) => <span key={layer}>{layer}</span>)}</div></div><div className="revenue-flow-side outcomes-side"><span><Check size={12} aria-hidden="true" />Be Found</span><span><Check size={12} aria-hidden="true" />Capture & Respond</span><span><Check size={12} aria-hidden="true" />Convert Consistently</span><span><Check size={12} aria-hidden="true" />Improve & Scale</span></div></div>
    <div className="revenue-system-note"><Minus size={13} aria-hidden="true" />A connected system creates a feedback loop instead of another isolated tool.</div>
  </div>;
}
