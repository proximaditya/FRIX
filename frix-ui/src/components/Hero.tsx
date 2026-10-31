"use client";

import { useEffect, useRef } from "react";
import { Swords, Eye } from "lucide-react";
import Link from "next/link";

/**
 * Hero Section — The Arena of Ideas
 * Animated gradient background with floating orbs and CTA buttons.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax scroll effect on background blobs */
  useEffect(() => {
    const handler = () => {
      if (!sectionRef.current) return;
      const y = window.scrollY * 0.3;
      const blobs = sectionRef.current.querySelectorAll<HTMLDivElement>(".hero-blob");
      blobs.forEach((blob, i) => {
        blob.style.transform = `translateY(${y * (i % 2 === 0 ? 1 : -0.5)}px)`;
      });
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "72px",
      }}
    >
      {/* Background Blobs */}
      <div
        className="hero-blob"
        style={{
          width: "500px",
          height: "500px",
          background: "var(--rose)",
          top: "-10%",
          left: "-5%",
        }}
      />
      <div
        className="hero-blob"
        style={{
          width: "400px",
          height: "400px",
          background: "var(--coral)",
          bottom: "-10%",
          right: "-5%",
        }}
      />
      <div
        className="hero-blob"
        style={{
          width: "250px",
          height: "250px",
          background: "linear-gradient(135deg, var(--rose), var(--coral))",
          top: "40%",
          right: "20%",
        }}
      />

      {/* Main Content */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          maxWidth: "800px",
        }}
      >
        {/* Tag Pill */}
        <div
          className="tag-pill"
          style={{
            marginBottom: "1.5rem",
            display: "inline-block",
            fontSize: "0.75rem",
          }}
        >
          ⚡ Now in Public Beta
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            color: "var(--text-primary)",
          }}
        >
          The Arena of Ideas.{" "}
          <span className="gradient-text">
            Where Arguments Earn Aura.
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--text-secondary)",
            maxWidth: "580px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Challenge ideas, defend arguments, and compete in real-time
          multiplayer debate arenas — scored by AI, judged by crowds.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Link href="#live-arenas" className="btn-primary">
            <Eye size={18} /> Explore Arenas
          </Link>
          <Link href="/sign-up" className="btn-secondary">
            <Swords size={18} /> Create Arena
          </Link>
        </div>

        {/* Floating Orb Decoration */}
        <div
          className="animate-float"
          style={{
            margin: "4rem auto 0",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--rose), var(--coral))",
            boxShadow: "0 0 60px rgba(244, 63, 94, 0.3)",
            opacity: 0.8,
          }}
        />
      </div>
    </section>
  );
}
