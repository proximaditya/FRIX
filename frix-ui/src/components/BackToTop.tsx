"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * BackToTop — Floating button that appears on scroll.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top ${visible ? "show" : ""}`}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
