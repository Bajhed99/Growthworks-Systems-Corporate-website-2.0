import React, { useState, useEffect, useRef } from "react";
import { Inbox, Zap, MessageSquare, Bot, Filter, CalendarCheck } from "lucide-react";

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
    title: "Lead Capture",
    body: "Every inquiry enters the system with context intact.",
    highlightBody: ["context intact"],
    detail:
      "Forms, phone calls, chat messages, and walk-ins — each lead arrives with enough information to route and respond effectively. No orphaned inquiries, no lost first impressions.",
    highlightDetail: ["orphaned inquiries", "lost first impressions"],
    Icon: Inbox,
  },
  {
    num: "02",
    title: "Speed-to-Lead Systems",
    body: "Respond faster than manual follow-up allows.",
    highlightBody: ["faster than manual"],
    detail:
      "The first business to respond wins 78% of the time. We build the automation and workflow logic that puts your team in that position consistently — not by chance, but by design.",
    highlightDetail: ["wins 78%"],
    Icon: Zap,
  },
  {
    num: "03",
    title: "Automated Acknowledgment & Follow-Up",
    body: "Buyer intent stays warm between inquiry and conversation.",
    highlightBody: ["stays warm"],
    detail:
      "An inquiry without a response dies within minutes. Automated acknowledgment keeps the connection alive while the right person prepares a meaningful reply.",
    highlightDetail: ["dies within minutes"],
    Icon: MessageSquare,
  },
  {
    num: "04",
    title: "AI-Assisted Reception",
    body: "Qualified reception that never sleeps, never misses.",
    highlightBody: ["never misses"],
    detail:
      "For approved implementations, AI-assisted reception captures and qualifies inbound contact outside business hours — ensuring no opportunity slips away because of timing.",
    highlightDetail: ["slips away"],
    Icon: Bot,
  },
  {
    num: "05",
    title: "Lead Qualification & Routing",
    body: "The right lead reaches the right person instantly.",
    highlightBody: ["instantly"],
    detail:
      "Not every lead has the same urgency or fit. Qualification logic filters, scores, and routes each inquiry to the person best positioned to convert it.",
    highlightDetail: [],
    Icon: Filter,
  },
  {
    num: "06",
    title: "Scheduling & Next-Step Automation",
    body: "From first contact to booked conversation without delay.",
    highlightBody: ["without delay"],
    detail:
      "The gap between 'interested' and 'scheduled' is where momentum is lost. We automate the scheduling and next-step logic that keeps buyers moving forward.",
    highlightDetail: ["momentum is lost"],
    Icon: CalendarCheck,
  },
];

