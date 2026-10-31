"use client";

import { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";

/**
 * FAQ Section — Accordion with common questions.
 */
const FAQ_ITEMS = [
  {
    question: "What is FRIX?",
    answer:
      "FRIX is a competitive, real-time multiplayer debate platform where people challenge ideas, defend arguments, and compete in public or private arenas. It features AI-powered evaluation, team-based battles, and a global Aura ranking system.",
  },
  {
    question: "How does the AI Umpire work?",
    answer:
      "The AI Umpire is powered by LLaMA-3 through Groq's ultra-fast LPU inference engine. When an argument is submitted, the AI evaluates it for logical coherence, factual accuracy, and reasoning depth — delivering a score in under 100 milliseconds.",
  },
  {
    question: "What are Orbs?",
    answer:
      "Orbs are strategic challenge tokens you can throw at opposing arguments. When you spot a weak claim, launch an Orb to put the other team on the spot. The AI then evaluates both the challenge and the defense, adjusting scores accordingly.",
  },
  {
    question: "How is Aura (ELO) calculated?",
    answer:
      "FRIX uses the Arpad Elo formula — the same mathematical system used by Chess.com. Your Aura rating increases when you win debates and decreases when you lose. Beating higher-ranked opponents yields bigger gains.",
  },
  {
    question: "Is FRIX free to use?",
    answer:
      "Yes! FRIX is currently in public beta and completely free. Create an account, join arenas, and start debating. Premium features and tournament modes will be available in future updates.",
  },
  {
    question: "Can I create private debate rooms?",
    answer:
      "Absolutely. When creating an arena, you can choose to make it public (visible to all spectators) or private (invite-only). Private rooms are perfect for practice sessions, team strategy, or academic debates.",
  },
  {
    question: "What tech stack powers FRIX?",
    answer:
      "FRIX uses a microservice architecture: a Golang WebSocket engine for real-time communication (handling 2,500+ concurrent connections), a Next.js frontend with React, Clerk for authentication, Neon PostgreSQL with Prisma ORM for data, and the Groq API for AI inference.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    <section id="faq" className="section" ref={sectionRef}>
      <div className="container" style={{ maxWidth: "720px" }}>
        {/* Header */}
        <div className="fade-in-up" style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="tag-pill" style={{ marginBottom: "1rem" }}>FAQ</div>
          <h2 className="section-title">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know about FRIX before stepping into the arena.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="fade-in-up">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`accordion-item ${openIndex === i ? "open" : ""}`}
            >
              <button
                className="accordion-trigger"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-content-${i}`}
              >
                <span>{item.question}</span>
                <Plus size={18} className="accordion-icon" />
              </button>
              <div
                id={`faq-content-${i}`}
                className="accordion-content"
                role="region"
              >
                <div className="accordion-content-inner">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
