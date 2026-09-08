import React, { useState } from "react";
import { ArrowRight, BarChart3, CheckCircle2, Filter, Globe, MessageSquare, XCircle } from "lucide-react";

export const BUSINESS_OUTCOMES = [
  {
    number: "01",
    problem: "Hard to find",
    outcome: "Be Found",
    result: "Capture more of the demand already looking for what you provide.",
    icon: Globe,
  },
  {
    number: "02",
    problem: "Slow to respond",
    outcome: "Capture & Respond",
    result: "Give qualified opportunities a clear path forward while intent is still high.",
    icon: MessageSquare,
  },
  {
    number: "03",
    problem: "Leads falling through",
    outcome: "Convert Consistently",
    result: "Turn more qualified opportunities into customers more consistently.",
    icon: Filter,
  },
  {
    number: "04",
    problem: "Unpredictable growth",
    outcome: "Improve & Scale",
    result: "See what drives revenue so you can improve what matters next.",
    icon: BarChart3,
  },
];

export function BusinessOutcomesInteractive() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeOutcome = BUSINESS_OUTCOMES[activeIndex];
  const ActiveIcon = activeOutcome.icon;

  return (
    <section className="outcomes-interactive section section--white" aria-labelledby="outcomes-title">
      <div className="site-shell">
        <header className="centered-intro" data-scroll-reveal>
          <p className="section-kicker">Four Business Outcomes</p>
          <h2 id="outcomes-title">What should happen instead.</h2>
        </header>

        <div className="outcome-choice-grid" aria-label="Choose a business outcome">
          {BUSINESS_OUTCOMES.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeIndex === index;

            return (
              <button
                type="button"
                key={item.outcome}
                className={`outcome-choice ${isActive ? "is-active" : ""}`}
                aria-pressed={isActive}
                aria-controls="outcome-detail"
                onClick={() => setActiveIndex(index)}
              >
                <span className="outcome-choice-number">{item.number}</span>
                <span className="outcome-choice-problem"><XCircle aria-hidden="true" /> {item.problem}</span>
                <span className="outcome-choice-title"><Icon aria-hidden="true" /> {item.outcome}</span>
                <span className="outcome-choice-state">{isActive ? "Selected outcome" : "View outcome"}</span>
              </button>
            );
          })}
        </div>

        <div id="outcome-detail" className="outcome-detail" role="region" aria-live="polite" aria-label={`${activeOutcome.outcome} outcome detail`} data-scroll-reveal>
          <div className="outcome-detail-before">
            <span>From</span>
            <strong><XCircle aria-hidden="true" /> {activeOutcome.problem}</strong>
          </div>
          <ArrowRight className="outcome-detail-arrow" aria-hidden="true" />
          <div className="outcome-detail-after">
            <span>To</span>
            <strong><CheckCircle2 aria-hidden="true" /> {activeOutcome.outcome}</strong>
            <p><ActiveIcon aria-hidden="true" /> {activeOutcome.result}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
