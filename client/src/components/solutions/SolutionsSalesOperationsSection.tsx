import React, { useState, useEffect, useRef } from "react";

const CRIMSON = "#841617";

const highlight = (text: string, words: string[]) => {
  let result: React.ReactNode[] = [];
  const regex = new RegExp(`(\\b${words.join("\\b|\\b")}\\b)`, "gi");
  const parts = text.split(regex);
  parts.forEach((part, i) => {
    if (words.some(w => w.toLowerCase() === part.toLowerCase())) {
      result.push(<span key={i} style={{ color: CRIMSON, fontWeight: 600 }}>{part}</span>);
    } else {
      result.push(part);
    }
  });
  return result;
};

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

        {/* Timeline layout */}
        <div style={{ position: 'relative', maxWidth: '860px', marginInline: 'auto' }}>
          {/* Vertical spine */}
          <div style={{
            position: 'absolute',
            left: '31px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: '#d6d3d1',
          }} aria-hidden="true" />

          {/* Timeline items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {CAPABILITIES.map((cap, i) => {
              const isHovered = hoveredIdx === i;
              return (
                <div
                  key={cap.num}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    display: 'flex',
                    gap: '28px',
                    alignItems: 'flex-start',
                    padding: '20px 0',
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? 'translateX(0)' : 'translateX(-16px)',
                    transition: `opacity 0.5s ease ${0.15 + i * 0.08}s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${0.15 + i * 0.08}s`,
                  }}
                >
                  {/* Node marker */}
                  <div style={{ position: 'relative', flexShrink: 0, width: '64px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: isHovered ? CRIMSON : '#ffffff',
                      border: `2px solid ${CRIMSON}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: '16px',
                      fontWeight: 400,
                      color: isHovered ? '#ffffff' : CRIMSON,
                      transition: 'all 0.3s ease',
                      boxShadow: isHovered ? '0 4px 12px rgba(132,22,23,0.2)' : '0 1px 3px rgba(0,0,0,0.06)',
                      zIndex: 1,
                    }}>
                      {cap.num}
                    </div>
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1,
                    background: '#ffffff',
                    border: '1px solid #d6d3d1',
                    borderTop: `3px solid ${CRIMSON}`,
                    padding: '24px 28px',
                    boxShadow: isHovered
                      ? '0 8px 20px rgba(132,22,23,0.08), 0 1px 4px rgba(0,0,0,0.04)'
                      : '0 1px 2px rgba(0,0,0,0.04)',
                    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}>
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: CRIMSON,
                        flexShrink: 0,
                        opacity: 0.7,
                      }} aria-hidden="true" />
                      <h3 style={{
                        fontFamily: "'DM Serif Display', Georgia, serif",
                        fontSize: '18px',
                        fontWeight: 400,
                        color: '#1a1a1a',
                        lineHeight: 1.25,
                        margin: 0,
                      }}>
                        {cap.title}
                      </h3>
                    </div>

                    {/* Body statement */}
                    <p style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#2B2B2B',
                      lineHeight: 1.4,
                      marginBottom: '8px',
                      margin: 0,
                    }}>
                      {cap.body}
                    </p>

                    {/* Detail */}
                    <p style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: '14px',
                      color: '#78716c',
                      lineHeight: 1.65,
                      margin: 0,
                    }}>
                      {cap.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outcome callout */}
        <div
          style={{
            marginTop: '56px',
            padding: '32px',
            background: '#ffffff',
            border: '1px solid #d6d3d1',
            borderTop: '4px solid #841617',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.7s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.7s',
            position: 'relative',
            maxWidth: '860px',
            marginInline: 'auto',
          }}
        >
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{
              width: '3px',
              height: '48px',
              background: '#1a1a1a',
              flexShrink: 0,
            }} aria-hidden="true" />
            <div>
              <p style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#1a1a1a',
                marginBottom: '10px',
              }}>Outcome</p>
              <p style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '15px',
                color: '#334155',
                lineHeight: 1.7,
                margin: 0,
              }}>
                Move viable opportunities toward decisions through a repeatable path rather than inconsistent manual execution. The objective is <strong>consistency</strong> — the same reliable experience for every qualified opportunity — not a tool installation that creates new complexity.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback loop */}
        <div
          style={{
            marginTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.5s ease 0.9s, transform 0.5s ease 0.9s',
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
          <span style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '13px',
            fontWeight: 400,
            color: '#78716c',
            fontStyle: 'italic',
          }}>
            Revenue Intelligence feeds learning back to this stage
          </span>
        </div>

        {/* Naming note */}
        <p style={{
          fontSize: '13px',
          color: '#78716c',
          marginTop: '20px',
          lineHeight: 1.7,
          textAlign: 'center',
          opacity: sectionVisible ? 0.8 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.5s ease 1s, transform 0.5s ease 1s',
        }}>
          Naming note: At the Solutions Overview level the canonical label is Sales Operations. Existing retained pages or deeper capability descriptions that reference CRM structure, pipeline design, or workflow automation preserve their terminology at the appropriate depth.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .so-timeline {
            flex-direction: column !important;
            gap: 16px !important;
          }

          .so-node {
            width: 40px !important;
            height: 40px !important;
            font-size: 14px !important;
          }

          .so-card {
            padding: 20px !important;
          }

          .so-outcome {
            padding: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
