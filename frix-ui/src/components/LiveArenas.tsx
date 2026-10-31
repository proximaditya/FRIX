"use client";

import { useEffect, useRef } from "react";
import { Users, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Mock data for live arenas — showcases trending debates.
 */
const LIVE_DEBATES = [
  {
    id: "tech-debate",
    title: "Go vs Node.js for High-Scale Backend Systems",
    teamA: "Team Gophers",
    teamB: "Team Node",
    viewers: 2543,
    tag: "Tech",
    topic: "Which backend language scales better for 10M+ concurrent users?",
  },
  {
    id: "ai-future",
    title: "AGI Will Arrive Before 2030",
    teamA: "Team Optimists",
    teamB: "Team Realists",
    viewers: 8902,
    tag: "AI",
    topic: "Is the path to Artificial General Intelligence shorter than we think?",
  },
  {
    id: "gaming-01",
    title: "GTA 6 Will Disappoint Long-Time Fans",
    teamA: "Team Hype",
    teamB: "Team Skeptic",
    viewers: 1204,
    tag: "Gaming",
    topic: "Can Rockstar live up to 12 years of expectations?",
  },
  {
    id: "climate-01",
    title: "Nuclear Energy Is the Only Climate Solution",
    teamA: "Team Nuclear",
    teamB: "Team Renewables",
    viewers: 3310,
    tag: "Science",
    topic: "Is nuclear the fastest path to carbon neutrality?",
  },
];

export default function LiveArenas() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Scroll-triggered fade-in animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current?.querySelectorAll(".fade-in-up");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="live-arenas" className="section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="fade-in-up" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="tag-pill" style={{ marginBottom: "1rem" }}>
            <Flame size={12} style={{ display: "inline", marginRight: "4px" }} />
            Trending Now
          </div>
          <h2 className="section-title">Live Arenas</h2>
          <p className="section-subtitle">
            Jump into active debates. Watch the arguments unfold in real-time,
            vote for the strongest logic, or join the battle yourself.
          </p>
        </div>

        {/* Arena Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {LIVE_DEBATES.map((debate, i) => (
            <div
              key={debate.id}
              className={`glass-card fade-in-up delay-${i + 1}`}
              style={{ padding: "1.5rem", position: "relative", overflow: "hidden" }}
            >
              {/* Live Badge */}
              <div className="live-badge" style={{ marginBottom: "1rem" }}>
                LIVE
              </div>

              {/* Tag */}
              <span className="tag-pill" style={{ marginBottom: "0.75rem" }}>
                {debate.tag}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  marginTop: "0.75rem",
                  marginBottom: "0.5rem",
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                }}
              >
                {debate.title}
              </h3>

              {/* Topic preview */}
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  marginBottom: "1rem",
                  lineHeight: 1.5,
                }}
              >
                {debate.topic}
              </p>

              {/* Teams */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  borderRadius: "0.75rem",
                  background: "var(--bg-card)",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                }}
              >
                <span style={{ color: "var(--rose)" }}>{debate.teamA}</span>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: "0.7rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                  }}
                >
                  VS
                </span>
                <span style={{ color: "var(--coral)" }}>{debate.teamB}</span>
              </div>

              {/* Footer: viewers + CTA */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                  }}
                >
                  <Users size={14} />
                  {debate.viewers.toLocaleString()} watching
                </div>
                <Link
                  href={`/arena/${debate.id}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-heading)",
                    color: "var(--rose)",
                    textDecoration: "none",
                    transition: "gap var(--transition-fast)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = "0.625rem")}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = "0.375rem")}
                >
                  Spectate <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
