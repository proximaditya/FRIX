"use client";

import { useEffect, useRef } from "react";
import { Zap, Brain, Shield, BarChart3 } from "lucide-react";

/**
 * The Orb System — Explains strategic challenges and AI evaluation.
 */
const ORB_FEATURES = [
  {
    icon: Zap,
    title: "Throw an Orb",
    description:
      "When you spot a weak argument, launch an Orb challenge. It puts the opposing team on the spot to defend their claim with facts and logic.",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Our AI Umpire powered by LLaMA-3 evaluates the argument for logical coherence, factual accuracy, and reasoning depth in under 100ms.",
  },
  {
    icon: Shield,
    title: "Defend or Concede",
    description:
      "The challenged team must respond. Strong rebuttals earn bonus points. Weak defenses shift the Tug-of-War bar against them.",
  },
  {
    icon: BarChart3,
    title: "Score Impact",
    description:
      "Each Orb resolution updates the live score bar and adjusts both teams' Aura ratings using the Arpad Elo mathematical formula.",
  },
];

export default function OrbSystem() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current?.querySelectorAll(".fade-in-up, .scale-in");
    items?.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="orb-system" className="section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="fade-in-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="tag-pill" style={{ marginBottom: "1rem" }}>The Orb System</div>
          <h2 className="section-title">
            Strategic Challenges. <span className="gradient-text">AI-Powered Verdicts.</span>
          </h2>
          <p className="section-subtitle">
            The Orb is FRIX&apos;s signature mechanic — a strategic challenge that puts
            arguments under the microscope of artificial intelligence.
          </p>
        </div>

        {/* Layout: Orb Visual + Features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="orb-layout"
        >
          {/* Visual: Animated Orb */}
          <div
            className="scale-in"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "280px",
                height: "280px",
              }}
            >
              {/* Outer ring */}
              <div
                className="animate-spin-slow"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "2px dashed var(--rose-light)",
                  opacity: 0.3,
                }}
              />
              {/* Inner ring */}
              <div
                className="animate-spin-slow"
                style={{
                  position: "absolute",
                  inset: "30px",
                  borderRadius: "50%",
                  border: "1px solid var(--coral-light)",
                  opacity: 0.2,
                  animationDirection: "reverse",
                  animationDuration: "15s",
                }}
              />
              {/* Core Orb */}
              <div
                className="animate-pulse-glow"
                style={{
                  position: "absolute",
                  inset: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--rose), var(--coral))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={48} style={{ color: "white" }} />
              </div>
              {/* Floating dots */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="animate-float"
                  style={{
                    position: "absolute",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: i % 2 === 0 ? "var(--rose)" : "var(--coral)",
                    opacity: 0.5,
                    top: `${20 + i * 20}%`,
                    left: i % 2 === 0 ? "5%" : "90%",
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {ORB_FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className={`glass-card fade-in-up delay-${i + 1}`}
                  style={{
                    padding: "1.25rem 1.5rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "0.75rem",
                      background: "linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(251, 146, 60, 0.15))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} style={{ color: "var(--rose)" }} />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1rem",
                        fontWeight: 700,
                        marginBottom: "0.375rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {feat.title}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Responsive layout */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .orb-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
