"use client";

import { useEffect, useState } from "react";

/**
 * Preloader — Loading animation shown on initial page load.
 * Auto-hides after content loads + a minimum display time.
 */
export default function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide after a minimum 1.2s + DOM ready
    const timer = setTimeout(() => {
      setHidden(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${hidden ? "hidden" : ""}`} aria-hidden={hidden}>
      <div style={{ textAlign: "center" }}>
        {/* Orb */}
        <div className="preloader-orb" style={{ margin: "0 auto 1.5rem" }} />
        {/* Brand Text */}
        <div
          className="gradient-text"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
          }}
        >
          FRIX
        </div>
      </div>
    </div>
  );
}
