import { useEffect, useRef, useState } from "react";

export function useRevealOnScroll(options: { threshold?: number; rootMargin?: string } = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasTriggered.current) return;

    // Immediately check if element is already in view
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const isVisible = rect.top < windowHeight && rect.bottom > 0;

    if (isVisible) {
      setVisible(true);
      hasTriggered.current = true;
      return;
    }

    // Fallback: if IntersectionObserver isn't available, show immediately
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      hasTriggered.current = true;
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            hasTriggered.current = true;
            obs.disconnect();
          }
        });
      },
      { threshold: options.threshold ?? 0.12, rootMargin: options.rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, visible };
}
