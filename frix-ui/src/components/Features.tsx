"use client";

import { useEffect, useRef } from "react";
import {
  Wifi,
  Brain,
  Vote,
  Users,
  Shield,
  Sparkles,
} from "lucide-react";

/**
 * Features — Highlights core platform capabilities.
 */
const FEATURES = [
  {
    icon: Wifi,
    title: "Real-Time Multiplayer",
    description:
      "Powered by Golang WebSockets with Goroutine concurrency — supporting 2,500+ simultaneous connections with zero latency.",
  },
  {
    icon: Brain,
    title: "AI Umpire Judging",
    description:
      "LLaMA-3 via Groq LPUs analyzes every argument for logical coherence, factual accuracy, and rhetorical strength in under 100ms.",
  },
  {
    icon: Vote,
    title: "Audience Voting",
    description:
      "Live crowd polls that influence the match score. Spectators aren't passive — their votes shift the Tug-of-War bar in real-time.",
  },
  {
    icon: Users,
    title: "Team Battles",
    description:
      "Form teams of debaters. Collaborate on arguments, coordinate Orb challenges, and strategize to outmaneuver the opposition.",
  },
  {
    icon: Shield,
    title: "Secure Authentication",
    description:
      "Clerk-powered auth with Google SSO. Route-level middleware ensures only verified debaters can join arenas and write to the database.",
  },
  {
    icon: Sparkles,
    title: "ELO Rating System",
    description:
      "The Arpad Elo formula — used by Chess.com — calculates your Aura. Win against higher-ranked opponents for bigger rating jumps.",
  },
];

export default function Features() {
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
    <section id="features" className="section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="fade-in-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="tag-pill" style={{ marginBottom: "1rem" }}>Platform Features</div>
          <h2 className="section-title">
            Built for <span className="gradient-text">Competitive Minds</span>
          </h2>
          <p className="section-subtitle">
            Every feature is engineered to make debates structured,
            fair, and electrifying.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className={`glass-card fade-in-up delay-${Math.min(i + 1, 5)}`}
                style={{
                  padding: "2rem",
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                }}
              >
                {/* Icon Container */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "1rem",
                    background: "linear-gradient(135deg, var(--rose), var(--coral))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} style={{ color: "white" }} />
                </div>

                {/* Text */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {feat.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.65,
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
    </section>
  );
}
