"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

/**
 * Newsletter — Email subscription form with glassmorphism.
 */
export default function Newsletter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="section" ref={sectionRef}>
      <div className="container" style={{ maxWidth: "640px" }}>
        <div
          className="glass-card-static fade-in-up"
          style={{
            padding: "3rem 2.5rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative gradient bar */}
          <div
            className="gradient-bg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
            }}
          />

          {/* Icon */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(251, 146, 60, 0.15))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <Mail size={24} style={{ color: "var(--rose)" }} />
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
              color: "var(--text-primary)",
            }}
          >
            Stay in the Arena
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Get notified about new features, tournaments, and top debates.
            No spam — just signal.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "0.75rem",
              maxWidth: "440px",
              margin: "0 auto",
            }}
            className="newsletter-form"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              aria-label="Email address"
              style={{
                flex: 1,
                padding: "0.875rem 1.25rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--border-glass)",
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                fontSize: "0.9rem",
                fontFamily: "var(--font-body)",
                outline: "none",
                transition: "border-color var(--transition-fast)",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "var(--rose)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--border-glass)")
              }
            />
            <button
              type="submit"
              className="btn-primary"
              style={{
                padding: "0.875rem 1.5rem",
                whiteSpace: "nowrap",
              }}
            >
              {submitted ? "Subscribed!" : (
                <>Subscribe <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 480px) {
          .newsletter-form {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
