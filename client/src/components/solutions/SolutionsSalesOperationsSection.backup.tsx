import React, { useState, useEffect, useRef } from "react";

const CRIMSON = "#841617";

const CAPABILITIES = [
  {
    num: "01",
    title: "CRM Structure",
    body: "A clean record of every prospect, conversation, and commitment.",
    detail: "So the team can pick up where the last interaction left off — without asking the prospect to repeat themselves.",
  },
  {
    num: "02",
    title: "Pipeline Design",
    body: "A defined path from first contact to signed agreement.",
    detail: "Clear stages, exit criteria, and ownership at each step — so everyone knows what happens next and who is responsible.",
  },
  {
    num: "03",
    title: "Workflow Automation",
    body: "Repetitive tasks handled automatically.",
    detail: "The team spends time on conversations that move deals forward instead of data entry, status updates, and manual handoffs.",
  },
  {
    num: "04",
    title: "Opportunity Management",
    body: "Every qualified prospect tracked, prioritized, and moved toward a decision.",
    detail: "The right person takes the right action at the right time — without gaps, confusion, or stalled momentum.",
  },
  {
    num: "05",
    title: "Sales Follow-Up Systems",
    body: "Consistent, timely follow-up that keeps momentum alive.",
    detail: "No lead falls through the cracks because follow-up is systematic, not dependent on memory or manual reminders.",
  },
  {
    num: "06",
    title: "Context Continuity",
    body: "Every stage preserves the information the next stage needs.",
    detail: "No dropped context between handoffs — the full picture travels with the opportunity from first contact to close.",
  },
];

export function SolutionsSalesOperationsSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="sales-operations-title"
      className="diagnostic-section section--gray py-[112px]"
      style={{ background: "#f5f3ef" }}
    >
      <div className="site-shell">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', marginInline: 'auto', marginBottom: '56px' }}>
          <p
            className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-crimson text-center"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
            }}
          >
            03 — Sales Operations
          </p>

          <h2
            id="sales-operations-title"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#1a1a1a',
              marginBottom: 14,
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}
          >
            Keep qualified opportunities moving <span style={{ color: CRIMSON }}>consistently</span> toward a decision.
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '17px',
              lineHeight: 1.7,
              color: '#57534e',
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
            }}
          >
            Sales Operations creates the operational structure behind opportunity progression. It helps the business understand where an opportunity stands, who owns the next action, what context exists, and what should happen next.
          </p>
        </div>

        {/* Capability cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {CAPABILITIES.map((cap, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={cap.num}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  background: "#ffffff",
                  border: isHovered ? "2px solid #1a1a1a" : "1px solid #e7e5e4",
                  borderTop: isHovered ? "4px solid #841617" : "3px solid #841617",
                  padding: "28px 24px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? "0 8px 24px rgba(132,22,23,0.08)"
                    : "none",
                  borderRadius: "0px",
                  opacity: sectionVisible ? 1 : 0,
                  animation: sectionVisible
                    ? `cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.1 + i * 0.08}s both`
                    : "none",
                }}
              >
                {/* Ghost number */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "4px",
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: "72px",
                    fontWeight: 400,
                    lineHeight: 1,
                    color: CRIMSON,
                    opacity: isHovered ? 0.12 : 0.05,
                    pointerEvents: "none",
                    userSelect: "none",
                    transition: "opacity 0.4s ease",
                  }}
                >
                  {cap.num}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'DM Serif Display', Georgia, serif",
                    fontSize: "17px",
                    fontWeight: 400,
                    color: "#1a1a1a",
                    lineHeight: 1.3,
                    marginBottom: "6px",
                  }}
                >
                  {cap.title}
                </h3>

                {/* Body statement */}
                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#2B2B2B",
                    lineHeight: 1.4,
                    marginBottom: "8px",
                  }}
                >
                  {cap.body}
                </p>

                {/* Detail */}
                <p
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "13px",
                    color: "#57534e",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {cap.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Outcome callout */}
        <div
          style={{
            marginTop: "48px",
            padding: "32px",
            background: "#ffffff",
            border: "1.5px solid #1a1a1a",
            borderTop: "4px solid #841617",
            borderRadius: "0px",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(14px)",
            transition:
              "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s",
            position: "relative",
          }}
        >
          {/* Accent bar */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 4,
              height: "100%",
              background: "#1a1a1a",
            }}
          />

          <div style={{ paddingLeft: "16px" }}>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#1a1a1a",
                marginBottom: "10px",
              }}
            >
              Outcome
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "15px",
                color: "#334155",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Move viable opportunities toward decisions through a repeatable path rather than inconsistent manual execution. The objective is <strong>consistency</strong> — the same reliable experience for every qualified opportunity — not a tool installation that creates new complexity.
            </p>
          </div>
        </div>

        {/* Feedback loop */}
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.5s ease 0.8s, transform 0.5s ease 0.8s",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#841617"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ opacity: 0.45, flexShrink: 0 }}
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </svg>
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              color: "#78716c",
              fontStyle: "italic",
            }}
          >
            Revenue Intelligence feeds learning back to this stage
          </span>
        </div>

        {/* Naming note */}
        <p
          style={{
            fontSize: "13px",
            color: "#78716c",
            marginTop: "20px",
            lineHeight: 1.7,
            textAlign: "center",
            opacity: sectionVisible ? 0.7 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease 0.9s, transform 0.5s ease 0.9s",
          }}
        >
          Naming note: At the Solutions Overview level the canonical label is Sales Operations. Existing retained pages or deeper capability descriptions that reference CRM structure, pipeline design, or workflow automation preserve their terminology at the appropriate depth.
        </p>

        <style>{`
          @keyframes cardIn {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          @media (max-width: 768px) {
            [style*="grid-template-columns: repeat(3"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
