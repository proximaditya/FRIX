"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stats Counter — Animated number counters that trigger on scroll.
 */
const STATS = [
  { label: "Active Debaters", value: 12400, suffix: "+", prefix: "" },
  { label: "Debates Hosted", value: 8500, suffix: "+", prefix: "" },
  { label: "Orbs Thrown", value: 54000, suffix: "+", prefix: "" },
  { label: "AI Verdicts", value: 120000, suffix: "+", prefix: "" },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame: number;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return count;
}

function StatItem({
  label,
  value,
  suffix,
  started,
}: {
  label: string;
  value: number;
  suffix: string;
  started: boolean;
}) {
  const count = useCountUp(value, 2000, started);

  return (
    <div style={{ textAlign: "center" }}>
      <div
        className="font-mono-accent gradient-text"
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: "0.5rem",
        }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "var(--text-muted)",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section fade-in-up" ref={sectionRef}>
      <div className="container">
        <div
          className="glass-card-static"
          style={{
            padding: "3rem 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2rem",
          }}
        >
          {STATS.map((stat) => (
            <StatItem
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              started={started}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
