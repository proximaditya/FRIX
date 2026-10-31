"use client";

import { useEffect, useRef } from "react";
import { Trophy, Medal, TrendingUp, Crown } from "lucide-react";

/**
 * Aura Rankings — Global leaderboard preview.
 */
const LEADERBOARD = [
  { rank: 1, name: "SamAltman", elo: 2450, wins: 142, badge: "Legend", trend: "+23" },
  { rank: 2, name: "CodeWitch", elo: 2380, wins: 128, badge: "Master", trend: "+18" },
  { rank: 3, name: "LogicLord", elo: 2310, wins: 119, badge: "Master", trend: "+12" },
  { rank: 4, name: "DebateKing", elo: 2240, wins: 105, badge: "Diamond", trend: "+8" },
  { rank: 5, name: "MindForge", elo: 2190, wins: 98, badge: "Diamond", trend: "+15" },
];

function getRankColor(rank: number) {
  if (rank === 1) return "var(--coral)";
  if (rank === 2) return "var(--text-muted)";
  if (rank === 3) return "#CD7F32";
  return "var(--text-secondary)";
}

export default function AuraRankings() {
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
    <section id="rankings" className="section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="fade-in-up" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="tag-pill" style={{ marginBottom: "1rem" }}>
            <Trophy size={12} style={{ display: "inline", marginRight: "4px" }} />
            Rankings
          </div>
          <h2 className="section-title">
            <span className="gradient-text">Aura</span> Leaderboard
          </h2>
          <p className="section-subtitle">
            Compete to climb the global rankings. Your Aura is calculated using the
            Arpad Elo formula — the same system used in competitive chess.
          </p>
        </div>

        {/* Leaderboard Table */}
        <div
          className="glass-card-static fade-in-up"
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "50px 1fr 100px 80px 70px",
              padding: "1rem 1.5rem",
              borderBottom: "1px solid var(--border-glass)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span>#</span>
            <span>Debater</span>
            <span style={{ textAlign: "center" }}>Aura</span>
            <span style={{ textAlign: "center" }}>Wins</span>
            <span style={{ textAlign: "center" }}>Trend</span>
          </div>

          {/* Rows */}
          {LEADERBOARD.map((player) => (
            <div
              key={player.rank}
              style={{
                display: "grid",
                gridTemplateColumns: "50px 1fr 100px 80px 70px",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid var(--border-glass)",
                alignItems: "center",
                transition: "background var(--transition-fast)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--bg-card)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {/* Rank */}
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: getRankColor(player.rank),
                }}
              >
                {player.rank === 1 ? (
                  <Crown size={20} style={{ color: "var(--coral)" }} />
                ) : (
                  player.rank
                )}
              </span>

              {/* Name + Badge */}
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--text-primary)",
                  }}
                >
                  @{player.name}
                </span>
                <span
                  className="tag-pill"
                  style={{
                    marginLeft: "0.5rem",
                    fontSize: "0.6rem",
                    padding: "0.125rem 0.5rem",
                  }}
                >
                  {player.badge}
                </span>
              </div>

              {/* ELO */}
              <span
                className="font-mono-accent"
                style={{
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  color: "var(--text-primary)",
                }}
              >
                {player.elo}
              </span>

              {/* Wins */}
              <span
                className="font-mono-accent"
                style={{
                  textAlign: "center",
                  fontSize: "0.85rem",
                  color: "var(--text-secondary)",
                }}
              >
                {player.wins}
              </span>

              {/* Trend */}
              <span
                className="font-mono-accent"
                style={{
                  textAlign: "center",
                  fontSize: "0.8rem",
                  color: "#22C55E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                <TrendingUp size={12} /> {player.trend}
              </span>
            </div>
          ))}

          {/* Footer */}
          <div
            style={{
              padding: "1rem 1.5rem",
              textAlign: "center",
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              color: "var(--rose)",
              cursor: "pointer",
            }}
          >
            View Full Leaderboard →
          </div>
        </div>
      </div>
    </section>
  );
}
