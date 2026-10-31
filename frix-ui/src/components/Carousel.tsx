"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

/**
 * Testimonial Carousel/Slider.
 */
const TESTIMONIALS = [
  {
    quote:
      "FRIX completely changed how I think about online debates. The AI scoring keeps everything honest and the competition is addictive.",
    author: "Alex Chen",
    role: "Computer Science Student",
  },
  {
    quote:
      "The Orb challenge system is genius. It forces you to back up your claims with real logic instead of just shouting louder.",
    author: "Priya Sharma",
    role: "Philosophy Grad Student",
  },
  {
    quote:
      "I love that spectators can actually influence the match. It makes watching debates feel like an esports event.",
    author: "Marcus Rivera",
    role: "Content Creator",
  },
  {
    quote:
      "The ELO ranking system gives debates real stakes. Climbing the leaderboard is as satisfying as ranking up in competitive games.",
    author: "Sarah Kim",
    role: "Debate Team Captain",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  /* Auto-advance every 5s */
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next]);

  /* Scroll-triggered visibility */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="section fade-in-up" ref={sectionRef}>
      <div className="container" style={{ maxWidth: "700px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div className="tag-pill" style={{ marginBottom: "1rem" }}>Testimonials</div>
          <h2 className="section-title">
            What Debaters <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Carousel Card */}
        <div
          className="glass-card-static"
          style={{
            padding: "2.5rem 2rem",
            textAlign: "center",
            position: "relative",
            minHeight: "220px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Quote Icon */}
          <Quote
            size={32}
            style={{
              color: "var(--rose)",
              opacity: 0.15,
              margin: "0 auto 1.25rem",
            }}
          />

          {/* Quote Text */}
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-primary)",
              lineHeight: 1.7,
              fontStyle: "italic",
              marginBottom: "1.5rem",
              transition: "opacity 0.3s ease",
            }}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          {/* Author */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "var(--text-primary)",
              }}
            >
              {testimonial.author}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                marginTop: "0.25rem",
              }}
            >
              {testimonial.role}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid var(--border-glass)",
              background: "var(--bg-glass)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
              transition: "all var(--transition-fast)",
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid var(--border-glass)",
              background: "var(--bg-glass)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-primary)",
              transition: "all var(--transition-fast)",
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "1.5rem",
          }}
        >
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                border: "none",
                background:
                  i === current
                    ? "linear-gradient(135deg, var(--rose), var(--coral))"
                    : "var(--border-glass)",
                cursor: "pointer",
                transition: "all var(--transition-base)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
