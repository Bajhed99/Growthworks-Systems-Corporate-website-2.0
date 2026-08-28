import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import PackageApp from "./revenue-infrastructure-package/App";
import packageStyles from "./revenue-infrastructure-package/index.css?inline";

const hostStyles = packageStyles.replaceAll(".gws-page", ":host");

export function RevenueInfrastructurePlugAndPlayHost() {
  const mountRef = useRef<HTMLElement | null>(null);
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);

  useLayoutEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    setShadowRoot(mount.shadowRoot ?? mount.attachShadow({ mode: "open" }));
  }, []);

  return (
    <section
      id="revenue-infrastructure"
      ref={mountRef}
      className="homepage-visual-section gws-page"
      aria-label="Revenue Infrastructure"
    >
      {shadowRoot && createPortal(
        <>
          <style>{hostStyles}</style>
          <PackageApp />
        </>,
        shadowRoot,
      )}
    </section>
  );
}