export function SolutionsLeadResponseSection() {
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
      aria-labelledby="lead-response-title"
      className="diagnostic-section section--white py-[112px]"
      style={{ background: "#ffffff" }}
    >
      <div className="site-shell">
        {/* Header */}
        <p
          className="text-[14px] font-sans font-semibold tracking-[0.18em] uppercase mb-4 text-gray-400 text-center"
        >
          02 — Lead Response
        </p>

        {/* Accent line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "2px",
            marginBottom: "4px",
          }}
        >
          <div style={{ width: 28, height: 1.5, background: CRIMSON, opacity: 0.4 }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: CRIMSON, opacity: 0.5 }} />
          <div style={{ width: 28, height: 1.5, background: CRIMSON, opacity: 0.4 }} />
        </div>

        <h2
          id="lead-response-title"
          className="font-serif text-center"
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: "#1a1a1a",
            marginBottom: 14,
            maxWidth: "700px",
            marginInline: "auto",
          }}
        >
          Protect buyer intent after someone raises their hand.
        </h2>
        <p
          className="font-sans text-center mx-auto"
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#57534e",
            maxWidth: "680px",
            marginBottom: "24px",
          }}
        >
          Generating an inquiry is only valuable if the opportunity receives an effective next step. Lead Response focuses on what happens between initial interest and active sales engagement.
        </p>

        {/* Capability cards grid */}
        <div
          className="lr-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginTop: "40px",
          }}
        >
          {CAPABILITIES.map((cap, i) => {
            const isHovered = hoveredIdx === i;
            const Icon = cap.Icon;
            return (
              <div
                key={cap.num}
                className="lr-card"
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
                  transition:
                    "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? "0 8px 24px rgba(132,22,23,0.08)"
                    : "none",
                  borderRadius: "12px",
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

                {/* Icon */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#1a1a1a",
                    border: "2px solid #841617",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginBottom: "14px",
                  }}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.5}
                    color="#ffffff"
                  />
                </div>

                {/* Indicator bar */}
                <div
                  style={{
                    width: 24,
                    height: 2,
                    background: CRIMSON,
                    marginBottom: "10px",
                    opacity: 0.6,
                  }}
                />

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
                  {highlight(cap.body, cap.highlightBody)}
                </h3>

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
                  {highlight(cap.detail, cap.highlightDetail)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Outcome callout */}
        <div
          className="lr-outcome"
          style={{
            marginTop: "48px",
            padding: "32px",
            background: "#ffffff",
            border: "1.5px solid #1a1a1a",
            borderTop: "4px solid #841617",
            borderRadius: "12px",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(14px)",
            transition:
              "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s",
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

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "14px",
                marginBottom: "12px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: "36px",
                  color: "#1a1a1a",
                  lineHeight: 1,
                }}
              >
                78%
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "15px",
                  color: "#57534e",
                }}
              >
                of deals go to the first responder
              </span>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: "100%",
                height: 4,
                background: "#e7e5e4",
                overflow: "hidden",
                borderRadius: "2px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: sectionVisible ? "78%" : "0%",
                  height: "100%",
                  background: "#1a1a1a",
                  transition:
                    "width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.8s",
                  borderRadius: "2px",
                }}
              />
            </div>

            <p
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "15px",
                color: "#44403c",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              A faster, more consistent response system turns more buyer intent into active conversations. Speed is not just competitive — it is a structural advantage.
            </p>
          </div>
        </div>

        {/* Feedback loop indicator */}
        <div
          className="lr-feedback"
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
            stroke="#1a1a1a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ opacity: 0.4, flexShrink: 0 }}
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 16h5v5" />
          </svg>
          <span
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              color: "#78716c",
              fontStyle: "italic",
            }}
          >
            Revenue Intelligence measures response performance and feeds insights back to this stage
          </span>
        </div>

        {/* Qualification note */}
        <p
          className="lr-qualifier"
          style={{
            fontSize: "13px",
            color: "#78716c",
            marginTop: "20px",
            lineHeight: 1.7,
            opacity: sectionVisible ? 0.7 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease 0.9s, transform 0.5s ease 0.9s",
          }}
        >
          Note: AI-Assisted Reception is included as a capability category but is qualified as appropriate only where part of an approved implementation. Solutions does not claim that every engagement includes AI reception, nor does it assert specific speed-to-lead performance numbers.
        </p>
      </div>

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ===== Mobile: single column, refined spacing ===== */
        @media (max-width: 768px) {
          .lr-grid {
            grid-template-columns: 1fr !important;
          }

          .lr-card {
            padding: 22px 18px !important;
          }

          .lr-card > span[aria-hidden="true"] {
            font-size: 52px !important;
            top: -8px !important;
            right: 2px !important;
          }

          .lr-card > div {
            width: 32px !important;
            height: 32px !important;
            margin-bottom: 12px !important;
          }

          .lr-card > div svg {
            width: 15px !important;
            height: 15px !important;
          }

          .lr-card > h3 {
            font-size: 16px !important;
          }

          .lr-card > p {
            font-size: 14px !important;
          }

          .lr-outcome {
            padding: 24px !important;
            margin-top: 32px !important;
          }

          .lr-outcome > div > span:first-child {
            font-size: 28px !important;
          }

          .lr-outcome > div > span:last-child {
            font-size: 14px !important;
          }

          .lr-outcome > div:last-child p {
            font-size: 14px !important;
          }

          .lr-feedback {
            flex-direction: column !important;
            text-align: center !important;
          }

          .lr-qualifier {
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
