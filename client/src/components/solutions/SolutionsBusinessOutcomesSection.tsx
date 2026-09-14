import { useLayoutEffect, useRef, useState } from "react";

const OUTCOMES = [
  {
    label: "BE FOUND",
    desc: "Make the business easier for relevant buyers to discover and understand through Digital Presence.",
  },
  {
    label: "CAPTURE & RESPOND",
    desc: "Convert active interest into identifiable opportunity and respond while intent is high through Lead Response.",
  },
  {
    label: "CONVERT CONSISTENTLY",
    desc: "Give people and systems the context necessary to move qualified opportunities toward revenue with less friction through Sales Operations.",
  },
  {
    label: "IMPROVE & SCALE",
    desc: "Connect performance signals back into decisions so the business can improve and identify the next constraint through Revenue Intelligence.",
  },
];

export function SolutionsBusinessOutcomesSection() {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section aria-label="Business Outcomes" className="diagnostic-section section--gray">
      <div className="site-shell" ref={sectionRef}>
        <p className="section-kicker" style={{ textAlign: "center" }}>
          Business Outcomes
        </p>
        <h2 id="outcomes-title" style={{ textAlign: "center" }}>
          <span style={{ color: "var(--maroon)" }}>
            The capabilities matter
          </span>{" "}
          because of what they make possible.
        </h2>
        <p
          className="section-intro"
          style={{
            maxWidth: "680px",
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          The four solution modules are not an arbitrary service catalog.
          Each supports a specific business outcome that moves the revenue
          path from opportunity to measurable improvement.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "16px",
            marginTop: "32px",
          }}
        >
          {OUTCOMES.map((outcome, i) => (
            <article
              key={outcome.label}
              aria-label={outcome.label}
              className={`gws-outcome-card ${
                revealed ? "gws-outcome-card--visible" : ""
              }`}
              style={{
                "--card-index": i,
                width: "calc((100% - 16px) / 2)",
                minWidth: "280px",
                maxWidth: "560px",
                flex: "1 1 280px",
                padding: "24px",
                background: "#fff",
                border: "1px solid #DDD6CC",
                borderRadius: 0,
              }}
            >
              <h3
                className="font-serif"
                style={{
                  fontSize: "22px",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  lineHeight: 1.2,
                  marginBottom: "12px",
                  color: "#841617",
                }}
              >
                {outcome.label}
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: "#334155",
                  lineHeight: 1.65,
                }}
              >
                {outcome.desc}
              </p>
            </article>
          ))}
        </div>

        <p
          style={{
            fontSize: "13px",
            color: "#64748b",
            marginTop: "24px",
            lineHeight: 1.6,
          }}
        >
          These outcomes are not a second taxonomy — they describe the
          results the four connected modules are responsible for. Each
          outcome is tied to a specific capability family: Digital
          Presence (BE FOUND), Lead Response (CAPTURE & RESPOND), Sales
          Operations (CONVERT CONSISTENTLY), and Revenue Intelligence
          (IMPROVE & SCALE).
        </p>
      </div>

      {/* ── Staggered card animations + passive idle pulse ── */}
      <style>{`
        .gws-outcome-card {
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.3s ease,
            border-color 0.3s ease;
          transition-delay: calc(var(--card-index) * 0.1s);
          will-change: transform, opacity;
        }

        .gws-outcome-card--visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Passive idle pulse on the left accent bar */
        .gws-outcome-card::before {
          content: "";
          position: absolute;
          top: 12px;
          bottom: 12px;
          left: 0;
          width: 3px;
          background: #841617;
          opacity: 0.85;
          animation: gws-outcome-pulse 3.2s ease-in-out infinite;
          animation-delay: calc(var(--card-index) * 0.5s + 0.6s);
        }

        .gws-outcome-card {
          position: relative;
        }

        .gws-outcome-card:hover {
          border-color: #841617;
          box-shadow: 0 8px 28px rgba(43, 43, 43, 0.08);
          transform: translateY(-3px);
        }

        .gws-outcome-card--visible:hover {
          transform: translateY(-3px);
        }

        /* Passive shimmer — faint glint, never a background */
        .gws-outcome-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 25%,
            rgba(132, 22, 23, 0.0) 36%,
            rgba(132, 22, 23, 0.06) 43%,
            rgba(132, 22, 23, 0.10) 50%,
            rgba(132, 22, 23, 0.06) 57%,
            rgba(132, 22, 23, 0.0) 64%,
            transparent 75%
          );
          background-size: 300% 100%;
          background-position: -150% center;
          opacity: 0;
          pointer-events: none;
          border-radius: inherit;
          transition: opacity 0.01ms;
        }

        .gws-outcome-card--visible::after {
          animation: gws-outcome-shimmer 6s ease-in-out infinite;
          animation-delay: calc(var(--card-index) * 1.2s + 0.8s);
        }

        @keyframes gws-outcome-pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }

        @keyframes gws-outcome-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gws-outcome-card {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
          .gws-outcome-card::before {
            animation: none;
            opacity: 0.85;
          }
        }
      `}</style>
    </section>
  );
}
