import { useState, useEffect, useRef } from "react";

const STAGES = [
  {
    id: 1,
    label: "Fragmented",
    description:
      "Revenue operates in disconnected pockets. Sales, marketing, and finance each maintain separate data, tools, and definitions — making any shared view of the business impossible.",
    signals: [
      "No agreed definition of a \"qualified lead\" across teams",
      "Pipeline and revenue figures differ by department",
      "Handoffs between marketing, sales, and CS are informal or absent",
      "Revenue leakage is suspected but impossible to quantify",
    ],
    unlock:
      "Document shared definitions for pipeline stages, lead qualification, and revenue recognition — then enforce them in a single CRM that all revenue teams use.",
  },
  {
    id: 2,
    label: "Stabilized",
    description:
      "Core processes are documented and repeatable. Teams share a common language and a single system of record, though data still moves between systems manually or via brittle point-to-point exports.",
    signals: [
      "CRM is the authoritative source for pipeline and close rates",
      "Weekly forecasting meetings draw from the same numbers",
      "Defined SLAs govern handoffs between marketing, sales, and CS",
      "Finance can produce a revenue report — but it takes two days",
    ],
    unlock:
      "Replace manual exports with bi-directional integrations so data moves in real time between CRM, MAP, billing, and finance systems — eliminating reconciliation work.",
  },
  {
    id: 3,
    label: "Integrated",
    description:
      "Systems communicate in real time. Revenue data flows automatically across the full go-to-market stack — giving every leader a live, consistent view without manual reconciliation.",
    signals: [
      "Marketing attribution syncs to CRM within minutes of conversion",
      "Finance sees contracted ARR and churn signals in near real time",
      "A single pipeline dashboard serves sales, marketing, and the CFO",
      "Customer health scores are calculated automatically from product data",
    ],
    unlock:
      "Layer predictive models on top of your integrated data: deal-level win probability, churn propensity, and expansion readiness scores that surface automatically — not after a spreadsheet exercise.",
  },
  {
    id: 4,
    label: "AI-Enabled",
    description:
      "Machine intelligence augments every revenue motion. Predictive scoring, automated sequencing, and dynamic forecasting reduce human effort on low-value tasks and focus teams where they have the most impact.",
    signals: [
      "Reps prioritise their day using AI-generated deal risk scores",
      "Outreach sequences are drafted and personalised by AI, reviewed by humans",
      "Churn signals trigger CS plays 90+ days before contract renewal",
      "Finance reforecast cycles shrink from weeks to hours",
    ],
    unlock:
      "Close the feedback loop: pipe customer outcome data back into the models so they improve with every closed deal, renewed contract, and expansion motion. Intelligence becomes compounding.",
  },
  {
    id: 5,
    label: "Revenue Engine",
    description:
      "Revenue is a fully self-reinforcing system. Strategy, execution, and intelligence operate as one loop — continuously incorporating outcomes to refine targeting, capacity, and go-to-market motion.",
    signals: [
      "Pipeline generation is largely autonomous; reps focus on high-touch relationships",
      "Capacity plans update dynamically as win rates and deal velocity shift",
      "Every expansion, churn, or new logo feeds back into ICP and segmentation models",
      "The CFO reforecasts in real time, not quarterly",
    ],
    unlock:
      "This is the destination. The work at this stage is expanding the engine — new segments, new products, new geographies — knowing the infrastructure can absorb and optimise them.",
  },
] as const;

