"use client";

import { Flame, CodeXml, AtSign, MessageCircle } from "lucide-react";
import Link from "next/link";

/**
 * Footer — Minimal one-line footer with about, GitHub, contact, community, social links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "2rem 1.5rem",
        borderTop: "1px solid var(--border-glass)",
        background: "var(--bg-glass)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {/* Left: Logo + Copyright */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <Flame size={18} style={{ color: "var(--rose)" }} />
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.85rem",
              color: "var(--text-muted)",
            }}
          >
            © {currentYear} FRIX — The Arena of Ideas
          </span>
        </div>

        {/* Center: Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "About", href: "#hero" },
            { label: "Features", href: "#features" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact", href: "mailto:contact@frix.ai" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--rose)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Social Icons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {[
            { icon: CodeXml, href: "https://github.com/proximaditya/FRIX", label: "GitHub" },
            { icon: AtSign, href: "https://twitter.com", label: "Twitter" },
            { icon: MessageCircle, href: "https://discord.com", label: "Community" },
          ].map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                style={{
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "1px solid var(--border-glass)",
                  color: "var(--text-muted)",
                  transition: "all var(--transition-fast)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--rose)";
                  e.currentTarget.style.borderColor = "var(--rose)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--border-glass)";
                }}
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
