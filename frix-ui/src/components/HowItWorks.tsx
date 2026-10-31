"use client";

import { useEffect, useRef } from "react";
import { PlusCircle, Users, MessageSquare, Zap, Trophy } from "lucide-react";

/**
 * How FRIX Works — Step-by-step process explanation.
 */
const STEPS = [
  {
    icon: PlusCircle,
    title: "Create an Arena",
    description:
      "Pick a topic, set the rules, and open a debate room. Choose public for spectators or private for invite-only battles.",
    step: "01",
  },
  {
    icon: Users,
    title: "Form Your Team",
    description:
      "Invite debaters to Team A or Team B. Each team collaborates in real-time to build the strongest case.",
    step: "02",
  },
  {
    icon: MessageSquare,
    title: "Debate & Argue",
    description:
      "Present evidence, counter arguments, and sway the crowd. Every message is live and the audience is watching.",
    step: "03",
  },
  {
    icon: Zap,
    title: "Throw Orb Challenges",
    description:
      "Use strategic Orbs to challenge weak arguments. The AI Umpire evaluates logic, facts, and coherence in real-time.",
    step: "04",
  },
  {
    icon: Trophy,
    title: "Earn Aura & Rank Up",
    description:
      "Win debates to gain ELO-based Aura points. Climb the global leaderboard and earn MVP medals.",
    step: "05",
  },
];

export default function HowItWorks() {
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

    const items = sectionRef.current?.querySelectorAll(".fade-in-up");
    items?.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="fade-in-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="tag-pill" style={{ marginBottom: "1rem" }}>How It Works</div>
          <h2 className="section-title">
            Five Steps to <span className="gradient-text">Intellectual Dominance</span>
          </h2>
          <p className="section-subtitle">
            From creating your first arena to climbing the global rankings —
            here is how you compete on FRIX.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className={`glass-card fade-in-up delay-${i + 1}`}
                style={{
                  padding: "2rem 1.5rem",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Step Number */}
                <span
                  className="font-mono-accent"
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    opacity: 0.07,
                    color: "var(--text-primary)",
                  }}
                >
                  {step.step}
                </span>

                {/* Icon */}
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "1rem",
                    background: "linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(251, 146, 60, 0.1))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                  }}
                >
                  <Icon size={24} style={{ color: "var(--rose)" }} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