export default function RevenueMaturity() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stage = STAGES[active];
  const progress = (active / (STAGES.length - 1)) * 100;

  const handleStageClick = (index: number) => {
    setActive(index);
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !sectionVisible) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % STAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isPaused, sectionVisible]);

  return (
    <section ref={sectionRef} className="py-28 bg-white">

      {/* Mobile floating stage nav — right side, visible only below md breakpoint and while section is in view */}
      <div
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-px md:hidden transition-all duration-300"
        style={{
          transform: `translateY(-50%) translateX(${sectionVisible ? "0%" : "100%"})`,
        }}
      >
        {STAGES.map((s, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <button
              key={s.id}
              onClick={() => handleStageClick(i)}
              aria-label={`Stage ${s.id}: ${s.label}`}
              className={[
                "flex flex-col items-center justify-center w-11 h-11 transition-all duration-200 focus:outline-none",
                isActive
                  ? "bg-crimson text-white"
                  : isPast
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-400 border-l border-t border-b border-gray-200",
              ].join(" ")}
            >
              <span className="font-mono text-[10px] font-medium leading-none">
                0{s.id}
              </span>
              <span
                className={[
                  "font-sans text-[8px] font-semibold mt-1 leading-none max-w-[36px] text-center truncate",
                  isActive ? "text-white/80" : isPast ? "text-gray-400" : "text-gray-400",
                ].join(" ")}
              >
                {s.label}
              </span>
            </button>
          );
        })}
        {/* Progress tail */}
        <div className="w-11 h-1 bg-crimson" style={{ opacity: active === STAGES.length - 1 ? 1 : 0, transition: "opacity 0.3s" }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 pr-14 md:pr-8 md:px-8 lg:px-16">

        {/* Eyebrow + headline */}
        <p className="text-[13px] font-mono font-medium text-crimson tracking-[0.2em] uppercase mb-5">
          Revenue Infrastructure Maturity
        </p>
        <div className="mb-16 max-w-[760px]">
          <h2 className="font-serif font-normal text-[36px] md:text-[48px] leading-[1.12] text-gray-900 mb-5">
            Every organisation is somewhere on the <span className="text-crimson">journey.</span>
          </h2>
          <p className="text-[18px] leading-[1.7] text-gray-500">
            Select a stage to understand exactly where you are, what it means in practice,
            and what it takes to move forward.
          </p>
        </div>

        {/* Stage stepper */}
        <div className="relative mb-12">
          {/* Track */}
          <div className="absolute top-6 left-[calc(10%)] right-[calc(10%)] h-px bg-gray-200" />
          <div
            className="absolute top-6 left-[calc(10%)] h-px bg-crimson transition-all duration-500 ease-in-out"
            style={{ width: `calc(${progress}% * 0.8)` }}
          />

          <div className="flex justify-between relative">
            {STAGES.map((s, i) => {
              const isActive = i === active;
              const isPast = i < active;
              return (
                <button
                  key={s.id}
                  onClick={() => handleStageClick(i)}
                  className="flex flex-col items-center flex-1 group focus:outline-none"
                  aria-label={`Stage ${s.id}: ${s.label}`}
                  aria-pressed={isActive}
                >
                  <div
                    className={[
                      "w-12 h-12 flex items-center justify-center border-2 z-10 relative transition-all duration-300",
                      isActive
                        ? "bg-crimson border-crimson text-white shadow-md scale-110"
                        : isPast
                        ? "bg-white border-gray-400 text-gray-600"
                        : "bg-white border-gray-200 text-gray-400 group-hover:border-gray-400 group-hover:text-gray-600",
                    ].join(" ")}
                  >
                    <span className="font-mono font-medium text-[13px]">
                      0{s.id}
                    </span>
                  </div>
                  <span
                    className={[
                      "mt-3 text-[13px] font-sans font-semibold text-center leading-snug transition-colors duration-300 hidden sm:block",
                      isActive
                        ? "text-crimson"
                        : isPast
                        ? "text-gray-600"
                        : "text-gray-400 group-hover:text-gray-600",
                    ].join(" ")}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div key={active} className="grid md:grid-cols-[420px_1fr] animate-fade-in border border-gray-900">

          {/* Left: black identity column */}
          <div className="bg-black p-8 md:p-10 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-[11px] font-medium text-crimson tracking-[0.2em] uppercase">
                Stage
              </span>
              <span className="font-mono text-[28px] font-medium text-white leading-none">
                0{stage.id}
              </span>
            </div>
            <h3 style={{ color: '#ffffff' }} className="font-serif font-normal text-[30px] md:text-[36px] leading-[1.15] antialiased mb-6">
              {stage.label}
            </h3>
            <p className="text-[16px] font-sans text-gray-300 leading-[1.75] mb-auto">
              {stage.description}
            </p>

            {/* Unlock block */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-[10px] font-mono font-medium text-crimson tracking-[0.2em] uppercase mb-3">
                {active < STAGES.length - 1 ? "What unlocks the next stage" : "The destination"}
              </p>
              <p className="text-[14px] font-sans text-gray-400 leading-[1.7]">
                {stage.unlock}
              </p>
            </div>
          </div>

          {/* Right: signals column */}
          <div className="bg-[#f8f7f5] p-8 md:p-10 flex flex-col">
            <p className="text-[11px] font-mono font-medium text-gray-400 tracking-[0.2em] uppercase mb-7">
              Signals at this stage
            </p>
            <ul className="space-y-5 mb-auto">
              {stage.signals.map((signal, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="font-mono text-[11px] font-medium text-crimson mt-0.5 shrink-0 tracking-wide">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[16px] font-sans text-gray-800 leading-[1.65]">
                    {signal}
                  </span>
                </li>
              ))}
            </ul>

            {/* Maturity bar */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex gap-1">
                {STAGES.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(i)}
                    title={s.label}
                    className={[
                      "h-1 flex-1 transition-all duration-300",
                      i < active
                        ? "bg-gray-400"
                        : i === active
                        ? "bg-crimson"
                        : "bg-gray-200",
                    ].join(" ")}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] font-mono text-gray-400">Fragmented</span>
                <span className="text-[10px] font-mono text-gray-400">Revenue Engine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-5">
          <button
            onClick={() => handleStageClick(Math.max(0, active - 1))}
            disabled={active === 0}
            className="font-sans font-medium text-[15px] text-gray-500 hover:text-black transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            ← Previous stage
          </button>
          <button
            onClick={() => handleStageClick(Math.min(STAGES.length - 1, active + 1))}
            disabled={active === STAGES.length - 1}
            className="font-sans font-semibold text-[15px] text-crimson hover:text-crimson-dark transition-colors disabled:opacity-0 disabled:pointer-events-none"
          >
            Next stage →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
