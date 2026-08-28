/**
 * GWS adaptation of the user-supplied GlowyWavesHero component.
 * Retains the canvas-wave interaction model while using approved GWS content and color tokens.
 */
import { motion, type Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { HERO_PARALLAX_LAYERS } from "@/lib/heroParallax";

type Point = {
  x: number;
  y: number;
};

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function GlowyWavesHero({ motionReduced = false }: { motionReduced?: boolean }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 });

  const handleExploreClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const credibilitySection = document.getElementById("credibility");
    if (!credibilitySection) return;

    const prefersReducedMotion = motionReduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    credibilitySection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    window.history.pushState(null, "", "#credibility");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let animationId: number | undefined;
    let time = 0;
    let width = 0;
    let height = 0;

    const computeThemeColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);

      const resolveColor = (variables: string[], alpha = 1) => {
        const tempEl = document.createElement("div");
        tempEl.style.position = "absolute";
        tempEl.style.visibility = "hidden";
        tempEl.style.width = "1px";
        tempEl.style.height = "1px";
        document.body.appendChild(tempEl);

        let color = `rgba(255, 255, 255, ${alpha})`;

        for (const variable of variables) {
          const value = rootStyles.getPropertyValue(variable).trim();
          if (value) {
            tempEl.style.backgroundColor = `var(${variable})`;
            const computedColor = getComputedStyle(tempEl).backgroundColor;

            if (computedColor && computedColor !== "rgba(0, 0, 0, 0)") {
              if (alpha < 1) {
                const rgbMatch = computedColor.match(
                  /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
                );
                color = rgbMatch
                  ? `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`
                  : computedColor;
              } else {
                color = computedColor;
              }
              break;
            }
          }
        }

        document.body.removeChild(tempEl);
        return color;
      };

      return {
        backgroundTop: resolveColor(["--background", "--gws-cream"], 1),
        backgroundBottom: resolveColor(["--background", "--gws-cream"], 0.95),
        wavePalette: [
          { offset: 0, amplitude: 70, frequency: 0.003, color: resolveColor(["--primary", "--gws-crimson"], 0.8), opacity: 0.45 },
          { offset: Math.PI / 2, amplitude: 90, frequency: 0.0026, color: resolveColor(["--accent", "--primary", "--gws-crimson"], 0.7), opacity: 0.35 },
          { offset: Math.PI, amplitude: 60, frequency: 0.0034, color: resolveColor(["--secondary", "--foreground", "--gws-charcoal"], 0.65), opacity: 0.3 },
          { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: resolveColor(["--primary-foreground", "--foreground", "--gws-charcoal"], 0.25), opacity: 0.25 },
          { offset: Math.PI * 2, amplitude: 55, frequency: 0.004, color: resolveColor(["--foreground", "--gws-charcoal"], 0.2), opacity: 0.2 },
        ] satisfies WaveConfig[],
      };
    };

    let themeColors = computeThemeColors();
    const observer = new MutationObserver(() => {
      themeColors = computeThemeColors();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const prefersReducedMotion = motionReduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouseInfluence = prefersReducedMotion ? 0 : 70;
    const influenceRadius = prefersReducedMotion ? 0 : 320;
    const smoothing = prefersReducedMotion ? 0 : 0.1;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const recenterMouse = () => {
      const centerPoint = { x: width / 2, y: height / 2 };
      mouseRef.current = centerPoint;
      targetMouseRef.current = centerPoint;
    };

    const handleResize = () => {
      resizeCanvas();
      recenterMouse();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= width; x += 4) {
        const dx = x - mouseRef.current.x;
        const dy = height / 2 - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = influenceRadius ? Math.max(0, 1 - distance / influenceRadius) : 0;
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);
        const y = height / 2 + Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude + Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) + mouseEffect;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const drawScene = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, themeColors.backgroundTop);
      gradient.addColorStop(1, themeColors.backgroundBottom);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      themeColors.wavePalette.forEach(drawWave);
    };

    const animate = () => {
      time += 1;
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing;
      drawScene();
      animationId = window.requestAnimationFrame(animate);
    };

    resizeCanvas();
    recenterMouse();
    window.addEventListener("resize", handleResize);
    if (!prefersReducedMotion) window.addEventListener("pointermove", handlePointerMove);

    if (prefersReducedMotion) drawScene();
    else animationId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (animationId !== undefined) cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [motionReduced]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || motionReduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    gsap.registerPlugin(ScrollTrigger);
    const triggerElement = hero.querySelector<HTMLElement>("[data-parallax-layers]");

    const context = gsap.context(() => {
      if (!triggerElement) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: true,
        },
      });

      HERO_PARALLAX_LAYERS.forEach((layerObj, index) => {
        const { layer, yPercent, ...animationProps } = layerObj;
        timeline.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layer}"]`),
          { yPercent, ease: "none", ...animationProps },
          index === 0 ? undefined : "<",
        );
      });
    }, hero);
    ScrollTrigger.refresh();

    return () => {
      context.revert();
    };
  }, [motionReduced]);

  return (
    <section ref={heroRef} className="gws-glowy-hero" aria-labelledby="hero-title">
      <div data-parallax-layers className="gws-glowy-parallax-layers">
        <canvas ref={canvasRef} data-parallax-layer="1" className="gws-glowy-canvas" aria-hidden="true" />
        <div data-parallax-layer="2" className="gws-glowy-photo" aria-hidden="true" />
        <div data-parallax-layer="3" className="gws-glowy-photo-foreground" aria-hidden="true" />

        <div className="gws-glowy-content">
          <motion.div variants={containerVariants} initial={motionReduced ? false : "hidden"} animate="visible" className="gws-glowy-content-inner">
            <div data-parallax-layer="4" className="gws-glowy-narrative">
            <motion.div variants={itemVariants} className="gws-glowy-badge">
              <span aria-hidden="true" /> Revenue Infrastructure <span aria-hidden="true" />
            </motion.div>

            <motion.h1 variants={itemVariants} id="hero-title" className="gws-glowy-title">
              Turn more of your existing opportunity into <span>revenue.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="gws-glowy-copy">
              GrowthWorks Systems helps founder-led service businesses identify and repair the gaps that prevent demand, leads, and customers from producing their full value.
            </motion.p>

            <motion.div variants={itemVariants} className="gws-glowy-actions">
              <Button asChild size="lg" className="gws-glowy-primary">
                <a href="#revenue-diagnostic">Book a Revenue Diagnostic <ArrowRight aria-hidden="true" /></a>
              </Button>
            </motion.div>

            <motion.p variants={itemVariants} className="gws-glowy-flow" aria-label="Opportunity, Capture, Revenue">
              <span>Opportunity</span><i aria-hidden="true">→</i><span>Capture</span><i aria-hidden="true">→</i><strong>Revenue</strong>
            </motion.p>
            </div>

            <motion.a variants={itemVariants} href="#credibility" className="gws-glowy-explore" onClick={handleExploreClick}>
              <span>Explore</span><ChevronDown aria-hidden="true" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
